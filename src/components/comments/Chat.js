import {
	Box,
	Flex,
	IconButton,
	Text,
} from '@chakra-ui/react';
import Avatar from 'components/profile/Avatar';
import { format, formatDistanceToNow } from 'date-fns';
import { useAuth } from 'hooks/auth';
import { useDeleteComment } from 'hooks/comments';
import { useUser } from 'hooks/users';
import React from 'react';
import { FaTrash } from 'react-icons/fa';

export default function Chat({ comment }) {
	const { text, uid, date, id } = comment;
	const { user, isLoading: userLoading } = useUser(uid);
	const { user: authUser, isLoading: authLoading } =
		useAuth();
	const { deleteComment, isLoading: deleteLoading } =
		useDeleteComment(id);

	if (!userLoading)
		return (
			<div>
				<Box
					px={'4'}
					py="2"
					maxW={'600px'}
					mx="auto"
					textAlign={'left'}
				>
					<Flex pb={'2'}>
						<Avatar user={user} size="sm" />
						<Box
							flex={'1'}
							ml="4"
							backgroundColor="gray.200"
							padding={'.5rem'}
							borderRadius="5px"
						>
							<Flex pb={'2'}>
								<Box
									style={{
										display: 'flex',
										flexDirection: 'column',
										justifyContent: 'space-between',
										alignItems: 'flex-start',
									}}
								>
									{!authLoading && authUser?.id === uid ? (
										<Text
											fontSize={'small'}
											fontWeight={'bold'}
										>
											You
										</Text>
									) : (
										<Text
											fontSize={'small'}
											fontWeight={'bold'}
										>
											{user.username}
										</Text>
									)}

									<Text fontSize={'xs'} color="gray.500">
										{formatDistanceToNow(date)} ago
									</Text>
								</Box>
								{!authLoading && authUser?.id === uid && (
									<IconButton
										size={'sm'}
										ml="auto"
										icon={<FaTrash />}
										colorScheme="red"
										variant={'ghost'}
										isRound
										onClick={deleteComment}
										isLoading={deleteLoading}
									/>
								)}
							</Flex>

							<Box pt={'2'} fontSize="xs">
								<Text>{text}</Text>
							</Box>
						</Box>
					</Flex>
				</Box>
			</div>
		);
}
