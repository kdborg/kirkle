import { defineStore } from "pinia";

export const useStore = defineStore("kirkle", {
  state: () => ({
    word: "",
    length: 5,
    guesses: [],
    words: [],
    gameOver: false,
  }),
  getters: {
    wordLength: (state) => state.length,
    countGuesses: (state) => state.guesses.length,
    getGuesses: (state) => state.guesses,
    getGameOver: (state) => state.gameOver,
  },
  actions: {
    checkAnswer(guess) {
      // Is this a valid word?
      if (
        !this.words[this.length].includes(guess) ||
        guess.length < this.length
      ) {
        return false;
      }

      let wordCounts = new Map();
      for (let i = 0; i < this.length; i++) {
        let c = this.word[i];
        if (wordCounts.has(c)) {
          wordCounts.set(c, wordCounts.get(c) + 1);
        } else {
          wordCounts.set(c, 1);
        }
      }

      let result = [];
      let correctCount = 0;

      for (let i = 0; i < this.length; i++) {
        result.push([guess[i], "wrong"]);
      }

      for (let i = 0; i < this.length; i++) {
        let c = guess[i];

        // Check for correct locations
        if (c === this.word[i]) {
          result[i][1] = "known";
          correctCount++;
          let count = wordCounts.get(c) - 1;
          if (count > 0) {
            wordCounts.set(c, count - 1);
          } else {
            wordCounts.delete(c);
          }
        }
      }

      for (let i = 0; i < this.length; i++) {
        let c = guess[i];
        if (wordCounts.has(c) && wordCounts.get(c) > 0) {
          result[i][1] = "wrong-position";
          let count = wordCounts.get(c) - 1;
          if (count > 0) {
            wordCounts.set(c, count - 1);
          } else {
            wordCounts.delete(c);
          }
        }
      }

      this.guesses.push(result);
      if (correctCount == this.length) {
        this.gameOver = true;
      }

      return true;
    },
    setWordLength(length) {
      this.length = length;
    },
    newGame(length) {
      this.gameOver = false;
      this.guesses = [];
      this.length = length;

      // Generate a new word
      let r = Math.floor(Math.random() * this.words[length].length);
      this.word = this.words[length][r];
    },
    loadWords() {
      for (let i = 1; i <= 15; i++) {
        this.words[i] = [];
      }

      this.words[5] = ["AROSE", "QUEUE"];
      // await fetch("/twl.txt")
      //   .then((response) => response.text())
      //   .then((body) => {
      //     let lines = body.split("\n");
      //
      //     lines.forEach((word) => {
      //       if (word.length > 0) {
      //         this.words[word.length].push(word.toUpperCase());
      //       }
      //     });
      //   });
    },
  },
});
