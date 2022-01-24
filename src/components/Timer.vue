<template>
  <p>{{ time }}</p>
</template>

<script>
export default {
  name: "Timer",
  props: {
    time: Number,
  },
};
</script>

<style scoped>
p {
  margin: 10px;
}
</style>