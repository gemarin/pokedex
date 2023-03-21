import React from 'react';

import {
	Image,
	Card,
	Stack,
	CardBody,
	CardFooter,
	Heading,
	Text,
	Badge,
	useColorModeValue,
	Stat,
	StatLabel,
	StatNumber,
	StatGroup,
    Box,
} from '@chakra-ui/react';

import { STATS_TYPES } from '../API';

type Props = {
	name: string;
	id: number | string;
	types: string[];
	stats: string[];
	imgName: string;
};

const Pokecard: React.FC<Props> = ({
	name,
	id,
	types,
	stats,
	imgName,
}) => {
	return (
		<Box
			maxW='500px'
			w='100%'
			maxH='600px'
			h='100%'
			aria-label='Display Pokemon'
		>
			<Card
				direction={{
					base: 'column',
					sm: 'row',
				}}
				overflow='hidden'
				variant='unstyled'
				size='lg'
			>
				<Image
					src={imgName}
					objectFit='contain'
					width='100px'
					height='200px'
					alt='Image of Pokemon'
					borderRadius='base'
					backgroundColor={useColorModeValue(
						'gray.700',
						'gray.400'
					)}
				/>

				<Stack
					flex={1}
					flexDirection='column'
					justifyContent='center'
					alignItems='center'
					p={1}
				>
					<CardBody>
						<Heading size='lg' textTransform='capitalize'>
							{name}
						</Heading>
						<Heading size='md'>#{id}</Heading>
						<Text pt='14'>Type:</Text>
						<>
							{types.flat().map((type) => (
								<>
									<Badge>{type}</Badge> <br />
								</>
							))}
						</>
					</CardBody>
					<CardFooter></CardFooter>
				</Stack>
			</Card>
			<StatGroup>
				{stats.flat().map((item, index) => (
					<Stat>
						<StatLabel textTransform='capitalize'>
							{STATS_TYPES[index]}
						</StatLabel>
						<StatNumber> {item} </StatNumber>
					</Stat>
				))}
			</StatGroup>
		</Box>
	);
};

export default Pokecard;
