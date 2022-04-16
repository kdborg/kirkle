<script setup>
import LetterTile from "../components/LetterTile.vue";
</script>

<template>
  <div v-for="(guesses, index) in guesses" :key="index">
    <div>
      <LetterTile
        v-for="(guess, i) in guesses"
        :letter="guess[0]"
        :type="guess[1]"
        :key="'guess' + index + '-' + i"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "GuessList",
  props: ["guesses"],
  components: ["LetterTile"],
};
</script>

<style scoped></style>
