import { Avatar, Box, Img, Text } from '@chakra-ui/react';
import { PROTECTED } from 'lib/routes';
import React from 'react';
import Actions from './Actions';
import Header from './Header';

export default function Announce({ post }) {
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
	} = post;
	return (
		<div>
			{type === 'article' ? (
				<Box p="0" pt={'1'} mx="auto" maxW="600px">
					<Box
						border={'2px solid'}
						borderColor="gray.100"
						borderRadius={'md'}
						style={{ padding: '.5rem' }}
					>
						<Header post={post} />
						<Text fontSize={'2xl'} fontWeight={'extrabold'}>
							{title}
						</Text>
						<Box
							style={{
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center',
							}}
						>
							<div>
								<Text
									wordBreak="break-word"
									fontSize={'sm'}
									mb={'2'}
								>
									{title}
								</Text>
								<div
									style={{
										width: '40%',
									}}
								>
									<Text
										style={{
											fontSize: '.8rem',
											textAlign: 'left',
											color: '#fff',
											backgroundColor: '#808080',
											paddingLeft: '.5rem',
											borderRadius: '5px',
										}}
									>
										{niche}
									</Text>
								</div>
							</div>

							<Img src={image} height={'125'} />
						</Box>

						<Actions post={post} />
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
