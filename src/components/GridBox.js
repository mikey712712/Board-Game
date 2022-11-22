import { Box, Image } from "@chakra-ui/react"
import { useEffect, useState } from "react"

export const GridBox = ({ dataBoxId, dataLineId, tileIds, playerOne, playerTwo }) => {
	const playerTwoSrcs = ["/pixelassets/enemies/flying_creature/fly_anim_f1.png", "/pixelassets/enemies/flying_creature/fly_anim_f2.png"]
	const playerOneSrcs = ["/pixelassets/heroes/knight/knight_idle_anim_f0.png", "/pixelassets/heroes/knight/knight_idle_anim_f4.png"]

	const [playerOneSrc, setPlayerOneSrc] = useState(playerOneSrcs[0])
	const [playerTwoSrc, setPlayerTwoSrc] = useState(playerTwoSrcs[0])

	useEffect(() => {
		const playerAnimations = () => {
			setInterval(() => {
				setPlayerOneSrc(playerOneSrcs[1])
				setPlayerTwoSrc(playerTwoSrcs[1])
				setTimeout(() => {
					setPlayerOneSrc(playerOneSrcs[0])
					setPlayerTwoSrc(playerTwoSrcs[0])
				}, 500)
			}, 1000)
		}

		playerAnimations()
	}, [])

	return (
		<Box
			bgImage={`/pixelassets/tiles/floor/floor_${tileIds[(dataLineId - 1) * 8 + dataBoxId - 1]}.png`}
			bgRepeat={"no-repeat"}
			bgSize={"cover"}
			w="48px"
			h="48px"
			// borderRadius={"8px"}
			className={"grid-box"}
			data-box-id={dataBoxId}
			data-line-id={dataLineId}
		>
			{playerOne.position["y"] === dataLineId && playerOne.position["x"] === dataBoxId && (
				<Image id="player-one" position={"relative"} transition={"100ms"} src={playerOneSrc} />
			)}
			{playerTwo.position["y"] === dataLineId && playerTwo.position["x"] === dataBoxId && (
				<Image id="player-two" position={"relative"} transition={"100ms"} src={playerTwoSrc} />
			)}
		</Box>
	)
}
