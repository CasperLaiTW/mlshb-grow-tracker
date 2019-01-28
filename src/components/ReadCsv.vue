<template>
  <v-card
      width="500"
  >
    <v-card-title>
      <span class="title">
        名單上傳
      </span>
    </v-card-title>
    <v-card-text
        class="read-csv"
    >
      <input type="file"
             @change="onUploadFile"
             ref="file"
      />
    </v-card-text>
    <v-card-actions>
      <v-btn
          color="accent"
          @click="onSubmit"
      >
        開始分析
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped lang="scss">
  .read-csv /deep/ {

  }
</style>

<script>

  export default {
    name: 'ReadCsv',
    data() {
      return {
        csv: null,
      };
    },
    methods: {
      onUploadFile(ev) {
        const file = ev.target.files[0];
        const reader = new FileReader();
        reader.onload = e => this.csv = e.target.result;
        reader.readAsText(file);
      },
      onSubmit() {
        this.$emit('input', this.csv);
      },
    },
    components: {
    },
  };
</script>

