"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
const HeroSection = () => {
  const router = useRouter();
  return (
    <div className="w-full sm:mt-20 mt-14 flex flex-col items-center">
      <div className="text-center">
        {" "}
        <h2 className="lg:text-[5rem] md:text-[4.5rem] sm:text-[3.5rem] text-[2.9rem] font-bold  text-transparent bg-clip-text bg-gradient-to-b from-sand-10 to-sand-8 leading-tight">
          Organise and Track
        </h2>
        <h2 className="lg:text-[5rem] md:text-[4.5rem] sm:text-[3.5rem] text-[2.9rem] font-bold text-transparent bg-clip-text bg-gradient-to-b from-primaryM to-accentM leading-tight">
          Coding Practices{" "}
        </h2>
      </div>
      <p className="max-w-[550px] text-center my-6 md:text-lg text-[14px] text-sand-10">
        A one stop destination to help you organize and visualize your coding
        progress while preparing for technical interviews.
      </p>
      <Button
        className="flex items-center rounded-full shadow-inner bg-gradient-to-b from-primaryM to-accentM sm:text-base text-sm sm:h-11 h-10 "
        onClick={() => {
          router.push("/auth/signup");
        }}
      >
        Get Started <ChevronRight className="ml-1 w-5 h-5" />
      </Button>
      <div className="max-w-[920px] max-h-[500px]  w-full  my-12 rounded-xl bg-gray-900/5 flex justify-center items-center p-2">
        <Image
          src={"/imgs/HeroSectionImage.png"}
          width={900}
          height={400}
          alt="Hero Section Image"
          className="rounded-xl"
        ></Image>
      </div>
    </div>
  );
};

export default HeroSection;
