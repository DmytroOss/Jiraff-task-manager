import { useEffect, useState } from "react";
import { ProjectResponseDto } from "@/features/project/dto/project-response.dto.ts";
import { httpClient } from "@/util/axios.ts";
import { ServerResponseDto } from "@/dto/server-response.dto.ts";
import { ProtectedComponent } from "@/features/auth/components/protected-component.tsx";
import toast from "react-hot-toast";
import { PageDto } from "@/dto/page.dto.ts";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { ProjectCard } from "@/features/project/components/project-card.tsx";
import { Title } from "@/components/title.tsx";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button.tsx";
import { Plus } from "lucide-react";
import { Loading } from "@/components/loading.tsx";
import { ProjectForm } from "@/features/project/components/project-form.tsx";
import { projectEventChannel } from "@/features/project/util/project-event-channel.ts";

export const MyProjectsPage = () => {
  const [projects, setProjects] = useState<ProjectResponseDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [onlyShowCreated, setOnlyShowCreated] = useState(false);

  useEffect(() => {
    const fetchProjects = () => {
      let url = "/projects/my";
      if (!onlyShowCreated) {
        url = url + "/collaborative";
      }

      httpClient
        .get<ServerResponseDto<PageDto<ProjectResponseDto>>>(url)
        .then((res) => {
          setIsLoading(false);
          const data = res.data;

          if (data.msg) toast.error(data.msg);
          if (data.data) setProjects(data.data.content);
        });
    };

    fetchProjects();

    const onProjectWriteUnsub = projectEventChannel.on(
      "onProjectsChange",
      () => {
        fetchProjects();
      },
    );

    return () => {
      onProjectWriteUnsub();
    };
  }, [onlyShowCreated]);

  return (
    <ProtectedComponent>
      <Loading isLoading={isLoading}>
        <Container>
          <div className={"flex items-start justify-between mb-4"}>
            <div className={"flex flex-col gap-4"}>
              <Title text={"My Projects"} />

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="onlyShowCreated"
                  checked={onlyShowCreated}
                  onCheckedChange={(r) => {
                    setOnlyShowCreated(r as boolean);
                  }}
                />

                <label
                  htmlFor="onlyShowCreated"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Only Show Created
                </label>
              </div>
            </div>

            <ProjectForm
              trigger={
                <Button>
                  <Plus className={"mr-3"} />
                  Add Project
                </Button>
              }
            />
          </div>

          <div
            className={
              "grid grid-cols-1  sm:grid-cols-2 gap-4 xl:grid-cols-3 2xl:grid-cols-4"
            }
          >
            {projects.map((item) => {
              return <ProjectCard key={item.id} {...item} />;
            })}
          </div>
        </Container>
      </Loading>
    </ProtectedComponent>
  );
};
