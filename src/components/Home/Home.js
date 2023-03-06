import { Button, Text } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
	return (
		<div>
			<Text>Welcome to Strides Connect</Text>
			<Button as={Link} to="/register">
				Get Started
			</Button>
		</div>
	);
}
