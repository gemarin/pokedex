import React, { Dispatch, SetStateAction } from 'react';

import { Image, Heading, Box } from '@chakra-ui/react';

import { pokemon } from '../App';

type Dispatcher<S> = Dispatch<SetStateAction<S>>;
type Props = {
	capturedPoke: pokemon[];
	setPokeList: Dispatcher<pokemon[]>;
	pokeList: pokemon[];
};

const SidebarPoke: React.FC<Props> = ({
	capturedPoke,
	setPokeList,
	pokeList,
}) => {
	const releasePoke = (imageSrc: string) => {
		setPokeList(
			pokeList.filter((poke) => poke.img !== imageSrc)
		);
	};

	return (
		<Box
			p='4'
			boxShadow='outline'
			rounded='md'
			maxW='200px'
			w='100%'
			maxH='900px'
			h='100%'
		>
			<Heading size='md'>Captured</Heading>
			<Box>
				{capturedPoke.map((poke) => {
					return (
						<Image
							backgroundColor={'gray.200'}
							key={poke.id}
							height='auto'
							alt='Captured Pokemon'
							src={poke.img}
							objectFit='cover'
							borderRadius='base'
							onClick={(e) => {
								releasePoke(
									(e.target as HTMLMediaElement).src
								);
							}}
						/>
					);
				})}
			</Box>
		</Box>
	);
};

export default SidebarPoke;
