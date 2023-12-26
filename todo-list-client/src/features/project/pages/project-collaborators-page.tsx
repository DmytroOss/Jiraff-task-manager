import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { httpClient } from "@/util/axios.ts";
import { UserResponseDto } from "@/features/auth/dto/user-response.dto.ts";
import { ServerResponseDto } from "@/dto/server-response.dto.ts";
import toast from "react-hot-toast";
import { ProtectedComponent } from "@/features/auth/components/protected-component.tsx";
import { Loading } from "@/components/loading.tsx";
import { Container } from "@/components/container.tsx";
import { Button } from "@/components/ui/button.tsx";
import { ArrowLeft, X } from "lucide-react";
import { Title } from "@/components/title.tsx";
import { CollaboratorForm } from "@/features/project/components/collaborator-form.tsx";
import { ProjectResponseDto } from "@/features/project/dto/project-response.dto.ts";
import { collaboratorEventChannel } from "@/features/project/util/collaborator.event-channel.ts";

export const ProjectCollaboratorsPage = () => {
  const id = useParams()["id"];
  const navigator = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [collaborators, setCollaborators] = useState<UserResponseDto[]>([]);

  useEffect(() => {
    const fetchCollaborators = () => {
      httpClient
        .get<ServerResponseDto<UserResponseDto[]>>(
          `/projects/${id}/collaborators`,
        )
        .then((res) => {
          setIsLoading(false);

          const response = res.data;

          if (response.msg) toast.error(response.msg);
          if (response.data) setCollaborators(response.data);
        });
    };

    fetchCollaborators();

    const onCollaboratorChangeUnsub = collaboratorEventChannel.on(
      "onCollaboratorChange",
      () => {
        fetchCollaborators();
      },
    );

    return () => {
      onCollaboratorChangeUnsub();
    };
  }, [id]);

  return (
    <ProtectedComponent>
      <Loading isLoading={isLoading}>
        <Container>
          <div className={"flex items-center justify-between"}>
            <div className={"flex gap-4"}>
              <Button
                variant={"ghost"}
                className={"mt-0.5"}
                size={"icon"}
                onClick={() => navigator("/projects")}
              >
                <ArrowLeft />
              </Button>
              <Title text={"Collaborates"} />
            </div>

            <CollaboratorForm
              trigger={<Button>Add Collaborator</Button>}
              projectId={parseInt(id as string)}
            />
          </div>

          <div className={"flex flex-col gap-4 max-w-[400px] mt-4"}>
            {collaborators.map((item) => {
              return (
                <div
                  key={item.id}
                  className={
                    "border flex items-center justify-between rounded-lg p-4"
                  }
                >
                  <div>
                    <p>{item.email}</p>
                    <div className={"flex italic text-gray-500"}>
                      <p>
                        {item.name} {item.surname}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant={"ghost"}
                    size={"icon"}
                    onClick={() => {
                      httpClient
                        .post<ServerResponseDto<ProjectResponseDto>>(
                          `/projects/${id}/collaborators/remove`,
                          { email: item.email },
                        )
                        .then((res) => {
                          collaboratorEventChannel.emit("onCollaboratorChange");
                          const data = res.data;
                          if (data.msg)
                            toast.error("Could Not Remove Collaborator");
                          if (!data.msg)
                            toast.success("Collaborator Removed Successfully");
                        });
                    }}
                  >
                    <X />
                  </Button>
                </div>
              );
            })}
          </div>
        </Container>
      </Loading>
    </ProtectedComponent>
  );
};
