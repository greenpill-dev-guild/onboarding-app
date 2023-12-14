import { Client, cacheExchange, fetchExchange } from "urql";

export const graphClient = new Client({
  url:
    import.meta.env.VITE_GRAPH_URL ??
    "http://localhost:8000/subgraphs/name/greenpill-base-goerli",
  exchanges: [cacheExchange, fetchExchange],
});
