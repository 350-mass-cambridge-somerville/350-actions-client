import React, { useState } from 'react';


type SnackbarContextType = {
	queueMessage: (message: string, isError: boolean) => number,
}

const defaultSnackbarContext = {
	queueMessage: function (message: string, isError: boolean) : number {
		console.log(`Attempting to set message without proper context`);
		return 0;
	}
}
const SnackbarContext = React.createContext(defaultSnackbarContext);

type SnackbarProviderProps = {children: any};

function SnackbarProvider(props: SnackbarProviderProps) {
	const [messageQueue, setMessageQueue] = useState([]);
	const queueMessage = (message: string, isError: boolean) => {
		return 1;
	} // add a snackbar


	return <SnackbarContext.Provider value={{queueMessage}} {...props}/>;
}

const useSnackbar = (): SnackbarContextType => React.useContext(SnackbarContext)
export {SnackbarProvider, useSnackbar, SnackbarContext}
