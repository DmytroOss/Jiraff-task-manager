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
import { collaboratorEventChannel } from "@/features/project/util/collaborator.event-channel.ts";

const collaboratorSchema = z.object({
  email: z.string().email(),
});

export const CollaboratorForm = ({
  trigger,
  projectId,
}: {
  trigger: ReactNode;
  projectId: number;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof collaboratorSchema>>({
    resolver: zodResolver(collaboratorSchema),
  });

  const onSubmit = (values: z.infer<typeof collaboratorSchema>) => {
    setIsSubmitting(true);
    httpClient
      .post<ServerResponseDto<ProjectResponseDto>>(
        `/projects/${projectId}/collaborators/add`,
        values,
      )
      .then((res) => {
        setIsSubmitting(false);

        collaboratorEventChannel.emit("onCollaboratorChange");

        const data = res.data;
        if (data.msg) toast.error("Could Not Add Collaborator");
        if (!data.msg) toast.success("Collaborator Added Successfully");
      });
  };

  const { isValid } = form.formState;

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Collaborators To Your Project</DialogTitle>
          <DialogDescription>
            Add Collaborators To Your Project. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormInput
              //@ts-ignore
              control={form.control}
              type={"email"}
              name={"email"}
              label={"Email"}
              placeholder={"email@xample.com"}
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
