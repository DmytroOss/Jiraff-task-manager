import Logo from "../../../assets/logo.svg";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs.tsx";
import { SignIn } from "@/features/auth/components/sign-in.tsx";
import { SignUp } from "@/features/auth/components/sign-up.tsx";
import { GuestComponent } from "@/features/auth/components/guest-component.tsx";

export const AuthPage = () => {
  return (
      // @ts-ignore
    <GuestComponent>
      <div
        className={
          "flex flex-col gap-8 my-auto h-full -mt-12 justify-center items-center"
        }
      >
        <div className={"flex items-center gap-4 justify-between"}>
          <img src={Logo} alt={"logo"} width={50} height={50} />
          <h1 className={"text-4xl font-semibold"}>Jiraff</h1>
        </div>
        <Tabs defaultValue="sign-in" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="sign-in">Sign In</TabsTrigger>
            <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value={"sign-in"}>
            <SignIn />
          </TabsContent>
          <TabsContent value={"sign-up"}>
            <SignUp />
          </TabsContent>
        </Tabs>
      </div>
    </GuestComponent>
  );
};
