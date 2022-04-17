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
import { useStore } from "../stores/kirkle";

export default {
  name: "GuessRow",
  props: ["word"],
  computed: {
    store() {
      const store = useStore();
      return store;
    },
    remaining() {
      return this.store.length - this.word.length;
    },
  },
};
</script>

<style scoped></style>
