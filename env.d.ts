declare namespace NodeJS {
	interface ProcessEnv {
		WALLET_PRIVATE_KEY: string;

		NEXT_PUBLIC_NETWORK: string;
		NEXT_PUBLIC_CHAIN_ID: string;
		NEXT_PUBLIC_HOLDER_URL: string;
		NEXT_PUBLIC_ADDRESS: string;
	}
}