<template>
  <v-card>
    <v-card-text>
      <table border="1"
             class="voh-table voh-table-bordered"
      >
        <thead>
        <tr>
          <th rowspan="3">單位名稱</th>
          <th rowspan="3">現住人數</th>
          <th colspan="3">外籍配偶子女0 ~ 3歲</th>
          <th colspan="3">大陸配偶子女0 ~ 3歲</th>
          <th colspan="3">本國籍子女0 ~ 3歲</th>
          <th colspan="3">合計</th>
          <th colspan="3">外籍配偶子女3 ~ 7歲</th>
          <th colspan="3">大陸配偶子女3 ~ 7歲</th>
          <th colspan="3">本國籍子女3 ~ 7歲</th>
          <th colspan="3">合計</th>
        </tr>
        <tr>
          <th colspan="2">篩檢人數</th>
          <th rowspan="2">通報轉介人數</th>
          <th colspan="2">篩檢人數</th>
          <th rowspan="2">通報轉介人數</th>
          <th colspan="2">篩檢人數</th>
          <th rowspan="2">通報轉介人數</th>
          <th colspan="2">外籍配偶、大陸配偶及本國之子女0 ~ 3歲</th>
          <th rowspan="2">通報轉介人數</th>
          <th colspan="2">篩檢人數</th>
          <th rowspan="2">通報轉介人數</th>
          <th colspan="2">篩檢人數</th>
          <th rowspan="2">通報轉介人數</th>
          <th colspan="2">篩檢人數</th>
          <th rowspan="2">通報轉介人數</th>
          <th colspan="2">外籍配偶、大陸配偶及本國之子女3 ~ 7歲</th>
          <th rowspan="2">通報轉介人數</th>
        </tr>
        <tr>
          <th>男</th>
          <th>女</th>
          <th>男</th>
          <th>女</th>
          <th>男</th>
          <th>女</th>
          <th>男</th>
          <th>女</th>
          <th>男</th>
          <th>女</th>
          <th>男</th>
          <th>女</th>
          <th>男</th>
          <th>女</th>
          <th>男</th>
          <th>女</th>
        </tr>
        </thead>
        <tbody>
          <tr v-for="(item, group) in mapData"
              :key="group"
          >
            <td>
              {{ group }}
            </td>
            <td>
              {{ item.total }}
            </td>
            <td>{{ item.foreignLessThanThreeMan }}</td>
            <td>{{ item.foreignLessThanThreeWoman }}</td>
            <td>{{ item.foreignLessThanThreeTransfer }}</td>

            <td>{{ item.chinaLessThanThreeMan }}</td>
            <td>{{ item.chinaLessThanThreeWoman }}</td>
            <td>{{ item.chinaLessThanThreeTransfer }}</td>

            <td>{{ item.twLessThanThreeMan }}</td>
            <td>{{ item.twLessThanThreeWoman }}</td>
            <td>{{ item.twLessThanThreeTransfer }}</td>

            <td>{{ item.foreignLessThanThreeMan + item.chinaLessThanThreeMan + item.twLessThanThreeMan }}</td>
            <td>{{ item.foreignLessThanThreeWoman + item.chinaLessThanThreeWoman + item.twLessThanThreeWoman }}</td>
            <td>{{ item.foreignLessThanThreeTransfer + item.chinaLessThanThreeTransfer + item.twLessThanThreeTransfer }}</td>

            <td>{{ item.foreignMoreThanThreeMan }}</td>
            <td>{{ item.foreignMoreThanThreeWoman }}</td>
            <td>{{ item.foreignMoreThanThreeTransfer }}</td>

            <td>{{ item.chinaMoreThanThreeMan }}</td>
            <td>{{ item.chinaMoreThanThreeWoman }}</td>
            <td>{{ item.chinaMoreThanThreeTransfer }}</td>

            <td>{{ item.twMoreThanThreeMan }}</td>
            <td>{{ item.twMoreThanThreeWoman }}</td>
            <td>{{ item.twMoreThanThreeTransfer }}</td>

            <td>{{ item.foreignMoreThanThreeMan + item.chinaMoreThanThreeMan + item.twMoreThanThreeMan }}</td>
            <td>{{ item.foreignMoreThanThreeWoman + item.chinaMoreThanThreeWoman + item.twMoreThanThreeWoman }}</td>
            <td>{{ item.foreignMoreThanThreeTransfer + item.chinaMoreThanThreeTransfer + item.twMoreThanThreeTransfer }}</td>
          </tr>
        </tbody>
      </table>
    </v-card-text>
  </v-card>

