<template>
  <div>
    <div>
      <nav class="navbar fixed-top navbar-dark bg-dark">
        <a class="navbar-brand" href="#">Dashboard</a>
      </nav>
    </div>
    <!-- <h1>Dashboard</h1> -->
    <!-- <p>{{ reportHistory }}</p> -->
    <!-- <div v-for="v in series" :key="v.id">
      <h1>{{v.totalPatients}}</h1>
    </div>-->
    <div id="chart" v-for="post in fakeArray" :key="post.id">
      <!-- <h3>{{post.facility.name}}</h3> -->
      <span>{{ post }}</span>
      <apexchart
        type="bar"
        height="350"
        :options="post[1][0].chartOptions"
        :series="post[1][0].series"
      ></apexchart>
    </div>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
// import router from "@/router";

// import localforage from "localforage";
import User from "@/api/user.js";
import _ from "lodash";
const userReports = new User();
// Vue.component('apexchart', VueApexCharts)
export default {
  // props:[
  //   'listdata'
  // ],
  name: "Dashboard",
  components: { apexchart: VueApexCharts },
  data() {
    return {
      series: [
        {
          data: []
        }
      ],
      chartOptions: {
        chart: {
          type: "bar",
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: true
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: []
        }
      },
      graphObject: [
        {
          series: [
            {
              data: []
            }
          ],
          chartOptions: {
            chart: {
              type: "bar",
              height: 350
            },
            plotOptions: {
              bar: {
                horizontal: true
              }
            },
            dataLabels: {
              enabled: false
            },
            xaxis: {
              categories: []
            }
          }
        }
      ],
      myGraphObject: [
        {
          series: [
            {
              data: []
            }
          ],
          chartOptions: {
            chart: {
              type: "bar",
              height: 350
            },
            plotOptions: {
              bar: {
                horizontal: true
              }
            },
            dataLabels: {
              enabled: true
            },
            xaxis: {
              categories: []
            }
          }
        }
      ],
      myFacilities: "",
      facilityids: [],
      reportHistory: [],
      userReports: [],
      fakeArray: [],
      graphBool: false
    };
  },
  async mounted() {
    this.fakeArray = [];
    await userReports
      .reportGraph()
      .then(resp => {
        // console.log(resp, "ssssssssssssssss");
        this.fakeArray = resp;
        console.log(this.fakeArray, "fakearray");
      })
      .then(() => {
        this.fakeArray.map((item, i) => {
          let arr1 = [];
          let arr2 = item;
          let arrOddValues = [];
          let arrEvenValues = [];
          let facilityKeys = [];
          facilityKeys = Object.keys(arr2.facility);
          arr1 = Object.keys(arr2);
          var evens = _.remove(arr1, function(n) {
            return (
              n != "id" &&
              n != "facilityId" &&
              n != "reportDate" &&
              n != "isAntigenTestingDone" &&
              n != "remarks" &&
              n != "facility"
            );
          });

          evens.map(even => {
            arrEvenValues.push(arr2[even]);
          });

          var odds = _.remove(facilityKeys, function(n) {
            return (
              n != "id" &&
              n != "type" &&
              n != "region" &&
              n != "address" &&
              n != "phone" &&
              n != "contactPerson" &&
              n != "email" &&
              n != "name"
            );
          });
          odds.map(odd => {
            arrOddValues.push(arr2.facility[odd]);
          });
          let m = odds.concat(evens);
          let val = arrOddValues.concat(arrEvenValues);
          //   console.log(m, "main");
          //   console.log(val, "values");
          //   console.log(this.graphObject, "grpah");

          let graphFakeObj = [];
          graphFakeObj.push(m);
          graphFakeObj.push(val);
          //   console.log(graphFakeObj, "gorilla");
          const anotherGraph = this.graphObject;
          this.graphObject = this.myGraphObject;
          anotherGraph[0].chartOptions.xaxis.categories.push(...m);
          anotherGraph[0].series[0].data.push(...val);
          //   console.log(anotherGraph, "angrh");

          // this.graphObject[0].chartOptions.xaxis.categories
          const make = [];
          //   console.log(make);
          make.push(item);
          make.push(anotherGraph);
          this.fakeArray[i] = make;
        });
        console.log(this.fakeArray, "fakeArrayNew");
      });
  }
};
</script>

<style>
.navbar-brand {
  margin-left: 35%;
}
</style>
