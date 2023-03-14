import {
	Avatar,
	Box,
	Button,
	IconButton,
	Img,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	SimpleGrid,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import { PROTECTED } from 'lib/routes';
import { AiFillAudio } from 'react-icons/ai';
import React from 'react';
import { BsBookmarkPlus } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Actions from './Actions';
import Header from './Header';
import {
	Skeleton,
	SkeletonCircle,
	SkeletonText,
} from '@chakra-ui/react';
import {
	MdOutlineArticle,
	MdOutlineDraw,
} from 'react-icons/md';

export default function Post({ post }) {
	const {
		title,
		body,
		type,
		description,
		niche,
		profileImg,
		date,
		username,
		uid,
		image,
		id,
	} = post;
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<div>
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
			{type === 'article' ? (
				<>
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
					<Box p="0" pt={'1'} mx="auto" maxW="800px">
						<Box
							borderBottom={'2px solid'}
							borderColor="gray.100"
							borderRadius={'none'}
							style={{ padding: '.5rem' }}
						>
							<Header post={post} />

							<Box
								style={{
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'space-between',
									alignItems: 'flex-start',
								}}
								as={Link}
								to={`/articles/${id}`}
							>
								<div>
									<Text
										fontSize={'lg'}
										fontWeight={'bold'}
										style={{ fontFamily: 'Tilt Neon' }}
									>
										{title}
									</Text>
								</div>

								<Img
									src={image}
									style={{
										height: '4rem',
										width: '5rem',
										objectFit: 'cover',
										marginLeft: '1rem',
										borderRadius: '5px',
									}}
								/>
							</Box>

							{/* <Actions post={post} /> */}
							<div
								style={{
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'space-between',
									alignItems: 'center',
								}}
							>
								<Text
									style={{
										fontSize: '.8rem',
										textAlign: 'left',
										paddingLeft: '0rem',
										borderRadius: '5px',
									}}
									// bg="gray.100"
									color={'gray.500'}
								>
									{niche}
								</Text>

								<IconButton
									size="lg"
									variant="ghost"
									icon={<BsBookmarkPlus />}
									isRound
								/>
							</div>
						</Box>
					</Box>
				</>
			) : (
				<Box p="0" pt={'1'} mx="auto" maxW="600px">
					<Box
						border={'2px solid'}
						borderColor="gray.100"
						borderRadius={'md'}
						style={{ padding: '.5rem' }}
					>
						<Header post={post} />

						<Box>
							<Text
								wordBreak="break-word"
								fontSize={'sm'}
								mb={'1'}
							>
								{body}
							</Text>
							<Img src={image} />
						</Box>

						<Actions post={post} />
					</Box>
				</Box>
			)}
		</div>
	);
}
