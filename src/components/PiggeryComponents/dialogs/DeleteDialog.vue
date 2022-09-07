<template>
  <div>
    <v-dialog
      v-model="DialogStatus"
      max-width="500px"
      transition="dialog-transition"
      @click:outside="closeDialog"
    >
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Delete Record
        </v-card-title>
        <v-card-text class="mt-5">
          <div class="text-h6">
            Are you sure you want to delete this record?
          </div>
          <div class="text-caption font-weight-medium">
            *Once deleted, cannot be undone
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="TempDelete()">Temporary Delete</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="PermDelete()">Delete</v-btn>
          <v-btn color="primary " @click="closeDialog()">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: ["dialog", "dispatch"],
  data() {
    return {
      DialogStatus: this.dialog,
      type: null,
    };
  },

  methods: {
    TempDelete() {
      this.type = "Temporary";
      this.DeleteRecord();
    },
    PermDelete() {
      this.type = "Permanent";
      this.DeleteRecord();
    },
    DeleteRecord() {
      const options = {
        fatteningId: this.$parent.fatteningId ?? 0,
        id: this.$parent.DelDialogId,
        type: this.type,
      };
      this.$store.dispatch(this.dispatch, options).then((res) => {
        this.closeDialog();
        this.$parent.pageUpdate();
      });
    },
    closeDialog() {
      this.$parent.DeleteDialog = false;
    },
  },
  watch: {
    dialog(newVal, old) {
      console.log(this.dialog);
      this.DialogStatus = this.dialog;
    },
  },
};
</script>