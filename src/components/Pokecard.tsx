import React from 'react';

import loadingPoke from '../assets/loading.gif';

import {
	Image,
	Card,
	Stack,
	CardBody,
	Heading,
	Text,
	Badge,
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
								pt='2'
								fontSize='lg'
								textTransform='capitalize'
							>
								{name}
							</Heading>
							<Heading fontSize='md'>#{id}</Heading>
							<Text pt='14' fontSize='md'>
								Type:
							</Text>
							<>
								{types.flat().map((type) => (
									<>
										<Badge
											display='inline-block'
											mr='1'
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
								fontSize='sm'
								textTransform='capitalize'
								pr='2'
							>
								{STATS_TYPES[index]}
							</StatLabel>
							<StatNumber fontSize='sm'>
								
								{item}
							</StatNumber>
						</Stat>
					))}
				</StatGroup>
			</Box>
		</SlideFade>
	) : (
		<>
			<Image
				src={loadingPoke}
				alt='Pikachu Running Loading image'
				width='200px'
				height='200px'
			/>
			<Text textAlign='center' fontSize='1.3vw'>Waiting on valid search...</Text>
		</>
	);
};

export default Pokecard;
