import { useEffect, useState } from "react";

type RemoteData<A> =
	| { type: "Initialized" }
	| { type: "Loading" }
	| { type: "Success", data: A }
	| { type: "Failure", error: Error }

type InitializedUI = JSX.Element;
type LoadingUI = JSX.Element;
type SuccessUI<A> = (data: A) => JSX.Element;
type ErrorUI = (error: Error) => JSX.Element;

interface LoadingComponentProps<A> {
	initializedUI: InitializedUI;
	loadingUI: LoadingUI;
	successUI: SuccessUI<A>;
	errorUI: ErrorUI;
	dataFetcher: () => Promise<A>;
	onSuccess?: (data: A) => void;
	onError?: (err: Error) => void;
}

function LoadingComponent<A>(props: LoadingComponentProps<A>) {
	const [state, setState] = useState<RemoteData<A>>({ type: "Initialized" });

	useEffect(() => {
		setState({ type: "Loading" });
		props.dataFetcher()
			.then(data => {
				props.onSuccess?.(data);
				setState({ type: "Success", data });
			})
			.catch(err => {
				props.onError?.(err);
				setState({ type: "Failure", error: err });
			})
	}, []);

	switch(state.type) {
		case "Failure": return props.errorUI(state.error);
		case "Initialized": return props.initializedUI;
		case "Loading": return props.loadingUI;
		case "Success": return props.successUI(state.data);
	}
}

export default LoadingComponent;