import styles from "../styles/Navbar.module.scss";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useIsMounted } from "../hooks/IsMounted";

function Navbar() {
	const isMounted = useIsMounted();
	const { address } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
	
	return <nav className={styles.navbar}>
		<ul>
			<li>
				{isMounted 
					? (address 
						? <button className={styles.disconnectBtn} onClick={_ => disconnect()}>Disconnect</button>
						: <button className={styles.connectBtn} onClick={_ => connect({ connector: connectors[0] })}>Connect</button>
						)
					: <></>
				}
			</li>
		</ul>
	</nav>;
}

export default Navbar;