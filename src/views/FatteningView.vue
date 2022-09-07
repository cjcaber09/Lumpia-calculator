<template>
  <div>
    <v-container grid-list-xs class="mt-2" v-if="ActiveFattening">
      <v-card class="mb-7">
        <v-container grid-list-xs>
          <v-card-title primary-title>
            Date Received:
            {{ formatDate(ActiveFattening.date_received) }}
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col>
                <div class="text-subtitle-2">Sick : 0</div>
                <div class="text-subtitle-2">Dead : 0</div>
                <div class="text-subtitle-2">
                  Alive : {{ ActiveFattening.swine_heads }}
                </div>
                <div class="text-subtitle-2">
                  Total Head/s : {{ ActiveFattening.swine_heads }}
                </div>
              </v-col>
              <v-col class="text-end">
                <p class="text-subtitle-2 font-weight-black">
                  Total cost: {{ toMoneyForm(ActiveFattening.total_cost) }}
                </p>
                <p class="text-subtitle-2 font-weight-black">
                  Misc Expenses:
                  {{ toMoneyForm(TotalExpeses(ActiveFattening.expenses)) }}
                </p>
                <p class="text-h6 font-weight-black">
                  Total Expenses:
                  {{
                    toMoneyForm(
                      ActiveFattening.total_cost +
                        TotalExpeses(ActiveFattening.expenses)
                    )
                  }}
                </p>
              </v-col>
            </v-row>
          </v-card-text>
        </v-container>
      </v-card>
      <v-btn color="primary" @click="showModal = !showModal">Add Expense</v-btn>
      <v-row class="mt-5">
        <v-col
          sm="12"
          xl="6"
          v-for="(item, index) in ActiveFattening.expenses"
          :key="index"
        >
          <v-card>
            <v-container grid-list-xs>
              <v-card-title primary-title>
                {{ item.name }}
              </v-card-title>
              <v-card-text>
                <div class="text-subtitle-2">
                  Amount: {{ toMoneyForm(item.amount) }}
                </div>
                <div class="text-subtitle-2">Quantity: {{ item.quantity }}</div>
                <div class="text-subtitle-2">
                  Total:
                  {{ toMoneyForm(item.amount) }}
                </div>
              </v-card-text>
              <v-card-actions>
                <v-btn class="" color="primary">Edit</v-btn>
                <v-btn color="error" @click="DeleteDialogMethod(item._id)"
                  >Delete</v-btn
                >
              </v-card-actions>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
      <AddExpenses :showModal="showModal" />
      <DeleteDialogComp
        :dialog="DeleteDialog"
        dispatch="Fattening/DeleteExpenseRecord"
      />
    </v-container>
  </div>
</template>

<script>
import { GeneralMixin } from "../mixins/generalMixin";
import DeleteDialogComp from "../components/PiggeryComponents/dialogs/DeleteDialog.vue";
const AddExpenses = () =>
  import("../components/PiggeryComponents/dialogs/AddExpenses.vue");
export default {
  components: { AddExpenses, DeleteDialogComp },
  data() {
    return {
      showModal: false,
      DeleteDialog: false,
      DelDialogId: null,
      fatteningId: null,
    };
  },
  mixins: [GeneralMixin],
  computed: {
    ActiveFattening() {
      return this.$store.getters["Fattening/GetActiveFattening"];
    },
  },
  methods: {
    DeleteDialogMethod(id) {
      this.fatteningId = this.ActiveFattening._id;
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
  },
  beforeCreate() {
    this.$store.dispatch(
      "Fattening/FetchOneById",
      this.$route.params.fatteningId
    );
  },
  watch: {},
};
</script>