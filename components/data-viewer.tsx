import { useState } from "react";
import { useAccount } from "wagmi";
import { useIsMounted } from "../hooks/IsMounted";
import styles from "../styles/DataViewer.module.scss";

type State<A> 
	= { type: "Initialized" }
	| { type: "Loading" }
	| { type: "No sbt" }
	| { type: "Success", data: A }
	| { type: "Failure", error: Error }

interface DataViewerProps<A> {
	initialState: State<A>
}

function DataViewer<A>({ initialState }: DataViewerProps<A>) {
	const isMounted = useIsMounted();
	const { address } = useAccount();
	const [status, setStatus] = useState<State<A>>(initialState);

	async function getProfile(e: any, wallet: string) {
		e.preventDefault();
		setStatus({ type: "Loading" });
		return fetch(`/api/profile?wallet=${wallet}`)
			.then(data => data.json())
			.then(data => setStatus({ type: "Success", data }))
			.catch(error => setStatus({ type: "Failure", error: error }));
	}

	switch(status.type) {
		case "Initialized": return (
			<div className={styles.dataViewer}>
				<button onClick={isMounted && address ? e => getProfile(e, address) : _ => {}}>
					Get Profile
				</button>
			</div>
		);
		case "Loading": return <div className={styles.dataViewer}><p>Retrieving profile...</p></div>
		case "No sbt": return <div className={styles.dataViewer}><p>Please generate an access token for this app !</p></div>
		case "Success": return (
			<div className={styles.dataViewer}>
				<p>{JSON.stringify(status.data, null, 2)}</p>
				<button onClick={isMounted && address ? e => getProfile(e, address) : _ => {}}>
					Fetch new data
				</button>
			</div>
		);
		case "Failure": return <div className={styles.dataViewer}><p>Error while fetching data from consumer</p></div>
	}
}

export default DataViewer;