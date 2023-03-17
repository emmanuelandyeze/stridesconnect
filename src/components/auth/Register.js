import {
	Box,
	Button,
	Center,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Input,
	InputGroup,
	InputRightElement,
	Link,
	Text,
} from '@chakra-ui/react';
import { useRegister } from 'hooks/auth';
import { DASHBOARD, LOGIN } from 'lib/routes';
import React from 'react';
import { useForm } from 'react-hook-form';
import {
	emailValidate,
	passwordValidate,
} from 'utils/form-validate';

export default function Login() {
	const { register: signup, isLoading } = useRegister();
	const [show, setShow] = React.useState(false);
	const handleClick = () => setShow(!show);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	async function handleRegister(data) {
		const suceeded = await signup({
			username: data.username,
			email: data.email,
			password: data.password,
			redirectTo: DASHBOARD,
		});

		if (suceeded) reset();
	}

	return (
		<Center w="100%" h="100vh">
			<Box
				mx="1"
				maxW="lg"
				p="9"
				borderWidth="1px"
				borderRadius="lg"
				width={'150%'}
			>
				<Heading>Register</Heading>
				<form onSubmit={handleSubmit(handleRegister)}>
					<FormControl isInvalid={errors.username} py="2">
						<FormLabel>Username</FormLabel>
						<Input
							type="text"
							placeholder="Choose a unique username"
							{...register('username')}
						/>
						<FormErrorMessage>
							{errors.username && errors.username.message}
						</FormErrorMessage>
					</FormControl>
					<FormControl isInvalid={errors.email} py="2">
						<FormLabel>Email Address</FormLabel>
						<Input
							type="email"
							placeholder="user@email.com"
							{...register('email', emailValidate)}
						/>
						<FormErrorMessage>
							{errors.email && errors.email.message}
						</FormErrorMessage>
					</FormControl>
					<FormControl isInvalid={errors.password} py="2">
						<FormLabel>Password</FormLabel>
						<InputGroup size="md">
							<Input
								type={show ? 'text' : 'password'}
								placeholder="Enter password"
								{...register('password', passwordValidate)}
							/>
							<InputRightElement width="4.5rem">
								<Button
									h="1.75rem"
									size="sm"
									onClick={handleClick}
								>
									{show ? 'Hide' : 'Show'}
								</Button>
							</InputRightElement>
						</InputGroup>
						<FormErrorMessage>
							{errors.password && errors.password.message}
						</FormErrorMessage>
					</FormControl>
					<Button
						mt="4"
						type="submit"
						colorScheme="purple"
						size="md"
						w="full"
						isLoading={isLoading}
						loadingText="Signing Up..."
					>
						Sign Up
					</Button>
				</form>
				<Text fontSize="xlg" align="center" mt="6">
					Already have an account?{' '}
					<Link
						color="purple.800"
						fontWeight="md"
						textDecor="underline"
						_hover={{ background: 'purple.200' }}
						href={LOGIN}
					>
						Login
					</Link>
				</Text>
			</Box>
		</Center>
	);
}
