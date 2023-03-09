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
				<ChatList post={community} />
				<NewChat post={community} />
			</Box>
		</div>
	);
}
