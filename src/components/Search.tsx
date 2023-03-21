import React, {
	useState,
	Dispatch,
	SetStateAction,
} from 'react';

import { Input, Button, HStack } from '@chakra-ui/react';

//interface
import { pokemon } from '../App';

//APIs
import { fetchPokemon } from '../API';

type Dispatcher<S> = Dispatch<SetStateAction<S>>;

type Props = {
	setPoke: Dispatcher<pokemon>;
	setNotEmpty: Dispatcher<boolean>;
};

const Search: React.FC<Props> = ({
	setPoke,
	setNotEmpty,
}) => {
	const [search, setSearch] = useState('');

	const executeSearch = async (search: string) => {
		const results = await fetchPokemon(
			search.toLowerCase()
		);
		if (results !== undefined) {
			setPoke(results);
			setNotEmpty(true);
			setSearch('');
		}
	};

	return (
		<HStack>
			<Input
				placeholder={'Search name or id'}
				value={search}
				onChange={(e) => {
					setSearch(e.target.value);
				}}
			/>
			<Button
				onClick={() => {
					executeSearch(search);
				}}
			>
				Search
			</Button>
		</HStack>
	);
};

export default Search;
