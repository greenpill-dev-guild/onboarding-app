import { WavesDataProps, useWaves } from "../providers/waves";

export interface ExploreDataProps extends WavesDataProps {}

export const useExplore = (): ExploreDataProps => {
  const waves = useWaves();

  return {
    ...waves,
  };
};
