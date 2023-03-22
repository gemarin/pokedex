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
	setNoSearch: Dispatcher<boolean>;
	setCard: Dispatcher<boolean>;
};

const Search: React.FC<Props> = ({
	setPoke,
	setNoSearch,
	setCard,
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
			setCard(true)
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
				placeholder='Search name/id'
				value={search}
				onChange={(e) => {
					setSearch(e.target.value);
				}}
			/>
			<Button
				onClick={() => {
					setCard(false);
					executeSearch(search);

				}}
			>
				Search
			</Button>
		</HStack>
	);
};

export default Search;
