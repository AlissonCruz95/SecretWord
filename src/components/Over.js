import "./Over.css"

const Over = ({retry, score}) => {

    return (

        <div>
            <h1>Game Over</h1>
            <h2>Sua pontuação: <span>{score}</span></h2>
            <button onClick={retry}>Restart Game</button>
        </div>
    )
}

export default Over