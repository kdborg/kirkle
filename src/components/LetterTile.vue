<template>
  <div :class="type">{{ letter }}</div>
</template>

<script>
export default {
  name: "LetterTile",
  props: ["letter", "type"],
};
</script>

<style scoped>
div {
  display: inline-block;
  width: 40px;
  height: 40px;
  margin: 2px;
  padding-top: 2px;
  text-align: center;
  vertical-align: center;
  color: black;
  font-size: 2rem;
  font-weight: bold;
  line-height: 2rem;
  border: 1px solid lightgray;
  background: white;
}

.known {
  color: white;
  background: rgb(106, 170, 100);
  border-color: rgb(106, 170, 100);
}

.wrong-position {
  color: white;
  background: rgb(201, 180, 88);
  border-color: rgb(201, 180, 88);
}

.wrong {
  color: white;
  background: rgb(120, 124, 126);
  border-color: rgb(120, 124, 126);
}
</style>
