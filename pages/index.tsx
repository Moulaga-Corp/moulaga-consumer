import Navbar from '../components/navbar'
import DataViewer from '../components/data-viewer';
import { useAccount } from 'wagmi';

export default function Home() {
  const { address } = useAccount();
  return <>
    <Navbar/>
    {address
      ? <DataViewer initialState={{type: "Initialized"}}/>
      : <></>
    }
  </>;
}
