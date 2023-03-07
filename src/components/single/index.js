import { Box, Img, Text } from '@chakra-ui/react';
// import Post from 'components/post';
import { usePost } from 'hooks/post';
import React from 'react';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import Actions from 'components/post/Actions';
import Header from 'components/post/Header';

export default function Article() {
	const { id } = useParams();
	const { post, isLoading } = usePost(id);

	if (!isLoading)
		return (
			<div>
				<Box px={'5'}>
					{/* <Post post={post} /> */}
					<Box>
						<Text
							fontSize={'2xl'}
							fontWeight={'bold'}
							style={{
								paddingTop: '1rem',
							}}
						>
							{post.title}
						</Text>
						<Text
							fontStyle={'italic'}
							style={{
								paddingBottom: '1rem',
							}}
						>
							{post.description}
						</Text>
						<Img
							align={'center'}
							src={post.image}
							style={{
								width: '100%',
								height: '15rem',
								objectFit: 'cover',
							}}
						/>
						<Box
							style={{ borderBottom: '1px solid' }}
							borderColor="gray.200"
							// height={'5rem'}
							py={'1.5'}
						>
							<Header post={post} />
						</Box>
						<Box pt={'1.5'}>
							<Text pb="5">{parse(post.body)}</Text>
						</Box>
						<Box
							style={{
								width: '50%',
								position: 'fixed',
								bottom: 8,
								backgroundColor: '#f1f1f1',
								borderRadius: '5px',
								left: 135,
							}}
						>
							<Actions post={post} />
						</Box>
					</Box>
					{/* <NewComment post={post} />
				<CommentList post={post} /> */}
				</Box>
			</div>
		);
}
