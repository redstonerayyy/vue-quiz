<template>
  <div class="home">
    <div class="buttons" v-if="!start">
      <v-chip
        @click="prepareQuiz()"
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
    <div class="select" v-if="start">
      <div class="simple">
        <v-text-field
          label="Number of Questions"
          :rules="rules"
          hide-details="auto"
          value=""
        ></v-text-field>
        <Multicheck :select_name="'difficulty'" :options="difficulties" />
        <Multicheck :select_name="'type'" :options="types" />
      </div>
      <div class="scroll-container">
        <Multicheck :select_name="'category'" :options="categories" />
      </div>
      <v-chip
        @click="startQuiz()"
        color="black"
        outlined
        label
        large
        class="home-btn"
        >Start</v-chip
      >
    </div>
  </div>
</template>

<script>
import Multicheck from "../components/Multicheck.vue";

export default {
  name: "Home",
  components: {
    Multicheck,
  },
  data() {
    return {
      start: false,
      types: [],
      difficulties: [],
      categories: [],
      selectall: false,
      selected: [],
      rules: [
        (value) => !!value || "Required.",
        (value) => {
          if (!value.trim()) return true;
          if (!isNaN(parseFloat(value)) && value >= 1 && value <= 1000)
            return true;
          return "Enter a Number!";
        },
      ],
    };
  },
  methods: {
    async prepareQuiz() {
      if (!this.start) {
        this.start = true;
        let categories = await fetch("/api?request=categories");
        let globalinfo = await fetch("/api?request=globalinfo");
        let cgdata = await categories.json();
        let gdata = await globalinfo.json();
        this.categories = cgdata.trivia_categories.map(
          (category) => category.name
        );
        this.difficulties = gdata.difficulties;
        this.types = gdata.types;
      }
    },
    selectAll() {
      this.selected = [];
      if (this.selectall) {
        for (let i in this.categories) {
          this.selected.push(this.categories[i].name);
        }
      }
    },
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
  flex-direction: row;
  user-select: none;
  flex-wrap: wrap;
}

.home-btn {
  margin: 20px;
  min-width: 200px;
  justify-content: center;
}

.simple {
  display: flex;
  justify-content: center;
  margin-right: 100px;
}

.select {
  display: flex;
  justify-content: center;
  width: 100%;
}

.simple * {
  margin: 10px;
}

.scroll-container {
  overflow-y: scroll;
  height: 500px;
  padding: 10px;
}
</style>
