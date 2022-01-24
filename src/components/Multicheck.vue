<template>
  <div class="multicheck">
    <v-checkbox
      v-model="selectall"
      @click="selectAll"
      label="Select All"
    ></v-checkbox>
    <v-checkbox
      v-model="selected"
      v-for="option in options"
      :label="option"
      :key="option"
      :value="option"
    ></v-checkbox>
  </div>
</template>

<script>
export default {
  name: "Multicheck",
  props: {
    options: Array,
    select_name: String,
  },
  data() {
    return {
      selectall: false,
      selected: [],
    };
  },
  watch: {
    selected: function () {
      this.$store.commit("setSelect", [this.select_name, this.selected]);
    },
  },
  methods: {
    selectAll() {
      this.selected = [];
      if (this.selectall) {
        for (let i in this.options) {
          this.selected.push(this.options[i]);
        }
      }
    },
  },
};
</script>
