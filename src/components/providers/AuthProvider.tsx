import React, { useState } from 'react';



type AuthContextType = {
	userData: UserData,
	login: (email: string, password: string) => void,
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
	login: (email: string, password: string) => {}, 
	logout: (req: any) => {},
	register: (req: any) => {}
});

type AuthProviderProps = {};

function AuthProvider(props: AuthProviderProps) {
	const [userData, setUserData] = useState(defaultUserData);
	const login = (email: string, password: string) => { console.log(`Making login request for ${email}`)} // make a login request
	const register = (req: any) => { console.log(`Making register request ${req}`)} // register the user
	const logout = (req: any) => { console.log(`Making logout request ${logout}`)} // clear the token in localStorage and the user data
	
	// todo provide token??
	return <AuthContext.Provider value={{login, register, logout, userData}} {...props}/>;
}

const useAuth = (): AuthContextType => React.useContext(AuthContext)
export {AuthProvider, useAuth}