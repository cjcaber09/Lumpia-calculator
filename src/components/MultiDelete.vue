<template>
  <div>
    <v-card-title primary-title> Delete Entries? </v-card-title>
    <v-card-text>
      <v-row v-if="deleting">
        <v-col>
          <v-progress-linear
            v-model="value"
            :buffer-value="bufferValue"
            stream
          ></v-progress-linear>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col> Are you sure you want to delete the entries? </v-col>
      </v-row>
      <v-row>
        <v-col>
          <span class="font-weight-bold"> Date </span>
        </v-col>
        <v-col>
          <span class="font-weight-bold"> Produce </span>
        </v-col>
        <v-col>
          <span class="font-weight-bold"> Status </span>
        </v-col>
        <v-col>
          <span class="font-weight-bold"> Sales </span>
        </v-col>
      </v-row>
      <v-row v-for="item in items" :key="item.index">
        <v-col>{{ formatDate(item.createdDate) }}</v-col>
        <v-col>{{ item.totalProduce }} pcs</v-col>

        <v-col>
          <v-badge centered color="success" v-if="item.status">
            <span slot="badge">Paid</span>
          </v-badge>
          <v-badge centered color="warning" v-else>
            <span slot="badge">Pending</span>
          </v-badge>
        </v-col>
        <v-col>{{ toMoneyForm(item.totalSales) }}</v-col>
      </v-row>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text color="error" @click="DeleteItems" v-if="type == 'Delete'"
        >Delete</v-btn
      >
      <v-btn text color="error" @click="ArchiveItems" v-else
        >Archive and Delete</v-btn
      >
      <v-btn color="" @click="CancelDialog" text>Cancel</v-btn>
    </v-card-actions>
  </div>
</template>
<script>
import { GeneralMixin } from "../mixins/generalMixin";

export default {
  props: ["items", "type"],
  mixins: [GeneralMixin],
  data() {
    return {
      value: 0,
      bufferValue: 100,
      title: "Delete Entries",
      deleting: false,
    };
  },
  created() {
    console.log(this.ActionType);
  },
  methods: {
    async DeleteItems() {
      this.deleting = true;
      await this.items.forEach(async (element, index) => {
        await this.$store.dispatch("Entry/DeleteEntry", element).then((res) => {
          if (res) {
            this.value = ((index + 1) / this.items.length) * 100;
          }
        });
      });
      this.updateTable();
    },
    async ArchiveItems() {
      this.deleting = true;
      await this.items.forEach(async (element, index) => {
        element.isDeleted = await true;
        await this.$store
          .dispatch("Entry/ArchiveEntry", element)
          .then((res) => {
            if (res) {
              this.value = ((index + 1) / this.items.length) * 100;
            }
          });
      });
      await this.updateTable();
    },
    updateTable() {
      setTimeout(() => {
        this.$emit("UpdateTable");
        this.deleting = false;
        this.$emit("Cancelled");
      }, 1000);
    },
    CancelDialog() {
      this.$emit("Cancelled");
    },
  },
};
</script>