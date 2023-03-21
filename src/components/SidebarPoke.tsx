import React, { Dispatch, SetStateAction } from 'react';

import { Image } from '@chakra-ui/react';

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
		<div >
			{capturedPoke.map((poke) => {
				return (
					<Image
						backgroundColor={'gray.200'}
						// loading='lazy'
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
		</div>
	);
};

export default SidebarPoke;
