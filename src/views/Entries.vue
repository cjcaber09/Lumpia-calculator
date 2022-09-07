<template>
  <v-container>
    <v-row>
      <v-col> <p class="text-h4">Entries</p> </v-col>
      <v-dialog
        v-model="Confirmation"
        max-width="500px"
        transition="dialog-transition"
      >
        <v-card>
          <v-card-title> Do you want to save this new entry? </v-card-title>

          <v-card-text> Action Confirmation *</v-card-text>
          <v-card-actions class="text-right">
            <v-spacer></v-spacer>
            <v-btn
              text
              color="blue lighten-2"
              @click="Confirmation = !Confirmation"
              >No</v-btn
            >
            <v-btn text color="blue darken-1" @click="SubmitEntry">Yes</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-col class="text-right">
        <v-dialog v-model="dialog" persistent max-width="700px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="light-blue"
              class="white--text"
              v-on="on"
              v-bind="attrs"
            >
              <v-icon class="mr-1">mdi-plus</v-icon> Add Entry</v-btn
            >
            <v-btn
              color="light-blue"
              class="ml-2 white--text"
              @click="showCheckbox"
            >
              Multiple Payment
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">New Entry</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col>
                    <v-alert
                      border="left"
                      close-text="Close Alert"
                      :color="alert.type"
                      dark
                      dismissible
                      v-if="showAlert"
                    >
                      {{ alert.message }}
                    </v-alert>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <p class="text-h6">Price</p>
                    <p class="text-h4">{{ latestPrice.price }}</p>
                  </v-col>
                  <v-col>
                    <p class="text-h6">Labor fee</p>
                    <p class="text-h4">{{ latestLaborFee.LaborFee }}</p>
                  </v-col>
                  <v-col>
                    <p class="text-h6">Flour Price</p>
                    <p class="text-h4">{{ latestFlourPrice.FlourPrice }}</p>
                  </v-col>
                </v-row>
                <hr class="mb-3" />
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Total Produce*"
                      required
                      v-model="TotalProduce"
                      @input="CalculateVariables"
                      type="number"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Sacks used*"
                      @input="CalculateVariables"
                      v-model="SacksUsed"
                      type="number"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-menu
                      v-model="menu2"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="date"
                          label="Date of Production"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="date"
                        @input="menu2 = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="text-h6">Deductions </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <p class="text-h6">Labor</p>
                    <p class="text-h4">{{ toMoneyForm(D_Labor) }}</p>
                  </v-col>
                  <v-col>
                    <p class="text-h6">Flour</p>
                    <p class="text-h4">{{ toMoneyForm(D_Flour) }}</p>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <p class="text-h6">Total Sales</p>
                    <p class="text-h4">{{ toMoneyForm(TotalSales) }}</p>
                  </v-col>
                  <v-col>
                    <p class="text-h6">Profit</p>
                    <p class="text-h4">{{ toMoneyForm(Profit) }}</p>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false">
                Close
              </v-btn>
              <v-btn color="blue darken-1" text @click="CheckInputs">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-right">
        <div class="text-subtitle-2">
          Total Sales: {{ toMoneyForm(viewTotalSales) }}
        </div>
        <div class="text-subtitle-2">
          Total Profit: {{ toMoneyForm(viewTotalProfit) }}
        </div>
      </v-col>
    </v-row>

    <!-- <v-row>
      <v-col>
        <v-btn color="success" @click="showSelect = !showSelect">text</v-btn>
      </v-col>
    </v-row> -->
    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="Entries.docs"
          :server-items-length="Entries.totalDocs"
          :options.sync="options"
          :footer-props="{
            'items-per-page-options': [10, 20, 30, 40, 50, -1],
          }"
          class="elevation-1"
          :key="TableKey"
          :show-select="showSelect"
          :single-select="singleSelect"
          item-key="_id"
          v-model="selectedValues"
        >
          <template v-slot:[`item.profit`]="{ item }">
            <div>
              <span>{{ toMoneyForm(item.profit) }}</span>
            </div>
          </template>
          <template v-slot:[`item.totalSales`]="{ item }">
            <div>
              <span>{{ toMoneyForm(item.totalSales) }}</span>
            </div>
          </template>
          <template v-slot:[`item.unitPrice`]="{ item }">
            <div>
              <span>{{ toMoneyForm(item.unitPrice) }}</span>
            </div>
          </template>
          <template v-slot:[`item.dateOfProduce`]="{ item }">
            <span>{{ formatDate(item.dateOfProduce) }}</span>
          </template>
          <template v-slot:[`item.status`]="{ item }">
            <span>
              <v-chip color="success" label v-if="item.status">Paid</v-chip>
              <v-chip color="error" v-else label>Pending</v-chip>
            </span>
          </template>

          <template v-slot:[`item.actions`]="{ item }">
            <div class="text-center">
              <!-- <v-chip color="success" label v-if="item.status">Paid</v-chip>
               -->
              <EntryPayment :item="item" v-on:RefreshData="RefreshTable()" />
              <EntryEdit :items="item" v-on:RefreshData="RefreshTable()" />
            </div>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-row>
      <v-spacer></v-spacer>

      <v-col class="text-end" v-if="showSelect">
        <v-btn color="success" @click="makeMultiPayments">Make Payment</v-btn>
        <v-btn
          color="red lighten-1"
          class="white--text ml-2"
          @click="ArchiveDeleteEntries"
          >Archive and delete</v-btn
        >
        <v-btn
          color="red lighten-1"
          class="white--text ml-2"
          @click="deleteEntries"
          >Delete Entry</v-btn
        >
      </v-col>
    </v-row>
    <v-dialog
      v-model="multiDialog"
      scrollable
      :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <component
          :is="componentId"
          :items="selectedValues"
          :type="ActionType"
          @Cancelled="multiDialog = !multiDialog"
          @UpdateTable="FetchTable"
        ></component>
      </v-card>
    </v-dialog>
  </v-container>
