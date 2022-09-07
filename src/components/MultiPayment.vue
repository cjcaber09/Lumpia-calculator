<template>
  <div>
    <v-card-title primary-title> Multiple Payments </v-card-title>
    <v-form @submit.prevent="MultiPay">
      <v-card-text>
        <v-row>
          <v-col>
            <p class="text-subtitle-2">Total Produce</p>
            <p>
              <strong class="text-h6">{{ totalProduce }}</strong>
            </p>
          </v-col>
          <v-col>
            <p class="text-subtitle-2">Total Sales</p>
            <p>
              <strong class="text-h6">{{ toMoneyForm(totalSales) }}</strong>
            </p>
          </v-col>
          <v-col>
            <p class="text-subtitle-2">Total Profit</p>
            <p>
              <strong class="text-h6">{{ toMoneyForm(totalProfit) }}</strong>
            </p>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" type="submit" text>Make Payment</v-btn>
        <v-btn @click="$emit('Cancelled')" text>Cancel</v-btn>
      </v-card-actions>
    </v-form>
  </div>
</template>
<script>
import { GeneralMixin } from "../mixins/generalMixin";
export default {
  props: ["items"],
  mixins: [GeneralMixin],
  data() {
    return {
      // totalSales: 0,
      // totalProfit: 0,
      // totalProduce: 0,
    };
  },
  methods: {
    MultiPay() {
      this.$store.dispatch("Entry/MakeMultiPayment", this.items);
      setTimeout(() => {
        this.$emit("UpdateTable");
        this.deleting = false;
        this.$emit("Cancelled");
      }, 1000);
    },
  },
  computed: {
    totalSales() {
      let sales = 0;
      this.items.map((a) => (sales += a.totalSales));
      return sales;
    },
    totalProduce() {
      let produce = 0;
      this.items.map((a) => (produce += a.totalProduce));
      return produce;
    },
    totalProfit() {
      let profit = 0;
      this.items.map((a) => (profit += a.profit));
      return profit;
    },
  },
};
</script>