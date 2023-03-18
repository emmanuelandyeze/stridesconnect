import {
	Box,
	Button,
	Flex,
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
	useDisclosure,
} from '@chakra-ui/react';
import { useAuth } from 'hooks/auth';
import { useComments } from 'hooks/comments';
import { useToggleLike } from 'hooks/post';
import { PROTECTED } from 'lib/routes';
import React from 'react';
import { AiFillAudio } from 'react-icons/ai';
import {
	BsBookmarkPlus,
	BsFillBookmarkHeartFill,
} from 'react-icons/bs';
import {
	FaRegHeart,
	FaHeart,
	FaRegComment,
	FaComment,
	FaTrash,
	FaRegCommentAlt,
	FaCommentAlt,
	FaShareAlt,
	FaShareAltSquare,
} from 'react-icons/fa';
import {
	MdOutlineArticle,
	MdOutlineDraw,
} from 'react-icons/md';
import { Link } from 'react-router-dom';
import {
	FacebookIcon,
	FacebookShareButton,
	FacebookShareCount,
	HatenaShareCount,
	LinkedinIcon,
	LinkedinShareButton,
	OKShareCount,
	PinterestShareCount,
	RedditShareCount,
	TumblrShareCount,
	TwitterIcon,
	TwitterShareButton,
	VKShareCount,
	WhatsappIcon,
	WhatsappShareButton,
} from 'react-share';

export default function Actions({ post }) {
	const { id, likes, title } = post;
	const { user, isLoading: userLoading } = useAuth();
	const isLiked = likes.includes(user?.id);

	const config = { id, isLiked, uid: user?.id };
	const { toggleLike, isLoading: likeLoading } =
		useToggleLike(config);
	// const { deletePost, isLoading: deleteLoading } =
	// 	useDeletePost(id);
	const { comments, isLoading: commentsLoading } =
		useComments(id);
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
					<ModalHeader>Share Article</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<SimpleGrid minChildWidth="60px" spacing="40px">
							<Box
								bg="gray.100"
								// height="100px"
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
								<WhatsappShareButton
									title={
										'Check out my new article:' +
										' ' +
										title
									}
									url={`https://stridesconnect.vercel.app/articles/${id}`}
									separator=":: "
								>
									<WhatsappIcon size={32} round />
								</WhatsappShareButton>
							</Box>

							<Box
								bg="gray.100"
								// height="100px"
								borderRadius={'md'}
								align="center"
								style={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<TwitterShareButton
									title={
										'Check out my new article:' +
										' ' +
										title
									}
									url={`https://stridesconnect.vercel.app/articles/${id}`}
									className="Demo__some-network__share-button"
								>
									<TwitterIcon size={32} round />
								</TwitterShareButton>
							</Box>
							<Box
								bg="gray.100"
								// height="100px"
								borderRadius={'md'}
								align="center"
								style={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<FacebookShareButton
									quote={
										'Check out my new article:' +
										' ' +
										title
									}
									url={`https://stridesconnect.vercel.app/articles/${id}`}
									className="Demo__some-network__share-button"
								>
									<FacebookIcon size={32} round />
								</FacebookShareButton>
							</Box>
							<Box
								bg="gray.100"
								height="50px"
								borderRadius={'md'}
								align="center"
								style={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<LinkedinShareButton
									title={
										'Check out my new article:' +
										' ' +
										title
									}
									source="Strides Connect"
									url={`https://stridesconnect.vercel.app/articles/${id}`}
									className="Demo__some-network__share-button"
								>
									<LinkedinIcon size={32} round />
								</LinkedinShareButton>
							</Box>
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
			<Flex maxW={'600px'}>
				<Flex
					justifyContent={'space-between'}
					flexDirection={'column'}
					alignItems="center"
					pr={'3'}
					py="2"
					style={{ height: '150px' }}
				>
					<Flex>
						<Flex alignItems={'center'}>
							<IconButton
								size={{ base: 'sm', md: 'lg' }}
								onClick={toggleLike}
								// isLoading={likeLoading || userLoading}
								colorScheme={'red'}
								variant="ghost"
								icon={
									isLiked ? <FaHeart /> : <FaRegHeart />
								}
								isRound
							/>
							{likes.length}
						</Flex>
					</Flex>
					<Flex
						alignItems={'center'}
						as={Link}
						to={`${PROTECTED}/comments/${id}`}
					>
						<IconButton
							size={{ base: 'sm', md: 'lg' }}
							// isLoading={likeLoading || userLoading}
							colorScheme={'purple'}
							variant="ghost"
							icon={
								comments?.length === 0 ? (
									<FaRegCommentAlt />
								) : (
									<FaCommentAlt />
								)
							}
							isRound
						/>
						{comments?.length}
					</Flex>
					<Flex alignItems={'center'}>
						<Button onClick={onOpen}>
							<FaShareAlt
								color="purple.500"
								style={{ marginRight: 4 }}
							/>
						</Button>
					</Flex>
				</Flex>
			</Flex>
		</div>
	);
}
