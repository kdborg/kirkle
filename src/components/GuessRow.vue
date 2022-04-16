<script setup>
import LetterTile from "../components/LetterTile.vue";
import { useStore } from "../stores/kirkle";

const store = useStore();
</script>
<template>
  <div>
    <LetterTile v-for="(letter, index) in word" :letter="letter" :key="index" />
    <LetterTile v-for="i in remaining" letter="&nbsp;" :key="'guess' + i" />
  </div>
</template>

<script>
export default {
  name: "GuessRow",
  props: ["word"],
  computed: {
    remaining() {
      return this.store.wordLength - this.word.length;
    },
  },
};
</script>

<style scoped></style>
