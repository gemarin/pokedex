import React, { useState } from 'react';
import {
	ChakraProvider,
	Box,
	Button,
	Stack,
	Alert,
	AlertIcon,
	extendTheme,
	Image,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';

//image assets
import waitingGif from './assets/waiting.gif';

//components
import Search from './components/Search';
import Pokecard from './components/Pokecard';
import SidebarPoke from './components/SidebarPoke';

//unique id generator
import { v4 as uuidv4 } from 'uuid';

const theme = extendTheme({
	fonts: {
		heading: `'Press Start 2P', cursive`,
		body: `'Press Start 2P', cursive`,
	},
});

// TODO: Write some unit tests if you have time.
// TODO: error handling in API.js
// TODO: check validate input

export interface pokemon {
	name?: string;
	id: number | string;
	stats?: string[];
	img: string;
	types?: string[];
}

export const App = () => {
	//States
	const [pokeList, setPokeList] = useState<pokemon[]>([]);

	//Before state (no search has happened)
	const [noSearchYet, setNoSearchYet] = useState(true);

	//Individual Pokemon
	const [displayPoke, setDisplayPoke] = useState<pokemon>({
		name: '',
		id: 0,
		stats: [''],
		img: '',
		types: [''],
	});

	const updatePokeList = () => {
		if (pokeList.length <= 5) {
			let newId = uuidv4();
			setPokeList((prev) => {
				return [
					...prev,
					{ id: newId, img: `${displayPoke.img}?${newId}` },
				];
			});
		} else {
			<Alert status='error'>
				<AlertIcon />
				Maximum hit!
			</Alert>;
		}
	};

	return (
		<ChakraProvider theme={theme}>
			<ColorModeSwitcher justifySelf='flex-end' />
			<Box
				position='fixed'
				top='50%'
				left='50%'
				transform='translate(-50%, -50%)'
				maxW='700px'
				w='100%'
				maxH='700px'
				h='100%'
			>
				<Stack direction='row' align='center' flex='center'>
					<Box p='4' boxShadow='outline' rounded='md'>
						<Stack
							flex='1'
							spacing='20%'
							direction='column'
							align='center'
							// flex='center'
						>
							{/* Search bar  - handles search and enter search button*/}
							<Search
								setPoke={setDisplayPoke}
								setNoSearch={setNoSearchYet}
							/>
							{/* Display results from search in pokecard */}
							{noSearchYet ? (
								<>
									<Image
										src={waitingGif}
										alt='Snorlax Waving'
										width='200px'
										height='200px'
									/>
									Search Something!
								</>
							) : (
								<Pokecard
									name={displayPoke.name!}
									types={displayPoke.types!}
									id={displayPoke.id}
									stats={displayPoke.stats!}
									imgName={displayPoke.img}
								/>
							)}
							{/* capture button to add to sidebar */}
							<Button
								width='100%'
								onClick={() => {
									!noSearchYet && updatePokeList();
								}}
								_active={{ color: noSearchYet && 'tomato' }}
							>
								Capture
							</Button>
						</Stack>
					</Box>
					{/* sidebar that handles state of current captured poke and removes them when clicked */}
					{pokeList.length > 0 && (
						<SidebarPoke
							capturedPoke={pokeList}
							setPokeList={setPokeList}
							pokeList={pokeList}
						/>
					)}
				</Stack>
			</Box>
		</ChakraProvider>
	);
};
