"use client";
import AuthenticationForm from "@/components/authenticationForm";
import {
  SigninSchema,
  defaultSigninValues,
  SigninType,
  SignupType,
} from "@/components/authenticationForm";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
const Page = () => {
  const router = useRouter();
  const submit = async (data: SigninType | SignupType) => {
    const formData = data as SigninType;
    const SignInData = signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });
    toast.promise(SignInData, {
      loading: "loading",
      success: (data) => {
        router.push("/dashboard");
        return "Successfully signed in.";
      },
      error: (err) => {
        if (err === "CredentialsSignin") {
          return "Invalid Credentials";
        } else {
          return "Server Error";
        }
      },
    });
  };
  return (
    <div className="flex justify-center items-center h-[700px] sm:px-4 ">
      <Card className="w-[500px] bg-backgroundM border-sand-6">
        <CardContent className="mt-4">
          <AuthenticationForm
            type="Signin"
            onSubmit={submit}
            formSchema={SigninSchema}
            defaultValues={defaultSigninValues}
          />
        </CardContent>
        <CardFooter className="-mt-2">
          <div>
            <span className="text-sm text-sand-9">
              Don&apos;t have an account?
            </span>{" "}
            <Link
              href={"/auth/signup"}
              className="text-sm text-primaryM hover:underline "
            >
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
