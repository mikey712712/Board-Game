import { Box, Button, Flex, Grid, Image, Text } from "@chakra-ui/react"
import { useEffect } from "react"

export const Controls = ({ playerOne, playerTwo, setPlayerOne, setPlayerTwo, turn, setTurn }) => {
	useEffect(() => {
		if (turn === 1 && playerOne.energy <= 0) {
			setTurn(2)
			setPlayerTwo({ ...playerTwo, energy: playerTwo.turnEnergy })
		} else if (turn === 2 && playerTwo.energy <= 0) {
			setTurn(1)
			setPlayerOne({ ...playerOne, energy: playerOne.turnEnergy })
		}
	}, [playerOne, playerTwo])

	const moveChar = (direction) => {
		if (turn === 1) {
			if (
				direction === "up" &&
				playerOne.position[0] > 1 &&
				!(playerTwo.position[0] === playerOne.position[0] - 1 && playerTwo.position[1] === playerOne.position[1])
			) {
				setPlayerOne({
					...playerOne,
					energy: playerOne.energy - playerOne.moveEnergy,
					position: [playerOne.position[0] - 1, playerOne.position[1]],
				})
			} else if (
				direction === "down" &&
				playerOne.position[0] < 8 &&
				!(playerTwo.position[0] === playerOne.position[0] + 1 && playerTwo.position[1] === playerOne.position[1])
			) {
				setPlayerOne({
					...playerOne,
					energy: playerOne.energy - playerOne.moveEnergy,
					position: [playerOne.position[0] + 1, playerOne.position[1]],
				})
			} else if (
				direction === "left" &&
				playerOne.position[1] > 1 &&
				!(playerTwo.position[0] === playerOne.position[0] && playerTwo.position[1] === playerOne.position[1] - 1)
			) {
				setPlayerOne({
					...playerOne,
					energy: playerOne.energy - playerOne.moveEnergy,
					position: [playerOne.position[0], playerOne.position[1] - 1],
				})
			} else if (
				direction === "right" &&
				playerOne.position[1] < 8 &&
				!(playerTwo.position[0] === playerOne.position[0] && playerTwo.position[1] === playerOne.position[1] + 1)
			) {
				setPlayerOne({
					...playerOne,
					energy: playerOne.energy - playerOne.moveEnergy,
					position: [playerOne.position[0], playerOne.position[1] + 1],
				})
			}
		} else if (turn === 2) {
			if (
				direction === "up" &&
				playerTwo.position[0] > 1 &&
				!(playerTwo.position[0] - 1 === playerOne.position[0] && playerTwo.position[1] === playerOne.position[1])
			) {
				setPlayerTwo({
					...playerTwo,
					energy: playerTwo.energy - playerTwo.moveEnergy,
					position: [playerTwo.position[0] - 1, playerTwo.position[1]],
				})
			} else if (
				direction === "down" &&
				playerTwo.position[0] < 8 &&
				!(playerTwo.position[0] + 1 === playerOne.position[0] && playerTwo.position[1] === playerOne.position[1])
			) {
				setPlayerTwo({
					...playerTwo,
					energy: playerTwo.energy - playerTwo.moveEnergy,
					position: [playerTwo.position[0] + 1, playerTwo.position[1]],
				})
			} else if (
				direction === "left" &&
				playerTwo.position[1] > 1 &&
				!(playerTwo.position[0] === playerOne.position[0] && playerTwo.position[1] - 1 === playerOne.position[1])
			) {
				setPlayerTwo({
					...playerTwo,
					energy: playerTwo.energy - playerTwo.moveEnergy,
					position: [playerTwo.position[0], playerTwo.position[1] - 1],
				})
			} else if (
				direction === "right" &&
				playerTwo.position[1] < 8 &&
				!(playerTwo.position[0] === playerOne.position[0] && playerTwo.position[1] + 1 === playerOne.position[1])
			) {
				setPlayerTwo({
					...playerTwo,
					energy: playerTwo.energy - playerTwo.moveEnergy,
					position: [playerTwo.position[0], playerTwo.position[1] + 1],
				})
			}
		}
	}

	const knightSlash = () => {
		if (turn === 1 && playerOne.energy >= 4) {
			setTimeout(() => (document.querySelector("#player-one").style.left = "10px"), 0)
			setTimeout(() => (document.querySelector("#player-one").style.left = "0"), 100)
			if (
				playerTwo.position[0] === playerOne.position[0] - 1 ||
				playerTwo.position[0] === playerOne.position[0] + 1 ||
				playerTwo.position[1] === playerOne.position[1] - 1 ||
				playerTwo.position[1] === playerOne.position[1] + 1
			) {
				setPlayerTwo({ ...playerTwo, health: playerTwo.health - 5 })
				setTimeout(() => (document.querySelector("#player-two").style.filter = "brightness(70%)"), 0)
				setTimeout(() => (document.querySelector("#player-two").style.filter = "unset"), 100)
			}
			setPlayerOne({ ...playerOne, energy: playerOne.energy - 4 })
		}
		if (turn === 2 && playerTwo.energy >= 4) {
			setTimeout(() => (document.querySelector("#player-two").style.left = "10px"), 0)
			setTimeout(() => (document.querySelector("#player-two").style.left = "0"), 100)
			if (
				playerTwo.position[0] === playerOne.position[0] - 1 ||
				playerTwo.position[0] === playerOne.position[0] + 1 ||
				playerTwo.position[1] === playerOne.position[1] - 1 ||
				playerTwo.position[1] === playerOne.position[1] + 1
			) {
				setPlayerOne({ ...playerOne, health: playerOne.health - 5 })
				setTimeout(() => (document.querySelector("#player-one").style.filter = "brightness(70%)"), 0)
				setTimeout(() => (document.querySelector("#player-one").style.filter = "unset"), 100)
			}
			setPlayerTwo({ ...playerTwo, energy: playerTwo.energy - 4 })
		}
	}

	const eyeShoot = () => {
		if (turn === 1 && playerOne.energy >= 1) {
			setTimeout(() => (document.querySelector("#player-one").style.left = "10px"), 0)
			setTimeout(() => (document.querySelector("#player-one").style.left = "0"), 100)
			if (
				playerTwo.position[0] === playerOne.position[0] - 1 ||
				playerTwo.position[0] === playerOne.position[0] + 1 ||
				playerTwo.position[1] === playerOne.position[1] - 1 ||
				playerTwo.position[1] === playerOne.position[1] + 1
			) {
				setPlayerTwo({ ...playerTwo, health: playerTwo.health - 1 })
				setTimeout(() => (document.querySelector("#player-two").style.filter = "brightness(70%)"), 0)
				setTimeout(() => (document.querySelector("#player-two").style.filter = "unset"), 100)
			}
			setPlayerOne({ ...playerOne, energy: playerOne.energy - 1 })
		}
		if (turn === 2 && playerTwo.energy >= 1) {
			setTimeout(() => (document.querySelector("#player-two").style.left = "10px"), 0)
			setTimeout(() => (document.querySelector("#player-two").style.left = "0"), 100)
			if (
				playerTwo.position[0] === playerOne.position[0] - 1 ||
				playerTwo.position[0] === playerOne.position[0] + 1 ||
				playerTwo.position[1] === playerOne.position[1] - 1 ||
				playerTwo.position[1] === playerOne.position[1] + 1
			) {
				setPlayerOne({ ...playerOne, health: playerOne.health - 1 })
				setTimeout(() => (document.querySelector("#player-one").style.filter = "brightness(70%)"), 0)
				setTimeout(() => (document.querySelector("#player-one").style.filter = "unset"), 100)
			}
			setPlayerTwo({ ...playerTwo, energy: playerTwo.energy - 1 })
		}
	}

	return (
		<Flex justify={"center"} m="20px" boxSizing="border-box" p="10px" bg="rgba(0,0,0,0.2)">
			<Text w="300px" textAlign={"center"} fontSize="2em">
				Player {turn}'s turn
			</Text>
			<Grid gridTemplateRows={"1fr 1fr 1fr"} gridTemplateColumns={"1fr 1fr 1fr"}>
				<Button boxSizing="border-box" p="5px" onClick={() => moveChar("left")} gridColumn={"1 / span 1"} gridRow={"2 / span 1"} bg={"none"}>
					<Image h="50px" transform={"rotate(-180deg)"} src="/pixelassets/arrow.png" />
				</Button>
				<Button boxSizing="border-box" p="10px 0" onClick={() => moveChar("up")} gridColumn={"2 / span 1"} gridRow={"1 / span 1"} bg={"none"}>
					<Image h="50px" transform={"rotate(-90deg)"} src="/pixelassets/arrow.png" />
				</Button>
				<Button boxSizing="border-box" p="5px" onClick={() => moveChar("right")} gridColumn={"3 / span 1"} gridRow={"2 / span 1"} bg={"none"}>
					<Image h="50px" src="/pixelassets/arrow.png" />
				</Button>
				<Button boxSizing="border-box" p="10px 0" onClick={() => moveChar("down")} gridColumn={"2 / span 1"} gridRow={"3 / span 1"} bg={"none"}>
					<Image h="50px" transform={"rotate(90deg)"} src="/pixelassets/arrow.png" />
				</Button>
			</Grid>
			<Flex>
				{(turn === 1 && playerOne.name === "Knight") || (turn === 2 && playerTwo.name === "Knight") ? (
					<Button h="fit-content" onClick={knightSlash}>
						Slash
					</Button>
				) : (turn === 1 && playerOne.name === "Flying Eyeball") || (turn === 2 && playerTwo.name === "Flying Eyeball") ? (
					<Button h="fit-content" onClick={eyeShoot}>
						Shoot Tear
					</Button>
				) : null}
			</Flex>
		</Flex>
	)
}
