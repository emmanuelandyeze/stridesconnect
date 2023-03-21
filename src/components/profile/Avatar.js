import { Avatar as ChakraAvatar } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Avatar({
	user,
	size,
	overrideAvatar = null,
}) {
	if (!user) return 'Loading...';

	return (
		<>
			<ChakraAvatar
				as={Link}
				name={user.username}
				size={size}
				src={overrideAvatar || user.avatar}
				_hover={{ cursor: 'pointer', opacity: '0.8' }}
				to={`/${user?.tag}`}
			/>
		</>
	);
}
