//@ts-nocheck
import Image from "next/image";
import { Sparkles, SquareCode, LibrarySquare, Timer } from "lucide-react";
const Features = () => {
  return (
    <div className="sm:my-4 my-2  w-full flex items-center flex-col gap-y-8">
      <h4 className="sm:text-3xl text-2xl font-semibold text-sand-11 relative mb-4">
        Key Features
        <svg className="sm:w-48 w-40 absolute" viewBox="0 0 432.5 28.14">
          <defs>
            <linearGradient
              id="strokeColor"
              data-name="strokeColor"
              x1="-27.23"
              y1="419.23"
              x2="-26.23"
              y2="419.23"
              gradientTransform="matrix(415.04, 0, 0, -10.68, 11312.81, 4492.83)"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#feb062"></stop>
              <stop offset="1" stopColor="#f97d01"></stop>
            </linearGradient>
          </defs>
          <path
            d="M12.74,22.37c62.64-3.26,49.59-7.18,187.94-9.79s151.4,1.3,227.1,2"
            transform="translate(-4 -2.96)"
            fill="none"
            strokeLinecap="round"
            strokeMiterlimit="8px"
            strokeWidth="10px"
            strokeDasharray="0,0"
            stroke="url(#strokeColor)"
          ></path>
        </svg>
      </h4>
      <div className="grid md:grid-cols-2 grid-cols-1 w-full md:gap-y-20 gap-y-10 gap-x-10">
        <div className="flex flex-col gap-y-4">
          <h4 className="md:mt-8 mt-0 text-xl font-medium text-sand-10">
            Visual <span className="text-accentM">Dashboard</span>
          </h4>
          <p className="text-sand-9 max-w-[550px] sm:text-base text-sm">
            The dashboard simplifies complex data, allowing users to monitor
            their algorithmic proficiency with key metrics like completion rate,
            time per problem, and accuracy. It also offers personalized
            recommendations, aiding users in efficient study prioritization.
          </p>
        </div>
        <div className="w-full bg-gray-900/5 rounded-xl flex justify-center items-center p-2">
          <Image
            src={"/imgs/Dashboard.png"}
            width={600}
            height={600}
            alt="Dashboard Image"
            className="rounded-xl"
          ></Image>
        </div>
        <div className="w-full bg-gray-900/5 rounded-xl flex justify-center items-center p-2 md:order-1 order-2">
          <Image
            src={"/imgs/Timer.png"}
            width={600}
            height={600}
            alt="Dashboard Image"
            className="rounded-xl"
          ></Image>
        </div>
        <div className="flex md:justify-end justify-normal md:order-2 order-1">
          <div className="flex flex-col gap-y-4">
            {" "}
            <h4 className="md:mt-8 mt-0 text-xl font-medium text-sand-10">
              <span className="text-accentM">Pomodoro</span> Timer
            </h4>
            <p className="text-sand-9 max-w-[550px] sm:text-base text-sm">
              A built in pomodoro style timer that provides an immersive
              environment for conquering your next coding challenge. Prepare
              yourself for the real interview by pitting your problem solving
              skills against the clock.{" "}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-y-4 order-3">
          <h4 className="md:mt-8 mt-0 text-xl font-medium text-sand-10">
            Problem <span className="text-accentM">Revision</span>
          </h4>
          <p className="text-sand-9 max-w-[550px] sm:text-base text-sm">
            By providing a centralized location for accessing past problems, the
            this feature streamlines the learning process and promotes
            efficiency in studying. Users can utilize this feature to refresh
            their memory on problem-solving techniques, strategies, and
            algorithms, thereby enhancing their overall proficiency.{" "}
          </p>
        </div>
        <div className="w-full bg-gray-900/5 rounded-xl flex justify-center items-center p-2 order-4">
          <Image
            src={"/imgs/Revision.png"}
            width={600}
            height={600}
            alt="Dashboard Image"
            className="rounded-xl"
          ></Image>
        </div>
      </div>
      <div className="mt-8 w-full flex flex-col items-center">
        <h4 className="sm:text-3xl text-2xl font-semibold text-sand-11 relative mb-4">
          Benefits
          <svg className="sm:w-32 w-28 absolute" viewBox="0 0 432.5 28.14">
            <defs>
              <linearGradient
                id="strokeColor"
                data-name="strokeColor"
                x1="-27.23"
                y1="419.23"
                x2="-26.23"
                y2="419.23"
                gradientTransform="matrix(415.04, 0, 0, -10.68, 11312.81, 4492.83)"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#feb062"></stop>
                <stop offset="1" stopColor="#f97d01"></stop>
              </linearGradient>
            </defs>
            <path
              d="M12.74,22.37c62.64-3.26,49.59-7.18,187.94-9.79s151.4,1.3,227.1,2"
              transform="translate(-4 -2.96)"
              fill="none"
              strokeLinecap="round"
              strokeMiterlimit="8px"
              strokeWidth="10px"
              strokeDasharray="0,0"
              stroke="url(#strokeColor)"
            ></path>
          </svg>
        </h4>
        <div className="grid sm:grid-cols-3 grid-cols-1 max-w-[900px] w-full my-8 gap-x-10 gap-y-6">
          <div className="w-full h-[200px] flex flex-col gap-y-4 items-center">
            <div className="benefit-card h-24 w-24 rounded-xl text-white flex justify-center items-center">
              <Sparkles className="w-10 h-10" />
            </div>
            <div className="flex flex-col ">
              <h6 className="text-xl text-sand-10 font-medium text-center">
                AI Assistant
              </h6>
              <p className="w-60 text-sand-9 text-center">
                Your personal AI Assistant to ask any question.
              </p>
            </div>
          </div>
          <div className="w-full h-[200px] flex flex-col gap-y-4 items-center">
            <div className="benefit-card h-24 w-24 rounded-xl text-white flex justify-center items-center">
              <LibrarySquare className="w-12 h-12" />
            </div>
            <div className="flex flex-col ">
              <h6 className="text-xl text-sand-10 font-medium text-center">
                All LeetCode Problems
              </h6>
              <p className="w-60 text-sand-9 text-center">
                Access to all leetcode problems available on the platform.
              </p>
            </div>
          </div>
          <div className="w-full h-[200px] flex flex-col gap-y-4 items-center">
            <div className="benefit-card h-24 w-24 rounded-xl text-white flex justify-center items-center">
              <Timer className="w-10 h-10" />
            </div>
            <div className="flex flex-col ">
              <h6 className="text-xl text-sand-10 font-medium text-center">
                Timer
              </h6>
              <p className="w-60 text-sand-9 text-center">
                Time problems to increase problem solving speed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
