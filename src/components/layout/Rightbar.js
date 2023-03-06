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
import {
	BsMenuButtonWide,
	BsPeopleFill,
} from 'react-icons/bs';
import { FiTrendingUp } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { GrNotification } from 'react-icons/gr';
import { MdOutlineExplore } from 'react-icons/md';

export default function Rightbar() {
	const { user, isLoading } = useAuth();
	if (!isLoading)
		return (
			<Box
				px="1"
				height="100vh"
				w="100%"
				maxW="300px"
				borderLeft="1px solid"
				borderLeftColor="purple.100"
				position="sticky"
				top="16"
				align="left"
				pl={'5'}
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
					height={'5%'}
				></Box>
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
					height={'35%'}
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
						<FiTrendingUp
							style={{ marginRight: '.5rem' }}
						/>
						<Text>Trending topics</Text>
					</ChakraLink>
				</Box>
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
					height={'35%'}
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
						<BsPeopleFill
							style={{ marginRight: '.5rem' }}
						/>
						<Text>Suggested Follows</Text>
					</ChakraLink>
				</Box>
			</Box>
		);
}
