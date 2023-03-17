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
import { BallTriangle } from 'react-loader-spinner';

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
				<BallTriangle
					height={100}
					width={100}
					radius={5}
					color="purple"
					ariaLabel="ball-triangle-loading"
					wrapperClass={{}}
					wrapperStyle=""
					visible={true}
				/>
			</div>
		);

	return (
		<>
			{/* <Navbar /> */}
			<Box w="full" bgColor={'white'}>
				<Sidebar />
				<Flex mx={'auto'} maxWidth="600px">
					<Outlet />
				</Flex>
			</Box>
		</>
	);
}
