import { Box, Button, Flex, Grid, Image, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"

export const Controls = ({ playerOne, playerTwo, setPlayerOne, setPlayerTwo, turn, setTurn }) => {
	const [targetedSquares, setTargetedSquares] = useState([])
	const [blocked, setBlocked] = useState(false)
	const [abilities, setAbilities] = useState({
		playerOne: [],
		playerTwo: [],
	})

	useEffect(() => {
		const checkAbilities = () => {
			const abilityObjectOne = {}
			for (let ability of abilities.playerOne) {
				if (ability.turns < 1) {
					abilityObjectOne[ability.name] = ability.default
				} else {
					abilityObjectOne[ability.name] = ability.value
				}
			}
			setPlayerOne({ ...playerOne, ...abilityObjectOne })
			const abilityObjectTwo = {}
			for (let ability of abilities.playerTwo) {
				if (ability.turns < 1) {
					abilityObjectTwo[ability.name] = ability.default
				} else {
					abilityObjectTwo[ability.name] = ability.value
				}
			}
			setPlayerTwo({ ...playerTwo, ...abilityObjectTwo })
		}
		checkAbilities()
	}, [abilities])

	const endTurn = () => {
		if (turn === 1) {
			const playerOneAbilities = abilities.playerOne
			const playerTwoAbilities = abilities.playerTwo
			for (let ability of abilities.playerOne) {
				playerOneAbilities[playerOneAbilities.indexOf(ability)].turns -= 1
			}
			setTurn(2)
			setPlayerTwo({ ...playerTwo, energy: playerTwo.energy + playerTwo.turnEnergy })
			setAbilities({ ...abilities, playerTwo: playerTwoAbilities.filter((e) => e.turns > 0), playerOne: [...playerOneAbilities] })
		} else if (turn === 2) {
			const playerTwoAbilities = abilities.playerTwo
			const playerOneAbilities = abilities.playerOne
			for (let ability of abilities.playerTwo) {
				playerTwoAbilities[playerTwoAbilities.indexOf(ability)].turns -= 1
			}
			setTurn(1)
			setPlayerOne({ ...playerOne, energy: playerOne.energy + playerOne.turnEnergy })
			setAbilities({ ...abilities, playerOne: playerOneAbilities.filter((e) => e.turns > 0), playerTwo: [...playerTwoAbilities] })
		}
	}

	const moveChar = (direction) => {
		if (turn === 1 && playerOne.energy >= playerOne.moveEnergy) {
			if (
				direction === "up" &&
				playerOne.position["y"] > 1 &&
				!(playerTwo.position["y"] === playerOne.position["y"] - 1 && playerTwo.position["x"] === playerOne.position["x"])
			) {
				setPlayerOne({
					...playerOne,
					energy: playerOne.energy - playerOne.moveEnergy,
					position: { y: playerOne.position["y"] - 1, x: playerOne.position["x"] },
				})
			} else if (
				direction === "down" &&
				playerOne.position["y"] < 8 &&
				!(playerTwo.position["y"] === playerOne.position["y"] + 1 && playerTwo.position["x"] === playerOne.position["x"])
			) {
				setPlayerOne({
					...playerOne,
					energy: playerOne.energy - playerOne.moveEnergy,
					position: { y: playerOne.position["y"] + 1, x: playerOne.position["x"] },
				})
			} else if (
				direction === "left" &&
				playerOne.position["x"] > 1 &&
				!(playerTwo.position["y"] === playerOne.position["y"] && playerTwo.position["x"] === playerOne.position["x"] - 1)
			) {
				setPlayerOne({
					...playerOne,
					energy: playerOne.energy - playerOne.moveEnergy,
					position: { y: playerOne.position["y"], x: playerOne.position["x"] - 1 },
				})
			} else if (
				direction === "right" &&
				playerOne.position["x"] < 8 &&
				!(playerTwo.position["y"] === playerOne.position["y"] && playerTwo.position["x"] === playerOne.position["x"] + 1)
			) {
				setPlayerOne({
					...playerOne,
					energy: playerOne.energy - playerOne.moveEnergy,
					position: { y: playerOne.position["y"], x: playerOne.position["x"] + 1 },
				})
			}
		} else if (turn === 2 && playerTwo.energy >= playerTwo.moveEnergy) {
			if (
				direction === "up" &&
				playerTwo.position["y"] > 1 &&
				!(playerOne.position["y"] === playerTwo.position["y"] - 1 && playerOne.position["x"] === playerTwo.position["x"])
			) {
				setPlayerTwo({
					...playerTwo,
					energy: playerTwo.energy - playerTwo.moveEnergy,
					position: { y: playerTwo.position["y"] - 1, x: playerTwo.position["x"] },
				})
			} else if (
				direction === "down" &&
				playerTwo.position["y"] < 8 &&
				!(playerOne.position["y"] === playerTwo.position["y"] + 1 && playerOne.position["x"] === playerTwo.position["x"])
			) {
				setPlayerTwo({
					...playerTwo,
					energy: playerTwo.energy - playerTwo.moveEnergy,
					position: { y: playerTwo.position["y"] + 1, x: playerTwo.position["x"] },
				})
			} else if (
				direction === "left" &&
				playerTwo.position["x"] > 1 &&
				!(playerOne.position["y"] === playerTwo.position["y"] && playerOne.position["x"] === playerTwo.position["x"] - 1)
			) {
				setPlayerTwo({
					...playerTwo,
					energy: playerTwo.energy - playerTwo.moveEnergy,
					position: { y: playerTwo.position["y"], x: playerTwo.position["x"] - 1 },
				})
			} else if (
				direction === "right" &&
				playerTwo.position["x"] < 8 &&
				!(playerOne.position["y"] === playerTwo.position["y"] && playerOne.position["x"] === playerTwo.position["x"] + 1)
			) {
				setPlayerTwo({
					...playerTwo,
					energy: playerTwo.energy - playerTwo.moveEnergy,
					position: { y: playerTwo.position["y"], x: playerTwo.position["x"] + 1 },
				})
			}
		}
	}

	const unPreview = () => {
		const gridBoxes = document.querySelectorAll(".grid-box")
		for (let box of gridBoxes) {
			box.style.filter = "unset"
		}
		setTargetedSquares([])
	}

	const unPreviewAbility = () => {
		document.querySelector("#player-one").style.filter = "unset"
		document.querySelector("#player-two").style.filter = "unset"
	}

	const previewKnightSlash = () => {
		let x
		let y
		const targets = []
		if (turn === 1) {
			y = playerOne.position["y"]
			x = playerOne.position["x"]
		} else {
			y = playerTwo.position["y"]
			x = playerTwo.position["x"]
		}
		const gridBoxes = document.querySelectorAll(
			`[data-line-id="${y + 1}"][data-box-id="${x}"],
				[data-line-id="${y - 1}"][data-box-id="${x}"],
				[data-line-id="${y}"][data-box-id="${x - 1}"],
				[data-line-id="${y}"][data-box-id="${x + 1}"]`
		)
		for (let box of gridBoxes) {
			box.style.filter = "brightness(70%)"
			targets.push({ y: Number(box.dataset.lineId), x: Number(box.dataset.boxId) })
		}
		setTargetedSquares(targets)
	}

	const knightSlash = () => {
		if (turn === 1 && playerOne.energy >= 4 - playerOne.attackDiscount) {
			setTimeout(() => {
				document.querySelector("#player-one").style.left = "10px"
				setBlocked(true)
			}, 0)
			setTimeout(() => {
				document.querySelector("#player-one").style.left = "0"
			}, 100)
			setTimeout(() => {
				document.querySelector("#player-two").style.left = "0"
				setBlocked(false)
			}, 200)
			const targets = targetedSquares
			for (let target of targets) {
				if (target["x"] === playerTwo.position["x"] && target["y"] === playerTwo.position["y"]) {
					setPlayerTwo({ ...playerTwo, health: playerTwo.health - 5 })
					setTimeout(() => (document.querySelector("#player-two").style.transform = "rotate(-20deg)"), 0)
					setTimeout(() => (document.querySelector("#player-two").style.transform = "rotate(20deg)"), 100)
					setTimeout(() => (document.querySelector("#player-two").style.transform = "unset"), 200)
				}
				setPlayerOne({ ...playerOne, energy: playerOne.energy - (4 - playerOne.attackDiscount) })
			}
		}
		if (turn === 2 && playerTwo.energy >= 4 - playerOne.attackDiscount) {
			setTimeout(() => {
				document.querySelector("#player-two").style.left = "10px"
				setBlocked(true)
			}, 0)
			setTimeout(() => {
				document.querySelector("#player-two").style.left = "0"
			}, 100)
			setTimeout(() => {
				document.querySelector("#player-two").style.left = "0"
				setBlocked(false)
			}, 200)
			const targets = targetedSquares
			for (let target of targets) {
				if (target["x"] === playerOne.position["x"] && target["y"] === playerOne.position["y"]) {
					setPlayerOne({ ...playerOne, health: playerOne.health - 5 })
					setTimeout(() => (document.querySelector("#player-one").style.transform = "rotate(-20deg)"), 0)
					setTimeout(() => (document.querySelector("#player-one").style.transform = "rotate(20deg)"), 100)
					setTimeout(() => (document.querySelector("#player-one").style.transform = "unset"), 200)
				}

				setPlayerTwo({ ...playerTwo, energy: playerTwo.energy - (4 - playerTwo.attackDiscount) })
			}
		}
	}

	const previewKnightPierce = () => {
		let x
		let y
		const targets = []
		if (turn === 1) {
			y = playerOne.position["y"]
			x = playerOne.position["x"]
		} else {
			y = playerTwo.position["y"]
			x = playerTwo.position["x"]
		}
		const gridBoxes = document.querySelectorAll(
			`[data-line-id="${y - 2}"][data-box-id="${x}"],
				[data-line-id="${y + 2}"][data-box-id="${x}"],
				[data-line-id="${y}"][data-box-id="${x + 2}"],
				[data-line-id="${y}"][data-box-id="${x - 2}"],
				[data-line-id="${y + 1}"][data-box-id="${x}"],
				[data-line-id="${y - 1}"][data-box-id="${x}"],
				[data-line-id="${y}"][data-box-id="${x - 1}"],
				[data-line-id="${y}"][data-box-id="${x + 1}"]`
		)
		for (let box of gridBoxes) {
			box.style.filter = "brightness(70%)"
			targets.push({ y: Number(box.dataset.lineId), x: Number(box.dataset.boxId) })
		}
		setTargetedSquares(targets)
	}

	const knightPierce = () => {
		if (turn === 1 && playerOne.energy >= 2 - playerOne.attackDiscount) {
			setTimeout(() => {
				document.querySelector("#player-one").style.left = "10px"
				setBlocked(true)
			}, 0)
			setTimeout(() => {
				document.querySelector("#player-one").style.left = "0"
			}, 100)
			setTimeout(() => {
				document.querySelector("#player-two").style.left = "0"
				setBlocked(false)
			}, 200)
			const targets = targetedSquares
			for (let target of targets) {
				if (target["x"] === playerTwo.position["x"] && target["y"] === playerTwo.position["y"]) {
					setPlayerTwo({ ...playerTwo, health: playerTwo.health - 3 })
					setTimeout(() => (document.querySelector("#player-two").style.filter = "brightness(70%)"), 0)
					setTimeout(() => (document.querySelector("#player-two").style.filter = "unset"), 100)
				}
				setPlayerOne({ ...playerOne, energy: playerOne.energy - (2 - playerOne.attackDiscount) })
			}
		}
		if (turn === 2 && playerTwo.energy >= 2 - playerOne.attackDiscount) {
			setTimeout(() => {
				document.querySelector("#player-two").style.left = "10px"
				setBlocked(true)
			}, 0)
			setTimeout(() => {
				document.querySelector("#player-two").style.left = "0"
			}, 100)
			setTimeout(() => {
				document.querySelector("#player-two").style.left = "0"
				setBlocked(false)
			}, 200)
			const targets = targetedSquares
			for (let target of targets) {
				if (target["x"] === playerOne.position["x"] && target["y"] === playerOne.position["y"]) {
					setPlayerOne({ ...playerOne, health: playerOne.health - 3 })
					setTimeout(() => (document.querySelector("#player-one").style.filter = "brightness(70%)"), 0)
					setTimeout(() => (document.querySelector("#player-one").style.filter = "unset"), 100)
				}

				setPlayerTwo({ ...playerTwo, energy: playerTwo.energy - (2 - playerOne.attackDiscount) })
			}
		}
	}

	const previewKnightLight = () => {
		if (turn === 1 && playerOne.energy >= 6) {
			document.querySelector("#player-one").style.filter = "invert(20%) sepia(90%) saturate(1130%) hue-rotate(168deg) brightness(100%) contrast(83%)"
		} else if (turn === 2 && playerTwo.energy >= 6) {
			document.querySelector("#player-two").style.filter = "invert(20%) sepia(90%) saturate(1130%) hue-rotate(168deg) brightness(100%) contrast(83%)"
		}
	}

	const knightLight = () => {
		if (turn === 1 && playerOne.energy >= 6) {
			setTimeout(() => {
				setAbilities({
					...abilities,
					playerOne: [
						...abilities.playerOne,
						{
							name: "moveEnergy",
							value: 1,
							turns: 3,
							default: 2,
						},
						{
							name: "attackDiscount",
							value: 1,
							turns: 3,
							default: 0,
						},
						{
							name: "incomingDamageMulti",
							value: 2,
							turns: 3,
							default: 1,
						},
					],
				})
				setPlayerOne({ ...playerOne, energy: playerOne.energy - 6 })
				setBlocked(true)
			}, 0)
			setTimeout(() => {
				document.querySelector("#player-one").style.filter =
					"invert(10%) sepia(90%) saturate(1130%) hue-rotate(168deg) brightness(250%) contrast(83%) blur(2px)"
			}, 200)
			setTimeout(() => {
				setBlocked(false)
				document.querySelector("#player-one").style.filter = "unset"
			}, 500)
		} else if (turn === 2 && playerTwo.energy >= 6) {
			setBlocked(true)
			setTimeout(() => {
				setAbilities({
					...abilities,
					playerTwo: [
						...abilities.playerTwo,
						{
							name: "moveEnergy",
							value: 1,
							turns: 3,
							default: 2,
						},
						{
							name: "attackDiscount",
							value: 1,
							turns: 3,
							default: 0,
						},
						{
							name: "incomingDamageMulti",
							value: 2,
							turns: 3,
							default: 1,
						},
					],
				})
				setPlayerTwo({ ...playerTwo, energy: playerTwo.energy - 6 })
			}, 0)
			setTimeout(() => {
				document.querySelector("#player-two").style.filter =
					"invert(10%) sepia(90%) saturate(1130%) hue-rotate(168deg) brightness(250%) contrast(83%) blur(2px)"
			}, 200)
			setTimeout(() => {
				setBlocked(false)
				document.querySelector("#player-two").style.filter = "unset"
			}, 500)
		}
	}

	const previewEyeShoot = () => {
		const targets = []
		let x
		let y
		if (turn === 1) {
			y = playerOne.position["y"]
			x = playerOne.position["x"]
		} else {
			y = playerTwo.position["y"]
			x = playerTwo.position["x"]
		}
		const gridBoxes = document.querySelectorAll(
			`[data-line-id="${y + 1}"][data-box-id="${x + 1}"],
				[data-line-id="${y - 1}"][data-box-id="${x + 1}"],
				[data-line-id="${y + 1}"][data-box-id="${x - 1}"],
				[data-line-id="${y - 1}"][data-box-id="${x - 1}"]`
		)
		for (let box of gridBoxes) {
			box.style.filter = "brightness(70%)"
			targets.push({ y: Number(box.dataset.lineId), x: Number(box.dataset.boxId) })
		}
		setTargetedSquares(targets)
	}

	const eyeShoot = () => {
		if (turn === 1 && playerOne.energy >= 1) {
			setTimeout(() => {
				document.querySelector("#player-one").style.left = "10px"
				setBlocked(true)
			}, 0)
			setTimeout(() => {
				document.querySelector("#player-one").style.left = "0"
			}, 100)
			setTimeout(() => {
				document.querySelector("#player-two").style.left = "0"
				setBlocked(false)
			}, 200)
			const targets = targetedSquares
			for (let target of targets) {
				if (target["x"] === playerTwo.position["x"] && target["y"] === playerTwo.position["y"]) {
					setPlayerTwo({ ...playerTwo, health: playerTwo.health - 1 * playerTwo.incomingDamageMulti })
					setTimeout(() => (document.querySelector("#player-two").style.filter = "brightness(70%)"), 0)
					setTimeout(() => (document.querySelector("#player-two").style.filter = "unset"), 100)
				}
				setPlayerOne({ ...playerOne, energy: playerOne.energy - 1 })
			}
		}
		if (turn === 2 && playerTwo.energy >= 1) {
			setTimeout(() => {
				document.querySelector("#player-two").style.left = "10px"
				setBlocked(true)
			}, 0)
			setTimeout(() => {
				document.querySelector("#player-two").style.left = "0"
			}, 100)
			setTimeout(() => {
				document.querySelector("#player-two").style.left = "0"
				setBlocked(false)
			}, 200)
			const targets = targetedSquares
			for (let target of targets) {
				if (target["x"] === playerOne.position["x"] && target["y"] === playerOne.position["y"]) {
					setPlayerOne({ ...playerOne, health: playerOne.health - 1 * playerOne.incomingDamageMulti })
					setTimeout(() => (document.querySelector("#player-one").style.filter = "brightness(70%)"), 0)
					setTimeout(() => (document.querySelector("#player-one").style.filter = "unset"), 100)
				}
				setPlayerTwo({ ...playerTwo, energy: playerTwo.energy - 1 })
			}
		}
	}

	const lifeDrain = () => {
		if (turn === 1 && playerOne.energy >= 1) {
			setTimeout(() => {
				document.querySelector("#player-one").style.left = "10px"
				setBlocked(true)
			}, 0)
			setTimeout(() => {
				document.querySelector("#player-one").style.left = "0"
			}, 100)
			setTimeout(() => {
				setBlocked(false)
			}, 200)
			const targets = targetedSquares
			for (let target of targets) {
				if (target["x"] === playerTwo.position["x"] && target["y"] === playerTwo.position["y"]) {
					setTimeout(() => (document.querySelector("#player-two").style.filter = "brightness(70%)"), 0)
					setTimeout(() => (document.querySelector("#player-two").style.filter = "unset"), 100)
					setPlayerTwo({ ...playerTwo, health: playerTwo.health - 1 * playerTwo.incomingDamageMulti })
					setPlayerOne({ ...playerOne, health: playerOne.health + 1 * playerTwo.incomingDamageMulti, energy: playerOne.energy - 1 })
					return
				}
			}
			setPlayerOne({ ...playerOne, energy: playerOne.energy - 1 })
		}
		if (turn === 2 && playerTwo.energy >= 1) {
			setTimeout(() => {
				document.querySelector("#player-two").style.left = "10px"
				setBlocked(true)
			}, 0)
			setTimeout(() => {
				document.querySelector("#player-two").style.left = "0"
			}, 100)
			setTimeout(() => {
				setBlocked(false)
			}, 200)
			const targets = targetedSquares
			for (let target of targets) {
				if (target["x"] === playerOne.position["x"] && target["y"] === playerOne.position["y"]) {
					setTimeout(() => (document.querySelector("#player-one").style.filter = "brightness(70%)"), 0)
					setTimeout(() => (document.querySelector("#player-one").style.filter = "unset"), 100)
					setPlayerTwo({ ...playerTwo, health: playerTwo.health + 1 * playerOne.incomingDamageMulti, energy: playerTwo.energy - 1 })
					setPlayerOne({ ...playerOne, health: playerOne.health - 1 * playerOne.incomingDamageMulti })
					return
				}
			}
			setPlayerTwo({ ...playerTwo, energy: playerTwo.energy - 1 })
		}
	}

	const Blocker = () => {
		return <Box onClick={(e) => e.stopPropagation()} position={"absolute"} left="0" top="0" w="100vw" h="100vh" opacity={"0"} bgColor="black"></Box>
	}

	return (
		<>
			<Flex w="100vw" justify={"space-between"} m="20px 0" boxSizing="border-box" p="10px" bg="rgba(0,0,0,0.2)">
				<Text w="400px" textAlign={"center"} fontSize="2em">
					Player {turn}'s turn
				</Text>
				<Grid justifySelf={"center"} gridTemplateRows={"1fr 1fr 1fr"} gridTemplateColumns={"1fr 1fr 1fr"}>
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
				<Flex w="400px" justify={"space-between"}>
					{(turn === 1 && playerOne.name === "Knight") || (turn === 2 && playerTwo.name === "Knight") ? (
						<>
							<Button h="40px" w="90px" role="group" onMouseOver={previewKnightSlash} onMouseOut={unPreview} onClick={knightSlash}>
								<Box
									_groupHover={{
										visibility: "visible",
										opacity: "1",
									}}
									_after={{
										content: '""',
										position: "absolute",
										top: "100%",
										left: "50%",
										marginLeft: "-5px",
										border: "5px solid",
										borderColor: "black transparent transparent transparent",
									}}
									visibility="hidden"
									w="200px"
									bgColor="black"
									color="white"
									borderRadius="6px"
									padding="5px 0"
									position="absolute"
									zIndex="100"
									bottom="150%"
									left="0"
									marginLeft="-55px"
									opacity="0"
									transition="opacity 0.3s"
									h="110px"
								>
									<Text boxSizing="border-box" p="5px" w="200px" whiteSpace={"normal"}>
										<strong>Slash</strong>
										<br />
										Swing your sword and deal 5 damage to any close range enemies.
									</Text>
								</Box>
								Slash
							</Button>
							<Button h="40px" w="90px" role="group" onMouseOver={previewKnightPierce} onMouseOut={unPreview} onClick={knightPierce}>
								<Box
									_groupHover={{
										visibility: "visible",
										opacity: "1",
									}}
									_after={{
										content: '""',
										position: "absolute",
										top: "100%",
										left: "50%",
										marginLeft: "-5px",
										border: "5px solid",
										borderColor: "black transparent transparent transparent",
									}}
									visibility="hidden"
									w="200px"
									bgColor="black"
									color="white"
									borderRadius="6px"
									padding="5px 0"
									position="absolute"
									zIndex="100"
									bottom="150%"
									left="0"
									marginLeft="-55px"
									opacity="0"
									transition="opacity 0.3s"
									h="110px"
								>
									<Text boxSizing="border-box" p="5px" w="200px" whiteSpace={"normal"}>
										<strong>Pierce</strong>
										<br />
										Lunge forward and deal 3 damage to an enemy at a slight range.
									</Text>
								</Box>
								Pierce
							</Button>
							<Button
								role="group"
								position="relative"
								display="inline-block"
								h="40px"
								w="90px"
								onMouseOver={previewKnightLight}
								onMouseOut={unPreviewAbility}
								onClick={knightLight}
							>
								<Box
									_groupHover={{
										visibility: "visible",
										opacity: "1",
									}}
									_after={{
										content: '""',
										position: "absolute",
										top: "100%",
										left: "50%",
										marginLeft: "-5px",
										border: "5px solid",
										borderColor: "black transparent transparent transparent",
									}}
									visibility="hidden"
									w="200px"
									bgColor="black"
									color="white"
									borderRadius="6px"
									padding="5px 0"
									position="absolute"
									zIndex="100"
									bottom="150%"
									left="0"
									marginLeft="-55px"
									opacity="0"
									transition="opacity 0.3s"
									h="150px"
								>
									<Text boxSizing="border-box" p="5px" w="200px" whiteSpace={"normal"}>
										<strong>Light Armor</strong>
										<br />
										For this turn and the next 2 turns, all movements and attacks cost 1 less energy. Incoming attacks deal double damage
										while light armor is active.
									</Text>
								</Box>
								Light Armor
							</Button>
							{/* <Button h="40px" w="90px" onMouseOver={previewKnightLunge} onMouseOut={unPreview} onClick={knightLunge}>
								Lunge Attack
							</Button> */}
						</>
					) : (turn === 1 && playerOne.name === "Flying Eyeball") || (turn === 2 && playerTwo.name === "Flying Eyeball") ? (
						<>
							<Button h="40px" w="90px" onMouseOver={previewEyeShoot} onMouseOut={unPreview} onClick={eyeShoot}>
								Shoot Tear
							</Button>
							<Button h="40px" w="90px" onMouseOver={previewKnightSlash} onMouseOut={unPreview} onClick={lifeDrain}>
								Life Drain
							</Button>
						</>
					) : null}
					<Button onClick={endTurn}>End Turn</Button>
				</Flex>
			</Flex>
			{blocked ? <Blocker /> : null}
		</>
	)
}
