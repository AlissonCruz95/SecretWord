import "./StartScreen.css"

const StartScreen = ({ startGame } /*Recebe a function de início do jogo como prop.*/) => {

    return (

        <div className="start">
            <h1>Jogo de Palavras</h1>
            <p>Clique no botão para começar o jogo</p>
            <button onClick={startGame}>New Game</button>
        </div>
    )
}

export default StartScreen

/*
--A tela inicial que faz a chamada para página principal do sistema;
--CSS arquivo StartScreen.css;
*/