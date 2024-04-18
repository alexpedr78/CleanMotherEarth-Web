import boardgameApi from "../service/myApi"
import Loader from "./../components/Loader/Loader"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
function BoardgamePage() {
	const [games, setGames] = useState(null)

	useEffect(() => {
		fetchGames()
	}, [])

	async function fetchGames() {
		try {
			const { data } = await boardgameApi.get("/games")
			setGames(data)
		} catch (error) {
			console.log(error)
		}
	}

	if (!games) return <Loader />
	return (
		<div>
			{games.map((game) => {
				// return <pre key={game._id}>{JSON.stringify(game, null, 2)}</pre>
				return (
					<div key={game._id} className="game-card">
						<h2>
							{" "}
							<Link to={`/boardgames/${game._id}`}>{game.name}</Link>
						</h2>
						<div className="img-wrapper">
							<img src={game.image} alt={`Cover of ${game.name} game`} />
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default BoardgamePage
