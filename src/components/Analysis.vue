<template>
  <div>
    <v-subheader>
      分析結果
    </v-subheader>
    <v-tabs>
      <v-tab>
        1 ~ 6 月
      </v-tab>
      <v-tab>
        7 ~ 12 月
      </v-tab>
      <v-tab-item>
        <data-table
            :csv="beforeJune"
        >

        </data-table>
      </v-tab-item>
      <v-tab-item>
        <data-table
            :csv="afterJune"
        >

        </data-table>
      </v-tab-item>
    </v-tabs>

  </div>
</template>

<style scoped>

</style>

<script>
  import collect from 'collect.js';
  import { isBefore, isAfter, getYear, parse } from 'date-fns';
  import DataTable from './DataTable';

  export default {
    name: 'Analysis',
    props: {
      csv: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {

      };
    },
    computed: {
      year() {
        if(this.csv.length > 0) {
          return getYear(parse(this.csv[0][2]));
        }

        return null;
      },
      beforeJune() {
        if (!this.year) {
          return collect([]);
        }
        return collect(this.csv)
          .filter(value => isBefore(parse(value[2]), new Date(this.year, 7, 1)));
      },
      afterJune() {
        if (!this.year) {
          return collect([]);
        }
        return collect(this.csv)
          .filter(value => isAfter(parse(value[2]), new Date(this.year, 6, 30)));
      },
    },
    methods: {

    },
    components: {
      DataTable,
    },
  };
</script>

