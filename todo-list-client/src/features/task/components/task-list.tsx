import { TaskResponseDto } from "@/features/task/dto/task-response.dto.ts";
import { Button } from "@/components/ui/button.tsx";
import { Plus } from "lucide-react";
import { TaskForm } from "@/features/task/components/task-form.tsx";
import { TaskItem } from "@/features/task/components/task-item.tsx";
import { Draggable, Droppable } from "@hello-pangea/dnd";

export const TaskList = ({
  projectId,
  status,
  tasks,
}: {
  projectId: number;
  status: string;
  tasks: TaskResponseDto[];
}) => {
  return (
    <Droppable droppableId={status} type={"card"} direction={"horizontal"}>
      {(provided) => {
        return (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={"border min-h-[250px] grow rounded-xl p-4 flex flex-col"}
          >
            <p>{status}</p>
            <div className={"grow flex flex-col gap-2 my-4"}>
              {tasks.length === 0 && (
                <p className={"italic pl-2 text-gray-500"}>No Tasks Here Yet</p>
              )}
              {tasks.map((item, idx) => {
                return (
                  <Draggable draggableId={item.id.toString()} index={idx}>
                    {(provided) => {
                      return (
                        <div
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <TaskItem key={item.id} {...item} />
                        </div>
                      );
                    }}
                  </Draggable>
                );
              })}
            </div>
            {provided.placeholder}
            <TaskForm
              key={status}
              status={status}
              projectId={projectId}
              trigger={
                <Button variant={"outline"} className={"w-full"}>
                  <Plus className={"mr-3"} /> Add Task
                </Button>
              }
            />
          </div>
        );
      }}
    </Droppable>
  );
};
