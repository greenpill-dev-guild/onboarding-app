import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { HypercertsDataProps } from "../../hooks/views/useHypercerts";

import { RC as AddIcon } from "../../assets/icons/add.svg";

interface HypercertsProps extends HypercertsDataProps {
  address?: string | null;
}

const Hypercerts: React.FC<HypercertsProps> = ({
  synths,
  address,
  ...synthProps
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  // function handleItemClick(item: SynthUI | WaveUI) {
  //   if ("organizer" in item) {
  //     navigate(`/synths/${item.id}`);
  //   }
  // }

  return (
    <section className={`relative w-full h-full`}>
      {location.pathname === "/synths" ? (
        address ? (
          <div
            className={`flex flex-col w-full h-full items-center gap-3 px-6 pt-16 pb-20`}
          >
            <label
              onClick={() => {
                const dialog = document.getElementById(
                  "synths-mint-dialog",
                ) as HTMLDialogElement | null;

                dialog?.showModal();
              }}
              className={`fill-stone-950 absolute right-4 top-2 grid place-items-center w-12 h-12 unselectable`}
            >
              <AddIcon width={40} height={40} />
            </label>
            {/* <HypercertsGallery
              items={synths}
              view="synths"
              onItemClick={handleItemClick}
            /> */}
          </div>
        ) : (
          <h4 className="w-full h-full grid place-items-center text-center px-6">
            Connect Wallet To Mint Hypercerts
          </h4>
        )
      ) : null}
      <Outlet />
      {/* <HypercertsMintDialog address={address} {...synthProps} /> */}
    </section>
  );
};

export default Hypercerts;
