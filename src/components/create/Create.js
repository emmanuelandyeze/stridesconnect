import React, { useRef, useState } from 'react';
import { domToReact } from 'html-react-parser';
import { Fragment } from 'react';


import { db, storage } from 'lib/firebase';
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

const modules = {
	toolbar: [
		[{ header: '1' }, { header: '2' }, { font: [] }],
		[{ size: [] }],
		[
			'bold',
			'italic',
			'underline',
			'strike',
			'blockquote',
			'code-block',
		],
		[
			{ list: 'ordered' },
			{ list: 'bullet' },
			{ indent: '-1' },
			{ indent: '+1' },
		],
		['link', 'image', 'video'],
		['clean'],
	],
	clipboard: {
		matchVisual: false,
	},
};

const formats = [
	'font',
	'size',
	'bold',
	'italic',
	'underline',
	'strike',
	'color',
	'background',
	'script',
	'header',
	'blockquote',
	'code-block',
	'indent',
	'list',
	'direction',
	'align',
	'link',
	'image',
	'video',
	'formula',
];

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

		if (attribs.a) {
			return (
				<span style={{ color: 'blue' }}>
					{domToReact(children, options)}
				</span>
			);
		}
	},
};

function Create() {
	const { user, isLoading } = useAuth();
	const [value, setValue] = useState('');
	const filePickerRef = useRef(null);
	const titleRef = useRef(null);
	const descriptionRef = useRef(null);
	const nicheRef = useRef(null);
	const bodyRef = useRef(null);
	const [loading, setLoading] = useState(false);
	const [selectedFile, setSelectedFile] = useState(null);
	const [selected, setSelected] = useState();
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
	console.log(value);

	const uploadPost = async () => {
		if (loading) return;

		setLoading(true);

		const docRef = await addDoc(collection(db, 'posts'), {
			username: user.username,
			title: titleRef.current.value,
			description: descriptionRef.current.value,
			body: value,
			profileImg: user.avatar,
			timestamp: serverTimestamp(),
			niche: nicheRef.current.value,
			type: 'article',
			uid: user.id,
			likes: [],
			date: Date.now(),
			tag: user.tag,
		});

		console.log('New doc added with id', docRef.id);

		const imageRef = ref(
			storage,
			`posts/${docRef.id}/image`,
		);

		await uploadString(
			imageRef,
			selectedFile,
			'data_url',
		).then(async (snapshot) => {
			const downloadURL = await getDownloadURL(imageRef);
			await updateDoc(doc(db, 'posts', docRef.id), {
				image: downloadURL,
				id: docRef.id,
			});
		});

		setLoading(false);
		setSelectedFile(null);

		navigate(`${PROTECTED}/dashboard`);
		toast({
			title: 'Article published successfully!',
			status: 'success',
			isClosable: true,
			position: 'top',
			duration: 5000,
		});
	};
	// if (loading) {
	// 	return 'Posting announcement...';
	// }
	return (
		<div style={{ paddingTop: '5rem' }}>
			<div>
				<input
					ref={filePickerRef}
					type="file"
					hidden
					onChange={addImageToPost}
				/>
			</div>

			{selectedFile ? (
				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'start',
						paddingLeft: '1rem',
						paddingRight: '3rem',
						width: '100%',
					}}
				>
					<Img
						src={selectedFile}
						onClick={() => setSelectedFile(null)}
						height="250"
						width="250"
					/>
				</div>
			) : (
				<>
					<div
						onClick={() => filePickerRef.current.click()}
						style={{
							height: '5rem',
							width: '5rem',
							border: '1px solid #808080',
							alignSelf: 'center',
							paddingTop: '1rem',
							paddingLeft: '1rem',
							borderRadius: '5%',
							marginLeft: '1rem',
						}}
					>
						<BsCameraFill size={48} />
					</div>
				</>
			)}

			<div>
				<div
					style={{
						// marginLeft: '1rem',
						display: 'flex',
						flexDirection: 'column',
						width: '100%',
					}}
				>
					<Textarea
						type="text"
						placeholder="Enter Title"
						ref={titleRef}
						style={{
							fontSize: '2rem',
							marginBottom: '.5rem',
							marginTop: '1rem',
							paddingLeft: '1rem',
							border: 'none',
						}}
					/>
					<Textarea
						type="text"
						placeholder="Enter Description"
						ref={descriptionRef}
						style={{
							fontSize: '1.2rem',
							marginBottom: '.3rem',
							marginTop: '.3rem',
							border: 'none',
							paddingLeft: '1rem',
						}}
					/>
				</div>
				<div
					style={{
						width: '60%',
						marginRight: '.5rem',
						marginBottom: '1rem',
					}}
				>
					<Select placeholder="Select Niche" ref={nicheRef}>
						<option value="Web development">
							Web development
						</option>
						<option value="Career development">
							Career development
						</option>
						<option value="Freelancing">Freelancing</option>
						<option value="Finance">Finance</option>
						<option value="Food">Food</option>
						<option value="History">History</option>
						<option value="Architecture">
							Architecture
						</option>
						<option value="Artificial Intelligence">
							Artificial Intelligence
						</option>
						<option value="Art">Art</option>
						<option value="Books and Reading">
							Books and Reading
						</option>
						<option value="Business">Business</option>
						<option value="Cooking">Cooking</option>
						<option value="Creative & Design">
							Creative & Design
						</option>
						<option value="Economics">Economics</option>
						<option value="Education">Education</option>
						<option value="Entrepreneurship">
							Entrepreneurship
						</option>
						<option value="Fashion">Fashion</option>
						<option value="Fiction">Fiction</option>
						<option value="Gaming">Gaming</option>
						<option value="Health">Health</option>
						<option value="Humour">Humour</option>
						<option value="Leadership">Leadership</option>
						<option value="Life & Life Lessons">
							Life & Life Lessons
						</option>
						<option value="Love">Love</option>
						<option value="Mental Health">
							Mental Health
						</option>
						<option value="Movies">Movies</option>
						<option value="Music">Music</option>
						<option value="Parenting">Parenting</option>
						<option value="Personal Stories">
							Personal Stories
						</option>
						<option value="Politics">Politics</option>
						<option value="Productivity">
							Productivity
						</option>
						<option value="Satire">Satire</option>
						<option value="Science">Science</option>
						<option value="Self Improvement">
							Self Improvement
						</option>
						<option value="Social Media">
							Social Media
						</option>
						<option value="Space">Space</option>
						<option value="Sports">Sports</option>
						<option value="Technology">Technology</option>
						<option value="Travel">Travel</option>
						<option value="Writing">Writing</option>
					</Select>
				</div>

				<ReactQuill
					theme="snow"
					value={value}
					onChange={setValue}
					modules={modules}
					formats={formats}
					placeholder="Write your ideas here..."
					options={options}
				/>

				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between',
						marginTop: '1rem',
						paddingRight: '1rem',
					}}
				>
					<div></div>
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
			</div>
		</div>
	);
}

export default Create;
