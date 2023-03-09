import { Box, Text } from '@chakra-ui/react';
import ChatList from 'components/comments/ChatList';
import CommentList from 'components/comments/CommentList';
import NewChat from 'components/comments/NewChat';
import NewComment from 'components/comments/NewComment';
import Post from 'components/post';
import {
	useCommunity,
	usePost,
	useSingleCommunity,
} from 'hooks/post';
import React from 'react';
import { useParams } from 'react-router-dom';

export default function Community() {
	const { id } = useParams();
	const { community, isLoading } = useSingleCommunity(id);

	if (isLoading) return <Text>Loading comments...</Text>;

	return (
		<div>
			<Box align="left">
				{/* <Post post={post} /> */}
				<div
					style={{
						position: 'fixed',
						backgroundColor: '#fff',
						zIndex: 1000,
						width: '100%',
					}}
				>
					<Text
						fontSize={'2xl'}
						fontWeight="bold"
						px={'4'}
						py={'3'}
						textAlign="flex-start"
					>
						{community.title}
					</Text>
				</div>

				{/* <Text>{community.body}</Text> */}
				<div style={{ paddingTop: '5rem' }}>
					<ChatList post={community} />
					<NewChat post={community} />
				</div>
			</Box>
		</div>
	);
}
