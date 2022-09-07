<template>
  <v-dialog v-model="dialog" width="700">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="elevation-0"
        color="green lighten-2"
        icon
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>mdi-cash</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="headline grey lighten-2">
        Make Payment
      </v-card-title>

      <v-card-text>
        <v-container grid-list-xs>
          <v-row>
            <v-col>
              <v-alert :type="alert.type" dismissible :value="showAlert">
                {{ alert.message }}
              </v-alert>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-date-picker
                v-model="payment.paymentDate"
                :landscape="true"
                :reactive="true"
              ></v-date-picker>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                name="name"
                label="Payment Amount"
                id="id"
                v-model="payment.amountPaid"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-btn
                color="blue lighten-1"
                icon
                class="mt-3"
                @click="payment.amountPaid = item.totalSales"
                ><v-icon>mdi-content-duplicate</v-icon></v-btn
              >
            </v-col>
            <!-- </v-row>
            <v-row> -->

            <v-col>
              <p class="text-h6">Due amount</p>
              <p class="text-h4">{{ toMoneyForm(item.totalSales) }}</p>
            </v-col>
          </v-row>
          <!-- <v-row>
              <v-col>
                <p class="text-h6"></p>
              </v-col>
            </v-row> -->
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="makePayment"> Make Payment </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { GeneralMixin } from "../mixins/generalMixin";
export default {
  props: ["item"],
  mixins: [GeneralMixin],
  data() {
    return {
      dialog: false,
      alert: { type: "success", message: "BLAAh" },
      payment: {
        paymentDate: null,
        amountPaid: null,
        status: null,
      },
      showAlert: false,
    };
  },
  methods: {
    makePayment() {
      // if (payment.paymentDate == null) {
      //   return;
      // }
      if (this.payment.amountPaid == null || this.payment.amountPaid <= 0) {
        this.alert = {
          type: "error",
          message: "The Payment amount must be greater than 0",
        };
        this.showAlert = true;
        return;
      }
      // this.toNumberForm();
      if (this.payment.amountPaid < this.item.totalSales) {
        this.alert = {
          type: "error",
          message:
            "The Payment amount must be greater than or equal the Due amount.",
        };
        this.showAlert = true;
        return;
      }
      if (this.payment.amountPaid == this.item.totalSales) {
        this.payment.status = true;
      }
      var payload = {
        id: this.item._id,
        values: this.payment,
      };
      this.$store.dispatch("Entry/MakePayment", payload);
      this.$emit("RefreshData");
    },
  },
  // computed :{

  // }
};
</script>