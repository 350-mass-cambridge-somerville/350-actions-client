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
	login: (email: string, password: string) => {
		console.log('Trying to login without the proper context');
		return Promise.resolve(false);
	},
	logout: () => {
		console.log('Trying to logout with the proper context');
	},
	register: (req: any) => {
		console.log('Trying to register without the proper context');
		return Promise.resolve(false);
	}
});

type AuthProviderProps = { children: any };

function AuthProvider(props: AuthProviderProps) {
	const [token, setToken] = useState('');
	const [refresh, setRefresh] = useState('');
	const [userData, setUserData] = useState(defaultUserData);
	const login = (email: string, password: string) => {
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
			if (!response.ok) {
				throw (response.text);
			}
			return response.json()
		}).then((json) => {
			setToken(json.access);
			setRefresh(json.refresh);
			return fetchUserProfile(json.access);
		})
			.catch((error) => {
				console.log(`submit failed with error: ${error.message}`);
				return false;
			})
	} // make a login request

	function fetchUserProfile(tok: string): Promise<boolean> {
		return fetch(CURRENT_USER_URL, {
			method: 'GET',
			//withCredentials: true,
			credentials: 'include',
			headers: {
				'Authorization': 'Bearer ' + tok,
				//'X-FP-API-KEY': 'iphone', //it can be iPhone or your any other attribute
				'Content-Type': 'application/json'
			}
		})
			.then((response) => {
				//todo make utils to validate responses
				return response.json()
			})
			.then((json) => {
				// todo how to set admin perms
				setUserData({ isAuthorized: true, email: json.email, name: json.username, isAdmin: json.is_superuser });
				return true;
			})
	}

	const register = (req: any) => {
		return Promise.resolve(true);
	} // register the user

	const logout = () => {
		fetch(SIGN_OUT_URL, {
			method: 'POST'
		}).then(() => {
			setUserData({ isAuthorized: false, isAdmin: false, email: '', name: '' });
			setToken('');
		});
	} // clear the token in localStorage and the user data

	// todo provide token??
	return <AuthContext.Provider value={{ login, register, logout, userData, token }} {...props} />;
}

const useAuth = (): AuthContextType => React.useContext(AuthContext)
export { AuthProvider, useAuth, AuthContext }
