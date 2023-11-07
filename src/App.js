//React
import { useCallback, useEffect, useState } from "react"

//Data
import { wordList } from "./data/word.js" //Import de uma variável

//CSS
import './App.css'

//Components
import StartScreen from './components/StartScreen'
import Game from "./components/Game.js"
import Over from "./components/Over.js"

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" }
]//Estagios que vamos utilizar para fazer a progreção.

const guessesQty = 3//defaul da quantidade de chances


function App() {
  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordList)

  const [pickedWord, setPickedWord] = useState("") //Palavra que vai ser escolhida
  const [pickedCategory, setPickedCategory] = useState("") //Categoria que vai ser escolhida
  const [letters, setLetters] = useState([]) //Letras

  const [guessedLetters, setGuessedLetters] = useState([]) //Letras adivinhadas
  const [wrongLetters, setWrongLetters] = useState([])//Letars erradas
  const [guesses, setGuesses] = useState(guessesQty) //Chances
  const [score, setScore] = useState(0) //Pontuação a cada acerto

  const pickWordAndCategory = useCallback(() => {
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]
    /*Associamos a const categories as chaves do object que chamamos de palavras;
      Para poder pegar uma aleatória, fizemos o uso do Math.random(), acessando a rede de categories, fizemos vezes o número de chaves que
      temos no object que salvamos. Mas o Math.random() gera um número floot, então usamos Math.floor() para arrendondar pra baixo. */

    const word = words[category][Math.floor(Math.random() * words[category].length)]
    /*Para selecionarmos as palavras dentro do object. acessamos a array principal de palavras words, dentro dele uma categoria que escolhemos
    a category, onde temos acesso a todas as palavras da categoria, onde temos que acessar uma delas aleatóriamanete, onde repetimos o processo
    mas nosso .lenght vai ser o array words[category] */


    return { word, category } //Retorna como object
  }, [words])


  const startGame = useCallback(() => {
    
    clearLetterStates() //Clear all letters

    const { word, category } = pickWordAndCategory() //Pick category ann word

    let wordLetters = word.split("")//Criar array de letras
    wordLetters = wordLetters.map((l) => (l.toLowerCase()))/*Pega cada uma das letras sorteadas e transforma em minuscula (corrige o erro do
    JS com diferença de letra minuscula e maiuscula).*/

    //Definimos os states
    setPickedWord(word)
    setPickedCategory(category)
    setLetters(wordLetters)

    setGameStage(stages[1].name)
  }, [pickWordAndCategory])//Function para o início do jogo.

  const veriflyLatter = (letter) => {

    const normalizeLetters = letter.toLowerCase()

    //Validar se a letra ja foi utilizada
    if (guessedLetters.includes(normalizeLetters) || wrongLetters.includes(normalizeLetters)) {
      return
    } //Se as letras adivinhada incluem a function de letra minuscula OU se as letras erradas já incluem a function de letre minuscula ENTão retorne.

    //push guessed letter or remuve a guess
    if (letters.includes(normalizeLetters)) {
      setGuessedLetters((actualGuessedLetter) => [
        ...actualGuessedLetter,
        normalizeLetters
      ])/*Se nossas letras incluira a function de letra minuscula, vamos fazer:
      SE estiver certo, vamos alterar as letras adivinhadas, onde pegamos o atual estado das letras 'actualGuessedLetter',terremos um array
      onde, pegamos todos os elementos do Array e adicionamos a nova letra.*/
    } else {
      setWrongLetters((actualWeongLetter) => [
        ...actualWeongLetter,
        normalizeLetters
      ]) //Resultado do SE NÃO, são as Letras erradas...

      setGuesses((actualGuesses) => actualGuesses - 1) //Diminuir  as tentativas
    }


  } //Process the letter input

  const clearLetterStates = () => {
    setGuessedLetters([])
    setWrongLetters([])
  }//Limpar o State

  //Check if guesses ended - Checar se as chance acabarem
  useEffect(() => {

    if (guesses <= 0) {

      clearLetterStates()

      setGameStage(stages[2].name)
    }

  }, [guesses/*Dado que queremos monitorar*/])//Function é executada cada vez que o dado é alterado

  //Check win condition - Cheque a condiçào de vitória
  useEffect(() => {

    const uniqueLetters = [...new Set(letters)] //Me da um Array de letras unicas

    //win condition
    if(guessedLetters.length === uniqueLetters.length) {
      //add score
      setScore((actualScore) => actualScore += 100)

      //restart game with new word
      startGame()

    }//Letars tentadas iguais a letras unicas

  }, [guessedLetters, letters, startGame])

  const retry = () => {

    setScore(0)//Como queremos iniciar o jogo.
    setGuesses(guessesQty)//Como queremos iniciar o jogo.

    setGameStage(stages[0].name)
  } //Restart the game

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />} {/*Se o gameStage for igual a "start" exiba o conteudo <StartScreen />.*/}

      {gameStage === "game" && <Game
        veriflyLatter={veriflyLatter}
        pickedWord={pickedWord}
        pickedCategory={pickedCategory}
        letters={letters}
        guessedLetters={guessedLetters}
        wrongLetters={wrongLetters}
        guesses={guesses}
        score={score}
      />} {/*Quando gameStage for igual a "game" exiba o conteudo <Game />.*/}

      {gameStage === "end" && <Over
        retry={retry}
        score={score} />} {/*Quando gameStage for igual a "end" exiba o conteudo <Over />.*/}
    </div>
  );
}

export default App

