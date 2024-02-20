import request from "supertest";
import { server } from "../../src/server";


// Test case for uploading media with an empty string
test("Upload media with an empty string", () => {
  server.post("/assets/upload", (req, res) => {
    if (!req.body.media) {
      res.status(400).json({ error: "Missing media" });
    } else {
      res.status(200).json({ nonce: "req.body.media" });
    }
  });

  return request(server)
    .post("/assets/upload")
    .send({ media: "" })
    .expect("Content-Type", /json/)
    .expect(400)
    .expect({ error: "Missing media" });
});

// Test case for uploading media with valid media data
test("Upload media with valid media data", () => {
  server.post("/assets/upload", (req, res) => {
    res.status(200).json({ nonce: 'req.body.media' });
  });

  return request(server)
    .post("/assets/upload")
    .send({ media: "test" })
    .expect(200)
    .expect({ nonce: 'req.body.media' });
});