import { Flex, IconButton } from '@chakra-ui/react';
import { useAuth } from 'hooks/auth';
import { useComments } from 'hooks/comments';
import { useToggleLike } from 'hooks/post';
import { PROTECTED } from 'lib/routes';
import React from 'react';
import {
	BsBookmarkPlus,
	BsFillBookmarkHeartFill,
} from 'react-icons/bs';
import {
	FaRegHeart,
	FaHeart,
	FaRegComment,
	FaComment,
	FaTrash,
	FaRegCommentAlt,
	FaCommentAlt,
	FaShareAlt,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ShareSocial } from 'react-share-social';

export default function Actions({ post }) {
	const { id, likes } = post;
	const { user, isLoading: userLoading } = useAuth();
	const isLiked = likes.includes(user?.id);

	const config = { id, isLiked, uid: user?.id };
	const { toggleLike, isLoading: likeLoading } =
		useToggleLike(config);
	// const { deletePost, isLoading: deleteLoading } =
	// 	useDeletePost(id);
	const { comments, isLoading: commentsLoading } =
		useComments(id);

	return (
		<div>
			<Flex>
				<Flex alignItems={'center'}>
					<IconButton
						size="md"
						onClick={toggleLike}
						// isLoading={likeLoading || userLoading}
						colorScheme={'red'}
						variant="ghost"
						icon={isLiked ? <FaHeart /> : <FaRegHeart />}
						isRound
					/>
					{likes.length}
				</Flex>
				<Flex alignItems={'center'} ml="2">
					<IconButton
						size="lg"
						as={Link}
						to={`${PROTECTED}/comments/${id}`}
						// isLoading={likeLoading || userLoading}
						colorScheme={'purple'}
						variant="ghost"
						icon={
							comments?.length === 0 ? (
								<FaRegCommentAlt />
							) : (
								<FaCommentAlt />
							)
						}
						isRound
					/>
					{comments?.length}
				</Flex>
				{/* <IconButton
					ml={'auto'}
					size="md"
					// onClick={deletePost}
					// isLoading={likeLoading || userLoading}
					colorScheme={'red'}
					variant="ghost"
					icon={<FaTrash />}
					isRound
					
				/> */}
				<Flex>
					<IconButton
						ml={'auto'}
						size="lg"
						// onClick={deletePost}
						// isLoading={likeLoading || userLoading}
						// colorScheme={'gray.200'}
						variant="ghost"
						icon={<BsBookmarkPlus />}
						isRound
					/>
					{/* <ShareSocial
						title={'sharing happiness'}
						url="url_to_share.com"
						socialTypes={['facebook', 'twitter']}
					/> */}
				</Flex>
			</Flex>
		</div>
	);
}
