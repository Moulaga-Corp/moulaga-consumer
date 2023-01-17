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

	return fetch(`${process.env.HOLDER_URL}/profile/${feeder}?publicKey=${signer.publicKey}&consumer=${consumer}&scheme=${scheme}`)
		.then(async d => ({ code: d.status, payload: await d.json()}))
		.then(async d => {
			if (d.code !== 200) {
				return res.status(400).json(d.payload);
			}
			const data = await moulagaSdk.decryptData(d.payload.keyData, d.payload.data);
			return res.status(200).json(JSON.parse(data));
		})
		.catch(err => res.status(400).json({ message: err.message }));
}

export default handler;