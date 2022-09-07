<template>
  <div>
    <v-row cols="6">
      <v-col>
        <v-form @submit.prevent="CreateNewPrice">
          <v-text-field
            label="New price"
            v-model="price"
            type="number"
            required
          ></v-text-field>
          <v-btn color="primary" type="submit">SAVE</v-btn>
        </v-form>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div v-for="(item, index) in prices" :key="index">
          {{ item.price }}
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      price: null,
      prices: [],
    };
  },
  mounted() {
    // axios.get("http://localhost:3000/prices").then((res) => {
    //   this.prices = res.data;
    // });
  },
  computed: {
    history() {
      console.log(this.$store.getters["Prices/GetCount"]);
    },
  },

  methods: {
    CreateNewPrice() {
      if (this.price <= 0) {
        console.log("Price must be greater than 0");
        const alert = {
          type: "error",
          message: "New product price must be greater than 0.",
        };
        this.$emit("FormSubmit", alert);
        return;
      }
      this.$store
        .dispatch("Prices/CreateNewProductPrice", this.price)
        .then((res) => {
          const alert = {
            type: "success",
            message:
              "New product price has been added, and used as default price.",
          };
          this.$emit("FormSubmit", alert);

          this.price = null;
        });
    },
  },
};
</script>