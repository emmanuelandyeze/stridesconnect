import React, { ReactNode, useRef, useState } from 'react';
import {
	IconButton,
	Box,
	CloseButton,
	Flex,
	HStack,
	VStack,
	Icon,
	useColorModeValue,
	Link,
	Drawer,
	DrawerContent,
	Text,
	useDisclosure,
	BoxProps,
	FlexProps,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
	Img,
	InputGroup,
	InputLeftElement,
	Input,
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	SimpleGrid,
	ModalFooter,
	FormControl,
	FormLabel,
	Textarea,
	useToast,
} from '@chakra-ui/react';
import {
	FiHome,
	FiTrendingUp,
	FiCompass,
	FiStar,
	FiSettings,
	FiMenu,
	FiBell,
	FiChevronDown,
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import { ReactText } from 'react';
import {
	Link as routerLink,
	useNavigate,
} from 'react-router-dom';
import { useAuth, useLogout } from 'hooks/auth';
import Avatar from 'components/profile/Avatar';
import { Search2Icon } from '@chakra-ui/icons';
import { MdOutlineArticle } from 'react-icons/md';
import { AiFillAudio } from 'react-icons/ai';
import { BsCameraFill } from 'react-icons/bs';
import { db, storage } from 'lib/firebase';
import {
	getDownloadURL,
	ref,
	uploadString,
} from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import { PROTECTED } from 'lib/routes';

interface LinkItemProps {
	name: string;
	icon: IconType;
}
const LinkItems: Array<LinkItemProps> = [
	{
		name: 'Home',
		icon: FiHome,
		link: '/protected/dashboard',
		active: true,
	},
	{
		name: 'Trending',
		icon: FiTrendingUp,
		link: '/protected/dashboard',
	},
	{
		name: 'Explore',
		icon: FiCompass,
		link: '/protected/dashboard',
	},
	{
		name: 'Favourites',
		icon: FiStar,
		link: '/protected/dashboard',
	},
	{
		name: 'Settings',
		icon: FiSettings,
		link: '/protected/dashboard',
	},
];

export default function SidebarWithHeader({
	children,
}: {
	children: ReactNode,
}) {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Box
			// minH="100vh"
			bg={useColorModeValue('gray.100', 'gray.900')}
		>
			<SidebarContent
				onClose={() => onClose}
				display={{ base: 'none', md: 'block' }}
			/>
			<Drawer
				autoFocus={false}
				isOpen={isOpen}
				placement="left"
				onClose={onClose}
				returnFocusOnClose={false}
				onOverlayClick={onClose}
				// size="xs"
			>
				<DrawerContent>
					<SidebarContent onClose={onClose} />
				</DrawerContent>
			</Drawer>
			{/* mobilenav */}
			<MobileNav onOpen={onOpen} />
			<Box ml={{ base: 0, md: 60 }} p="4">
				{children}
			</Box>
		</Box>
	);
}

interface SidebarProps extends BoxProps {
	onClose: () => void;
}

