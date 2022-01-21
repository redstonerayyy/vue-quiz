<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" class="d-sm-flex col-main">
        <div class="">
          <v-chip color="black" outlined label large class="login"
            >Login</v-chip
          >
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Profile",
};
</script>

<style scoped>
.col-main {
  justify-content: center;
}

.login {
  min-width: 300px;
  margin: 100px;
}
</style>
