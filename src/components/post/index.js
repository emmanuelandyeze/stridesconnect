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
	Tag,
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
			<>
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
									fontSize={{ base: 'sm', md: 'lg' }}
									fontWeight={'bold'}
									style={{ fontFamily: 'Open Sans' }}
								>
									{title}
								</Text>
								<Text
									fontFamily={'Open Sans'}
									style={{ fontSize: '.8rem' }}
									color="gray.600"
									display={{ base: 'none', md: 'block' }}
								>
									{description.substring(0, 154)}...
								</Text>
							</div>

							<Img
								src={image}
								display={{ base: 'block', md: 'none' }}
								style={{
									height: '4rem',
									width: '5rem',
									objectFit: 'cover',
									marginLeft: '1rem',
									borderRadius: '5px',
								}}
							/>
							<Img
								src={image}
								display={{ base: 'none', md: 'block' }}
								style={{
									height: '8rem',
									width: '8rem',
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
							<Tag>{niche}</Tag>

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
		</div>
	);
}
