import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Loader2 } from "lucide-react";
import { FormInput } from "@/components/form-input.tsx";
import { useAuth } from "@/features/auth/providers/auth-provider.tsx";
import { httpClient } from "@/util/axios.ts";
import { ServerResponseDto } from "@/dto/server-response.dto.ts";
import { AuthResponseDto } from "@/features/auth/dto/auth-response.dto.ts";

const userSignInSchema = z.object({
  username: z.string().min(4),
  password: z.string().min(4),
});

export type UserSignIn = z.infer<typeof userSignInSchema>;

export const SignIn = () => {
  const { login } = useAuth();

  const form = useForm<UserSignIn>({
    resolver: zodResolver(userSignInSchema),
  });

  const onSubmit = (values: UserSignIn) => {
    if (isValid) {
      httpClient
        .post<ServerResponseDto<AuthResponseDto>>("/auth/sign-in", values)
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
          name={"username"}
          label={"Username"}
          placeholder={"username.."}
          isDisabled={isSubmitting}
        />

        <FormInput
          //@ts-ignore
          control={form.control}
          type={"password"}
          name={"password"}
          label={"Password"}
          placeholder={"password.."}
          isDisabled={isSubmitting}
        />

        <Button className={"w-full mt-4"} disabled={isSubmitting || !isValid}>
          {isSubmitting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          Sign In
        </Button>
      </form>
    </Form>
  );
};
