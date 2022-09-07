<template>
  <v-container grid-list-xs>
    <v-alert
      border="left"
      close-text="Close Alert"
      :color="alert.type"
      dark
      dismissible
      v-if="showAlert"
    >
      {{ alert.message }}
    </v-alert>
    <v-row class="mt-2">
      <v-col>
        <p class="text-h4">Settings</p>
      </v-col>
    </v-row>
    <v-row>
      <!-- <template v-slot:extension>
        <v-tabs v-model="tab">
          <v-tab v-for="(item, index) in tabs" :key="index">
            {{ item.title }}
          </v-tab>
        </v-tabs>
      </template> -->
      <template>
        <v-tabs v-model="tab">
          <v-tab v-for="(item, index) in tabs" :key="index">
            {{ item.title }}
          </v-tab>
        </v-tabs>
      </template>
      <v-tabs-items v-model="tab" class="mt-2">
        <v-tab-item v-for="(item, index) in tabs" :key="index">
          <!-- </> -->
          <component
            :is="item.tab"
            v-on:FormSubmit="changeAlertContent"
          ></component>
        </v-tab-item>
      </v-tabs-items>
    </v-row>
  </v-container>
</template>
<script>
const Price = () => import("./Tabs/Price");
const LaborFee = () => import("./Tabs/LaborFee");
const FlourPrice = () => import("./Tabs/FlourPrice");
export default {
  components: { Price, LaborFee, FlourPrice },
  data() {
    return {
      tab: null,
      showAlert: false,
      alert: { type: "success", message: "" },
      tabs: [
        {
          title: "Price",
          tab: "Price",
        },
        {
          title: "Labor Fee",
          tab: "LaborFee",
        },
        {
          title: "Flour",
          tab: "FlourPrice",
        },
      ],
    };
  },
  methods: {
    changeAlertContent(a) {
      this.alert = a;
      this.showAlert = true;
    },
  },
};
</script>