<template>
  <div>
    <v-row cols="6">
      <v-col>
        <v-form @submit.prevent="CreateNewLaborFee">
          <v-text-field
            label="Labor Fee/Sack"
            v-model="laborFee"
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
      laborFee: null,
    };
  },
  methods: {
    CreateNewLaborFee() {
      if (this.laborFee <= 0) {
        console.log("labor fee must be greater than 0");
        const alert = {
          type: "error",
          message: "New labor fee must be greater than 0.",
        };
        this.$emit("FormSubmit", alert);
        return;
      }
      console.log("Hee");
      this.$store
        .dispatch("LaborFee/CreateNewLaborFee", { LaborFee: this.laborFee })
        .then((res) => {
          const alert = {
            type: "success",
            message: "New labor fee has been added, and used as default price.",
          };
          this.$emit("FormSubmit", alert);

          this.laborFee = null;
        });
    },
  },
};
</script>