import { Box, Text } from '@chakra-ui/react';
import Post from 'components/post';
import { usePost } from 'hooks/post';
import React from 'react';
import { useParams } from 'react-router-dom';
import CommentList from './CommentList';
import NewComment from './NewComment';

export default function Comments() {
	const { id } = useParams();
	const { post, isLoading } = usePost(id);

	if (isLoading) return <Text>Loading comments...</Text>;

	return (
		<div>
			<Box align="left">
				<Post post={post} />
				<CommentList post={post} />
				<NewComment post={post} />
			</Box>
		</div>
	);
}
