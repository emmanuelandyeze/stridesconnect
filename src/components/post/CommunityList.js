import {
	Box,
	Button,
	Img,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Select,
	SimpleGrid,
	Text,
	Textarea,
	useDisclosure,
	useToast,
} from '@chakra-ui/react';
import {
	addDoc,
	collection,
	doc,
	serverTimestamp,
	updateDoc,
} from 'firebase/firestore';
import {
	getDownloadURL,
	ref,
	uploadString,
} from 'firebase/storage';
import { useAuth } from 'hooks/auth';
import { db, storage } from 'lib/firebase';
import { PROTECTED } from 'lib/routes';
import React, { useRef, useState } from 'react';
import { AiFillAudio, AiOutlinePlus } from 'react-icons/ai';
import { BsCameraFill } from 'react-icons/bs';
import {
	MdOutlineArticle,
	MdOutlineDraw,
} from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import reactTextareaAutosize from 'react-textarea-autosize';
import Post from '.';
import Announce from './Announce';

export default function CommunityList({ communities }) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { user, isLoading: authLoading } = useAuth();
	const filePickerRef = useRef(null);
	const nicheRef = useRef(null);
	const bodyRef = useRef(null);
	const titleRef = useRef(null);
	const [loading, setLoading] = useState(false);
	const [selectedFile, setSelectedFile] = useState(null);
	const navigate = useNavigate();
	const toast = useToast();

	const addImageToPost = (e) => {
		const reader = new FileReader();
		if (e.target.files[0]) {
			reader.readAsDataURL(e.target.files[0]);
		}

		reader.onload = (readerEvent) => {
			setSelectedFile(readerEvent.target.result);
		};
	};

	const uploadPost = async () => {
		if (loading) return;

		setLoading(true);

		const docRef = await addDoc(
			collection(db, 'community'),
			{
				username: user.username,
				body: bodyRef.current.value,
				profileImg: user.avatar,
				timestamp: serverTimestamp(),
				niche: nicheRef.current.value,
				title: titleRef.current.value,
				uid: user.id,
				likes: [],
				date: Date.now(),
			},
		);

		console.log('New doc added with id', docRef.id);

		const imageRef = ref(
			storage,
			`community/${docRef.id}/image`,
		);

		await uploadString(
			imageRef,
			selectedFile,
			'data_url',
		).then(async (snapshot) => {
			const downloadURL = await getDownloadURL(imageRef);
			if (!downloadURL) {
				await updateDoc(doc(db, 'community', docRef.id), {
					image: '',
				});
			} else {
				await updateDoc(doc(db, 'community', docRef.id), {
					image: downloadURL,
					id: docRef.id,
				});
			}
		});

		setLoading(false);
		setSelectedFile(null);

		navigate(`${PROTECTED}/dashboard`);
		toast({
			title: 'Community created successfully!',
			status: 'success',
			isClosable: true,
			position: 'top',
			duration: 5000,
		});
	};

	const uploadPostWithoutImage = async () => {
		if (loading) return;
		setLoading(true);

		const docRef = await addDoc(
			collection(db, 'community'),
			{
				username: user.username,
				body: bodyRef.current.value,
				profileImg: user.avatar,
				timestamp: serverTimestamp(),
				niche: nicheRef.current.value,
				type: 'announcement',
				uid: user.id,
				likes: [],
				date: Date.now(),
				title: titleRef.current.value,
			},
		);

		await updateDoc(doc(db, 'community', docRef.id), {
			id: docRef.id,
		});

		setLoading(false);
		setSelectedFile(null);

		navigate(`${PROTECTED}/dashboard`);
		toast({
			title: 'Community created successfully!',
			status: 'success',
			isClosable: true,
			position: 'top',
			duration: 5000,
		});
	};
	if (authLoading) {
		return 'Loading...';
	}
	return (
		<Box
			px="0"
			style={{ alignSelf: 'center', width: '100%' }}
		>
			<Button
				style={{
					position: 'fixed',
					bottom: 20,
					right: 30,
					paddingTop: '2rem',
					paddingBottom: '2rem',
					borderRadius: '10px',
					zIndex: 1000,
				}}
				onClick={onOpen}
			>
				<AiOutlinePlus
					style={{ width: '3rem', height: '3rem' }}
					color="purple.500"
				/>
			</Button>
			<Modal
				isCentered
				onClose={onClose}
				isOpen={isOpen}
				motionPreset="slideInBottom"
				size={'full'}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Create your community</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<div>
							<input
								ref={filePickerRef}
								type="file"
								hidden
								onChange={addImageToPost}
							/>
						</div>

						<div style={{}}>
							<Textarea
								as={reactTextareaAutosize}
								resize="none"
								mt="0"
								placeholder="Name of your community"
								minRows={2}
								borderRadius="5"
								style={{
									width: '100%',
									border: '1px solid gray',
									marginBottom: '1rem',
								}}
								ref={titleRef}
							/>
							<Textarea
								as={reactTextareaAutosize}
								resize="none"
								mt="0"
								placeholder="Describe the aim of your community..."
								minRows={3}
								borderRadius="5"
								style={{
									width: '100%',
									border: '1px solid gray',
								}}
								ref={bodyRef}
							/>
							{selectedFile ? (
								<div
									style={{
										display: 'flex',
										flexDirection: 'row',
										justifyContent: 'space-between',
										alignItems: 'center',
										// borderTop: '1px solid #808080',
										paddingRight: '1rem',
									}}
								>
									<div
										style={{
											display: 'flex',
											flexDirection: 'row',
											justifyContent: 'space-between',
											alignItems: 'start',
											paddingLeft: '1rem',
											paddingRight: '3rem',
										}}
									>
										<Img
											src={selectedFile}
											onClick={() => setSelectedFile(null)}
											height="100"
											width="100"
											style={{ objectFit: 'cover' }}
										/>
									</div>
									<div
										style={{
											width: '60%',
											marginRight: '.5rem',
											marginLeft: '.5rem',
										}}
									>
										<Select
											placeholder="Select Niche"
											ref={nicheRef}
										>
											<option value="Web development">
												Web development
											</option>
											<option value="Career development">
												Career development
											</option>
											<option value="Freelancing">
												Freelancing
											</option>
										</Select>
									</div>
									<Button
										colorScheme="purple"
										onClick={() => uploadPost()}
										style={{}}
										isLoading={loading}
										loadingText="Creating..."
									>
										Create
									</Button>
								</div>
							) : (
								<>
									<div
										style={{
											display: 'flex',
											flexDirection: 'row',
											justifyContent: 'space-between',
											alignItems: 'center',
											borderTop: '1px solid #808080',
											paddingRight: '1.5rem',
										}}
									>
										<div
											onClick={() =>
												filePickerRef.current.click()
											}
											style={{
												height: '5rem',
												// width: '5rem',
												// alignSelf: 'center',
												paddingTop: '1rem',
												paddingLeft: '1rem',
												borderRadius: '50%',
												marginLeft: '1rem',
											}}
										>
											<BsCameraFill size={48} />
										</div>
										<div
											style={{
												width: '60%',
												marginRight: '.5rem',
												marginLeft: '.5rem',
											}}
										>
											<Select
												placeholder="Select Niche"
												ref={nicheRef}
											>
												<option value="Web development">
													Web development
												</option>
												<option value="Career development">
													Career development
												</option>
												<option value="Freelancing">
													Freelancing
												</option>
											</Select>
										</div>
										<Button
											colorScheme="purple"
											onClick={() =>
												uploadPostWithoutImage()
											}
											style={{}}
											isLoading={loading}
											loadingText="Creating..."
										>
											Create
										</Button>
									</div>
								</>
							)}
						</div>
					</ModalBody>
					<ModalFooter>
						<Button
							colorScheme="blue"
							mr={3}
							onClick={onClose}
						>
							Close
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
			{communities?.length === 0 ? (
				<Text
					fontSize={'xl'}
					textAlign={'center'}
					justifyContent="center"
				>
					You don't belong to any community yet
				</Text>
			) : (
				communities?.map((community) => (
					<Announce
						key={community.id}
						community={community}
					/>
				))
			)}
		</Box>
	);
}
