import React from "react";
import { useAccount } from "wagmi";

import { MintDataProps } from "../../hooks/views/useMint";

interface MintProps extends MintDataProps {}

const Mint: React.FC<MintProps> = ({ synths }) => {
  const { address } = useAccount();

  return (
    <section className="flex flex-col w-full h-full items-center gap-3 px-6 text-center">
      {address ? (
        <h4 className="w-full h-full grid place-items-center">Mint Synths</h4>
      ) : (
        <h4 className="w-full h-full grid place-items-center">
          Connect Wallet To Catch Waves
        </h4>
      )}
    </section>
  );
};

export default Mint;
