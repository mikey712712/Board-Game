import { Box, Flex, Text } from "@chakra-ui/react"
import { useState } from "react"
import { Controls } from "./Controls"
import { GridBox } from "./GridBox"

export const Game = ({ tileIds }) => {
	const gridIds = [1, 2, 3, 4, 5, 6, 7, 8]
	const knightData = { name: "Knight", health: 30, energy: 8, moveEnergy: 2, turnEnergy: 8 }
	const flyingMonsterData = { name: "Flying Eyeball", health: 30, energy: 0, moveEnergy: 1, turnEnergy: 6 }

	const [playerOne, setPlayerOne] = useState({ position: [8, 1], ...knightData })
	const [playerTwo, setPlayerTwo] = useState({ position: [1, 8], ...flyingMonsterData })

	const [turn, setTurn] = useState(1)
	const GridLine = ({ dataLineId }) => {
		return (
			<Flex data-line-id={dataLineId}>
				{gridIds.map((id) => (
					<GridBox key={id} playerOne={playerOne} playerTwo={playerTwo} tileIds={tileIds} dataLineId={dataLineId} dataBoxId={id} />
				))}
			</Flex>
		)
	}

	return (
		<Flex flexFlow={"column nowrap"}>
			<Flex>
				<Box w="10vw">
					<Text>{playerOne.name}</Text>
					<Text>Health: {playerOne.health}</Text>
					<Text>Energy: {playerOne.energy}</Text>
				</Box>
				<Flex border="2px solid black" flexFlow={"column nowrap"}>
					{gridIds.map((id) => (
						<GridLine key={id} dataLineId={id} />
					))}
				</Flex>
				<Box textAlign={"right"} w="10vw">
					<Text>{playerTwo.name}</Text>
					<Text>Health: {playerTwo.health}</Text>
					<Text>Energy: {playerTwo.energy}</Text>
				</Box>
			</Flex>
			<Controls playerOne={playerOne} playerTwo={playerTwo} setPlayerOne={setPlayerOne} setPlayerTwo={setPlayerTwo} turn={turn} setTurn={setTurn} />
		</Flex>
	)
}
