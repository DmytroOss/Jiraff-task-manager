import { useNavigate, useParams } from "react-router-dom";
import { ProtectedComponent } from "@/features/auth/components/protected-component.tsx";
import { useEffect, useState } from "react";
import { ProjectResponseDto } from "@/features/project/dto/project-response.dto.ts";
import { httpClient } from "@/util/axios.ts";
import { ServerResponseDto } from "@/dto/server-response.dto.ts";
import { Title } from "@/components/title.tsx";
import toast from "react-hot-toast";
import { Container } from "@/components/container.tsx";
import { Button } from "@/components/ui/button.tsx";
import { ArrowLeft } from "lucide-react";
import { Loading } from "@/components/loading.tsx";
import { ProjectBoard } from "@/features/project/components/project-board.tsx";

export const ProjectPage = () => {
  const id = useParams()["id"];
  const navigator = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [project, setProject] = useState<ProjectResponseDto | undefined>(
    undefined,
  );

  useEffect(() => {
    const fetchProject = () => {
      httpClient
        .get<ServerResponseDto<ProjectResponseDto>>(`/projects/${id}`)
        .then((res) => {
          setIsLoading(false);

          const response = res.data;

          if (response.msg) toast.error(response.msg);
          if (response.data) setProject(response.data);
        });
    };

    fetchProject();
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
              <Title text={project?.name ?? ""} />
            </div>
            <div className={"flex gap-2"}>
              <Button
                variant={"secondary"}
                onClick={() => {
                  navigator(`/projects/${id}/collaborators`);
                }}
              >
                Collaborators
              </Button>
              <Button
                variant={"outline"}
                onClick={() => {
                  httpClient
                    .post<ServerResponseDto<number>>(`/projects/delete/${id}`)
                    .then((res) => {
                      const data = res.data;
                      if (data.msg) toast.error("Could Not Delete Project");

                      if (!data.msg) {
                        toast.success("Project Deleted Successfully");
                        navigator("/projects");
                      }
                    });
                }}
              >
                Delete
              </Button>
            </div>
          </div>
          <ProjectBoard id={parseInt(id as string)} />
        </Container>
      </Loading>
    </ProtectedComponent>
  );
};
