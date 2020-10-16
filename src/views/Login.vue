<template>
  <div >
    <div>
      <div v-if="accountFlag">{{ accountFlag }}</div>
      <div class="notification notification--error" v-if="loginFlag == false">
        Now that your login flag is:
        <b>{{ loginFlag }}</b>, please retry to login again
      </div>

      <div
        v-if="accountFlag"
        class="notification notification-success"
         
      >Now that your account is created, you can log in here.</div>
      <div>
        <div class="" >
        <div class="col-md-6  m-auto">
          <div class="card card-body back">
            <h1 class="text-center">
              <span class="login">Login</span>
              </h1>
                <!-- <label
                  data-v-44cc07f6
                  padding-left
                  class="err-lbl"
                  style="color: rgb(240, 65, 65);"
                >{{ errors2[0] }}</label> -->
            <form action>
              <div class="form-group">
                <label>User Name</label>
                <input
                  typeof="User Name"
                  id="email"
                  type="text"
                  placeholder="UserName"
                  v-model="email"
                  ref="User Name"
                  required
                  class="form-control"
                />
                <label
                  data-v-44cc07f6
                  padding-left
                  class="err-lbl"
                  style="color: rgb(240, 65, 65);"
                >{{ errors[0] }}</label>
              </div>
              <div class="form-group">
                <label>Password</label>
                <input
                  id="password"
                  ref="password"
                  v-model="password"
                  :type="passwordFieldType"
                  required
                  class="form-control"
                  placeholder="Enter Password"
                >
                <!-- <i class="fa fa-eye" aria-hidden="true" type="password" @click="switchVisibility"></i> -->
            
                 <label
                  data-v-44cc07f6
                  padding-left
                  class="err-lbl"
                  style="color: rgb(240, 65, 65);"
                >{{ errors1[0] }}</label>
              </div>
              <!-- <button
            @click="login"
            class="btn btn-primary btn-block"
          >
            Login
              </button>-->
            </form>
            <button
              color="primary"
              expand="full"
              @click="login"
              class="btn btn-primary btn-block"
            >Log In</button>
             <div class="txt1 text-center p-t-54 p-b-20">
              <span> Don't You have a Merchnat account?</span>
              <button class="create-account-btn"  @click="createCustomertAccount">Create Customer Account</button>
            </div>
             <div class="txt1 text-center p-t-54 p-b-20">
              <span> Don't You have a Customer account?</span>
              <button class="create-account-btn"  @click="createAccount">Create Merchnat Account</button>
            </div>
           
          </div>
        </div>
      </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import backgroundUrl from "../assets/bg-01.jpg";
import router from "@/router";
import localforage from "localforage";

// import account from "@/store/module-account"; // just for explaining

export default {
  name: "Login",
  components: {},
  data() {
    return {
      email: "",
      password: "",
      backgroundUrl,
       errors: [],
      errors1: [],
      errors2: [],
      passwordFieldType: 'password'
    };
  },
  // created() {
  //   this.$store.dispatch();
  // },
  computed: {
    /* accountFlag() {
      return account.state.accountFlag;
    } */
    ...mapState("account", {
      accountFlag: state => state.accountFlag,
      loginFlag: state => state.loginFlag
    })
  },
  methods: {
    ...mapActions("account", ["login"]),
     login() {
      if (!this.email) {
        this.errors.push("User Name is required.");
      }
      if (!this.password) {
        this.errors1.push("Password Required");
      }
      const payload = {
        email: this.email,
        password: this.password
      };
      const verr =  localforage.getItem("err");
      if(verr){
        this.errors2.push("Invalid Email or Password");

      }
      this.$store.dispatch("account/login", payload, { root: true });
      
    },
      switchVisibility() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
    },
    createAccount() {
      router.push("/SignUp")
    },
    createCustomertAccount() {
      router.push("/CustomerSignup")
    }
  }
};
</script>

<style scoped>

.back {
  background-image: url('../assets/bg-01.jpg');
  height: 80vh;
  
}
.login {
  
color: aliceblue;
}
.create-account-btn {
  margin-left: 5px;
  margin-top: 10px;
  background-color: #dedede;
  background-image: linear-gradient(white, #dedede);
  border: 1px solid #b8b8b8;
  border-top-color: #dedede;
  color: #444;
  text-shadow: 0 1px 1px 1px rgba(255, 255, 255, 0.75);
  border-radius: 10px;
  cursor: pointer;
  line-height: 21px;
  font-size: 14px;
  font-weight: 550;
  padding: 4px 14px;
  text-align: center;
  white-space: nowrap;
  appearance: none;
}

.txt1{
  margin-top: 30px;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  .back {
    width: 100%;
    margin-left: 0;
  }
}
@media only screen and (min-width: 768px) {
  .back {
    width: 50%;
    margin-left: 0;
    margin-right: 0;
  }
}
</style>
