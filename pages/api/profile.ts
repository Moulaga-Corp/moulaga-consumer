import { ethers } from "ethers";
import type { NextApiRequest, NextApiResponse } from "next";
import moulagaSdk from "../../lib/moulaga-sdk";

type Data = {
	message: string;
}

// function promiseTimeout(cb: () => void) {
// 	return new Promise<void>(resolve => setTimeout(() => {
// 		cb();
// 		resolve();
// 	}, 2000));
// }

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	const signer = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY);
	const consumer = process.env.WALLET_ADDRESS;
	const feeder = req.query.wallet as string;
	const scheme = "profile";

	try {
		const result = await fetch(`${process.env.HOLDER_URL}/profile/${feeder}?publicKey=${signer.publicKey}&consumer=${consumer}&scheme=${scheme}`);
		if (result.status !== 200) {
			return res.status(result.status).json(await result.json());
		}
		
		const payload = await result.json();
		const protocolResult = await moulagaSdk.decryptData(payload.keyData, payload.data);
		return res.json(JSON.parse(protocolResult));

	} catch(err) {
		return res.status(500).json({ message: "Unexpected error." });
	}
}

export default handler;