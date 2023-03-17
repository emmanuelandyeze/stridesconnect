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
			<Sidebar />
			<Flex bgColor={'white'}>
				<Box mx={'auto'} maxWidth="600px" pt={'10'} px="6">
					<Box>
						{/* <Post post={post} /> */}
						<Box>
							<Text
								fontSize={'2xl'}
								fontWeight={'bold'}
								style={{
									paddingTop: '1rem',
								}}
								fontFamily="Open Sans"
							>
								{post.title}
							</Text>
							<Text
								fontStyle={'italic'}
								fontFamily="Open Sans"
								style={{
									paddingBottom: '1rem',
								}}
							>
								{post.description}
							</Text>
							<Box
								style={{
									// borderBottom: '1px solid',
									paddingBottom: '1rem',
								}}
								borderColor="gray.200"
								// height={'5rem'}
								py={'1.5'}
							>
								<Header post={post} />
							</Box>
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
								<Text
									pb="5"
									lineHeight={'2'}
									fontFamily="Open Sans"
								>
									{parse(post.body)}
								</Text>
								{user ? (
									<Box
										style={{
											// width: '100%',
											position: 'fixed',
											bottom: 8,
											backgroundColor: '#f1f1f1',
											borderRadius: '5px',
										}}
										w="460px"
										shadow={'lg'}
									>
										<Actions post={post} />
									</Box>
								) : (
									<div></div>
								)}
							</Box>
						</Box>
					</Box>
				</Box>
			</Flex>
		</div>
	);
}
