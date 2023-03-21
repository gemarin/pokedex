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
					pb='4'
				>
					<Image
						src={imgName}
						objectFit='contain'
						width='200px'
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
						pl='3'
					>
						<CardBody>
							<Heading
								fontSize='1.9vw'
								textTransform='capitalize'
							>
								{name}
							</Heading>
							<Heading fontSize='1.6vw'>#{id}</Heading>
							<Text pt='14' fontSize='1.6vw'>
								Type:
							</Text>
							<>
								{types.flat().map((type) => (
									<>
										<Badge display='inline-block' variant='subtle'>{type}</Badge>{' '}
										{/* <br /> */}
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
							<StatLabel
								fontSize='1vw'
								textTransform='capitalize'
							>
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
