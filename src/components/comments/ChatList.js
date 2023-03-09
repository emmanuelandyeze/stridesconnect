import { Box, Text } from '@chakra-ui/react';
import { useComments } from 'hooks/comments';
import React from 'react';
import Chat from './Chat';
import Comment from './Comment';

export default function ChatList({ post }) {
	const { id } = post;
	const { comments, isLoading } = useComments(id);

	if (!isLoading)
		return (
			<Box>
				{comments.map((comment) => (
					<Chat key={comment.id} comment={comment} />
				))}
			</Box>
		);
}
