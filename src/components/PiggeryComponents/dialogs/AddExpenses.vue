<template>
  <div>
    <v-dialog v-model="dialog" max-width="900">
      <v-card>
        <v-container>
          <v-card-title primary-title> Add New Expenses </v-card-title>
          <v-card-text>
            <v-row v-for="(expense, index) in expenses" :key="index" cols="12">
              <v-col>
                <v-text-field
                  solo
                  label="name"
                  v-model="expenses[index].name"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  solo
                  label="quantity"
                  v-model="expenses[index].quantity"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  solo
                  label="amount"
                  v-model="expenses[index].amount"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  solo
                  label="total"
                  disabled
                  v-model="expenses[index].total_expense"
                ></v-text-field>
              </v-col>
              <v-btn
                icon
                color="error"
                class="mt-4"
                @click="expenses.splice(index, 1)"
              >
                <v-icon>mdi-close-box</v-icon>
              </v-btn>
            </v-row>
          </v-card-text>
          <v-card-actions class="d-flex justify-end">
            <v-btn color="primary" class="mr-1" @click="CheckAndAddField"
              >Add Expense Field</v-btn
            >
            <v-spacer></v-spacer>
            <v-btn color="primary" class="mr-1" @click="UpdateExpenses"
              >Add record</v-btn
            >
            <v-btn color="error" @click="$parent.showModal = !$parent.showModal"
              >close</v-btn
            >
          </v-card-actions>
        </v-container>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="Snackbar" :multi-line="true">
      <li v-for="(item, index) in snackbarText" :key="index">
        {{ item }}
      </li>
      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="Snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  props: ["showModal"],
  data() {
    return {
      Snackbar: false,
      snackbarText: [],
      expenses: [
        {
          name: "",
          quantity: "",
          amount: "",
          total_expense: "",
        },
      ],
      dialog: false,
    };
  },
  computed: {},
  methods: {
    validateFields() {
      this.snackbarText = [];
      const UnfilledFields = [];
      for (let index = 0; index < this.expenses.length; index++) {
        const Keys = Object.keys(this.expenses[index]);
        Keys.forEach((element) => {
          if (this.expenses[index][element] == "") {
            UnfilledFields.push([element]);
          }
        });
      }
      UnfilledFields.forEach((element) => {
        this.snackbarText.push(`${element} has no value.`);
      });
      if (UnfilledFields.length < 1) {
        return true;
      } else {
        this.Snackbar = true;

        return false;
      }
    },
    async CheckAndAddField() {
      if (this.validateFields()) {
        this.expenses.push({
          name: "",
          quantity: "",
          amount: "",
          total_expense: "",
        });
      }
    },
    UpdateExpenses() {
      if (this.validateFields()) {
        this.$store
          .dispatch("Fattening/AddExpenses", {
            id: this.$parent.ActiveFattening._id,
            expenses: this.expenses,
          })
          .then((res) => {
            this.Snackbar = true;
            this.snackbarText.push("Expenses has been saved.");
            (this.expenses = [
              {
                name: "",
                quantity: "",
                amount: "",
                total_expense: "",
              },
            ]),
              setTimeout(() => {
                this.$store.dispatch(
                  "Fattening/FetchOneById",
                  this.$route.params.fatteningId
                );
              }, 500);
          });
      }
    },
  },
  watch: {
    expenses: {
      handler: function (val, oldVal) {
        val.forEach((element, index) => {
          if (element.amount > 0 && element.quantity > 0) {
            element.total_expense = element.amount * element.quantity;
          }
        });
      },
      deep: true,
    },
    showModal: function (oldVal, newVal) {
      this.dialog = !this.dialog;
    },
  },
};
</script>