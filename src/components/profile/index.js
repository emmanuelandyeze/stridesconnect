import {
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

export default function Profile() {
	const { id } = useParams();
	const { posts, isLoading: postsLoading } =
		useProfilePosts(id);
	const { user: authUser, isLoading: authLoading } =
		useAuth();
	const { user, isLoading: userLoading } = useUser(id);
	const { isOpen, onOpen, onClose } = useDisclosure();

	const {
		setFile,
		updateAvatar,
		isLoading: fileLoading,
		fileURL,
	} = useUpdateAvatar(user?.id);

	function handleChange(e) {
		setFile(e.target.files[0]);
	}

	if (userLoading || postsLoading)
		return <Text>Loading...</Text>;

	return (
		<div>
			<Stack spacing={'5'}>
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
							<Text color={'gray.700'} fontSize={'sm'}>
								Likes: todo
							</Text>
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
					<PostsList posts={posts} />
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
