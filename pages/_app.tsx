import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createClient, WagmiConfig } from 'wagmi';
import { providers } from 'ethers';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';

const web3Client = createClient({
  autoConnect: false,
  connectors: [new MetaMaskConnector()],
  provider: new providers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_NETWORK, 
    parseInt(process.env.NEXT_PUBLIC_CHAIN_ID)
  )
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={web3Client}>
      <Component {...pageProps} />
    </WagmiConfig>
  );
}
