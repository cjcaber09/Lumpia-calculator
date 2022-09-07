<template>
    <div>
    <Appbar/>
    <v-main >
      <router-view />
    </v-main>
    </div>
</template>


<script>
    const Appbar =()=> import('./AppBar.vue')
  export default {
    name: "App",
    components:{Appbar}
    
    
  };
  </script>