import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import Post from '.';

export default function PostsList({ posts }) {
	return (
		<Box
			px="0"
			style={{ alignSelf: 'center', width: '100%' }}
		>
			{posts?.length === 0 ? (
				<Text fontSize={'xl'} textAlign={'center'}>
					No post yet... Choose what you want to see
				</Text>
			) : (
				posts?.map((post) => (
					<Post key={post.id} post={post} />
				))
			)}
		</Box>
	);
}
