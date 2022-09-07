<template>
  <div>
    <v-row>
      <v-col>
        <div id="buttons" class="d-flex justify-end">
          <v-btn> test </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row v-for="(item, index) in Data" :key="index">
      <v-col>
        <v-card elevation="10">
          <v-card-title primary-title> Add Swine </v-card-title>
          <v-card-text>
            <v-row>
              <v-col class="text-subtitle-1 font-weight-bold">
                <v-row no-gutters>
                  <v-col cols="12">
                    Number of Swines: {{ item.swine_heads }}
                  </v-col>
                  <v-col cols="12">
                    Swine cost/Head: {{ toMoneyForm(item.swine_cost) }}
                  </v-col>
                  <v-col cols="12">
                    Total cost of Swines: {{ toMoneyForm(item.total_cost) }}
                  </v-col>
                </v-row>
              </v-col>
              <v-row no-gutters>
                <v-col>
                  <v-col cols="12" class="text-subtitle-1 font-weight-bold">
                    Date of Arrival: {{ formatDate(item.date_received) }}
                  </v-col>
                  <v-col cols="12" class="text-subtitle-1 font-weight-bold">
                    Total Expenses:
                    {{ toMoneyForm(TotalExpeses(item.expenses)) }}
                  </v-col>
                </v-col>
              </v-row>
            </v-row>
            <v-row>
              <v-col>
                <v-btn
                  color="primary"
                  class="mr-2"
                  link
                  :to="`fattening/${item._id}`"
                >
                  view</v-btn
                ><v-btn color="primary" @click="DeleteDialogMethod(item._id)"
                  >Delete</v-btn
                >
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <div class="text-center mt-10">
      <v-pagination
        v-model="page"
        :length="DataPages"
        @input="pageUpdate"
      ></v-pagination>
    </div>
    <DeleteDialogComp
      :dialog="DeleteDialog"
      dispatch="Fattening/DeleteRecord"
    />
  </div>
</template>
<script>
import { GeneralMixin } from "../../mixins/generalMixin";
import DeleteDialogComp from "../PiggeryComponents/dialogs/DeleteDialog.vue";

export default {
  mixins: [GeneralMixin],
  components: { DeleteDialogComp },
  created() {},
  data() {
    return {
      page: 1,
      DeleteDialog: false,
      DelDialogId: null,
    };
  },
  computed: {
    Data() {
      return this.$store.getters["Fattening/GetFatteningEntries"].docs;
    },
    // totalPages() {
    //   return this.$store.getters["Fattening/GetFatteningEntries"].totalPages;
    // },
    DataPages() {
      return this.$store.getters["Fattening/GetFatteningEntries"].totalPages;
    },
  },
  methods: {
    DeleteDialogMethod(id) {
      this.DelDialogId = id;
      this.DeleteDialog = !this.DeleteDialog;
    },
    TotalExpeses(value) {
      let TotalExpesesVar = 0;
      value.filter((a) => {
        TotalExpesesVar = TotalExpesesVar + a.total_expense;
      });
      return TotalExpesesVar;
    },
    pageUpdate() {
      this.$store.dispatch("Fattening/FetchAllFattening", { page: this.page });
    },
  },
  created() {
    this.$store.dispatch("Fattening/FetchAllFattening");
  },
};
</script>