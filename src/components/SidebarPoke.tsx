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
	//delete pokemon from pokelist
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
			<Heading textAlign='center' fontSize='lg'>
				Captured
			</Heading>
			<span>
				{capturedPoke.map((poke) => {
					return (
						<Image
							_hover={{
								backgroundColor: 'gray.100',
							}}
							backgroundColor={'gray.300'}
							mt='1'
							ml='12'
							key={poke.id}
							width='65px'
							height='65px'
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
			</span>
		</Box>
	);
};

export default SidebarPoke;
