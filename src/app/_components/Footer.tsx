import { Copyright, Heart } from "lucide-react";
const Footer = () => {
  return (
    <>
      <div
        className="bg-sand-3 w-full md:h-[300px] rounded-2xl mb-6"
        id="contact"
      >
        <div className="grid md:grid-cols-4 grid-cols-2  w-full h-full p-8 gap-y-8">
          <div className="flex flex-col justify-center gap-y-6 md:col-span-1 col-span-2">
            <h5 className="font-medium">
              Camp<span className="text-accentM">Code</span>
            </h5>
            <p className="text-sm text-sand-9 max-w-[350px]">
              A one stop destination to help you organize and visualize your
              coding progress while preparing for technical interviews.
            </p>
          </div>
          <div className="flex md:justify-center items-center w-full h-full">
            <ul className=" flex flex-col gap-y-6 text-sand-9 text-sm ">
              <li className="text-sand-12 font-medium ">Product</li>
              <li className="hover:cursor-pointer hover:text-sand-11">
                Get Started
              </li>
              <li className="hover:cursor-pointer hover:text-sand-11">
                Features
              </li>
              <li className="hover:cursor-pointer hover:text-sand-11">
                Dashboard
              </li>
            </ul>
          </div>
          <div className="flex md:justify-center items-center w-full h-full ">
            <ul className=" flex flex-col gap-y-6 text-sand-9 text-sm">
              <li className="text-sand-12 font-medium ">Community</li>
              <li className="hover:cursor-pointer hover:text-sand-11">
                Twitter
              </li>
              <li className="hover:cursor-pointer hover:text-sand-11">
                Github
              </li>
              <li className="hover:cursor-pointer hover:text-sand-11">
                Discord
              </li>
            </ul>
          </div>
          <div className="flex md:justify-center items-center w-full h-full">
            <ul className=" flex flex-col gap-y-6 text-sand-9 text-sm">
              <li className="text-sand-12 font-medium ">Legal</li>
              <li className="hover:cursor-pointer hover:text-sand-11">
                Privacy
              </li>
              <li className="hover:cursor-pointer hover:text-sand-11">Terms</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-b border-sand-7 mb-6" />
      <span className="flex text-sand-10 items-center  text-sm mb-6 justify-between">
        <span className="flex items-center">
          <Copyright className="h-4 w-4 mr-1" />
          2024 CampCode
        </span>
        <span className="flex items-center">
          Made By Akshat Gupta <Heart className="h-4 w-4 ml-1" />
        </span>
      </span>
    </>
  );
};

export default Footer;
