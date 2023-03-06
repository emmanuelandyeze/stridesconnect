import { useToast } from '@chakra-ui/react';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from 'lib/firebase';
import { DASHBOARD, LOGIN } from 'lib/routes';
import { useEffect, useState } from 'react';
import {
	useAuthState,
	useSignOut,
} from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import isUsernameExists from 'utils/isUsernameExists';

export function useAuth() {
	const [authUser, authLoading, error] = useAuthState(auth);
	const [isLoading, setLoading] = useState(true);
	const [user, setCurrentUser] = useState(null);

	useEffect(() => {
		async function fetchData() {
			setLoading(true);

			const ref = doc(db, 'users', authUser.uid);
			const docSnap = await getDoc(ref);
			const isUser = docSnap.data();

			setLoading(false);
			setCurrentUser(isUser);
		}

		if (!authLoading) {
			if (authUser) fetchData();
			else setLoading(false);
		}
	}, [authLoading, authUser]);

	return { user, isLoading, error };
}

export function useLogin() {
	const [isLoading, setLoading] = useState(false);
	const toast = useToast();
	const navigate = useNavigate();

	async function login({
		email,
		password,
		redirectTo = DASHBOARD,
	}) {
		setLoading(true);

		try {
			await signInWithEmailAndPassword(
				auth,
				email,
				password,
			);
			toast({
				title: 'You are logged in',
				status: 'success',
				isClosable: true,
				position: 'top',
				duration: 5000,
			});
			navigate(redirectTo);
		} catch (error) {
			toast({
				title: 'Logging in failed',
				description: error.message,
				status: 'error',
				isClosable: true,
				position: 'top',
				duration: 5000,
			});
			setLoading(false);
			return false;
		}

		setLoading(false);
		return true;
	}

	return { login, isLoading };
}

export function useRegister() {
	const [isLoading, setLoading] = useState(false);
	const toast = useToast();
	const navigate = useNavigate();

	async function register({
		username,
		email,
		password,
		redirectTo = DASHBOARD,
	}) {
		setLoading(true);

		const usernameExists = await isUsernameExists(username);

		if (usernameExists) {
			toast({
				title: 'A user with this username already exists',
				status: 'error',
				isClosable: true,
				position: 'top',
				duration: 5000,
			});
			setLoading(false);
		} else {
			try {
				const res = await createUserWithEmailAndPassword(
					auth,
					email,
					password,
				);

				await setDoc(doc(db, 'users', res.user.uid), {
					id: res.user.uid,
					username: username,
					avatar: '',
					date: Date.now(),
					channelName: '',
				});

				toast({
					title: 'Account Created',
					description: 'You are logged in',
					status: 'success',
					isClosable: true,
					position: 'top',
					duration: 5000,
				});

				navigate(redirectTo);
			} catch (error) {
				toast({
					title: 'Registration failed',
					description: error.message,
					status: 'error',
					isClosable: true,
					position: 'top',
					duration: 5000,
				});
			} finally {
				setLoading(false);
			}
		}

		setLoading(false);
	}

	return { register, isLoading };
}

export function useLogout() {
	const [signOut, isLoading, error] = useSignOut(auth);
	const navigate = useNavigate();
	const toast = useToast();

	async function logout() {
		if (await signOut()) {
			toast({
				title: 'Successfully logged out',
				status: 'success',
				isClosable: true,
				position: 'top',
				duration: 5000,
			});
			navigate(LOGIN);
		}
	}

	if (error) throw error;

	return { logout, isLoading };
}
