import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { HypercertsDataProps } from "../../hooks/views/useHypercerts";

import AddIcon from "../../assets/icons/add.svg?react";
import { useAccount } from "wagmi";
import { HypercertsGallery } from "../../components/Hypercerts/HypercertsGallery";
import { Search } from "../../components/Hypercerts/Search";

interface HypercertsProps extends HypercertsDataProps {
  address?: string | null;
}

// Temporary Fake Data Interface until we know what we have exactly
export interface FakeHypercertProps {
  id: number,
  name: string,
  img: string,
}

const Hypercerts: React.FC<HypercertsProps> = ({
  hypercerts,
  ...hypercertProps
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { address } = useAccount();

  console.log("Hypercerts: \n ", hypercerts);

  // function handleItemClick(item: HypercertUI | AttestationUI) {
  //   if ("organizer" in item) {
  //     navigate(`/hypercerts/${item.id}`);
  //   }
  // }

  // Generating some temporary fake data until we have the hypercerts hooked up properly
  const hcerts: FakeHypercertProps[] = [
    {id:1, name:"My Hypercert 1", img:"https://images.unsplash.com/photo-1708086504310-134d8c4005f3?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
    {id:2, name:"My Hypercert 2 with a really rather long name", img:"https://images.unsplash.com/photo-1708366700170-f2e3043a70dd?q=80&w=1827&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
  ]


  return (
    <section className={`relative w-full h-full`}>
      {location.pathname === "/hypercerts" ? (
        address ? (
          <div className={`flex flex-col w-full h-full items-center gap-3 px-6 pt-6 bg-[url('/assets/greenpill-bg.png')]`}>
            <Search/>
            <HypercertsGallery
              dummyCerts={hcerts}
            />
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
