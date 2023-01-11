import { useEffect, useState } from "react";
import styles from "../styles/DataViewer.module.scss";

type State<A> 
	= { type: "Loading" }
	| { type: "No sbt" }
	| { type: "Success", data: A }
	| { type: "Failure", error: Error }

function DataViewer<A>({ wallet }: { wallet: string }) {
	const [status, setStatus] = useState<State<A>>({ type: "Loading" });

	useEffect(() => {
		const controller = new AbortController();
		fetch(`/api/profile?feeder=${wallet}`, {
			signal: controller.signal
		})
		.then(res => {
			if (res.status === 200) {
				return res.json().then(payload => setStatus({ type: "Success", data: payload.message }));
			}
			setStatus({ type: "No sbt" });
		})
		.catch(error => setStatus({ type: "Failure", error }));

		return () => controller.abort();
	}, []);

	switch(status.type) {
		case "Loading": return <div className={styles.dataViewer}><p>Loading...</p></div>
		case "No sbt": return <div className={styles.dataViewer}><p>Please generate an access token for this app !</p></div>
		case "Success": return <div className={styles.dataViewer}><p>{String(status.data)}</p></div>
		case "Failure": return <div className={styles.dataViewer}><p>Error while fetching data from consumer</p></div>
	}
}

export default DataViewer;