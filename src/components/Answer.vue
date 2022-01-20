<template>
  <v-chip
    :color="right ? 'green' : 'black'"
    :outlined="right ? false : true"
    label
    large
    @click="$emit('answer-clicked', text)"
    >{{ text }}</v-chip
  >
</template>

<script>
export default {
  name: "Answer",
  props: {
    text: String,
    right: Boolean,
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
}

span:hover {
  background: rgb(223, 223, 223);
}

.right {
  border-color: greenyellow;
}
</style>