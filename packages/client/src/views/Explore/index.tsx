import React from "react";
import { useAccount } from "wagmi";

import { ExploreDataProps } from "../../hooks/views/useExplore";

interface ExploreProps extends ExploreDataProps {}

const Explore: React.FC<ExploreProps> = ({ synths }) => {
  const { address } = useAccount();

  return (
    <section className="flex flex-col w-full h-full items-center gap-3 px-6 text-center">
      {address ? (
        <h4 className="w-full h-full grid place-items-center">
          Explore Synths
        </h4>
      ) : (
        <h4 className="w-full h-full grid place-items-center">
          Connect Wallet To Catch Waves
        </h4>
      )}
    </section>
  );
};

export default Explore;
