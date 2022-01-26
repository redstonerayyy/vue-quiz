<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" class="d-sm-flex col-main">
        <div class="">
          <v-text-field
            v-model="username"
            label="Username"
            :rules="rules"
            hide-details="auto"
            value=""
          ></v-text-field>
          <v-text-field
            v-model="email"
            label="Email"
            :rules="rules"
            hide-details="auto"
            value=""
          ></v-text-field>
          <v-text-field
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="rules"
            :type="show1 ? 'text' : 'password'"
            label="Password"
            @click:append="show1 = !show1"
            counter
          ></v-text-field>
          <v-chip
            color="black"
            outlined
            label
            large
            class="login"
            @click="submit"
            >Login</v-chip
          >
          <div class="stats-container">
            <span class="total stats-counter"
              >Total: {{ this.$store.state.stats.total }}
            </span>
            <span class="right stats-counter"
              >Right: {{ this.$store.state.stats.right }}
            </span>
            <span class="wrong stats-counter"
              >Wrong: {{ this.$store.state.stats.wrong }}
            </span>
            <span class="unanswered stats-counter"
              >Unanswered: {{ this.$store.state.stats.not_answered }}
            </span>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Profile",
  data() {
    return {
      rules: [(value) => !!value || "Required."],
      username: "",
      email: "",
      password: "",
      show1: false,
    };
  },
  computed: {
    canlogin() {
      //return this.username != "" && this.email != "" && this.password != ""
      return this.username != "";
    },
  },
  methods: {
    async submit() {
      if (this.canlogin) {
        let res = await fetch(`/user?username=${this.username}`);
        let data = await res.json();
        if (data.found && !this.$store.state.login.loggedin) {
          let user = data._doc;
          this.$store.state.stats.total =
            user.total + this.$store.state.stats.total;
          this.$store.state.stats.not_answered =
            user.unanswered + this.$store.state.stats.not_answered;
          this.$store.state.stats.wrong =
            user.wrong + this.$store.state.stats.wrong;
          this.$store.state.stats.right =
            user.right + this.$store.state.stats.right;
        }
        this.$store.state.login.loggedin = true;
        this.$store.state.login.username = this.username;
        await fetch("/user", {
          method: "post",
          body: JSON.stringify({
            username: this.username,
            email: this.email,
            password: this.password,
            total: this.$store.state.stats.total,
            unanswered: this.$store.state.stats.not_answered,
            wrong: this.$store.state.stats.wrong,
            right: this.$store.state.stats.right,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
    },
  },
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

.stats-counter {
  border-radius: 5px;
  color: white;
  padding: 5px;
  margin: 10px;
  display: inline-block;
}

.total {
  background: blue;
}

.right {
  background: green;
}

.wrong {
  background: red;
}

.unanswered {
  background: turquoise;
}

.stats-container {
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: row;
}
</style>
