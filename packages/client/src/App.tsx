import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

import { WavesProvider } from "./hooks/providers/waves";
import { usePWA, InstallState } from "./hooks/providers/pwa";

import { Appbar } from "./components/Layout/AppBar";
import { CircleLoader } from "./components/Loader/Circle";
import { PWAPrompt } from "./components/Layout/PWAPrompt";
import { OnlyMobile } from "./components/Layout/OnlyMobile";

import Views from "./views";

export function App() {
  const { installState, ...pwaData } = usePWA();

  const Onboard: Record<InstallState, React.ReactNode> = {
    idle: (
      <div className="w-screen h-screen pb-20 bg-[#e9e3dd] grid place-items-center z-30 fixed top-0 left-0">
        <CircleLoader />
      </div>
    ),
    installed: null,
    prompt:
      installState === "unsupported" ? (
        <PWAPrompt {...pwaData} installState={installState} />
      ) : null,
    unsupported: <OnlyMobile />,
  };

  useEffect(() => {
    // its preferable to use env vars to store projectId
  }, []);

  return (
    <WavesProvider>
      {Onboard[installState]}
      {installState !== "unsupported" && (
        <>
          <Appbar />
          <Views />
        </>
      )}
      <Toaster
      // toastOptions={{
      //   style: {
      //     background: "#333",
      //     color: "#fff",
      //   },
      // }}
      />
    </WavesProvider>
  );
}
