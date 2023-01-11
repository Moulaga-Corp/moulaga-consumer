import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
	message: string;
}

function promiseTimeout(cb: () => void) {
	return new Promise<void>(resolve => setTimeout(() => {
		cb();
		resolve();
	}, 2000));
}

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	console.log(req.query.feeder);
	await promiseTimeout(() => {
		res.status(200).json({ message: "some message" });
	});
}

export default handler;