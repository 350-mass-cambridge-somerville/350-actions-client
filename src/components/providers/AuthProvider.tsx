import React, { useState } from 'react';
import { SIGN_IN_URL, CURRENT_USER_URL, SIGN_OUT_URL } from '../../urls';
import { UserData } from '../../interfaces/UserData';


type AuthContextType = {
	userData: UserData,
	token: string,
	login: (email: string, password: string) => Promise<boolean>,
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
	login: (email: string, password: string) => {return Promise.resolve(false);}, 
	logout: () => {},
	register: (req: any) => {return Promise.resolve(false)}
});

type AuthProviderProps = {children: any};

function AuthProvider(props: AuthProviderProps) {
	const [token, setToken] = useState('');
	const [refresh, setRefresh] = useState('');
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
				username: email,
				password: password
			}) // body data type must match "Content-Type" header
		  }).then((response) => {
			if(!response.ok) {
				throw(response.text);
			}
			return response.json()
		  }).then((json) => {
			  //console.log(`got response json: ${JSON.stringify(json)}`);
			  setToken(json.access); 
			  setRefresh(json.refresh);
			  return fetchUserProfile(json.access);
			  //setUserData({isAuthorized: true, email: email, name: 'todo'})
		  })
		  .catch((error) => {
			  console.log(`submit failed with error: ${error.message}`);
			  return false;
		  })
	} // make a login request

	function fetchUserProfile(tok: string) : Promise<boolean> {
		console.log(`fetching user profile!`);
		return fetch(CURRENT_USER_URL, {
			method: 'GET',
			//withCredentials: true,
			credentials: 'include',
			headers: {
				'Authorization': 'Bearer '+ tok,
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
			return true;
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