<template>
  <div class="home">
    <v-chip
      @click="startQuiz()"
      color="black"
      outlined
      label
      large
      class="home-btn"
      >Start Quiz</v-chip
    >
    <v-chip
      @click="startEndless()"
      color="black"
      outlined
      label
      large
      class="home-btn"
      >Endless</v-chip
    >
  </div>
</template>

<script>
export default {
  name: "Home",
  methods: {
    startQuiz() {},
    startEndless() {},
  },
};
</script>

<style scoped>
.home {
  padding-top: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  user-select: none;
}

.home-btn {
  margin: 20px;
  min-width: 200px;
  justify-content: center;
}
</style>
