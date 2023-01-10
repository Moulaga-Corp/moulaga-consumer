import { MoulagaSdk } from "moulaga-sdk";

const moulagaSdk = MoulagaSdk.fromPrivateKey(process.env.WALLET_PRIVATE_KEY);

export default moulagaSdk;