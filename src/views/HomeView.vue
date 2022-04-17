<script setup>
import GuessList from "../components/GuessList.vue";
import GuessRow from "../components/GuessRow.vue";
import Keypress from "vue-keypress";
import { useStore } from "../stores/kirkle";
</script>

<template>
  <main>
    <div class="settings">
      <label for="setLength">Word Length: </label>
      <select v-model="length">
        <option v-for="i in 15" :key="'length-' + i" v-show="i >= 2">
          {{ i }}
        </option>
      </select>
      <a @click.stop="reset">New Game</a>
    </div>
    <GuessList :guesses="guesses" />
    <GuessRow :word="word" v-if="!gameOver" />
    <p v-show="notAWord && !gameOver" class="red">Not a word</p>
    <p v-show="gameOver" class="game-over">Game Over!</p>
  </main>

  <Keypress key-event="keyup" @success="keyPressed" />
  <Keypress key-event="keyup" :key-code="8" @success="removeLetter" />
  <Keypress
    key-event.stop="keyup"
    :key-code="13"
    @success="tryGuess"
    :preventDefault="true"
  />
</template>

<script>
export default {
  data() {
    return {
      word: "",
      length: 5,
      notAWord: false,
    };
  },
  methods: {
    keyPressed(ev) {
      let key = ev.event.key.toUpperCase();

      if (key.length === 1 && key >= "A" && key <= "Z") {
        if (this.word.length < this.store.length) {
          this.word += key;
        }
      }
    },
    removeLetter() {
      if (this.word.length > 0) {
        this.word = this.word.slice(0, -1);
      }
    },
    tryGuess() {
      if (this.word.length === parseInt(this.store.length)) {
        if (this.store.checkAnswer(this.word)) {
          this.word = "";
        } else {
          let self = this;
          this.notAWord = true;
          setTimeout(() => {
            self.notAWord = false;
          }, 3000);
        }
      }
    },
    reset() {
      console.log(this.length);
      this.store.newGame(this.length);
      this.word = "";
      this.notAWord = false;
    },
  },
  computed: {
    store() {
      return window.theStore;
    },
    validLetters() {
      let letters = [];
      for (let i = "A"; i <= "Z"; i++) {
        letters.push({
          keyCode: i,
          preventDefault: false,
        });
      }

      return letters;
    },
    gameOver() {
      return this.store.gameOver;
    },
    guesses() {
      return this.store.guesses;
    },
  },
  mounted() {
    const init = async () => {
      await this.store.loadWords();
      this.store.newGame(this.length);
    };

    init();
  },
};
</script>
<style scoped>
main {
  width: fit-content;
  margin: 0 auto;
  margin-top: 2rem;
  text-align: center;
}

.settings {
  margin: 1rem;
  padding: 4px;
  text-align: center;
  font-size: 16px;
}

.settings a {
  margin-left: 2rem;
  padding: 6px 9px;
  background-color: rgb(106, 170, 100);
  color: white;
  border: 0;
  font-weight: bold;
}

.game-over {
  font-size: 20px;
  font-weight: bold;
}

.red {
  color: red;
}
</style>
