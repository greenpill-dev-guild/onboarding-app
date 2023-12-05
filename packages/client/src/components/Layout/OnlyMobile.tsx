import React from "react";
import { a, useSpring } from "@react-spring/web";

export const OnlyMobile: React.FC = () => {
  const contentSpring = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 720,
    config: { friction: 120, tension: 240 },
  });

  return (
    <a.div className="grid place-items-center w-screen h-screen text-center z-10">
      <a.div style={contentSpring} className="flex flex-col gap-12">
        <div className="justify-self-start flex flex-col gap-2">
          <h1 className="text-9xl font-bold leading-[6rem]">WAVES</h1>
          <p className="text-4xl tracking-wider">
            Connecting Generative Art & Culture
          </p>
        </div>
        <p className="text-2xl font-normal tracking-wide">
          📲 Visit <span className="font-bold">app.waves.house</span> on phone
          to install app
        </p>
      </a.div>
    </a.div>
  );
};
