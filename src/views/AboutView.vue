<script setup>
import GuessList from "../components/GuessList.vue";
</script>

<template>
  <div class="about">
    <h1>HOW TO PLAY</h1>
    <p>This is exactly like Wordle, with the following features:</p>
    <ul>
      <li>Unlimited guesses.</li>
      <li>You can select the length of word you want to try.</li>
    </ul>

    <p>NOTE: Currently only for desktop. Onscreen keyboard is coming.</p>

    <p>Guess the word in as many tries as needed.</p>
    <p>Each guess must be a valid word. Hit the enter button to submit.</p>
    <p>
      After each guess, the color of the tiles will change to show how close
      your guess was to the word.
    </p>
    <h2>Examples</h2>
    <p>
      <GuessList :guesses="correct" />
    </p>
    <p>The letter W is in the word and in the correct spot.</p>

    <p>
      <GuessList :guesses="incorrect" />
    </p>
    <p>The letter I is in the word but in the wrong spot.</p>

    <p>
      <GuessList :guesses="wrong" />
    </p>
    <p>The letter U is not in the word in any spot.</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      correct: [[["W", "known"], ["E"], ["A"], ["R"], ["Y"]]],
      incorrect: [[["P"], ["I", "wrong-position"], ["L"], ["L"], ["S"]]],
      wrong: [[["V"], ["A"], ["G"], ["U", "wrong"], ["E"]]],
    };
  },
};
</script>
<style>
.about {
  flex-direction: column;
  margin: 0 auto;
  width: 50%;
}

p {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
</style>