</template>


<script>
import { GeneralMixin } from "../mixins/generalMixin";
import EntryPayment from "../components/EntriesPayment";
import EntryEdit from "../components/EntriesEdit";
import MultiDelete from "../components/MultiDelete";
import MultiPayment from "../components/MultiPayment";
export default {
  mixins: [GeneralMixin],
  components: { EntryPayment, MultiDelete, MultiPayment, EntryEdit },
  watch: {
    options: {
      handler(a) {
        var type = a.sortDesc[0] == true ? 1 : -1;
        var sort = a.sortBy[0] == null ? "createdDate" : a.sortBy[0];
        const values = {
          page: a.page,
          limit: a.itemsPerPage,
          sort,
          sortType: type,
        };
        this.FetchTable(values);
      },
      deep: true,
    },
    selectedValues: {
      handler(values) {
        this.viewTotalSales = 0;
        this.viewTotalProfit = 0;
        values.map((a) => {
          this.viewTotalSales += a.totalSales;
          this.viewTotalProfit += a.profit;
        });
      },
      deep: true,
    },
  },
  mounted() {
    this.FetchDatas();
  },
  computed: {
    latestPrice() {
      return this.$store.getters["Prices/GetLatestPrice"];
    },
    latestLaborFee() {
      return this.$store.getters["LaborFee/GetLatestLaborFee"];
    },
    latestFlourPrice() {
      return this.$store.getters["FlourPrice/GetLatestFlourPrice"];
    },
    Entries() {
      console.log(this.$store.getters["Entry/GetEntries"]);
      return this.$store.getters["Entry/GetEntries"];
    },
  },
  methods: {
    CheckInputs() {
      this.Confirmation = !this.Confirmation;
    },
    deleteEntries() {
      this.componentId = "MultiDelete";
      this.ActionType = "Delete";

      this.checkForSelected()
        ? (this.multiDialog = true)
        : console.log("no value");
    },
    ArchiveDeleteEntries() {
      this.componentId = "MultiDelete";
      this.ActionType = "Archive";
      this.checkForSelected()
        ? (this.multiDialog = true)
        : console.log("no value");
    },
    makeMultiPayments() {
      this.componentId = "MultiPayment";
      this.ActionType = "Payment";
      this.checkForSelected()
        ? (this.multiDialog = true)
        : console.log("no value");
    },
    checkForSelected() {
      // if (this.selectedValues.length <1) {
      //   return false
      // }
      return this.selectedValues < 1 ? false : true;
    },
    showCheckbox() {
      this.showSelect = !this.showSelect;
      this.showSelect == false ? (this.selectedValues = []) : null;
    },
    async RefreshTable() {
      await this.FetchTable();
      this.TableKey++;
    },
    async FetchDatas() {
      this.$store.dispatch("Prices/FetchLatestPrice");
      this.$store.dispatch("LaborFee/FetchLatestLaborFee");
      this.$store.dispatch("FlourPrice/FetchLatestFlourPrice");
    },
    async FetchTable(a) {
      let values = null;
      if (a == null) {
        values = await {
          page: 1,
          limit: 10,
          sort: "createdDate",
          sortType: -1,
        };
      } else {
        values = a;
      }
      // this.TableKey++;
      this.$store.dispatch("Entry/FetchEntries", values);
    },
    SubmitEntry() {
      if (this.TotalProduce == null || this.SacksUsed == null) {
        this.alert = {
          type: "error",
          message: "Total Produce or Sacks Used must have a value",
        };
        this.showAlert = true;
        this.Confirmation = !this.Confirmation;
        return;
      }
      if (this.TotalProduce <= 0 || this.SacksUsed <= 0) {
        this.alert = {
          type: "error",
          message:
            "Total Produce or Sacks Used must have a value greater than 0",
        };
        this.showAlert = true;
        this.Confirmation = !this.Confirmation;
        return;
      }
      let payload = {
        numberOfSacks: this.SacksUsed,
        totalProduce: this.TotalProduce,
        totalSales: this.TotalSales,
        unitPrice: this.latestPrice.price,
        laborFee: this.D_Labor,
        expenses: this.D_Flour,
        dateOfProduce: this.date,
        profit: this.Profit,
      };
      this.$store.dispatch("Entry/PostNewEntry", payload).then((res) => {
        this.alert = {
          type: "success",
          message: "The new record has been saved.",
        };
        this.showAlert = true;
        this.Confirmation = !this.Confirmation;

        let toBeZeros = ["TotalSales", "Profit", "D_Flour", "D_Labor"];
        toBeZeros.forEach((element) => {
          this.$data[element] = 0;
          // console.log();
        });
        this.TotalProduce = null;
        this.SacksUsed = null;
        this.FetchDatas();
        this.RefreshTable();
      });
    },
    CalculateVariables() {
      // calculate Total Sales
      if (this.TotalProduce != null) {
        this.TotalSales = this.TotalProduce * this.latestPrice.price;
      }
      if (this.SacksUsed != null) {
        this.D_Labor = this.SacksUsed * this.latestLaborFee.LaborFee;
        this.D_Flour = this.SacksUsed * this.latestFlourPrice.FlourPrice;
      }
      if (this.SacksUsed != null && this.TotalProduce != null) {
        this.Profit = this.TotalSales - (this.D_Labor + this.D_Flour);
      }
    },
  },
  data() {
    return {
      options: {},
      dialog: false,
      multiDialog: false,
      componentId: null,
      SacksUsed: null,
      singleSelect: false,
      viewTotalSales: 0,
      viewTotalProfit: 0,
      showSelect: false,
      selectedValues: [],
      TotalProduce: null,
      TotalSales: 0,
      Profit: 0,
      D_Flour: 0,
      D_Labor: 0,
      Confirmation: false,
      alert: {},
      showAlert: false,
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      TableKey: 0,
      ActionType: "",
      headers: [
        {
          text: "Total Produce",
          value: "totalProduce",
        },
        { text: "Flour Used", value: "numberOfSacks" },
        { text: "Date", value: "dateOfProduce" },
        { text: "Total Sales", value: "totalSales" },
        { text: "Price", value: "unitPrice" },
        { text: "Profit", value: "profit" },
        { text: "Status", value: "status" },
        { text: "", value: "actions", sortable: false, tdClass: "" },
      ],
      desserts: [],
    };
  },
};
</script>

<style>
</style>