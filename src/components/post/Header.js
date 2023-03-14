import { Text } from '@chakra-ui/react';
import Avatar from 'components/profile/Avatar';
import { useUser } from 'hooks/users';
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';
import { PROTECTED } from 'lib/routes';

export default function Header({ post }) {
	const { uid, date, tag } = post;
	const { user, isLoading } = useUser(tag);

	if (!isLoading)
		return (
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'space-between',
					marginBottom: '.5rem',
				}}
			>
				<Link
					to={`/${user?.tag}`}
					style={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
					}}
				>
					<Avatar user={user} size="xs" />
					<div>
						<Text ml={'1'} fontSize={'xs'}>
							{user.username}
						</Text>
					</div>
				</Link>
				<div>
					<Text fontSize={'xs'}>
						{formatDistanceToNow(date)} ago
					</Text>
				</div>
			</div>
		);
}
