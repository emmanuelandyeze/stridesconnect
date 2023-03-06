import {
	Box,
	Button,
	Center,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Input,
	Link,
	Text,
} from '@chakra-ui/react';
import { useLogin } from 'hooks/auth';
import { DASHBOARD, REGISTER } from 'lib/routes';
import React from 'react';
import { useForm } from 'react-hook-form';
import {
	emailValidate,
	passwordValidate,
} from 'utils/form-validate';

export default function Login() {
	const { login, isLoading } = useLogin();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	async function handleLogin(data) {
		const suceeded = await login({
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
				maxW="md"
				p="9"
				borderWidth="1px"
				borderRadius="lg"
				width={'150%'}
			>
				<Heading>Log in</Heading>
				<form onSubmit={handleSubmit(handleLogin)}>
					<FormControl isInvalid={errors.email} py="2">
						<FormLabel></FormLabel>
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
						<FormLabel></FormLabel>
						<Input
							type="password"
							placeholder="********"
							{...register('password', passwordValidate)}
						/>
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
						loadingText="Logging in..."
					>
						Log In
					</Button>
				</form>
				<Text fontSize="xlg" align="center" mt="6">
					Don't have an account?{' '}
					<Link
						color="purple.800"
						fontWeight="md"
						textDecor="underline"
						_hover={{ background: 'purple.200' }}
						href={REGISTER}
					>
						Register
					</Link>
				</Text>
			</Box>
		</Center>
	);
}
