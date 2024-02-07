import request from "supertest";

import { server } from "../../src/server"


server.get('auth/nonce', function(req, res) {
  res.status(200).json({ nonce: 'y5dfghvou' });
});

request(server)
  .get('auth/nonce')
  .expect('Content-Type', /json/)
  .expect('Content-Length', '12')
  .expect(200)
  .end(function(err) {
    
    if (err) throw err;
  });

