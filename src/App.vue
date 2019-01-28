<template>
  <v-app>
    <v-toolbar
        app
        color="primary"
        dark
    >
      <v-toolbar-title class="headline">
        <span>兒童篩檢個案追蹤</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <v-container fluid grid-list-xl>
        <v-layout wrap>
          <v-flex xs12>
            <read-csv
                @input="onAnalyze"
            >

            </read-csv>
          </v-flex>
          <v-flex xs12
                  class="text-xs-center"
                  v-if="loading"
          >
            <v-progress-circular
                :size="70"
                :width="7"
                color="accent"
                indeterminate
            >

            </v-progress-circular>
            <div
                class="headline pt-4"
            >
              分析中...
            </div>
          </v-flex>
          <v-flex xs12
          >
            <v-scroll-y-transition>
              <analysis
                  :csv="csv"
                  v-if="csv.length > 0 && !loading"
              >

              </analysis>
            </v-scroll-y-transition>
            <v-scroll-y-transition>
              <v-alert
                  v-if="errors.length > 0 && !loading"
                  :value="true"
              >
                {{ errors }}
              </v-alert>
            </v-scroll-y-transition>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Papa from 'papaparse';
import ReadCsv from './components/ReadCsv';
import Analysis from './components/Analysis';

export default {
  name: 'App',
  components: {
    ReadCsv,
    Analysis,
  },
  data () {
    return {
      csv: [],
      loading: false,
      errors: [],
    }
  },
  methods: {
    onAnalyze(csv) {
      this.loading = true;
      this.errors = [];
      const { data, errors } = Papa.parse(csv);

      if (errors.length === 0) {
        this.csv = data.splice(1);
      } else {
        this.errors = errors;
        this.csv = [];
      }
      setTimeout(() => {
        this.loading = false;
      }, 1200);
    },
  },
}
</script>
