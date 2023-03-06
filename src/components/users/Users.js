import { SimpleGrid } from '@chakra-ui/react';
import { useUsers } from 'hooks/users';
import React from 'react';

export default function Users() {
	const { users, isLoading } = useUsers();
	return (
		<div>
			<SimpleGrid
				columns={[2, 3, 4]}
				spacing={[2, 3]}
				px="10px"
				py={'6'}
			>
				{users?.map((user) => JSON.stringify(user))}
			</SimpleGrid>
		</div>
	);
}
