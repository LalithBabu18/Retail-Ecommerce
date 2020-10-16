<template>
  <div>
    <!-- <Header /> -->
    <div>
      <nav class="navbar fixed-top navbar-dark bg-dark">
        <a class="navbar-brand" href="#">Reports History</a>
      </nav>
    </div>
    <div id="app" v-for="post in myReports" :key="post.id">
      <div class="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg mx-10 my-10">
        <div>
          <p class="text-black-600">
            Total Patients :
            <span class="float-right">{{ post.totalPatients }}</span>
          </p>
          <p class="text-black-600">
            Empty Beds :
            <span class="float-right">{{ post.emptyBeds }}</span>
          </p>
          <p class="text-black-600">
            Available ICU Beds:
            <span class="float-right">{{ post.availableIcuBeds }}</span>
          </p>
          <p class="text-black-600">
            Available ICU Ventilators:
            <span class="float-right">{{ post.availableVentillators }}</span>
          </p>
          <p class="text-black-600">
            Discharged:
            <span class="float-right">{{ post.discharged }}</span>
          </p>
          <p class="text-black-600">
            Admitted:
            <span class="float-right">{{ post.admitted }}</span>
          </p>
          <p class="text-black-600">
            Next Day Discharged Expected:
            <span class="float-right">{{ post.nextDayDischargeExpected }}</span>
          </p>
          <p class="text-black-600">
            Total Patients Dialled:
            <span class="float-right">{{ post.totalPatientsDialled }}</span>
          </p>
          <p class="text-black-600">
            Not Connected:
            <span class="float-right">{{ post.notConnected }}</span>
          </p>
          <p class="text-black-600">
            Total Patients Answered:
            <span class="float-right">{{ post.totalPatientsAnswered }}</span>
          </p>
          <p class="text-black-600">
            Critical:
            <span class="float-right">{{ post.critical }}</span>
          </p>
          <p class="text-black-600">
            Non critical:
            <span class="float-right">{{ post.nonCritical }}</span>
          </p>
          <p class="text-black-600">
            Other Responses:
            <span class="float-right">{{ post.otherResponses }}</span>
          </p>
          <p class="text-black-600">
            No Complaints:
            <span class="float-right">{{ post.noComplaints }}</span>
          </p>
          <p class="text-black-600">
            Remarks:
            <span class="float-right">{{ post.remarks }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import localforage from "localforage";

export default {
  name: "Welcome",
  components: {},
  data() {
    return {
      myReports: {}
    };
  },
  async mounted() {
    console.log(this.$route.params.id);
    const auth_token = await localforage.getItem("my_access_token");

    const postBody = {
      method: "GET",
      headers: {
        Authorization: auth_token
      }
    };
    const response = await fetch(
      `http://localhost:8084/api/facilities/${this.$route.params.id}/reportHistory`,
      postBody
    );

    const data = await response.json();
    console.log(data);
  }
  // mounted() {
  //   userReports.getReportHistory().then(resp => {
  //     console.log(resp);

  //     if (!resp.error) {
  //       this.myReports = resp;
  //     } else {
  //       console.log("error in getting reportsHistory");
  //     }
  //   });
  // }
};
</script>

<style>
.navbar-brand {
  margin-left: 35%;
}
</style>
