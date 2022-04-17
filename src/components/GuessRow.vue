<script setup>
import LetterTile from "../components/LetterTile.vue";
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
    store() {
      return window.theStore;
    },
    remaining() {
      return this.store.length - this.word.length;
    },
  },
};
</script>

<style scoped></style>
