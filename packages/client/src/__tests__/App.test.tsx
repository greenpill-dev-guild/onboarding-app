import { render, screen } from "@testing-library/react";

import { Provider } from "urql";
import { WagmiConfig } from "wagmi";
import { foundry } from "viem/chains";
import { BrowserRouter } from "react-router-dom";
import { PrivyProvider } from "@privy-io/react-auth";
import { PrivyWagmiConnector } from "@privy-io/wagmi-connector";

import { graphClient } from "../modules/urql";
import { config, chainConfig } from "../modules/wagmi";

import { AppProvider } from "../hooks/providers/app";
import { Web3Provider } from "../hooks/providers/web3";

import { App } from "../App";

describe("App", () => {
  it("renders headline", () => {
    render(
      <WagmiConfig config={config}>
        <Provider value={graphClient}>
          <PrivyProvider
            appId={import.meta.env.VITE_PRIVY_APP_ID ?? ""}
            // onSuccess={handleLogin}
            config={{
              loginMethods: ["email", "wallet"],
              appearance: {
                theme: "light",
              },
              additionalChains: [foundry],
            }}
          >
            <PrivyWagmiConnector wagmiChainsConfig={chainConfig}>
              <BrowserRouter>
                <AppProvider>
                  <Web3Provider>
                    <App />
                  </Web3Provider>
                </AppProvider>
              </BrowserRouter>
            </PrivyWagmiConnector>
          </PrivyProvider>
        </Provider>
      </WagmiConfig>,
    );

    screen.debug();

    // check if App components renders headline
  });
});
