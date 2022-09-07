<template>
  <div>
    <v-card elevation-5 v-for="(item, index) in items" :key="index">
      test
    </v-card>
  </div>
</template>
<script>
export default {
  props: ["items"],
};
</script>