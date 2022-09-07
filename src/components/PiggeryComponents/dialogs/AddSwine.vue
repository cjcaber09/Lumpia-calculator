<template>
  <div>
    <v-dialog
      v-model="ModalActive"
      scrollable
      width="unset"
      transition="dialog-transition"
      persistent
    >
      <v-card>
        <div>
          <v-card-title primary-title> Add Swine </v-card-title>
          <v-card-text class="caption">
            This Form applies to all types of Pig Farming (Farrowing, Fattening,
            Weaning)
          </v-card-text>
          <v-card-text>
            <v-row>
              <v-col sm="12" lg="6">
                <v-select
                  :items="types"
                  label="Swine Type"
                  v-model="AddSwineInput.type"
                  solo
                ></v-select>
              </v-col>
              <v-col>
                <v-text-field
                  solo
                  label="Number of swine/s"
                  type="number"
                  sm="12"
                  lg="6"
                  v-model="AddSwineInput.swine_heads"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col sm="12" lg="6">
                <div class="subtitle-1 mb-1">Date Received</div>
                <v-date-picker
                  v-model="AddSwineInput.date_received"
                  label=""
                ></v-date-picker>
              </v-col>
              <v-col>
                <v-row sm="12" lg="6">
                  <v-col cols="12">
                    <v-text-field
                      label="Swine Cost (head)"
                      solo
                      v-model="AddSwineInput.swine_cost"
                      type="number"
                    >
                    </v-text-field>
                    <v-text-field
                      label="Total Swine Cost"
                      solo
                      v-model="AddSwineInput.total_cost"
                      disabled
                      type="number"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field label="Swine ID" solo disabled>
                    </v-text-field>
                  </v-col>
                  <!-- <v-col>
                  <v-text-field label="Swine Cost" solo> </v-text-field>
                </v-col> -->
                </v-row>
              </v-col>
            </v-row>
            <div v-if="expenses.length > 0">
              <v-row>
                <v-col cols="12">
                  <p class="font-weight-black text-h5">Expenses</p>
                </v-col>
              </v-row>
              <v-row
                v-for="(expense, index) in expenses"
                :key="index"
                cols="12"
              >
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
            </div>
          </v-card-text>

          <v-card-actions class="d-flex justify-end">
            <v-btn color="warning" outlined @click="AddExpenses">
              Add Expenses
            </v-btn>

            <v-btn color="primary" outlined @click="submit"> Submit </v-btn>
            <v-btn color="error" outlined @click="ModalActive = !ModalActive">
              Cancel
            </v-btn>
          </v-card-actions>
        </div>
        <div></div>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar">
      <div v-for="(item, index) in text" :key="index">
        <li>{{ item.message }}</li>
      </div>

      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  props: ["ModalStatus", "types"],
  data() {
    return {
      ModalActive: this.ModalStatus,
      date: null,
      snackbar: false,
      text: [],
      AddSwineInput: {
        type: null,
        date_received: null,
        swine_heads: null,
        swine_cost: null,
        total_cost: null,
        swine_id: null,
      },
      expenses: [],
    };
  },
  created() {},
  computed: {},
  methods: {
    submit() {
      let a = this.checkForEmptyValues(this.AddSwineInput, [
        "type",
        "date_received",
        "swine_heads",
        "swine_cost",
      ]).then((res) => {
        if (res.length > 0) {
          this.snackbar = true;
          this.text = res;
        } else {
          this.text = [];
          this.snackbar = true;
          this.text.push({ message: "Saved" });
          this.data = {
            SwineInput: this.AddSwineInput,
            Expenses: this.expenses,
          };
          this.$store
            .dispatch("Fattening/PostFattening", this.data)
            .then((res) => {
              this.$parent.UpdateData();
            });
        }
      });
    },
    AddExpenses() {
      this.expenses.push({});
    },
    async checkForEmptyValues(a, array) {
      try {
        let errors = 0;
        let errormessages = [];
        array.forEach((element) => {
          if (a[element] == null) {
            errors++;
            errormessages.push({
              message: element.replace(/_/g, " ") + " is not valid.",
            });
          }
          if (element == "date_received") {
            a[element] = new Date(a[element]).toISOString().substr(0, 10);
          }
        });
        return errormessages;
      } catch (error) {
        return error;
      }
    },
  },
  computed: {},
  watch: {
    "AddSwineInput.swine_cost": function name(params) {
      this.AddSwineInput.total_cost =
        this.AddSwineInput.swine_cost * this.AddSwineInput.swine_heads;
    },
    "AddSwineInput.swine_heads": function name(params) {
      this.AddSwineInput.total_cost =
        this.AddSwineInput.swine_cost * this.AddSwineInput.swine_heads;
    },
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
  },
};
</script>