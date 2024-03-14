import { Request, Response, Router } from "express";

import { uploadAsset } from "../modules/ipfs";

export const assetsRouter = Router();

// Returns the current user by checking the session returning 200 if the user is logged in and 401 if not
assetsRouter.post("/upload", async function (req: Request, res: Response) {
  const body = req.body as { media: any | FormData | string | Blob };

  try {
    if (!body.media) {
      return res.status(400).send({ error: "Missing media" });
    }

    await uploadAsset(body.media)

 
  } catch (error) {
    const _error = error as Error;
    console.error(_error);

    return res.status(400).send({ error: _error.message });
  }
});
