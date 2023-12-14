import { GreenpillDataProps, useGreenpill } from "../providers/greenpill";

export interface MintDataProps extends GreenpillDataProps {}

export const useMint = (): MintDataProps => {
  const greenpill = useGreenpill();

  return {
    ...greenpill,
  };
};
