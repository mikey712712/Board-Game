import "./App.css"
import { Game } from "./components/Game"
import { Box } from "@chakra-ui/react"

function App() {
	const tileIds = []
	for (let i = 0; i < 64; i++) {
		tileIds.push(Math.ceil(Math.random() * 10))
	}
	return (
		<Box w="fit-content" m="30px auto">
			<Game tileIds={tileIds} />
		</Box>
	)
}

export default App
