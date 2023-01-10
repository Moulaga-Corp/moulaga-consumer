import styles from "../styles/Navbar.module.scss";
import { useAccount, useConnect, useDisconnect } from "wagmi";

function Navbar() {
	const { address } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
	
	return <nav className={styles.navbar}>
		<ul>
			<li>
				{address 
					? <button onClick={_ => disconnect()}>Disconnect</button>
					: <button onClick={_ => connect({ connector: connectors[0] })}>Connect</button>
				}
			</li>
		</ul>
	</nav>;
}

export default Navbar;