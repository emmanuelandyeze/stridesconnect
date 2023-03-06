import { Box, Text } from '@chakra-ui/react';
import { useComments } from 'hooks/comments';
import React from 'react';
import Comment from './Comment';

export default function CommentList({ post }) {
	const { id } = post;
	const { comments, isLoading } = useComments(id);

	if (!isLoading)
		return (
			<Box>
				{comments.map((comment) => (
					<Comment key={comment.id} comment={comment} />
				))}
			</Box>
		);
}
