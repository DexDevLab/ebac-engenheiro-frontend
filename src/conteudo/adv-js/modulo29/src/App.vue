<script setup>
import ImoveisComponent from './components/ImoveisComponent.vue';
</script>

<template>
  <main>
    <div class="container">
      <div class="title">
        Módulo 29 - Exercício com Vue.js
      </div>
    </div>
    <div class="container">
      <ImoveisComponent></ImoveisComponent>
    </div>
  </main>
</template>

<style scoped>
main {
  margin: auto;
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 90vh;
  justify-content: flex-start;
  align-self: center;
  justify-self: center;
}

.container {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  max-width: 1280px;
}


.container >* {
  padding: 20px;
}


.title {
  font-size: 35px;
}


.spacer {
  height: 100%;
  background-color: white;
  width: 2px;
  padding: 0 10px;
}


</style>
