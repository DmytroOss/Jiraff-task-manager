import { X } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { httpClient } from "@/util/axios.ts";
import { ServerResponseDto } from "@/dto/server-response.dto.ts";
import toast from "react-hot-toast";
import { taskEventChannel } from "@/features/task/util/task-event-channel.tsx";

export const TaskItem = ({ id, title }: { id: number; title: string }) => {
  const handleDelete = () => {
    httpClient
      .post<ServerResponseDto<number>>(`/tasks/delete/${id}`)
      .then((res) => {
        taskEventChannel.emit("onTasksChange");
        const data = res.data;
        if (data.msg) toast.error("Could Not Delete Task");
        if (!data.msg) toast.success("Task Deleted Successfully");
      });
  };

  return (
    <p
      className={
        "block border rounded-lg flex items-center justify-between p-2"
      }
      key={id}
    >
      {title}
      <Button
        variant={"ghost"}
        className={"w-5 h-5"}
        size={"icon"}
        onClick={handleDelete}
      >
        <X />
      </Button>
    </p>
  );
};
