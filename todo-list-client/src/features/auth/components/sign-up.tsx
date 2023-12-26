import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Loader2 } from "lucide-react";
import { FormInput } from "@/components/form-input.tsx";
import { httpClient } from "@/util/axios.ts";
import { ServerResponseDto } from "@/dto/server-response.dto.ts";
import { AuthResponseDto } from "@/features/auth/dto/auth-response.dto.ts";
import { useAuth } from "@/features/auth/providers/auth-provider.tsx";

const userSignUpSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  surname: z.string().min(1),
  username: z.string().min(4),
  password: z.string().min(4),
});

export type UserSignUp = z.infer<typeof userSignUpSchema>;

export const SignUp = () => {
  const { login } = useAuth();

  const form = useForm<UserSignUp>({
    resolver: zodResolver(userSignUpSchema),
  });

  const onSubmit = (values: UserSignUp) => {
    if (isValid) {
      httpClient
        .post<ServerResponseDto<AuthResponseDto>>("/auth/sign-up", values)
        .then((res) => login(res.data.data));
    }
  };

  const { isSubmitting, isValid } = form.formState;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormInput
          //@ts-ignore
          control={form.control}
          name={"email"}
          label={"Email"}
          placeholder={"email@xample.com.."}
          isDisabled={isSubmitting}
        />
        <FormInput
          //@ts-ignore
          control={form.control}
          name={"username"}
          label={"Username"}
          placeholder={"username.."}
          isDisabled={isSubmitting}
        />
        <FormInput
          //@ts-ignore
          control={form.control}
          name={"name"}
          label={"Name"}
          placeholder={"name.."}
          isDisabled={isSubmitting}
        />
        <FormInput
          //@ts-ignore
          control={form.control}
          name={"password"}
          label={"Password"}
          placeholder={"password"}
          isDisabled={isSubmitting}
        />
        <FormInput
          //@ts-ignore
          control={form.control}
          name={"surname"}
          label={"Surname"}
          placeholder={"surname.."}
          isDisabled={isSubmitting}
        />
        <Button className={"w-full mt-4"} disabled={isSubmitting || !isValid}>
          {isSubmitting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          Sign Up
        </Button>
      </form>
    </Form>
  );
};
