import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import Post from '.';
import Announce from './Announce';

export default function AnnounceList({ announcements }) {
	return (
		<Box
			px="0"
			style={{ alignSelf: 'center', width: '100%' }}
		>
			{announcements?.length === 0 ? (
				<Text fontSize={'xl'} textAlign={'center'}>
					No post yet... Choose what you want to see
				</Text>
			) : (
				announcements?.map((post) => (
					<Announce key={post.id} post={post} />
				))
			)}
		</Box>
	);
}
