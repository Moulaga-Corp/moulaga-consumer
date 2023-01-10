import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createClient, WagmiConfig } from 'wagmi';
import { providers } from 'ethers';
import { useEffect, useState } from 'react';
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
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return <></>;

  return (
    <WagmiConfig client={web3Client}>
      <Component {...pageProps} />
    </WagmiConfig>
  );
}
