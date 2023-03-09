import { SmallAddIcon } from '@chakra-ui/icons';
import {
	Box,
	Button,
	IconButton,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	SimpleGrid,
	Text,
	Textarea,
	useDisclosure,
} from '@chakra-ui/react';
import PostsList from 'components/post/PostsList';
import {
	useAnnouncement,
	useCommunity,
	usePosts,
} from 'hooks/post';
import { PROTECTED } from 'lib/routes';
import React from 'react';
import { Link } from 'react-router-dom';
import TextAreaAutosize from 'react-textarea-autosize';

import {
	Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel,
} from '@chakra-ui/react';
import AnnounceList from 'components/post/AnnounceList';
import {
	MdOutlineArticle,
	MdOutlineDraw,
} from 'react-icons/md';

import { AiFillAudio } from 'react-icons/ai';
import Announcement from 'components/create/Announcement';
import {
	Skeleton,
	SkeletonCircle,
	SkeletonText,
} from '@chakra-ui/react';
import { BallTriangle } from 'react-loader-spinner';
import CommunityList from 'components/post/CommunityList';

export default function Dashboard() {
	const { posts, isLoading } = usePosts();
	const { announcement, isLoading: announcementLoading } =
		useAnnouncement();
	const { community, isLoading: communityLoading } =
		useCommunity();
	const { isOpen, onOpen, onClose } = useDisclosure();
	if (isLoading)
		return (
			<div
				style={{
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
			<Tabs>
				<TabList alignItems={'center'}>
					<Tab
						_selected={{
							color: 'purple.800',
							fontWeight: 'bold',
							borderBottom: '3px solid purple',
						}}
						style={{ width: '50%', height: '4rem' }}
					>
						Reads for you
					</Tab>
					<Tab
						_selected={{
							color: 'purple.800',
							fontWeight: 'bold',
							borderBottom: '3px solid purple',
						}}
						style={{ width: '50%', height: '4rem' }}
					>
						Community
					</Tab>
				</TabList>

				<TabPanels>
					<TabPanel>
						<PostsList posts={posts} />
					</TabPanel>
					<TabPanel>
						<CommunityList communities={community} />
					</TabPanel>
				</TabPanels>
			</Tabs>
		</div>
	);
}
