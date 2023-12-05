import { WavesDataProps, useWaves } from "../providers/waves";

export interface SynthsDataProps extends WavesDataProps {}

export const useSynths = (): SynthsDataProps => {
  const waves = useWaves();

  return {
    ...waves,
  };
};
