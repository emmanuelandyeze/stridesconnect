import {
	AddIcon,
	EditIcon,
	ExternalLinkIcon,
	HamburgerIcon,
	RepeatIcon,
} from '@chakra-ui/icons';
import {
	Button,
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
} from '@chakra-ui/react';
import React from 'react';
import { HiSpeakerphone } from 'react-icons/hi';

export default function Options() {
	return (
		<div>
			{/* <Menu>
				<MenuButton
					as={IconButton}
					aria-label="Options"
					icon={<HiOutlineSpeakerphone size={48} />}
					variant="outline"
				/>
				<MenuList>
					<MenuItem icon={<AddIcon />} command="⌘T">
						New Tab
					</MenuItem>
					<MenuItem
						icon={<ExternalLinkIcon />}
						command="⌘N"
					>
						New Window
					</MenuItem>
					<MenuItem icon={<RepeatIcon />} command="⌘⇧N">
						Open Closed Tab
					</MenuItem>
					<MenuItem icon={<EditIcon />} command="⌘O">
						Open File...
					</MenuItem>
				</MenuList>
			</Menu> */}
			<Button
				style={{
					padding: '2rem .5rem 2rem .5rem',
					borderRadius: '50%',
					position: 'absolute',
					// bottom: '-12rem',
					right: '1rem',
				}}
				colorScheme="purple"
				variant="outline"
			>
				<HiSpeakerphone size={48} />
			</Button>
		</div>
	);
}
