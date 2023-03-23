import {
	ChevronDownIcon,
	HamburgerIcon,
} from '@chakra-ui/icons';
import {
	Button,
	Flex,
	HStack,
	Image,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
	Text,
	useDisclosure,
	VStack,
} from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import {
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
} from '@chakra-ui/react';

export default function Home() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = React.useRef();
	return (
		<div>
			<div
				style={{
					height: '100vh',
					backgroundColor: '#fff',
				}}
			>
				<Drawer
					isOpen={isOpen}
					placement="left"
					onClose={onClose}
					finalFocusRef={btnRef}
				>
					<DrawerOverlay />
					<DrawerContent
						style={{
							height: '100vh',
							backgroundColor: '#fff',
						}}
					>
						<DrawerCloseButton
							style={{ color: '#0A0D12' }}
						/>
						<DrawerHeader style={{ color: '#0A0D12' }}>
							Strides Connect
						</DrawerHeader>

						<DrawerBody>
							<VStack spacing={'10'} pt="10">
								<Menu>
									<MenuButton style={{ color: '#0A0D12' }}>
										Resources <ChevronDownIcon />
									</MenuButton>
									<MenuList
										style={{ backgroundColor: '#fff' }}
									>
										<MenuItem
											style={{ backgroundColor: '#fff' }}
										>
											Start a Stride
										</MenuItem>
										<MenuDivider
											style={{ backgroundColor: '#fff' }}
										/>
										<MenuItem
											style={{ backgroundColor: '#fff' }}
										>
											Earning with Strides
										</MenuItem>
										<MenuDivider />
										<MenuItem
											style={{ backgroundColor: '#fff' }}
										>
											Resource Centers
										</MenuItem>
										<MenuDivider />
										<MenuItem
											style={{ backgroundColor: '#fff' }}
										>
											Community and Program
										</MenuItem>
										<MenuDivider />
										<MenuItem
											style={{ backgroundColor: '#fff' }}
										>
											Developer
										</MenuItem>
									</MenuList>
								</Menu>
								<Menu>
									<MenuButton style={{ color: '#0A0D12' }}>
										About Us
									</MenuButton>
								</Menu>
								<Menu>
									<MenuButton style={{ color: '#0A0D12' }}>
										Partnership
									</MenuButton>
								</Menu>
							</VStack>
						</DrawerBody>
					</DrawerContent>
				</Drawer>
				<Flex
					px={{ base: '5', md: '24' }}
					style={{ backgroundColor: '#fff' }}
					alignItems={'center'}
					justifyContent={'space-between'}
					py="4"
				>
					<Text
						fontSize={{ base: '25px', md: '30px' }}
						fontFamily={'Tilt Neon'}
						style={{ color: '#0A0D12' }}
						fontWeight="bold"
					>
						Strides Connect
					</Text>
					<Flex>
						<Flex display={{ base: 'none', md: 'flex' }}>
							<HStack spacing={'10'}>
								<Menu>
									<MenuButton style={{ color: '#0A0D12' }}>
										Resources <ChevronDownIcon />
									</MenuButton>
									<MenuList
										style={{ backgroundColor: '#E2E8F0' }}
									>
										<MenuItem
											style={{ backgroundColor: '#E2E8F0' }}
										>
											Start a Stride
										</MenuItem>
										<MenuDivider
											style={{ backgroundColor: '#0A0D12' }}
										/>
										<MenuItem
											style={{ backgroundColor: '#E2E8F0' }}
										>
											Earning with Strides
										</MenuItem>
										<MenuDivider />
										<MenuItem
											style={{ backgroundColor: '#E2E8F0' }}
										>
											Resource Centers
										</MenuItem>
										<MenuDivider />
										<MenuItem
											style={{ backgroundColor: '#E2E8F0' }}
										>
											Community and Program
										</MenuItem>
										<MenuDivider />
										<MenuItem
											style={{ backgroundColor: '#E2E8F0' }}
										>
											Developer
										</MenuItem>
									</MenuList>
								</Menu>
								<Menu>
									<MenuButton style={{ color: '#0A0D12' }}>
										About Us
									</MenuButton>
								</Menu>
								<Menu>
									<MenuButton style={{ color: '#0A0D12' }}>
										Partnership
									</MenuButton>
								</Menu>
							</HStack>
						</Flex>
					</Flex>
					<Flex>
						<Button
							as={Link}
							to="/register"
							bgColor={'#FF735C'}
							color="#fff"
							_hover={{
								bgColor: '#fff',
								color: '#FF735C',
								border: '1px solid #FF735C',
							}}
							size={{ base: 'lg', md: 'lg' }}
						>
							Sign up
						</Button>
						<Button
							ref={btnRef}
							style={{ color: '#0A0D12' }}
							onClick={onOpen}
							variant="outline"
							ml={'2'}
							display={{ base: 'block', md: 'none' }}
							size={{ base: 'lg', md: 'lg' }}
						>
							<HamburgerIcon style={{ color: '#0A0D12' }} />
						</Button>
					</Flex>
				</Flex>
				<Flex
					// justifyContent={'space-between'}
					alignItems="flex-start"
					flexDirection={{ base: 'column', md: 'row' }}
				>
					<VStack
						style={{ color: '#0A0D12' }}
						// pl={{ base: '8', md: '24' }}
						px={{ base: '5', md: '24' }}
						pt={{ base: '14px', md: '36' }}
						width={{ base: '100%', md: '50%' }}
						align={'left'}
					>
						<Text
							fontSize={{ base: '40px', md: '40px' }}
							fontWeight="bold"
							fontFamily={'Tilt Neon'}
						>
							<span style={{ color: '#FF735C' }}>
								Share
							</span>{' '}
							your knowledge on a topic of interest,{' '}
							<span style={{ color: 'gold' }}>build</span>{' '}
							communities, and{' '}
							<span style={{ color: 'green' }}>grow</span>{' '}
							together.
						</Text>
						<Text
							fontSize={{ base: '20px', md: '20px' }}
							fontFamily={'Tilt Neon'}
						>
							Find communities you fit in, learn, build and
							take giant strides together!
						</Text>
						<HStack align={'flex-start'} pt="4">
							<Button
								as={Link}
								to="/register"
								bgColor={'#FF735C'}
								color="#fff"
								_hover={{
									bgColor: '#fff',
									color: '#FF735C',
									border: '1px solid #FF735C',
								}}
								size={{ base: 'lg', md: 'lg' }}
							>
								Create Strides
							</Button>
							<Button
								as={Link}
								to="/"
								_hover={{
									bgColor: '#FF735C',
									color: '#fff',
								}}
								variant={'outline'}
								border={'1px solid #FF735C'}
								color="#FF735C"
								size={{ base: 'lg', md: 'lg' }}
							>
								Find Strides to read
							</Button>
						</HStack>
					</VStack>
					<Image
						src={'/landing.jpg'}
						width={{ base: '100%', md: '45%' }}
						borderRadius="10px"
					/>
				</Flex>
			</div>
		</div>
	);
}
