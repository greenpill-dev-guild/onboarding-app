import { GreenpillDataProps, useGreenpill } from "../providers/greenpill";

export interface HypercertsDataProps extends GreenpillDataProps {}

export const useHypercerts = (): HypercertsDataProps => {
  const greenpill = useGreenpill();
  console.log(`Greenpill data: \n `, greenpill);
  return {
    ...greenpill,
  };
};
