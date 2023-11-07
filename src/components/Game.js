import { useState, useRef } from "react"
import "../components/Game.css"

const Game = ({ veriflyLatter,
    pickedWord,
    pickedCategory,
    letters,
    guessedLetters,
    wrongLetters,
    guesses,
    score }) => {

        const [letter, setLetter] = useState("")

        const letterInputref = useRef(null) //Referencia usando o useRef

        const handleSubmit = (e) => {
            e.preventDefault()

            veriflyLatter(letter)

            setLetter("")

            letterInputref.current.focus() //Volta a focar apos usar o elemento (a letra). Muito usado para fazer o input não perder o foco.
        }

    return (
        <div className="game">
            <p className="points">
                <span>Pontuação: {score}</span>
            </p>
            <h1>Adivinhe a Palavra:</h1>
            <h3 className="dica">
                Dica da Palavra: <span>{pickedCategory}</span>
            </h3>
            <p>Você ainda tem {guesses} tentativas</p>
            <div className="wordContainer">
                {letters.map((letter, i) =>
                    guessedLetters.includes(letter) ? (
                        <span key={i} className="letter">{letter}</span>
                    ) : (
                        <span key={i} className="blankSquare"></span>
                    )
                )} {/*Vamos ter um .map nas letters, mapeando cada uma das letras (na letra e no indice) e vamos retornar um object, que vai
                verificar, SE adivinha a letra no guessedLetters vamos imprimi-la, caso contrario o quadrado fica em branco.*/}

            </div>
            <div className="letterContainer">
                <p>Adivinhar uma letra</p>
                <form onSubmit={handleSubmit}>
                    <input
                    type="text"
                    name="letter" 
                    maxLegth="1" 
                    required onChange={(e) => setLetter(e.target.value)}
                    value={letter}
                    ref={letterInputref}/>
                    <button>Start</button>
                </form>
            </div>
            <div className="wrongLettersContainer">
                <p>Letras utilizadas: </p>
                {wrongLetters.map((letter, i) => (
                    <span key={i}>{letter}, </span>
                ))} {/*Mostra a letra errada */}
            </div>
        </div>
    )
}

export default Game