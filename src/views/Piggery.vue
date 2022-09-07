<template>
  <div>
    <v-container>
      <v-row class="mt-1">
        <v-col
          lg="4"
          sm="6"
          xs="12"
          v-for="(element, index) in CardDetails"
          :key="index"
        >
          <v-card
            :color="element.color"
            :active="true"
            @click="SetNewActiveCard(element)"
          >
            <v-card-title>{{ element.title }}</v-card-title>
            <!-- <v-card-text>{{}}</v-card-text> -->
          </v-card>
        </v-col>
      </v-row>

      <v-row v-if="activeCard">
        <v-col> <v-component :is="activeCard" /></v-col>
      </v-row>
      <v-row>
        <v-spacer></v-spacer>

        <v-col cols="3" class="d-flex justify-end">
          <v-btn color="primary" dark class="mr-3" @click="AddSwineModal"
            >Add Swine/s</v-btn
          >
          <AddSwineComp
            :ModalStatus="AddSwine"
            :types="AddSwineTypes"
            :key="AddSwineCounter"
          />
          <v-btn color="primary" dark>Remove Swine/s</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Fattening from "../components/PiggeryComponents/Fattening.vue";
import Farrowing from "../components/PiggeryComponents/Farrowing.vue";
import Weaning from "../components/PiggeryComponents/Weaning.vue";
import AddSwineComp from "../components/PiggeryComponents/dialogs/AddSwine.vue";

export default {
  components: {
    Fattening,
    Weaning,
    Farrowing,
    AddSwineComp,
  },
  data() {
    return {
      activeCard: "",
      AddSwine: false,
      ActiveCardCounter: 0,
      CardDetails: [
        {
          title: "Farrowing",
          color: "#A4F9C8",
        },
        {
          title: "Fattening",
          color: "#749C75",
        },
        {
          title: "Weaning",
          color: "#F3C969",
        },
      ],
      AddSwineTypes: ["Farrowing", "Fattening", "Weaning"],
      AddSwineCounter: 0,
    };
  },
  computed: {
    FatteningLists() {
      return this.$store.getters["Fattening/GetFatteningEntries"];
    },
  },
  created() {
    this.UpdateData();
  },
  beforeCreate() {
    this.$store.dispatch("Fattening/FetchAllFattening");
  },
  methods: {
    UpdateData() {
      this.$store.dispatch("Fattening/FetchAllFattening");
    },
    SetNewActiveCard(a) {
      this.activeCard = a.title;
      this.ActiveCardCounter += 1;
    },
    AddSwineModal() {
      this.AddSwine = true;
      this.AddSwineCounter++;
    },
  },
  //   watch: {
  //     activeCard: () => {
  //       console.log(this.activeCard);
  //     },
  //   },
};
</script>