const SidebarContent = ({
	onClose,
	...rest
}: SidebarProps) => {
	const { logout, isLoading } = useLogout();
	const [loading, setLoading] = useState(false);
	const { user, isLoading: authLoading } = useAuth();
	const filePickerRef = useRef(null);
	const titleRef = useRef(null);
	const descriptionRef = useRef(null);
	const [selectedFile, setSelectedFile] = useState(null);
	const [value, setValue] = useState('');
	const navigate = useNavigate();
	const toast = useToast();
	const {
		isOpen: isOpenPublish,

		onOpen: onOpenPublish,

		onClose: onClosePublish,
	} = useDisclosure();

	const {
		isOpen: isOpenCreator,
		onOpen: onOpenCreator,
		onClose: onCloseCreator,
	} = useDisclosure();

	const addImageToPost = (e) => {
		const reader = new FileReader();
		if (e.target.files[0]) {
			reader.readAsDataURL(e.target.files[0]);
		}

		reader.onload = (readerEvent) => {
			setSelectedFile(readerEvent.target.result);
		};
	};
	console.log(value);

	const uploadCreator = async () => {
		if (loading) return;

		setLoading(true);

		const imageRef = ref(storage, `posts/creator/image`);

		await uploadString(
			imageRef,
			selectedFile,
			'data_url',
		).then(async (snapshot) => {
			const downloadURL = await getDownloadURL(imageRef);
			await updateDoc(doc(db, 'users', user?.tag), {
				avatar: downloadURL,
				creator: true,
				creatorName: titleRef.current.value,
				about: descriptionRef.current.value,
			});
		});

		setLoading(false);
		setSelectedFile(null);

		onCloseCreator();
		navigate(`${PROTECTED}/dashboard`);
		toast({
			title: 'You are now a creator!',
			status: 'success',
			isClosable: true,
			position: 'top',
			duration: 5000,
		});
	};

	return (
		<>
			<Modal
				isCentered
				onClose={onCloseCreator}
				isOpen={isOpenCreator}
				motionPreset="slideInBottom"
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Become a Creator</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<HStack spacing={'5'} align="center">
							<div>
								<input
									ref={filePickerRef}
									type="file"
									hidden
									onChange={addImageToPost}
								/>
							</div>

							{selectedFile ? (
								<div
									style={{
										alignItems: 'center',
										objectFit: 'center',
									}}
								>
									<Img
										src={selectedFile}
										onClick={() => setSelectedFile(null)}
										style={{
											borderRadius: '50%',
											objectFit: 'center',
											height: '7rem',
											width: '7rem',
											border: '1px solid #808080',
										}}
									/>
								</div>
							) : (
								<>
									<div
										onClick={() =>
											filePickerRef.current.click()
										}
										style={{
											height: '7rem',
											width: '7rem',
											border: '1px solid #808080',
											alignSelf: 'center',
											paddingTop: '2rem',
											paddingLeft: '2rem',
											borderRadius: '50%',
											marginLeft: '1rem',
										}}
									>
										<BsCameraFill size={48} />
									</div>
								</>
							)}
						</HStack>
						<div
							style={{
								// marginLeft: '1rem',
								display: 'flex',
								flexDirection: 'column',
								width: '100%',
							}}
						>
							<Textarea
								type="text"
								placeholder="Creator Name"
								ref={titleRef}
								style={{
									fontSize: '1.5rem',
									marginBottom: '.5rem',
									marginTop: '1rem',
									paddingLeft: '1rem',
								}}
							/>
							<Textarea
								type="text"
								placeholder="Tell us something about your page"
								ref={descriptionRef}
								style={{
									fontSize: '1rem',

									marginTop: '.3rem',
									marginBottom: '1rem',
									paddingLeft: '1rem',
								}}
							/>
						</div>
						<Button
							colorScheme="purple"
							onClick={() => uploadCreator()}
							style={{ justifyContent: 'flex-end' }}
							isLoading={loading}
							loadingText="Creating..."
						>
							Create
						</Button>
					</ModalBody>
				</ModalContent>
			</Modal>

			<Modal
				isCentered
				onClose={onClosePublish}
				isOpen={isOpenPublish}
				motionPreset="slideInBottom"
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Publishing room</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<SimpleGrid
							minChildWidth="120px"
							spacing="40px"
						>
							<Box
								bg="gray.100"
								height="100px"
								borderRadius={'md'}
								align="center"
								as={routerLink}
								to={'/protected/create'}
								style={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<MdOutlineArticle
									style={{
										height: '2rem',
										width: '2rem',
									}}
								/>
								<Text pt={'1.5'}>Publish Article</Text>
							</Box>

							<Box
								bg="gray.100"
								height="100px"
								borderRadius={'md'}
								align="center"
								style={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<AiFillAudio
									style={{
										height: '2rem',
										width: '2rem',
									}}
								/>
								<Text pt={'1.5'}>Live Audio Chat</Text>
							</Box>
							<Box
								bg="gray.100"
								height="100px"
								borderRadius={'md'}
							></Box>
							<Box
								bg="gray.100"
								height="100px"
								borderRadius={'md'}
							></Box>
						</SimpleGrid>
					</ModalBody>
					<ModalFooter>
						<Button
							colorScheme="blue"
							mr={3}
							onClick={onClosePublish}
						>
							Close
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>

			<Box
				transition="3s ease"
				bg={useColorModeValue('white', 'gray.900')}
				borderRight="1px"
				borderRightColor={useColorModeValue(
					'gray.200',
					'gray.700',
				)}
				w={{ base: '100%', md: 60 }}
				pos="fixed"
				h="full"
				{...rest}
			>
				<Flex
					h="20"
					alignItems="center"
					mx="8"
					justifyContent="space-between"
				>
					<Img src="/logo.png" h={'14'} ml="-4" />
					<CloseButton
						display={{ base: 'flex', md: 'none' }}
						onClick={onClose}
					/>
				</Flex>
				{LinkItems.map((link) => (
					<>
						<NavItem key={link.name} icon={link.icon}>
							{link.active ? (
								<Text
									as={routerLink}
									to={link.link}
									fontWeight="bold"
									fontFamily={'Open Sans'}
								>
									{link.name}
								</Text>
							) : (
								<Text
									as={routerLink}
									to={link.link}
									fontFamily={'Open Sans'}
								>
									{link.name}
								</Text>
							)}
						</NavItem>
					</>
				))}
				<div>
					{user && !user.creator ? (
						<Button
							style={{
								marginLeft: '2rem',
								marginTop: '1rem',
							}}
							colorScheme="purple"
							onClick={onOpenCreator}
						>
							Become a creator
						</Button>
					) : (
						<Button
							style={{
								marginLeft: '2rem',
								marginTop: '1rem',
							}}
							colorScheme="purple"
							onClick={onOpenPublish}
						>
							New Post
						</Button>
					)}
				</div>
			</Box>
		</>
	);
};

interface NavItemProps extends FlexProps {
	icon: IconType;
	children: ReactText;
}
const NavItem = ({
	icon,
	children,
	...rest
}: NavItemProps) => {
	return (
		<Link
			href="#"
			style={{ textDecoration: 'none' }}
			_focus={{ boxShadow: 'none' }}
		>
			<Flex
				align="center"
				p="4"
				mx="4"
				borderRadius="lg"
				role="group"
				cursor="pointer"
				_hover={{
					bg: 'gray.200',
					color: 'black',
				}}
				{...rest}
			>
				{icon && (
					<Icon
						mr="4"
						fontSize="16"
						_groupHover={{
							color: 'black',
						}}
						as={icon}
					/>
				)}
				{children}
			</Flex>
		</Link>
	);
};

interface MobileProps extends FlexProps {
	onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
	const { logout, isLoading } = useLogout();
	const { user, isLoading: authLoading } = useAuth();
	const navigate = useNavigate();

	if (!authLoading)
		return (
			<Flex
				ml={{ base: 0, md: 60 }}
				px={{ base: 4, md: 4 }}
				height="20"
				alignItems="center"
				bg={'white'}
				zIndex="1000"
				borderBottomWidth="1px"
				borderBottomColor={'purple.200'}
				justifyContent={{
					base: 'space-between',
					md: 'flex-end',
				}}
				position="fixed"
				w={{ base: 'full', md: '85%' }}
				{...rest}
			>
				<IconButton
					display={{ base: 'flex', md: 'none' }}
					onClick={onOpen}
					variant="outline"
					aria-label="open menu"
					icon={<FiMenu />}
				/>

				<Text
					display={{ base: 'none', md: 'none' }}
					fontSize="xl"
					fontFamily="Open Sans"
					fontWeight="bold"
				>
					Strides Connect
				</Text>

				<Flex
					style={{
						justifyContent: 'space-between',
						width: '100%',
						alignItems: 'center',
					}}
				>
					<Text
						display={{ base: 'none', md: 'flex' }}
						fontSize="lg"
						fontFamily="Open Sans"
						fontWeight="bold"
					>
						Home
					</Text>

					<Text
						display={{ base: 'flex', md: 'none' }}
						fontSize="md"
						fontFamily="Open Sans"
						fontWeight="bolder"
						ml={'4'}
					>
						Strides Connect
					</Text>

					<InputGroup
						maxWidth="500px"
						ml={'1'}
						display={{ base: 'none', md: 'flex' }}
					>
						<InputLeftElement
							pointerEvents="none"
							children={
								<Search2Icon
									color="gray.500"
									bg={'gray.200'}
								/>
							}
						/>
						<Input
							type="text"
							placeholder="Search people, publications and communitites"
							bg={'gray.200'}
						/>
					</InputGroup>

					<HStack spacing={{ base: '0', md: '6' }}>
						<IconButton
							size="lg"
							variant="ghost"
							aria-label="open menu"
							icon={<Search2Icon />}
							display={{ base: 'flex', md: 'none' }}
						/>

						<Flex alignItems={'center'}>
							<Menu>
								<MenuButton
									py={2}
									transition="all 0.3s"
									_focus={{ boxShadow: 'none' }}
								>
									{user ? (
										<HStack>
											<Avatar user={user} size="sm" />
											<VStack
												display={{
													base: 'none',
													md: 'flex',
												}}
												alignItems="flex-start"
												spacing="1px"
												ml="2"
											>
												<Text fontSize="sm">
													{user.username}
												</Text>
												<Text
													fontSize="xs"
													color="gray.600"
												>
													@{user.tag}
												</Text>
											</VStack>
											<Box
												display={{
													base: 'none',
													md: 'flex',
												}}
											>
												<FiChevronDown />
											</Box>
										</HStack>
									) : (
										<Button>Login</Button>
									)}
								</MenuButton>
								<MenuList
									bg={'white'}
									borderColor={'gray.200'}
								>
									<MenuItem
										as={routerLink}
										to={`/${user?.tag}`}
									>
										Profile
									</MenuItem>
									<MenuItem>Settings</MenuItem>
									<MenuItem>Billing</MenuItem>
									<MenuDivider />
									<MenuItem
										onClick={logout}
										isLoading={isLoading}
										color="red"
									>
										Sign out
									</MenuItem>
								</MenuList>
							</Menu>
						</Flex>
					</HStack>
				</Flex>
			</Flex>
		);
};
