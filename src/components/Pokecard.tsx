import React from 'react';

import missingPoke from '../assets/missing.png'

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
	SlideFade,
} from '@chakra-ui/react';

import { STATS_TYPES } from '../API';

type Props = {
	name: string;
	id: number | string;
	types: string[];
	stats: string[];
	imgName: string;
	cardOpen: boolean;
};

const Pokecard: React.FC<Props> = ({
	name,
	id,
	types,
	stats,
	imgName,
	cardOpen,
}) => {
	return cardOpen ? (
		<SlideFade in={cardOpen} offsetY='20px'>
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
						backgroundColor='gray.700'
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
										<Badge
											display='inline-block'
											variant='subtle'
										>
											{type}
										</Badge>
									</>
								))}
							</>
						</CardBody>
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
		</SlideFade>
	) : (
		<>
			<Image
				src={missingPoke}
				alt='Missing Pokemon'
				width='400px'
				height='300px'
				borderRadius='base'
			/>
			<Text fontSize='1.3vw'>Uh oh! No Pokemon found!</Text>
		</>
	);
};

export default Pokecard;
