<template>
  <div id="app">
    <HotelForm />
  </div>
</template>

<script>
import HotelForm from './components/HotelForm.vue'

export default {
  name: 'app',
  components: {
    HotelForm
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  padding-top: 60px;
  height: 100vh;
  background: rebeccapurple;
}

</style>
