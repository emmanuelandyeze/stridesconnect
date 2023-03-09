import {
	Avatar,
	Box,
	IconButton,
	Img,
	Text,
} from '@chakra-ui/react';
import { formatDistanceToNow } from 'date-fns';
import { useUser } from 'hooks/users';
import { PROTECTED } from 'lib/routes';
import React from 'react';
import { BsBookmarkPlus } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Actions from './Actions';
import Header from './Header';

export default function Announce({ community }) {
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
	} = community;
	const { user, isLoading } = useUser(uid);
	if (isLoading) return <Text>Loading...</Text>;
	return (
		<div>
			<Box p="0" pt={'1'} mx="auto" maxW="800px">
				<Box
					borderBottom={'2px solid'}
					borderColor="gray.100"
					borderRadius={'none'}
					style={{ padding: '.5rem' }}
				>
					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'space-between',
							marginBottom: '.5rem',
						}}
					>
						<Link
							to={`${PROTECTED}/profile/${user?.id}`}
							style={{
								display: 'flex',
								flexDirection: 'row',
								alignItems: 'center',
							}}
						>
							<div>
								<Text ml={'1'} fontSize={'xs'}>
									{user.username}
								</Text>
							</div>
						</Link>
						{/* <div>
							<Text fontSize={'xs'}>
								{formatDistanceToNow(date)} ago
							</Text>
						</div> */}
					</div>

					<Box
						style={{
							display: 'flex',
							flexDirection: 'row',
							// justifyContent: 'space-between',
							alignItems: 'flex-start',
						}}
						as={Link}
						to={`${PROTECTED}/community/${id}`}
					>
						<Img
							src={image}
							style={{
								height: '2rem',
								width: '2rem',
								objectFit: 'cover',
								marginRight: '1rem',
								borderRadius: '5px',
							}}
						/>
						<div>
							<Text
								fontSize={'lg'}
								fontWeight={'bold'}
								style={{ fontFamily: 'Tilt Neon' }}
							>
								{title}
							</Text>
						</div>
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
		</div>
	);
}
