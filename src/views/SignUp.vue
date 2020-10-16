<template>
  <div>
    <div class="login-box" id="login-box">
      <!-- <div class="login-container"> -->
      <section class="login" id="login">
        <header>
          <h2>SignUp Form</h2>
        </header>
        <!-- <label
                  data-v-44cc07f6
                  padding-left
                  class="err-lbl"
                  style="color: rgb(240, 65, 65);"
                >{{ error[0] }}</label> -->
        <form class="login-form" action="#" method="post">
          <input
            type="text"
            class="login-input"
            placeholder="Name"
            v-model="name"
            required
            autofocus
          />
          <input
            type="text"
            class="login-input"
            placeholder="User Name for login"
            v-model="username"
            required
          />
          <input
            type="email"
            class="login-input"
            placeholder="Email"
            v-model="email"
            required
            autofocus
          />
          <input
            type="password"
            class="login-input"
            placeholder="Password"
            v-model="password"
            required
          />
          <div class="submit-container">
            <button type="submit" class="login-button" @click="submitForm">
              Submit
            </button>
          </div>
        </form>
      </section>

      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import router from "@/router";
export default {
  name: "SignUp",
  components: {},
  data() {
    return {
      name: "",
      username: "",
      email: "",
      password: ""
    };
  },
  methods: {
    submitForm() {
      let form = {
        name: this.name,
        username: this.username,
        email: this.email,
        password: this.password,
        role: "merchant"
      };
      if (form.name && form.username && form.email && form.password) {
        const postBody = {
          method: "POST",
          body: JSON.stringify(form),
          headers: {
            "Content-Type": "application/json"
          }
        };

        console.log(postBody);
        const response = fetch(
          `https://ecomuvaca.herokuapp.com/api/users/addUser`,
          postBody
        );
        console.log(response, "Added");

        if (!response.error) {
          alert("User added");
          router.push("/LoginRedirect");
        }
      }
      //  else {
      //    error.push("Please enter all details ")
      //  }
    }
  }
};
</script>

<style scoped>
html {
  height: 100%;
}

body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  min-height: 100%;
  background: #f1f1f1;
}

/* Animation Keyframes */
@keyframes scale_header {
  0% {
    max-height: 0px;
    margin-bottom: 0px;
    opacity: 0;
  }
  100% {
    max-height: 117px;
    margin-bottom: 25px;
    opacity: 1;
  }
}

@keyframes input_opacity {
  0% {
    transform: translateY(-10px);
    opacity: 0;
  }
  100% {
    transform: translateY(0px);
    opacity: 1;
  }
}

@keyframes text_opacity {
  0% {
    color: transparent;
  }
}

@keyframes error_before {
  0% {
    height: 5px;
    background: rgba(0, 0, 0, 0.156);
    color: transparent;
  }
  10% {
    height: 117px;
    background: #ffffff;
    color: #c62828;
  }
  90% {
    height: 117px;
    background: #ffffff;
    color: #c62828;
  }
  100% {
    height: 5px;
    background: rgba(0, 0, 0, 0.156);
    color: transparent;
  }
}

/* Login Form */
@media only screen and (min-width: 768px) {
  .login-box {
    width: 30%;
  }
}
.login-box {
  margin: auto;
  justify-items: center;
  align-items: center;
  display: flex;
}
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 340px;
  height: auto;
  padding: 5px;
  box-sizing: border-box;
}

.login-container img {
  width: 200px;
  margin: 0 0 20px 0;
}

.login-container p {
  align-self: flex-start;
  font-family: "Roboto", sans-serif;
  font-size: 0.8rem;
  color: rgba(0, 0, 0, 0.5);
}

.login-container p a {
  color: rgba(0, 0, 0, 0.4);
}

.login {
  position: relative;
  width: 100%;
  padding: 10px;
  margin: 0 0 10px 0;
  box-sizing: border-box;
  border-radius: 3px;
  background: #fafafa;
  overflow: hidden;
  animation: input_opacity 0.2s cubic-bezier(0.55, 0, 0.1, 1);
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
    0 3px 1px -2px rgba(0, 0, 0, 0.2);
}

.login > header {
  position: relative;
  width: 100%;
  padding: 10px;
  margin: -10px -10px 25px -10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background: #009688;
  font-family: "Roboto", sans-serif;
  font-size: 1.3rem;
  color: #fafafa;
  animation: scale_header 0.6s cubic-bezier(0.55, 0, 0.1, 1),
    text_opacity 1s cubic-bezier(0.55, 0, 0.1, 1);
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.14),
    0px 1px 5px 0px rgba(0, 0, 0, 0.12), 0px 3px 1px -2px rgba(0, 0, 0, 0.2);
}

.login > header:before {
  content: "";
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 5px;
  padding: 10px;
  margin: -10px 0 0 -10px;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.156);
  font-family: "Roboto", sans-serif;
  font-size: 0.9rem;
  color: transparent;
  z-index: 5;
}

.login.error_1 > header:before,
.login.error_2 > header:before {
  animation: error_before 3s cubic-bezier(0.55, 0, 0.1, 1);
}

.login.error_1 > header:before {
  content: "Invalid username or password!";
}

.login.error_2 > header:before {
  content: "Invalid or expired Token!";
}

.login > header h2 {
  margin: 50px 0 10px 0;
}

.login > header h4 {
  font-size: 0.7em;
  animation: text_opacity 1.5s cubic-bezier(0.55, 0, 0.1, 1);
  color: rgba(255, 255, 255, 0.4);
}

/* Form */
.login-form {
  padding: 15px;
  box-sizing: border-box;
}

/* Inputs */
.login-input {
  position: relative;
  width: 100%;
  padding: 10px 5px;
  margin: 0 0 25px 0;
  border: none;
  border-bottom: 2px solid rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  background: transparent;
  font-size: 1rem;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  opacity: 1;
  animation: input_opacity 0.8s cubic-bezier(0.55, 0, 0.1, 1);
  transition: border-bottom 0.2s cubic-bezier(0.55, 0, 0.1, 1);
}

.login-input:focus {
  outline: none;
  border-bottom: 2px solid #e37f00;
}

/* Submit Button */
.submit-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  position: relative;
  padding: 10px;
  margin: 35px -25px -25px -25px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.login-button {
  padding: 10px;
  border: none;
  border-radius: 3px;
  background: transparent;
  font-family: "Roboto", sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #e37f00;
  cursor: pointer;
  opacity: 1;
  animation: input_opacity 0.8s cubic-bezier(0.55, 0, 0.1, 1);
  transition: background 0.2s ease-in-out;
}

.login-button.raised {
  padding: 5px 10px;
  color: #fafafa;
  background: #e37f00;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.137255),
    0px 1px 5px 0px rgba(0, 0, 0, 0.117647), 0px 3px 1px -2px rgba(0, 0, 0, 0.2);
}

.login-button:hover {
  background: rgba(0, 0, 0, 0.05);
}

.login-button.raised:hover {
  background: #fdab43;
}
</style>
