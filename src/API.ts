import { pokemon } from './App';

export const STATS_TYPES = [
	'hp',
	'attack',
	'defense',
	'speed',
];

export const fetchPokemon = async (
	searchName?: string,
	searchId?: number
) => {
	const endpoint = `https://pokeapi.co/api/v2/pokemon/${
		(searchName && searchName) || (searchId && searchId)
	}`;

	//TODO: add in error handling for invalid requests

	return fetch(endpoint)
		.then((response) => {
			if (response.ok) {
				return response.json();
			}
		})
		.then((data) => {
			if (data) {
			return {
				id: data?.id,
				name: data?.name,
				img: data?.sprites.front_default,
				stats: [
					data?.stats
						.map(
							(item: { stat: any; base_stat: number }) => {
								if (
									Object.values(STATS_TYPES).includes(
										item.stat.name as string
									)
								) {
									return item.base_stat;
								}
							}
						)
						.filter((item: any) => item !== undefined),
				],
				types: [
					data?.types.map(
						(item: { type: { name: string } }) =>
							item.type.name,
						{}
					),
				],
			} as pokemon};
		}).catch(e => {console.log('not today')});
};
