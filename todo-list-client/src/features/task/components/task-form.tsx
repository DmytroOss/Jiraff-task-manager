import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form.tsx";
import { FormInput } from "@/components/form-input.tsx";
import { Loader2 } from "lucide-react";
import { httpClient } from "@/util/axios.ts";
import { ServerResponseDto } from "@/dto/server-response.dto.ts";
import toast from "react-hot-toast";
import { taskEventChannel } from "@/features/task/util/task-event-channel.tsx";
import { TaskResponseDto } from "@/features/task/dto/task-response.dto.ts";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserResponseDto } from "@/features/auth/dto/user-response.dto.ts";
import { collaboratorEventChannel } from "@/features/project/util/collaborator.event-channel.ts";

const taskSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().min(4).max(128),
  description: z.string().min(4).max(512),
  status: z.string(),
  priority: z.string(),
  assigneeId: z.coerce.string(),
});

export type TaskWriteDto = z.infer<typeof taskSchema>;

export const TaskForm = ({
  trigger,
  projectId,
  status,
}: {
  trigger: ReactNode;
  projectId: number;
  status: string;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [collaborators, setCollaborators] = useState<UserResponseDto[]>([]);

  const form = useForm<TaskWriteDto>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      status: status,
      priority: "LOW",
    },
  });

  useEffect(() => {
    const fetchCollaborators = () => {
      httpClient
        .get<ServerResponseDto<UserResponseDto[]>>(
          `/projects/${projectId}/collaborators`,
        )
        .then((res) => {
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
  }, [projectId]);

  const onSubmit = (values: TaskWriteDto) => {
    setIsSubmitting(true);
    httpClient
      .post<ServerResponseDto<TaskResponseDto>>(
        `/tasks/project/${projectId}`,
        values,
      )
      .then((res) => {
        setIsSubmitting(false);
        taskEventChannel.emit("onTasksChange");

        const data = res.data;
        if (data.msg) toast.error("Could Not Create Task");
        if (!data.msg) toast.success("Task Created Successfully");
      });
  };

  const { isValid } = form.formState;

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
          <DialogDescription>
            Create new tasks here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormInput
              //@ts-ignore
              control={form.control}
              name={"title"}
              label={"Title"}
              placeholder={"Test API"}
              isDisabled={isSubmitting}
            />
            <FormInput
              //@ts-ignore
              control={form.control}
              name={"description"}
              label={"Description"}
              placeholder={"yada-yada-yada"}
              isDisabled={isSubmitting}
            />
            <FormField
              name={"assigneeId"}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Assignee</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select user" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Collaborators</SelectLabel>
                          {collaborators.map((item) => {
                            return (
                              <SelectItem
                                key={item.id}
                                value={item.id.toString()}
                              >
                                {item.email}
                              </SelectItem>
                            );
                          })}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormItem>
                );
              }}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            className={"w-full mt-4"}
            disabled={isSubmitting || !isValid}
          >
            {isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
