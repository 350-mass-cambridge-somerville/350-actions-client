import React, { useState } from 'react';
import { SIGN_IN_URL, CURRENT_USER_URL, SIGN_OUT_URL } from '../../urls';
import { UserData } from '../../interfaces/UserData';


type AuthContextType = {
	userData: UserData,
	token: string,
	login: (email: string, password: string) => void,
	logout: () => void,
	register: (req: any) => Promise<boolean>
}

const defaultUserData: UserData = {
	name: '',
	email: '',
	isAuthorized: false,
	isAdmin: false
}
const AuthContext = React.createContext({
	userData: defaultUserData,
	token: '', 
	login: (email: string, password: string) => {}, 
	logout: () => {},
	register: (req: any) => {return Promise.resolve(false)}
});

type AuthProviderProps = {children: any};

function AuthProvider(props: AuthProviderProps) {
	const [token, setToken] = useState('');
	const [userData, setUserData] = useState(defaultUserData);
	const login = (email: string, password: string) => { 
		console.log(`Making login request for ${email}`)
		return fetch(SIGN_IN_URL, {
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			headers: {
			  'Content-Type': 'application/json'
			  // 'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: JSON.stringify({
				email: email,
				password: password
			}) // body data type must match "Content-Type" header
		  }).then((response) => {
			return response.json()
			console.log(`response ok ${response.ok} status ${response.status} text ${response.statusText}`)
		  }).then((json) => {
			  console.log(`got response json: ${JSON.stringify(json)}`);
			  setToken(json.key); 
			  return fetchUserProfile();
			  //setUserData({isAuthorized: true, email: email, name: 'todo'})
		  })
		  .catch((error) => {
			  console.log(`submit failed with error: ${error}`);
			  //this.setState({showSnackbar: true, snackbarIsError: true, snackbarMessage: 'Something went wrong. Try again later.'})
		  })
	} // make a login request

	function fetchUserProfile() : Promise<void> {
		return fetch(CURRENT_USER_URL, {
			method: 'GET',
			//withCredentials: true,
			credentials: 'include',
			headers: {
				'Authorization': 'Bearer '+ token,
				//'X-FP-API-KEY': 'iphone', //it can be iPhone or your any other attribute
				'Content-Type': 'application/json'
			}})
		.then((response) => {
			//todo make utils to validate responses
			return response.json()
		})
		.then((json) => {
			console.log(`Got user json: ${JSON.stringify(json)}`)
			// todo how to set admin perms
			setUserData({isAuthorized: true, email: json.email, name: json.username, isAdmin: json.is_superuser});
		})
	}

	const register = (req: any) => { 
		console.log(`Making register request ${req}`);
		return Promise.resolve(true);
	} // register the user
	
	const logout = () => { 
		console.log(`Making logout request ${logout}`)
		fetch(SIGN_OUT_URL, {
			method: 'POST'
		}).then(() => {
			setUserData({isAuthorized: false, isAdmin: false, email: '', name: ''});
			setToken('');
		});
	} // clear the token in localStorage and the user data
	
	// todo provide token??
	return <AuthContext.Provider value={{login, register, logout, userData, token}} {...props}/>;
}

const useAuth = (): AuthContextType => React.useContext(AuthContext)
export {AuthProvider, useAuth, AuthContext};