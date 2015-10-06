import Firebase from 'firebase';


const fb = new Firebase('https://wicker-aarbrown.firebaseio.com/pages');

export const pages = fb;

export function getAuthData() {
	return fb.getAuth();
}

export function onAuth(callback) {
	return fb.onAuth(callback);
} 

export function offAuth(callback) {
	return fb.offAuth(callback);
}


//sign in user with firebase
export const signin = (email, password) => fb.authWithPassword(
	{email, password},
	function(error, authData) {
		if (error)
			console.log("Error signing user in:",  error);
		else {
			console.log("Successfully signed in with payload:", authData);
		}
	}
);

//sign up new user with firebase
export const signup = (email, password) => fb.createUser(
	{email, password}, 
	function (error, userData) {
		if (error) 
			console.log("Error signing user up:" , error);
		else {
			console.log("Successfully created user account with uid:", userData.uid);
			signin(email, password);
		}
	}
);

//sign out user with firebase
export function signout() {
	fb.unauth();
}
