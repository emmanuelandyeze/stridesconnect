import {
	Box,
	Button,
	Divider,
	Drawer,
	DrawerBody,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	Flex,
	IconButton,
	Link as ChakraLink,
	Show,
	Skeleton,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import { useAuth, useLogout } from 'hooks/auth';
import { DASHBOARD, PROTECTED } from 'lib/routes';
import React from 'react';
import {
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
} from '@chakra-ui/react';
import { RiArticleFill } from 'react-icons/ri';
import { SiAirplayaudio } from 'react-icons/si';
import { SlEvent } from 'react-icons/sl';
import {
	AddIcon,
	Icon,
	SearchIcon,
} from '@chakra-ui/icons';
import Avatar from 'components/profile/Avatar';
import { Link, useNavigate } from 'react-router-dom';
import { BiMenuAltLeft } from 'react-icons/bi';
import { MdOutlineExplore } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { BsMenuButtonWide } from 'react-icons/bs';
import { GrNotification } from 'react-icons/gr';

export default function Navbar() {
	const { logout, isLoading } = useLogout();
	const { user, isLoading: authLoading } = useAuth();
	const navigate = useNavigate();
	const { isOpen, onOpen, onClose } = useDisclosure();

	if (!authLoading)
		return (
			<Flex
				shadow="sm"
				pos="fixed"
				width="full"
				borderTop="6px solid"
				borderTopColor="purple.800"
				height="16"
				// zIndex="3"
				justify="center"
				alignItems={'center'}
				style={{ zIndex: 1000, backgroundColor: '#fff' }}
			>
				<Show below="md">
					<Button
						colorScheme="purple"
						variant={'ghost'}
						onClick={onOpen}
					>
						<BiMenuAltLeft
							style={{ width: '2rem', height: '2rem' }}
						/>
					</Button>
				</Show>
				<Drawer
					placement="left"
					onClose={onClose}
					isOpen={isOpen}
				>
					<DrawerOverlay />
					<DrawerContent>
						<DrawerHeader borderBottomWidth="1px">
							Strides Connect
						</DrawerHeader>
						<DrawerBody>
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
									to={`/${user?.tag}`}
									style={{
										display: 'flex',
										flexDirection: 'row',
										alignItems: 'center',
									}}
									px={'5'}
									py="3"
								>
									<CgProfile
										style={{ marginRight: '.5rem' }}
									/>
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
						</DrawerBody>
					</DrawerContent>
				</Drawer>
				{user ? (
					<Flex
						px="4"
						w="full"
						align="center"
						maxW="1200px"
						justifyContent="space-between"
						alignItems="center"
						style={{ zIndex: 1000 }}
					>
						<Link
							color="purple.800"
							href={DASHBOARD}
							fontWeight="bold"
						>
							<Text
								_hover={{ textDecoration: 'none' }}
								style={{ fontSize: '1.5rem' }}
								fontFamily="Tilt Neon"
								fontWeight={'bold'}
							>
								Strides Connect
							</Text>
						</Link>

						<div ml="auto">
							<IconButton
								aria-label="Search..."
								icon={<SearchIcon />}
							/>
							<Menu>
								<MenuButton
									// ml="auto"
									size={'sm'}
									as={Button}
									mr="5px"
									backgroundColor={'white'}
									_hover={{ backgroundColor: 'white' }}
									_focus={{ backgroundColor: 'white' }}
								>
									<Avatar user={user} size="md" />
								</MenuButton>
								<MenuList>
									<MenuItem
										onClick={() =>
											navigate(`/${user?.tag}`)
										}
									>
										My Profile
									</MenuItem>
									<MenuItem>Privacy Policy</MenuItem>
									<MenuItem>Report an issue</MenuItem>
									<Divider />
									<MenuItem
										onClick={logout}
										isLoading={isLoading}
										color="red"
									>
										Logout
									</MenuItem>
								</MenuList>
							</Menu>
						</div>
					</Flex>
				) : (
					<Flex
						px="4"
						w="full"
						align="center"
						maxW="1200px"
						justifyContent="space-between"
						alignItems="center"
						style={{ zIndex: 1000 }}
					>
						<Link
							color="purple.800"
							href={DASHBOARD}
							fontWeight="bold"
						>
							<Text
								_hover={{ textDecoration: 'none' }}
								style={{ fontSize: '1.5rem' }}
								fontFamily="Tilt Neon"
								fontWeight={'bold'}
							>
								Strides Connect
							</Text>
						</Link>

						<div ml="auto">
							<Button as={Link} to="/login">
								Login
							</Button>
						</div>
					</Flex>
				)}
			</Flex>
		);
}
