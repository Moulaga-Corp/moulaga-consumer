declare namespace NodeJS {
	interface ProcessEnv {
		WALLET_PRIVATE_KEY: string;
		WALLET_ADDRESS: string;
		HOLDER_URL: string;

		NEXT_PUBLIC_NETWORK: string;
		NEXT_PUBLIC_CHAIN_ID: string;
	}
}