<template>
  <div id="app">
    <LeftNave></LeftNave>
    <div class="main">
      <router-view />
    </div>
  </div>
</template>

<script>
import LeftNave from "@/components/LeftNav";

export default {
  name: "app",
  components: {
    LeftNave
  }
};
</script>

<style>
html,
body,
#app {
  height: 100%;
  margin: 0;
  padding: 0;
}
body {
  background: url(./assets/img/bac.jpg) no-repeat;
  background-size: cover;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
.main {
  float: left;
  width: 95%;
  height: 100%;
  overflow: auto;
}
</style>
