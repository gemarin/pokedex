import React, { useState } from 'react';
import {
	ChakraProvider,
	Box,
	Button,
	Stack,
	Alert,
	AlertIcon,
	theme,
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


// TODO: Write some unit tests if you have time.
// TODO: error handling in API.js


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
	//need their image + unique Ids to delete
	//Before state (no search has happened)
	const [notEmpty, setNotEmpty] = useState(false);
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
				// position='absolute'
				// display='flex'
				// width={700}
				// height={500}
	    position= 'fixed'
      top= '50%'
      left= '50%'
      // -webkit-transform = 'translate(-50%, -50%)'
      transform= 'translate(-50%, -50%)'
			>
				<Stack direction='row' align='center' flex='center'>
					<Stack
						spacing='50%'
						direction='column'
						align='center'
						flex='center'
					>
						{/* Search bar  - handles search and enter search button*/}
						<Search
							setPoke={setDisplayPoke}
							setNotEmpty={setNotEmpty}
						/>
						{/* Display results from search in pokecard */}
						{notEmpty ? (
							<Pokecard
								name={displayPoke.name!}
								types={displayPoke.types!}
								id={displayPoke.id}
								stats={displayPoke.stats!}
								imgName={displayPoke.img}
							/>
						) : (
							<>
								<Image
									src={waitingGif}
									alt='Snorlax Waving'
								/>
								Search Something!
							</>
						)}
						{/* capture button to add to sidebar */}
						<Button
              width='100%'
							onClick={() => {
								notEmpty
									? updatePokeList()
									: console.log('search something!');
							}}
						>
							Capture
						</Button>
					</Stack>
					{/* sidebar that handles state of current captured poke and removes them when clicked */}
					<SidebarPoke
						capturedPoke={pokeList}
						setPokeList={setPokeList}
						pokeList={pokeList}
					/>
				</Stack>
			</Box>
		</ChakraProvider>
	);
};
