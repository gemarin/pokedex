import React, {
	useState,
	Dispatch,
	SetStateAction,
} from 'react';

import {
	Input,
	Button,
	HStack,
} from '@chakra-ui/react';

//interface
import { pokemon } from '../App';

//APIs
import { fetchPokemon } from '../API';

type Dispatcher<S> = Dispatch<SetStateAction<S>>;

type Props = {
	setPoke: Dispatcher<pokemon>;
	setNoSearch: Dispatcher<boolean>;
};

const Search: React.FC<Props> = ({
	setPoke,
	setNoSearch,
}) => {
	const [search, setSearch] = useState<string>('');
	const [invalidSearch, setInvalidSearch] =
		useState<boolean>(false);

	const executeSearch = async (search: string) => {
		const results = await fetchPokemon(
			search.toLowerCase()
		);
		if (results !== undefined) {
			setPoke(results);
			setNoSearch(false);
			setSearch('');
			setInvalidSearch(false);
		} else {
			setInvalidSearch(true);
		}
	};

	return (
		<HStack>
			<Input
				isInvalid={invalidSearch}
				errorBorderColor='red.300'
				placeholder={'Search name/id'}
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
