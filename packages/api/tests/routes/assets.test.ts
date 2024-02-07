import request from "supertest";
const express = require('express');

import { server } from "../../src/server"


server.post('assets/upload', function(req, res) {
//   res.status(200).json({ nonce: 'y5dfghvou' });
});

request(server)
  .post('assets/upload')
  .expect('Content-Type', /json/)
  .expect('Content-Length', '12')
  .expect(200)
  .end(function(err) {
    if (err) throw err;
  });

