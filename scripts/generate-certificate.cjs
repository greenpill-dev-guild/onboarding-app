const fs = require("fs");
const mkcert = require("mkcert");

// create a certificate authority
mkcert
  .createCA({
    organization: "GPN",
    countryCode: "US",
    state: "California",
    locality: "Los Angeles",
    validityDays: 365,
  })
  .then((ca) => {
    console.log(ca.key, ca.cert); // certificate authority info

    // then create a tls certificate
    mkcert
      .createCert({
        domains: ["127.0.0.1", "localhost"],
        validityDays: 365,
        ca: { key: ca.key, cert: ca.cert },
      })
      .then((cert) => {
        console.log(cert.key, cert.cert); // certificate info
        console.log(`${cert.cert}\n${ca.cert}`); // create a full chain certificate by merging CA and domain certificates

        // write the certificate and key to a .cert directory
        fs.mkdirSync("./packages/api/cert", { recursive: true });
        fs.writeFileSync("./packages/api/cert/gpn.key", cert.key);
        fs.writeFileSync("./packages/api/cert/gpn.cert", cert.cert);
      });
  });
