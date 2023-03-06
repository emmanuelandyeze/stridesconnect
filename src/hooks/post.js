import {
	arrayRemove,
	arrayUnion,
	collection,
	doc,
	orderBy,
	query,
	updateDoc,
	where,
} from 'firebase/firestore';
import { db } from 'lib/firebase';
import { useState } from 'react';
import {
	useCollectionData,
	useDocumentData,
} from 'react-firebase-hooks/firestore';

export function useProfilePosts(uid) {
	console.log(uid);
	const q = query(
		collection(db, 'posts'),

		orderBy('timestamp', 'desc'),
		where('uid', '==', uid),
	);
	const [posts, isLoading, error] = useCollectionData(q);
	if (error) throw error;
	return { posts, isLoading };
}

export function usePosts() {
	const q = query(
		collection(db, 'posts'),
		orderBy('timestamp', 'desc'),
		where('type', '==', 'article'),
	);
	const [posts, isLoading, error] = useCollectionData(q);
	if (error) throw error;
	return { posts, isLoading };
}

export function useAnnouncement() {
	const q = query(
		collection(db, 'posts'),
		orderBy('timestamp', 'desc'),
		where('type', '==', 'announcement'),
	);
	const [announcement, isLoading, error] =
		useCollectionData(q);
	if (error) throw error;
	return { announcement, isLoading };
}

export function useToggleLike({ id, isLiked, uid }) {
	const [isLoading, setLoading] = useState(false);

	async function toggleLike() {
		setLoading(true);

		const docRef = doc(db, 'posts', id);
		await updateDoc(docRef, {
			likes: isLiked ? arrayRemove(uid) : arrayUnion(uid),
		});

		setLoading(false);
	}

	return { toggleLike, isLoading };
}

// export function useDeletePost() {
// 	// const [isLoading, setLoading] = useState(false);
// 	// async function deletePost() {}
// 	// return { deletePost, isLoading };
// }

export function usePost(id) {
	const q = doc(db, 'posts', id);
	const [post, isLoading] = useDocumentData(q);

	return { post, isLoading };
}


