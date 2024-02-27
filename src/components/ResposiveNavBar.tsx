import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { usePathname } from "next/navigation";
interface Props {
  Links: { name: string; href: string }[];
  State: boolean;
  status: "authenticated" | "unauthenticated" | "loading";
  setState: Dispatch<SetStateAction<boolean>>;
}
const ResponsiveNav = ({ Links, State, status, setState }: Props) => {
  const handleClick = () => setState(false);
  const path = usePathname();
  const activePath = (href: string) => {
    if (href === "/" && href !== path) {
      return path;
    }
    return path.startsWith(href);
  };
  return (
    <>
      <AnimatePresence>
        {State && (
          <motion.div
            initial={{ y: -400, zIndex: -1, opacity: 0 }}
            animate={{ y: 0, zIndex: -1, opacity: 1 }}
            exit={{ y: -400, zIndex: -1, opacity: 0 }}
            transition={{
              type: "tween",
              ease: "backInOut",
              duration: 0.8,
            }}
            className={cn(
              "fixed top-[57px] bg-backgroundM w-full h-[340px] left-0 bottom-0 mt-1 z-1 px-4 rounded-b-xl shadow-sm border-x border-b border-sand-6 md:hidden block",
              {
                "h-52 top-[58px]": status === "authenticated",
              },
            )}
          >
            <ul className="flex flex-col gap-y-6 my-4 ">
              {status === "unauthenticated" && (
                <>
                  <Link
                    className="font-geistSans font-medium text-accentM border-b border-sand-5 pb-4 flex items-center"
                    href={"/auth/signup"}
                    onClick={handleClick}
                  >
                    Get Started <ArrowRight className="ml-1 w-5 h-5" />
                  </Link>
                  <Link
                    className="font-geistSans font-medium text-sand-9 border-b border-sand-5 pb-4"
                    href={"/auth/signin"}
                    onClick={handleClick}
                  >
                    Sign In
                  </Link>
                </>
              )}
              {Links.map((item, index) => {
                return (
                  <Link
                    href={item.href}
                    key={index}
                    className={cn(
                      "font-geistSans font-medium text-sand-9 border-b border-sand-5 pb-6 last:border-none",
                      {
                        "text-accentM": activePath(item.href),
                      },
                    )}
                    onClick={handleClick}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ResponsiveNav;
