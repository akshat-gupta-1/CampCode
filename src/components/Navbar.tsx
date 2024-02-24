"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { ArrowRight, Menu, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import NavBarDropDown from "./NavBarDropDown";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import ResponsiveNav from "./ResposiveNavBar";
const NavLinks = [
  { name: "Product", href: "#get-started" },
  { name: "Features", href: "#features" },
  { name: "Pricing", href: "#pricing" },
  { name: "Contact", href: "#contact" },
];
const AuthenticatedLinks = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Problems", href: "/problems" },
  { name: "Revision", href: "/revision" },
];
const Navbar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const path = usePathname();
  const activePath = (href: string) => {
    if (href === "/" && href !== path) {
      return path;
    }
    return path.startsWith(href);
  };
  if (status === "authenticated" && path.includes("/") && path !== "/") {
    return (
      <div className="border-b border-sand-4 sticky inset-x-0 top-0 z-30 bg-backgroundM font-inter">
        <div className="flex justify-between max-w-screen-xl md:px-8 px-4 mx-auto items-center py-2">
          <div
            className="font-geistSans font-semibold text-base cursor-pointer"
            onClick={() => router.push("/")}
          >
            <span className="text-text">Camp</span>
            <span className="text-accentM">Code</span>
          </div>
          <ul className="md:flex text-sm border border-sand-8 rounded-full text-sand-11 font-medium p-1 hidden">
            {AuthenticatedLinks.map((item, index) => (
              <Link
                href={item.href}
                key={index}
                className={cn("py-2 px-6", {
                  "bg-accentM text-white rounded-full": activePath(item.href),
                })}
              >
                {item.name}
              </Link>
            ))}
          </ul>
          <div className="flex gap-x-4">
            <div>
              {session.user.image ? (
                <NavBarDropDown
                  email={session.user?.email}
                  name={session.user?.name}
                >
                  <Image
                    src={session.user.image}
                    width={45}
                    height={45}
                    alt="user-image"
                    className="rounded-full cursor-pointer"
                  />
                </NavBarDropDown>
              ) : (
                <NavBarDropDown
                  email={session.user?.email}
                  name={session.user?.username}
                >
                  <div className="w-[45px] h-[45px] rounded-full flex justify-center items-center border border-sand-6 shadow-sm outline-none">
                    <div className="font-geistSans text-lg font-semibold uppercase">
                      {session.user.username.slice(0, 2)}
                    </div>
                  </div>
                </NavBarDropDown>
              )}
            </div>
            <button
              className="bg-orange-100 text-accentM rounded-sm p-1.5 my-1 md:hidden block"
              onClick={() => setOpen(!open)}
            >
              <motion.div
                initial={false}
                animate={{ scale: open ? 1.2 : 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                }}
              >
                {open ? <X /> : <Menu />}
              </motion.div>
            </button>
          </div>
        </div>
        <ResponsiveNav
          Links={status === "authenticated" ? AuthenticatedLinks : NavLinks}
          State={open}
          status={status}
          setState={setOpen}
        />
      </div>
    );
  }
  return (
    <div className="border-b border-sand-4 sticky inset-x-0 top-0 z-30 bg-backgroundM font-inter">
      <div className="flex justify-between max-w-screen-xl md:px-8 px-4 mx-auto items-center py-2 z-30">
        <div
          className="font-geistSans font-semibold text-base cursor-pointer py-2"
          onClick={() => router.push("/")}
        >
          <span className="text-text">Camp</span>
          <span className="text-accentM">Code</span>
        </div>
        <ul className="md:flex text-sm border border-sand-8 rounded-full text-sand-11 font-medium hidden">
          {NavLinks.map((item, index) => (
            <li key={index} className="py-2 px-4">
              <a href={item.href}>{item.name}</a>
            </li>
          ))}
        </ul>
        <div className="flex gap-x-4">
          <div
            className={cn("md:flex space-x-3 hidden ", {
              "md:hidden": status === "authenticated",
            })}
          >
            <button
              className="text-sm font-medium px-4 py-2 rounded-full hover:bg-sand-3"
              onClick={() => router.push("/auth/signin")}
            >
              Sign In
            </button>
            <Button
              variant={"customSolid"}
              className="text-sm font-semibold"
              onClick={() => router.push("/auth/signup")}
            >
              Get Started <ArrowRight size={18} className="ml-2" />
            </Button>
          </div>
          {status === "authenticated" && (
            <div>
              {session.user.image ? (
                <NavBarDropDown
                  email={session.user?.email}
                  name={session.user?.name}
                >
                  <Image
                    src={session.user.image}
                    width={45}
                    height={45}
                    alt="user-image"
                    className="rounded-full cursor-pointer"
                  />
                </NavBarDropDown>
              ) : (
                <NavBarDropDown
                  email={session.user?.email}
                  name={session.user?.username}
                >
                  <div className="w-[45px] h-[45px] rounded-full flex justify-center items-center border border-sand-6 shadow-sm outline-none">
                    <div className="font-geistSans text-lg font-semibold uppercase">
                      {session.user.username.slice(0, 2)}
                    </div>
                  </div>
                </NavBarDropDown>
              )}
            </div>
          )}
          <button
            className="bg-orange-100 text-accentM rounded-sm p-1.5 my-1 md:hidden block"
            onClick={() => setOpen(!open)}
          >
            <motion.div
              initial={false}
              animate={{ scale: open ? 1.2 : 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
            >
              {open ? <X /> : <Menu />}
            </motion.div>
          </button>
        </div>
        <ResponsiveNav
          Links={status === "authenticated" ? AuthenticatedLinks : NavLinks}
          State={open}
          status={status}
          setState={setOpen}
        />
      </div>
    </div>
  );
};

export default Navbar;
