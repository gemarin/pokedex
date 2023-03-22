import React, {
	useState,
	Dispatch,
	SetStateAction,
	useRef,
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

	//useRef instead of useState to avoid asynchronous updating of state
	const invalidSearchRef = useRef<boolean>(false);

	const executeSearch = async (search: string) => {
		const results = await fetchPokemon(
			search.toLowerCase()
		);
		if (results !== undefined) {
			console.log('reaches');
			setPoke(results);
			setCard(true);
			setNoSearch(false);
			setSearch('');
			if (invalidSearchRef.current) {
				console.log(invalidSearchRef)
				invalidSearchRef.current = false;
			}
		} else {
			invalidSearchRef.current = true;
		}
	};

	return (
		<HStack>
			<Input
				isInvalid={invalidSearchRef.current}
				errorBorderColor='red.300'
				placeholder='Search name/id'
				value={search}
				onChange={(e) => {
					setSearch(e.target.value);
				}}
			/>
			<Button
				onClick={() => {
					invalidSearchRef.current=false;
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
