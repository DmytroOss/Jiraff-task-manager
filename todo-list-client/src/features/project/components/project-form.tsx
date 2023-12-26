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
import { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form.tsx";
import { FormInput } from "@/components/form-input.tsx";
import { Loader2 } from "lucide-react";
import { httpClient } from "@/util/axios.ts";
import { ServerResponseDto } from "@/dto/server-response.dto.ts";
import { ProjectResponseDto } from "@/features/project/dto/project-response.dto.ts";
import toast from "react-hot-toast";
import { projectEventChannel } from "@/features/project/util/project-event-channel.ts";

const projectSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(4).max(128),
  description: z.string().min(4).max(512),
});

export type ProjectWriteDto = z.infer<typeof projectSchema>;

export const ProjectForm = ({ trigger }: { trigger: ReactNode }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ProjectWriteDto>({
    resolver: zodResolver(projectSchema),
  });

  const onSubmit = (values: ProjectWriteDto) => {
    setIsSubmitting(true);
    httpClient
      .post<ServerResponseDto<ProjectResponseDto>>("/projects", values)
      .then((res) => {
        setIsSubmitting(false);
        projectEventChannel.emit("onProjectsChange");

        const data = res.data;
        if (data.msg) toast.error("Could Not Create Project");
        if (!data.msg) toast.success("Project Created Successfully");
      });
  };

  const { isValid } = form.formState;

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
          <DialogDescription>
            Create new projects here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormInput
              //@ts-ignore
              control={form.control}
              name={"name"}
              label={"Name"}
              placeholder={"project name.."}
              isDisabled={isSubmitting}
            />
            <FormInput
              //@ts-ignore
              control={form.control}
              type={"textarea"}
              name={"description"}
              label={"Description"}
              placeholder={"something about project.."}
              isDisabled={isSubmitting}
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
