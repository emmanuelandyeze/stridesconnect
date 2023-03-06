import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useAuth } from 'hooks/auth';
import { LOGIN } from 'lib/routes';
import React, { useEffect } from 'react';
import {
	Outlet,
	useLocation,
	useNavigate,
} from 'react-router-dom';
import { Box, Flex } from '@chakra-ui/react';
import ActivityIndicator from 'react-activity-indicator';
import Rightbar from './Rightbar';

export default function Layout() {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const { user, isLoading } = useAuth();

	useEffect(() => {
		if (
			!isLoading &&
			pathname.startsWith('/protected') &&
			!user
		) {
			navigate(LOGIN);
		}
	}, [pathname, user, isLoading, navigate]);

	if (isLoading)
		return (
			<div
				style={{
					border: '1px solid #000',
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100vh',
				}}
			>
				<ActivityIndicator
					number={5}
					diameter={10}
					borderWidth={1}
					duration={300}
					activeColor="purple"
					borderColor="purple"
					borderRadius="10%"
				/>
			</div>
		);

	return (
		<>
			<Navbar />
			<Flex
				pt="16"
				pb="12"
				mx="auto"
				w="full"
				maxW="1200px"
			>
				<Sidebar />
				<Box w="900px">
					<Outlet />
				</Box>
				<Rightbar />
			</Flex>
		</>
	);
}
