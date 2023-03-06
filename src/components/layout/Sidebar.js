import {
	Box,
	Button,
	Code,
	Flex,
	IconButton,
	Link as ChakraLink,
	Stack,
	Text,
} from '@chakra-ui/react';
import Avatar from 'components/profile/Avatar';
import { useAuth } from 'hooks/auth';
import { PROTECTED, USERS } from 'lib/routes';
import { ActivityIndicator } from 'react-activity-indicator';
import { BsMenuButtonWide } from 'react-icons/bs';
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { GrNotification } from 'react-icons/gr';
import { MdOutlineExplore } from 'react-icons/md';

export default function Sidebar() {
	const { user, isLoading } = useAuth();
	if (!isLoading)
		return (
			<Box
				px="1"
				height="100vh"
				w="100%"
				maxW="300px"
				borderRight="1px solid"
				borderRightColor="purple.100"
				position="sticky"
				top="16"
				align="left"
				display={{ base: 'none', md: 'block' }}
			>
				<Box
					align="center"
					pt={'5'}
					bgColor="#f1f1f1"
					pb={'5'}
					borderRadius="md"
					mt={'5'}
					pl="5"
					pr={'5'}
					width={'90%'}
					height={'85%'}
				>
					<ChakraLink
						as={Link}
						to={`${PROTECTED}/dashboard`}
						style={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
						}}
						color="purple.800"
						fontWeight={'bold'}
						px={'5'}
						py="3"
					>
						<BsMenuButtonWide
							style={{ marginRight: '.5rem' }}
						/>
						<Text>Timeline</Text>
					</ChakraLink>
					<ChakraLink
						as={Link}
						to={`${PROTECTED}/profile/${user?.id}`}
						style={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
						}}
						px={'5'}
						py="3"
					>
						<CgProfile style={{ marginRight: '.5rem' }} />
						<Text>Profile</Text>
					</ChakraLink>
					<ChakraLink
						as={Link}
						to={`${PROTECTED}/dashboard`}
						style={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
						}}
						px={'5'}
						py="3"
					>
						<GrNotification
							style={{ marginRight: '.5rem' }}
						/>
						<Text>Notifications</Text>
					</ChakraLink>
					<ChakraLink
						as={Link}
						to={`${PROTECTED}/dashboard`}
						style={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
						}}
						px={'5'}
						py="3"
					>
						<MdOutlineExplore
							style={{ marginRight: '.5rem' }}
						/>
						<Text>Explore</Text>
					</ChakraLink>
				</Box>
			</Box>
		);
}
