<template>
  <div>
    <v-row cols="6">
      <v-col>
        <v-form @submit.prevent="CreateNewFlourPrice">
          <v-text-field
            label="Flour Price/Sack"
            v-model="flourPrice"
            type="number"
          ></v-text-field>
          <v-btn type="submit" color="primary">SAVE</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      flourPrice: null,
    };
  },
  methods: {
    CreateNewFlourPrice() {
      console.log("hey");

      if (this.flourPrice <= 0) {
        const alert = {
          type: "error",
          message: "New flour price must be greater than 0.",
        };
        this.$emit("FormSubmit", alert);
        return;
      }
      this.$store
        .dispatch("FlourPrice/CreateNewFlourPrice", {
          FlourPrice: this.flourPrice,
        })
        .then((res) => {
          const alert = {
            type: "success",
            message:
              "New flour price has been added, and used as default price.",
          };
          this.$emit("FormSubmit", alert);

          this.laborFee = null;
        });
    },
  },
};
</script>