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

		const data = await fetch(`/api/profile?wallet=${wallet}`)
		if (data.status === 500) {
			return setStatus({ type: "Failure", error: new Error((await data.json()).message) });
		}

		if (data.status === 401) {
			return setStatus({ type: "No sbt" });
		}

		if (data.status === 200) {
			return setStatus({ type: "Success", data: await data.json() });
		}
		
		return setStatus({ 
			type: "Failure", 
			error: new Error("Could not fetch data: are you fetching a feeder's data ? querying a valid holder ?") 
		});
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
		case "No sbt": return (
			<div className={styles.dataViewer}>
				<p>Please register at the holder / generate an access token for this app !</p>
				<button onClick={isMounted && address ? e => getProfile(e, address) : _ => {}}>
					Retry anyway ?
				</button>
			</div>
		);
		case "Success": return (
			<div className={styles.dataViewer}>
				<p>{JSON.stringify(status.data, null, 2)}</p>
				<button onClick={isMounted && address ? e => getProfile(e, address) : _ => {}}>
					Fetch new data
				</button>
			</div>
		);
		case "Failure": return (
			<div className={styles.dataViewer}>
				<p>{status.error.message}</p>
				<button onClick={isMounted && address ? e => getProfile(e, address) : _ => {}}>
					Retry anyway ?
				</button>
			</div>
		);
	}
}

export default DataViewer;