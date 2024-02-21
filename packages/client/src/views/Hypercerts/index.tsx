import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { HypercertsDataProps } from "../../hooks/views/useHypercerts";

import AddIcon from "../../assets/icons/add.svg?react";

interface HypercertsProps extends HypercertsDataProps {
  address?: string | null;
}

const Hypercerts: React.FC<HypercertsProps> = ({
  hypercerts,
  address,
  ...hypercertProps
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  // function handleItemClick(item: HypercertUI | AttestationUI) {
  //   if ("organizer" in item) {
  //     navigate(`/hypercerts/${item.id}`);
  //   }
  // }

  return (
    <section className={`relative w-full h-full`}>
      {location.pathname === "/hypercerts" ? (
        address ? (
          <div
            className={`flex flex-col w-full h-full items-center gap-3 px-6 pt-16 pb-20`}
          >
            <label
              onClick={() => {
                const dialog = document.getElementById(
                  "hypercerts-mint-dialog",
                ) as HTMLDialogElement | null;

                dialog?.showModal();
              }}
              className={`fill-stone-950 absolute right-4 top-2 grid place-items-center w-12 h-12 unselectable`}
            >
              <AddIcon width={40} height={40} />
            </label>
            {/* <HypercertsGallery
              items={hypercerts}
              view="hypercerts"
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
      {/* <HypercertsMintDialog address={address} {...hypercertProps} /> */}
    </section>
  );
};

export default Hypercerts;
