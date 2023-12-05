import { ethers } from "ethers";
import { Request, Response, Router } from "express";
import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";

// import { synthABI, synthAccountABI, waveABI } from "../../../clients/app/src/generated";

const chainIdMap = {
  420: "optimism-goerli",
  85431: "base-goerli",
  999: "zora-goerli",
  919: "mode-sepolia",
};

const chainIdToEASMap = {
  420: "0x1a5650D0EcbCa349DD84bAFa85790E3e6955eb84",
  85431: "0xAcfE09Fd03f7812F022FBf636700AdEA18Fd2A7A",
  999: "0x086B4803d486a56bbdFAB10b839954A7542F17C0",
  919: "0x2FC89594E0FeDE3faB22089F815e7371e7fF289B",
};

export const wavesRouter = Router();

wavesRouter.post("/mint", async function (req: Request, res: Response) {
  const body = req.body as { synth: string; synthAccount: string; wave: string };

  if (!body.synth || !body.synthAccount || !body.wave) {
    res.status(400).send({ error: "Missing synthAccount or waveID" });
    return;
  }

  // if (!req.session.siwe?.address || !req.session.siwe.chainId) {
  //   res.status(400).send({ error: "Missing address or chainId" });
  //   return;
  // }

  const provider = new ethers.JsonRpcProvider("https://base-goerli.g.alchemy.com/v2/IoQ-Xhgcg-Yuc4h_6Yk_6c8iJoKysKWk");
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY as string, provider);

  // TODO: Verify that user owns synth
  // TODO: Verify that wave is not already minted
  // const synth = new Contract(body.synth, synthABI, provider);
  // const synthAccount = new Contract(body.synthAccount, synthAccountABI, provider);
  // const wave = new Contract(body.wave, waveABI, provider);

  const eas = new EAS(chainIdToEASMap[req.session.chainId ?? 85431]);
  eas.connect(wallet);

  // Initialize SchemaEncoder with the schema string
  const schemaEncoder = new SchemaEncoder("address synth, address synthAccount, address wave");
  const encodedData = schemaEncoder.encodeData([
    { name: "synth", value: body.synth, type: "address" },
    { name: "synthAccount", value: body.synthAccount, type: "address" },
    { name: "wave", value: body.wave, type: "address" },
  ]);

  // Make on-chain attestaion
  const schemaUID = "0x7e760f1cb5fe69453174c8ca7d586578673fee412f52d2b0c3bbf83318516111";

  try {
    const tx = await eas.attest({
      schema: schemaUID,
      data: {
        recipient: "0x6Bd018B28CE7016b65384e15faC102dbC4190E03",
        // expirationTime: 0,
        revocable: true, // Be aware that if your schema is not revocable, this MUST be false
        data: encodedData,
      },
    });

    const newAttestationUID = await tx.wait();

    console.log("New attestation UID:", newAttestationUID);

    res.status(200).send({ id: newAttestationUID });
  } catch (e: any) {
    console.log(e);
    res.status(400).send({ code: e.code, reason: e.reason });
  }
});
