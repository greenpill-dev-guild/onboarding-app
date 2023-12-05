import { Client, cacheExchange, fetchExchange } from "@urql/core";

export const client = new Client({
  url: "https://api.studio.thegraph.com/proxy/51465/waves-base-goerli/version/latest",
  exchanges: [cacheExchange, fetchExchange],
});

// Example usage:
// const QUERY = `
//   query Test($id: ID!) {
//     getUser(id: $id) {
//       id
//       name
//     }
//   }
// `;
//
// client
//   .query(QUERY, { id: 'test' })
//   .toPromise()
//   .then(result => {
//     console.log(result); // { data: ... }
//   });
