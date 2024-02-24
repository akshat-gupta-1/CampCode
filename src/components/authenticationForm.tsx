"use client";
import { useState } from "react";
import { EyeOff, Eye, ArrowRight } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Image from "next/image";
import type { ZodSchema } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
export const SignupSchema = z.object({
  username: z
    .string({ required_error: "Username is Required" })
    .min(1, "Username is required"),
  email: z
    .string({ required_error: "Email is required" })
    .email("Please enter a valid email."),
  password: z.string().min(8, "Password should be atleast 8 characters."),
});
export const SigninSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Please enter a valid email"),
  password: z.string().min(8, "Password should be atleast 8 characters."),
});
export const defaultSignupValues = {
  username: "",
  email: "",
  password: "",
};
export const defaultSigninValues = {
  email: "",
  password: "",
};
export type SignupType = z.infer<typeof SignupSchema>;
export type SigninType = z.infer<typeof SigninSchema>;
interface Props {
  type: "Signup" | "Signin";
  onSubmit: (data: SigninType | SignupType) => void;
  formSchema: ZodSchema<SigninType | SignupType>;
  defaultValues: typeof defaultSignupValues | typeof defaultSigninValues;
}
const AuthenticationForm = ({
  type,
  onSubmit,
  formSchema,
  defaultValues,
}: Props) => {
  const [visibility, setVisibility] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  return (
    <div>
      <h3 className="text-2xl font-semibold mb-4">
        {" "}
        {type === "Signin" ? "Sign in" : "Sign up"}
      </h3>
      <div className="relative w-full">
        <div className="absolute w-full top-2">
          <div className="border-t w-full border-sand-6" />
        </div>
        <div className="relative flex justify-center">
          <div className="uppercase text-xs text-sand-11 bg-white px-2">
            {type === "Signin" ? "Sign in" : "Sign up"} with
          </div>
        </div>
      </div>
      <div>
        <button
          className="flex gap-x-2 border border-sand-7 w-full justify-center my-4 p-2 rounded-full hover:bg-sand-2"
          onClick={() => {
            signIn("google", {
              callbackUrl: "http://localhost:3000/dashboard",
            });
          }}
        >
          <Image
            src={"/google.svg"}
            alt="Google image"
            width={24}
            height={24}
          />
          <span className="text-md font-medium">Google</span>
        </button>
      </div>
      <div className="relative w-full">
        <div className="absolute w-full top-2">
          <div className="border-t w-full border-sand-6" />
        </div>
        <div className="relative flex justify-center">
          <div className="uppercase text-xs text-sand-11 bg-white px-2">Or</div>
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full max-w-md"
        >
          {type === "Signup" && (
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="johndoe123"
                      {...field}
                      className="bg-backgroundM"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@gmail.com"
                    {...field}
                    className="bg-backgroundM"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={visibility ? "text" : "password"}
                      placeholder="**********"
                      {...field}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          form.handleSubmit(onSubmit)();
                        }
                      }}
                      className="bg-backgroundM"
                    />
                    <button
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
                      onClick={(e) => {
                        e.preventDefault();
                        setVisibility((prev) => !prev);
                      }}
                    >
                      {visibility ? (
                        <EyeOff size={18} className="text-sand-11" />
                      ) : (
                        <Eye size={18} className="text-sand-11" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-accentM text-white hover:bg-orange-9 align-middle relative"
          >
            {type === "Signin" ? "Sign in" : "Sign up"}{" "}
            <ArrowRight size={20} className="ml-2" />
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AuthenticationForm;
