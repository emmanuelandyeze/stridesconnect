import {
	Box,
	Button,
	Divider,
	Flex,
	FormControl,
	FormLabel,
	HStack,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Stack,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import PostsList from 'components/post/PostsList';
import { useProfilePosts } from 'hooks/post';
import { useUpdateAvatar, useUser } from 'hooks/users';
import React from 'react';
import { useParams } from 'react-router-dom';
import Avatar from './Avatar';
import { format } from 'date-fns';
import { useAuth } from 'hooks/auth';
import { FaEdit } from 'react-icons/fa';
import { BallTriangle } from 'react-loader-spinner';
import Navbar from 'components/layout/Navbar';

export default function Profile() {
	const { tag } = useParams();
	const { posts, isLoading: postsLoading } =
		useProfilePosts(tag);
	const { user: authUser, isLoading: authLoading } =
		useAuth();
	const { user, isLoading: userLoading } = useUser(tag);
	const { isOpen, onOpen, onClose } = useDisclosure();

	// console.log(user);

	const {
		setFile,
		updateAvatar,
		isLoading: fileLoading,
		fileURL,
	} = useUpdateAvatar(user?.tag);

	function handleChange(e) {
		setFile(e.target.files[0]);
	}

	if (!posts)
		return (
			<div
				style={{
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
		<div>
			<Navbar />
			<Stack
				spacing={'5'}
				pt="14"
				alignItems={'center'}
				style={{ alignSelf: 'center', width: '100%' }}
			>
				<Flex
					p={['4', '6']}
					pos="relative"
					align={'center'}
				>
					<Avatar size={'2xl'} user={user} />

					{!authLoading && authUser?.id === user?.id ? (
						<Button
							pos={'absolute'}
							mb="2"
							top={'6'}
							right={'6'}
							colorScheme={'purple'}
							onClick={onOpen}
						>
							<FaEdit size={20} />
						</Button>
					) : (
						<></>
					)}
					<Stack ml={'10'}>
						<Text fontSize={'2xl'} fontWeight="bold">
							{user.username}
						</Text>
						<HStack spacing={'10'}>
							<Text color={'gray.700'} fontSize={'sm'}>
								Posts: {posts.length}
							</Text>
							{/* <Text color={'gray.700'} fontSize={'sm'}>
								Likes: todo
							</Text> */}
							<Text color={'gray.700'} fontSize={'sm'}>
								Joined: {format(user.date, 'MMM YYY')}
							</Text>
						</HStack>
					</Stack>
				</Flex>
				<Divider />
				{postsLoading ? (
					<Text>Posts Loading</Text>
				) : (
					<>
						<Box px={'4'}>
							<PostsList posts={posts} />
						</Box>
					</>
				)}
			</Stack>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Edit Profile</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<HStack spacing={'5'}>
							<Avatar
								user={user}
								overrideAvatar={fileURL}
								size="2xl"
							/>
							<FormControl py={'4'}>
								<FormLabel htmlFor="picture">
									Edit Profile Picture
								</FormLabel>
								<input
									type="file"
									name=""
									accept="image/*"
									onChange={handleChange}
								/>
							</FormControl>
						</HStack>
						<Button
							colorScheme="purple"
							w={'full'}
							my="6"
							loadingText="Uploading..."
							onClick={updateAvatar}
							isLoading={fileLoading}
						>
							Save
						</Button>
					</ModalBody>
				</ModalContent>
			</Modal>
		</div>
	);
}
