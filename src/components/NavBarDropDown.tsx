import { Layout, Settings, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
const NavBarDropDown = ({
  children,
  name,
  email,
}: {
  children: React.ReactNode;
  name: string | null | undefined;
  email: string | null | undefined;
}) => {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="font-inter bg-backgroundM" align="end">
        <DropdownMenuItem className="flex flex-col items-start focus:bg-sand-3">
          <div className="text-base font-semibold">{name}</div>
          <div>{email}</div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-base focus:bg-sand-3"
          onClick={() => router.push('/dashboard')}
        >
          <Layout className="mr-2 h-[18px] w-[18px]" />
          Dashboard
        </DropdownMenuItem>
        <DropdownMenuItem className="text-base focus:bg-sand-3">
          <Settings className="mr-2 h-[18px] w-[18px]" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-base cursor-pointer focus:bg-sand-3"
          onClick={() => signOut({ callbackUrl: 'http://localhost:3000/' })}
        >
          <LogOut className="mr-2 h-[18px] w-[18px]" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavBarDropDown;
