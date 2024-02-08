import request from "supertest";

import { server } from "../../src/server"


test("Fetch nonce with GET request", () => {
  server.get("/auth/nonce", (req, res) => {
    res.status(200).json({ nonce: "y5dfghvou" });
  });

  return request(server)
    .get("/auth/nonce")
    .expect("Content-Type", /json/)
    .expect("Content-Length", "21")
    .expect(200)
    .expect({ nonce: "y5dfghvou" });
});

