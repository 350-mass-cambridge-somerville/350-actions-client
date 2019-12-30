import React, { useState } from 'react';



type AuthContextType = {
	userData: UserData,
	login: (req: any) => void,
	logout: (req: any) => void,
	register: (req: any) => void
}

type UserData = {
	name: string,
	email: string,
	isAuthorized: boolean
}

const defaultUserData: UserData = {
	name: '',
	email: '',
	isAuthorized: false
}
const AuthContext = React.createContext({
	userData: defaultUserData, 
	login: (req: any) => {}, 
	logout: (req: any) => {},
	register: (req: any) => {}
});

type AuthProviderProps = {};

function AuthProvider(props: AuthProviderProps) {
	const [userData, setUserData] = useState(defaultUserData);
	const login = (req: any) => { console.log(`Making login request ${req}`)} // make a login request
	const register = (req: any) => { console.log(`Making register request ${req}`)} // register the user
	const logout = (req: any) => { console.log(`Making logout request ${logout}`)} // clear the token in localStorage and the user data
	
	// todo provide token??
	return <AuthContext.Provider value={{login, register, logout, userData}} {...props}/>;
}

const useAuth = (): AuthContextType => React.useContext(AuthContext)
export {AuthProvider, useAuth}