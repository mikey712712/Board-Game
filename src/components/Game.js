import { Box, Flex, Text } from "@chakra-ui/react"
import { useState } from "react"
import { Controls } from "./Controls"
import { GridBox } from "./GridBox"

export const Game = ({ tileIds }) => {
	const gridIds = [1, 2, 3, 4, 5, 6, 7, 8]
	const knightData = {
		name: "Knight",
		health: 30,
		moveEnergy: 2,
		turnEnergy: 8,
		damageMultiplier: 1,
		attackDiscount: 0,
		incomingDamageMulti: 1,
		imgSrcs: ["/pixelassets/heroes/knight/knight_idle_anim_f0.png", "/pixelassets/heroes/knight/knight_idle_anim_f4.png"],
	}
	const flyingMonsterData = {
		name: "Flying Eyeball",
		health: 30,
		moveEnergy: 1,
		turnEnergy: 6,
		damageMultiplier: 1,
		attackDiscount: 0,
		incomingDamageMulti: 1,
		imgSrcs: ["/pixelassets/enemies/flying_creature/fly_anim_f1.png", "/pixelassets/enemies/flying_creature/fly_anim_f2.png"],
	}

	const [playerOne, setPlayerOne] = useState({ position: { x: 1, y: 8 }, energy: 8, ...knightData })
	const [playerTwo, setPlayerTwo] = useState({ position: { x: 8, y: 1 }, energy: 0, ...flyingMonsterData })

	const [turn, setTurn] = useState(1)
	const GridLine = ({ dataLineId }) => {
		return (
			<Flex>
				{gridIds.map((id) => (
					<GridBox key={id} playerOne={playerOne} playerTwo={playerTwo} tileIds={tileIds} dataLineId={dataLineId} dataBoxId={id} />
				))}
			</Flex>
		)
	}

	return (
		<Flex w="100vw" flexFlow={"column nowrap"}>
			<Flex w="100%" justify={"space-between"} boxSizing={"border-box"} p="20px">
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
