import { SmallAddIcon } from '@chakra-ui/icons';
import {
	Box,
	Button,
	IconButton,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	SimpleGrid,
	Text,
	Textarea,
	useDisclosure,
} from '@chakra-ui/react';
import PostsList from 'components/post/PostsList';
import { useAnnouncement, usePosts } from 'hooks/post';
import { PROTECTED } from 'lib/routes';
import React from 'react';
import { Link } from 'react-router-dom';
import TextAreaAutosize from 'react-textarea-autosize';

import {
	Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel,
} from '@chakra-ui/react';
import AnnounceList from 'components/post/AnnounceList';
import {
	MdOutlineArticle,
	MdOutlineDraw,
} from 'react-icons/md';

import { AiFillAudio } from 'react-icons/ai';
import Announcement from 'components/create/Announcement';
import {
	Skeleton,
	SkeletonCircle,
	SkeletonText,
} from '@chakra-ui/react';

export default function Dashboard() {
	const { posts, isLoading } = usePosts();
	const { announcement, isLoading: announcementLoading } =
		useAnnouncement();
	const { isOpen, onOpen, onClose } = useDisclosure();
	if (isLoading)
		return (
			<Box padding="0" boxShadow="lg" bg="white">
				<SkeletonText
					mt="4"
					noOfLines={25}
					spacing="4"
					skeletonHeight="2"
				/>
			</Box>
		);
	return (
		<div>
			<Button
				style={{
					position: 'fixed',
					bottom: 20,
					right: 30,
					paddingTop: '2rem',
					paddingBottom: '2rem',
					borderRadius: '10px',
					zIndex: 1000,
				}}
				onClick={onOpen}
			>
				<MdOutlineDraw
					style={{ width: '3rem', height: '3rem' }}
					color="purple.500"
				/>
			</Button>
			<Modal
				isCentered
				onClose={onClose}
				isOpen={isOpen}
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
								as={Link}
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
							onClick={onClose}
						>
							Close
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>

			<Tabs>
				<TabList alignItems={'center'}>
					<Tab
						_selected={{
							color: 'purple.800',
							fontWeight: 'bold',
							borderBottom: '3px solid purple',
						}}
						style={{ width: '50%', height: '4rem' }}
					>
						Reads for you
					</Tab>
					<Tab
						_selected={{
							color: 'purple.800',
							fontWeight: 'bold',
							borderBottom: '3px solid purple',
						}}
						style={{ width: '50%', height: '4rem' }}
					>
						Announcements
					</Tab>
				</TabList>

				<TabPanels>
					<TabPanel>
						<PostsList posts={posts} />
					</TabPanel>
					<TabPanel>
						<Announcement />
						<AnnounceList announcements={announcement} />
					</TabPanel>
				</TabPanels>
			</Tabs>
		</div>
	);
}
