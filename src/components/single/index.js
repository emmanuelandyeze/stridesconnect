import { Box, Flex, Img, Text } from '@chakra-ui/react';
// import Post from 'components/post';
import { usePost } from 'hooks/post';
import React from 'react';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import Actions from 'components/post/Actions';
import Header from 'components/post/Header';
import Navbar from 'components/layout/Navbar';
import Sidebar from 'components/layout/Sidebar';
import Rightbar from 'components/layout/Rightbar';
import { useAuth } from 'hooks/auth';
import { BallTriangle } from 'react-loader-spinner';

export default function Article() {
	const { id } = useParams();
	const { post, isLoading } = usePost(id);
	const { user, isLoading: authLoading } = useAuth();

	if (isLoading)
		return (
			<div
				style={{
					border: '1px solid #000',
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100vh',
				}}
			>
				<BallTriangle
					height={100}
					width={100}
					radius={5}
					color="purple"
					ariaLabel="ball-triangle-loading"
					wrapperClass={{}}
					wrapperStyle=""
					visible={true}
				/>
			</div>
		);

	return (
		<div>
			<Navbar />
			<Flex
				pt="16"
				pb="12"
				mx="auto"
				w="full"
				maxW="1200px"
			>
				<Sidebar />
				<Box w="900px">
					<Box px={'6'}>
						{/* <Post post={post} /> */}
						<Box>
							<Box
								style={{
									borderBottom: '1px solid',
									paddingTop: '1rem',
								}}
								borderColor="gray.200"
								// height={'5rem'}
								py={'1.5'}
							>
								<Header post={post} />
							</Box>
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
									marginBottom: '1rem',
								}}
							/>

							<Box pt={'1.5'}>
								<Text pb="5">{parse(post.body)}</Text>
							</Box>
							{user ? (
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
							) : (
								<div></div>
							)}
						</Box>
						{/* <NewComment post={post} />
				<CommentList post={post} /> */}
					</Box>
				</Box>
				<Rightbar />
			</Flex>
		</div>
	);
}
