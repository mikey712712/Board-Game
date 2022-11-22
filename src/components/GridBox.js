import { Box, Image } from "@chakra-ui/react"
import { useEffect, useState } from "react"

export const GridBox = ({ dataBoxId, dataLineId, tileIds, playerOne, playerTwo }) => {
	const [playerOneSrc, setPlayerOneSrc] = useState(playerOne.imgSrcs[0])
	const [playerTwoSrc, setPlayerTwoSrc] = useState(playerTwo.imgSrcs[0])

	useEffect(() => {
		const playerAnimations = () => {
			setInterval(() => {
				setPlayerOneSrc(playerOne.imgSrcs[1])
				setPlayerTwoSrc(playerTwo.imgSrcs[1])
				setTimeout(() => {
					setPlayerOneSrc(playerOne.imgSrcs[0])
					setPlayerTwoSrc(playerTwo.imgSrcs[0])
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