</template>

<style scoped>
</style>

<script>
  import collect from 'collect.js';

  export default {
    name: 'DataTable',
    props: {
      csv: {
        required: true,
      },
    },
    data() {
      return {
        groups: [
          '苗栗市',
          '通霄鎮',
          '苑裡鎮',
          '西湖鄉',
          '頭屋鄉',
          '公館鄉',
          '銅鑼鄉',
          '三義鄉',
          '竹南鎮',
          '頭份市',
          '後龍鎮',
          '造橋鄉',
          '三灣鄉',
          '南庄鄉',
          '大湖鄉',
          '卓蘭鎮',
          '獅潭鄉',
          '泰安鄉',
        ],
      };
    },
    computed: {
      mapData() {
        return collect(this.groups).mapWithKeys((group => {
          const groupData = this.csv.filter(value => value[1] === group);
          return [
            group,
            {
              total: groupData.map(value => parseInt(value[3], 10)).filter(value => Number.isInteger(value)).sum(),
              foreignLessThanThreeMan: groupData.map(value => parseInt(value[4], 10)).filter(value => Number.isInteger(value)).sum(),
              foreignLessThanThreeWoman: groupData.map(value => parseInt(value[5], 10)).filter(value => Number.isInteger(value)).sum(),
              foreignLessThanThreeTransfer: groupData.map(value => parseInt(value[6], 10)).filter(value => Number.isInteger(value)).sum(),
              foreignMoreThanThreeMan: groupData.map(value => parseInt(value[7], 10)).filter(value => Number.isInteger(value)).sum(),
              foreignMoreThanThreeWoman: groupData.map(value => parseInt(value[8], 10)).filter(value => Number.isInteger(value)).sum(),
              foreignMoreThanThreeTransfer: groupData.map(value => parseInt(value[9], 10)).filter(value => Number.isInteger(value)).sum(),

              chinaLessThanThreeMan: groupData.map(value => parseInt(value[10], 10)).filter(value => Number.isInteger(value)).sum(),
              chinaLessThanThreeWoman: groupData.map(value => parseInt(value[11], 10)).filter(value => Number.isInteger(value)).sum(),
              chinaLessThanThreeTransfer: groupData.map(value => parseInt(value[12], 10)).filter(value => Number.isInteger(value)).sum(),
              chinaMoreThanThreeMan: groupData.map(value => parseInt(value[13], 10)).filter(value => Number.isInteger(value)).sum(),
              chinaMoreThanThreeWoman: groupData.map(value => parseInt(value[14], 10)).filter(value => Number.isInteger(value)).sum(),
              chinaMoreThanThreeTransfer: groupData.map(value => parseInt(value[15], 10)).filter(value => Number.isInteger(value)).sum(),

              twLessThanThreeMan: groupData.map(value => parseInt(value[16], 10)).filter(value => Number.isInteger(value)).sum(),
              twLessThanThreeWoman: groupData.map(value => parseInt(value[17], 10)).filter(value => Number.isInteger(value)).sum(),
              twLessThanThreeTransfer: groupData.map(value => parseInt(value[18], 10)).filter(value => Number.isInteger(value)).sum(),
              twMoreThanThreeMan: groupData.map(value => parseInt(value[19], 10)).filter(value => Number.isInteger(value)).sum(),
              twMoreThanThreeWoman: groupData.map(value => parseInt(value[20], 10)).filter(value => Number.isInteger(value)).sum(),
              twMoreThanThreeTransfer: groupData.map(value => parseInt(value[21], 10)).filter(value => Number.isInteger(value)).sum(),
            }
          ];
        }))
          .all();
      },
    },
  };
</script>

