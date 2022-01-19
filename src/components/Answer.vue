<template>
  <span @click="$emit('answer-clicked', text)">{{ text }}</span>
</template>

<script>
export default {
  name: "Answer",
  props: {
    text: String,
  },
};
</script>

<style scoped>
span {
  width: 40%;
  padding: 20px;
  height: 100px;
  text-align: center;
  vertical-align: middle;
  border: 1px solid grey;
  border-radius: 20px;
  margin: 20px;
  min-width: 200px;
  user-select: none;
}
</style>