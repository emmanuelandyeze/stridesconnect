import {
	Avatar,
	Box,
	IconButton,
	Img,
	Text,
} from '@chakra-ui/react';
import { PROTECTED } from 'lib/routes';
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
	return (
		<div>
			{type === 'article' ? (
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
							to={`${PROTECTED}/articles/${id}`}
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
