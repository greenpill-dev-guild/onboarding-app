import { Request, Response, Router } from "express";
import { getOrder } from "../modules/printful";

export const orderRouter = Router();

orderRouter.post("/", async function (req: Request, res: Response) {
  const body = req.body as { synth: string; synthAccount: string; wave: string };

  if (!body.synth || !body.synthAccount || !body.wave) {
    res.status(400).send({ error: "Missing synthAccount or waveID" });
    return;
  }

  // if (!req.session.siwe?.address || !req.session.siwe.chainId) {
  //   res.status(400).send({ error: "Missing address or chainId" });
  //   return;
  // }

  try {
    res.status(200).send({ id: "" });
  } catch (e: any) {
    console.log(e);
    res.status(400).send({ code: e.code, reason: e.reason });
  }
});

orderRouter.get("/:id", async function (req: Request, res: Response) {
  const body = req.body as { synth: string; synthAccount: string; wave: string };

  if (!body.synth || !body.synthAccount || !body.wave) {
    res.status(400).send({ error: "Missing synthAccount or waveID" });
    return;
  }

  // if (!req.session.siwe?.address || !req.session.siwe.chainId) {
  //   res.status(400).send({ error: "Missing address or chainId" });
  //   return;
  // }

  try {
    const order = getOrder("");

    res.status(200).send({ order });
  } catch (e: any) {
    console.log(e);
    res.status(400).send({ code: e.code, reason: e.reason });
  }
});

orderRouter.get("/", async function (req: Request, res: Response) {
  const body = req.body as { synth: string; synthAccount: string; wave: string };

  if (!body.synth || !body.synthAccount || !body.wave) {
    res.status(400).send({ error: "Missing synthAccount or waveID" });
    return;
  }

  // if (!req.session.siwe?.address || !req.session.siwe.chainId) {
  //   res.status(400).send({ error: "Missing address or chainId" });
  //   return;
  // }

  try {
    const order = getOrder("");

    res.status(200).send({ order });
  } catch (e: any) {
    console.log(e);
    res.status(400).send({ code: e.code, reason: e.reason });
  }
});

orderRouter.patch("/:id", async function (req: Request, res: Response) {
  const body = req.body as { synth: string; synthAccount: string; wave: string };

  if (!body.synth || !body.synthAccount || !body.wave) {
    res.status(400).send({ error: "Missing synthAccount or waveID" });
    return;
  }

  // if (!req.session.siwe?.address || !req.session.siwe.chainId) {
  //   res.status(400).send({ error: "Missing address or chainId" });
  //   return;
  // }

  try {
    const order = getOrder("");

    res.status(200).send({ order });
  } catch (e: any) {
    console.log(e);
    res.status(400).send({ code: e.code, reason: e.reason });
  }
});

orderRouter.delete("/:id", async function (req: Request, res: Response) {
  const body = req.body as { synth: string; synthAccount: string; wave: string };

  if (!body.synth || !body.synthAccount || !body.wave) {
    res.status(400).send({ error: "Missing synthAccount or waveID" });
    return;
  }

  // if (!req.session.siwe?.address || !req.session.siwe.chainId) {
  //   res.status(400).send({ error: "Missing address or chainId" });
  //   return;
  // }

  try {
    const order = getOrder("");

    res.status(200).send({ order });
  } catch (e: any) {
    console.log(e);
    res.status(400).send({ code: e.code, reason: e.reason });
  }
});
