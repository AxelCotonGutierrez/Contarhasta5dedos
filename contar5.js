// Axel Cotón Gutiérrez Copyright 2023
  // Generar imágenes aleatorias
  const images = [
    "https://raw.githubusercontent.com/AxelCotonGutierrez/Contarhasta5dedos/master/img/uno.png",
    "https://raw.githubusercontent.com/AxelCotonGutierrez/Contarhasta5dedos/master/img/dos.png",
    "https://raw.githubusercontent.com/AxelCotonGutierrez/Contarhasta5dedos/master/img/tres.png",
    "https://raw.githubusercontent.com/AxelCotonGutierrez/Contarhasta5dedos/master/img/cuatro.png",
    "https://raw.githubusercontent.com/AxelCotonGutierrez/Contarhasta5dedos/master/img/cinco.png"
  ];

   let score = 0; // Contador de respuestas correctas
  let questionsCount = 0; // Contador de preguntas realizadas
  let previousImageIndex = -1; // Índice de la imagen de la pregunta anterior

  // Función para restablecer los resultados y mensajes del juego anterior
  function resetGame() {
    const scoreElement = document.querySelector("#score");
    const resultElement = document.querySelector("#result");

    scoreElement.textContent = "";
    resultElement.textContent = "";
    scoreElement.style.color = "initial";
    resultElement.style.color = "initial";
  }

  function generateQuestion() {
    resetGame(); // Restablecer resultados y mensajes del juego anterior

    // Verificar si se han realizado las 5 preguntas
    if (questionsCount >= 5) {
      const scoreElement = document.querySelector("#score");
      scoreElement.textContent = `\u00A1Fin!`;

      if (score === 5) {
        scoreElement.textContent += ` \u00A1Felicidades, eres un/a campeón/a!`;
        scoreElement.style.color = "green";
      } else {
        scoreElement.textContent += ` \u00A1Vuelve a intentarlo!`;
        scoreElement.style.color = "red";
      }

      // Mostrar botón "Volver a jugar"
      const playAgainButton = document.querySelector("#play-again-button");
      playAgainButton.style.display = "block";

      return;
    }

    let chosenImageIndex = generateRandomImageIndex();

    // Asegurarse de que la imagen no se repita consecutivamente
    while (chosenImageIndex === previousImageIndex) {
      chosenImageIndex = generateRandomImageIndex();
    }

    previousImageIndex = chosenImageIndex;

    // Mostrar la imagen elegida en el HTML
    const imageContainer = document.querySelector("#image-container");
    imageContainer.innerHTML = ""; // Limpiar el contenedor de imágenes

    const chosenImage = document.createElement("img");
    chosenImage.src = images[chosenImageIndex];
    chosenImage.alt = "Imagen";
    chosenImage.classList.add("game-image"); // Agregar la clase "game-image" a la imagen
    imageContainer.appendChild(chosenImage);

    // Pedir al jugador que adivine
    const guessButtons = document.querySelectorAll(".guess-button");

    // Eliminar eventos click anteriores
    guessButtons.forEach((button) => {
      button.removeEventListener("click", handleGuess);
    });

    // Asignar eventos click nuevos
    guessButtons.forEach((button) => {
      button.addEventListener("click", handleGuess);
    });
  }

  function generateRandomImageIndex() {
    return Math.floor(Math.random() * images.length);
  }

  function handleGuess(event) {
    const guess = parseInt(event.target.textContent);
    const resultElement = document.querySelector("#result");
    questionsCount++;

    if (guess === previousImageIndex + 1) {
      score++;
      resultElement.textContent = "\u00A1Correcto!";
      resultElement.style.color = "green";
    } else {
      resultElement.textContent = `Incorrecto, el valor de la imagen era ${previousImageIndex + 1}.`;
      resultElement.style.color = "red";
    }

    // Actualizar puntaje y generar la siguiente pregunta
    const scoreElement = document.querySelector("#score");
    scoreElement.textContent = ` ${score} respuestas correctas de ${questionsCount}`;

    setTimeout(generateQuestion, 1000);
  }

  function restartGame() {
    // Restablecer variables de juego
    score = 0;
    questionsCount = 0;
    previousImageIndex = -1;

    // Ocultar botón "Volver a jugar"
    const playAgainButton = document.querySelector("#play-again-button");
    playAgainButton.style.display = "none";

    // Reiniciar el juego
    generateQuestion();
  }

  // Llamar a la función para iniciar el juego
  generateQuestion();

  // Agregar evento clic al botón "Volver a jugar"
  const playAgainButton = document.querySelector("#play-again-button");
  playAgainButton.addEventListener("click", restartGame);

 