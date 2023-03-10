import React, { useRef, useState } from 'react';
import { domToReact } from 'html-react-parser';
import { Fragment } from 'react';
import { ArrowUpIcon } from '@chakra-ui/icons';
import TextAreaAutosize from 'react-textarea-autosize';

import { db, storage } from 'lib/firebase';
import { uuidv4 } from '@firebase/util';
import {
	addDoc,
	collection,
	doc,
	serverTimestamp,
	updateDoc,
} from 'firebase/firestore';
import {
	ref,
	getDownloadURL,
	uploadString,
} from 'firebase/storage';
import { useAuth } from 'hooks/auth';
import {
	Button,
	Img,
	Select,
	Textarea,
	useToast,
} from '@chakra-ui/react';

import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import { PROTECTED } from 'lib/routes';

import { BsCameraFill } from 'react-icons/bs';




const options = {
	replace: ({ attribs, children }) => {
		if (!attribs) {
			return;
		}

		if (attribs.h1) {
			return (
				<h1 style={{ fontSize: 42 }}>
					{domToReact(children, options)}
				</h1>
			);
		}

		if (attribs.h1) {
			return (
				<span style={{ color: 'black' }}>
					{domToReact(children, options)}
				</span>
			);
		}
	},
};

function Announcement() {
	const { user, isLoading: authLoading } = useAuth();
	const filePickerRef = useRef(null);
	const nicheRef = useRef(null);
	const bodyRef = useRef(null);
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

		const docRef = await addDoc(collection(db, 'posts'), {
			username: user.username,
			body: bodyRef.current.value,
			profileImg: user.avatar,
			timestamp: serverTimestamp(),
			niche: nicheRef.current.value,
			type: 'announcement',
			uid: user.id,
			likes: [],
			date: Date.now(),
		});

		console.log('New doc added with id', docRef.id);

		const imageRef = ref(
			storage,
			`announcement/${docRef.id}/image`,
		);

		await uploadString(
			imageRef,
			selectedFile,
			'data_url',
		).then(async (snapshot) => {
			const downloadURL = await getDownloadURL(imageRef);
			if (!downloadURL) {
				await updateDoc(doc(db, 'posts', docRef.id), {
					image: '',
				});
			} else {
				await updateDoc(doc(db, 'posts', docRef.id), {
					image: downloadURL,
					id: docRef.id,
				});
			}
		});

		setLoading(false);
		setSelectedFile(null);

		navigate(`${PROTECTED}/dashboard`);
		toast({
			title: 'Announcement published successfully!',
			status: 'success',
			isClosable: true,
			position: 'top',
			duration: 5000,
		});
	};

	const uploadPostWithoutImage = async () => {
		if (loading) return;
		setLoading(true);

		const docRef = await addDoc(collection(db, 'posts'), {
			username: user.username,
			body: bodyRef.current.value,
			profileImg: user.avatar,
			timestamp: serverTimestamp(),
			niche: nicheRef.current.value,
			type: 'announcement',
			uid: user.id,
			likes: [],
			date: Date.now(),
			id: uuidv4(),
		});

		await updateDoc(doc(db, 'posts', docRef.id), {
			id: docRef.id,
		});

		setLoading(false);
		setSelectedFile(null);

		navigate(`${PROTECTED}/dashboard`);
		toast({
			title: 'Announcement published successfully!',
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
		<>
			<div>
				<input
					ref={filePickerRef}
					type="file"
					hidden
					onChange={addImageToPost}
				/>
			</div>

			<div style={{ border: '1px solid gray' }}>
				<Textarea
					as={TextAreaAutosize}
					resize="none"
					mt="0"
					placeholder="Make an announcement..."
					minRows={3}
					borderRadius="5"
					style={{ width: '100%', border: 'none' }}
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
							loadingText="Uploading..."
						>
							Upload Post
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
								onClick={() => uploadPostWithoutImage()}
								style={{}}
								isLoading={loading}
								loadingText="Uploading..."
							>
								Upload Post
							</Button>
						</div>
					</>
				)}
			</div>
		</>
	);
}

export default Announcement;
