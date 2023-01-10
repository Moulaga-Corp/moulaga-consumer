import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createClient, WagmiConfig } from 'wagmi';
import { providers } from 'ethers';

const web3Client = createClient({
  autoConnect: false,
  provider: new providers.JsonRpcProvider(process.env.NETWORK, parseInt(String(process.env.CHAIN_ID)))
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={web3Client}>
      <Component {...pageProps} />
    </WagmiConfig>
  );
}
