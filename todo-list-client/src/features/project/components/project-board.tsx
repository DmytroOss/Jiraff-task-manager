import { useEffect, useState } from "react";
import { TaskResponseDto } from "@/features/task/dto/task-response.dto.ts";
import { httpClient } from "@/util/axios.ts";
import { ServerResponseDto } from "@/dto/server-response.dto.ts";
import toast from "react-hot-toast";
import { ProtectedComponent } from "@/features/auth/components/protected-component.tsx";
import { Loading } from "@/components/loading.tsx";
import { TaskList } from "@/features/task/components/task-list.tsx";
import { taskEventChannel } from "@/features/task/util/task-event-channel.tsx";
import { DragDropContext } from "@hello-pangea/dnd";

export const ProjectBoard = ({ id }: { id: number }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState<TaskResponseDto[]>([]);
  const [taskStatuses, setTaskStatuses] = useState<string[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await httpClient.get<ServerResponseDto<TaskResponseDto[]>>(
        `/tasks/project/${id}`,
      );
      const data = res.data;

      if (data.msg) toast.error("Could Not Fetch Tasks");
      if (!data.msg) setTasks(data.data);
    };

    const fetchPossibleStatuses = async () => {
      const res =
        await httpClient.get<ServerResponseDto<string[]>>("/tasks/statuses");
      const data = res.data;

      if (data.msg) toast.error("Could Not Fetch Task Statuses");
      if (!data.msg) setTaskStatuses(data.data);
    };

    const fetch = async () => {
      await fetchTasks();
      await fetchPossibleStatuses();
    };

    fetch().then(() => {
      setIsLoading(false);
    });

    const onTasksChangeUnsub = taskEventChannel.on("onTasksChange", () => {
      setIsLoading(true);
      fetch().then(() => {
        setIsLoading(false);
      });
    });

    return () => {
      onTasksChangeUnsub();
    };
  }, [id]);

  return (
    <ProtectedComponent>
      <Loading isLoading={isLoading}>
        <DragDropContext
          onDragEnd={(e) => {
            const filtered = tasks.filter((task) => {
              return task.id === parseInt(e.draggableId);
            });
            const task = filtered[0];
            // @ts-ignore
            task.status = e.destination?.droppableId ?? task.status;
            // @ts-ignore
            task.assigneeId = task.assignee.id;

            httpClient
              .post<ServerResponseDto<TaskResponseDto>>(
                `/tasks/project/${id}`,
                task,
              )
              .then((res) => {
                taskEventChannel.emit("onTasksChange");

                const data = res.data;
                if (data.msg) toast.error("Could Not Create Task");
                if (!data.msg) toast.success("Task Changed Successfully");
              });
          }}
        >
          <div className={"flex gap-4 mt-4 items-start justify-between"}>
            {taskStatuses.map((status) => {
              const filteredTasks = tasks.filter((task) => {
                return task.status === status;
              });
              return (
                <TaskList
                  key={status}
                  projectId={id}
                  status={status}
                  tasks={filteredTasks}
                />
              );
            })}
          </div>
        </DragDropContext>
      </Loading>
    </ProtectedComponent>
  );
};
