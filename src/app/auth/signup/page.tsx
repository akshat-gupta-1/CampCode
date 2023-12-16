'use client';
import AuthenticationForm from '@/components/authenticationForm';
import { trpc } from '@/app/_trpc/client';
import {
  SignupSchema,
  defaultSignupValues,
  SignupType,
  SigninType,
} from '@/components/authenticationForm';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
const Page = () => {
  const router = useRouter();
  const mutation = trpc.auth.register.useMutation({});
  const submit = async (data: SignupType | SigninType) => {
    const mutationData = data as SignupType;
    const result = mutation.mutateAsync(mutationData);
    toast.promise(result, {
      loading: 'Loading',
      success: (data) => {
        return `Successfully signed up.`;
      },
      error: (err) => {
        return `${err.message}`;
      },
    });
    result.then(() => {
      router.push('/auth/signin');
    });
  };
  return (
    <div className="flex justify-around items-center h-[700px] w-full px-4">
      <Card className="w-[500px]">
        <CardContent className="mt-4">
          <AuthenticationForm
            type="Signup"
            onSubmit={submit}
            formSchema={SignupSchema}
            defaultValues={defaultSignupValues}
          />
        </CardContent>
        <CardFooter className="-mt-2">
          <div>
            <span className="text-sm text-slate-500">
              Already have an account?
            </span>{' '}
            <Link
              href={'/auth/signin'}
              className="text-sm text-primaryM hover:underline "
            >
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
