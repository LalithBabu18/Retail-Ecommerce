<template>
  <div class="t">
    <div>
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand style="margin-left:0%;"
          ><i
            @click="buttonBack"
            class="fa fa-arrow-left"
            aria-hidden="true"
            style="color:white"
          ></i
        ></b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template v-slot:button-content>
                <em>User</em>
              </template>
              <b-dropdown-item href="#">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <div>
      <nav class="navbar navbar-light bg-light">
        <form class="form-inline">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            v-model="search"
          />
        </form>
        <span
          ><button
            type="button"
            class="btn btn-success btn-md pull-right"
            :id="1"
            @click="$bvModal.show(1)"
          >
            Add SubCategory
          </button></span
        >
      </nav>
      <div>
        <b-modal :id="1" hide-footer>
          <template v-slot:modal-title>
            <code>Enter Name of the category</code>
          </template>
          <div class="d-block text-center">
            <input
              type="text"
              class="login-input"
              placeholder="category"
              v-model="name"
              required
            />
          </div>
          <b-button class="mt-3" block @click="addCategory"
            >Add SubCategory</b-button
          >
        </b-modal>
      </div>
    </div>
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <!-- <th scope="col">S.No</th> -->

          <th scope="col">Sub Category Name</th>
          <th scope="col">Rename SubCategory</th>
          <th scope="col">Add Items</th>
          <th scope="col">Delete SubCategory</th>
          <!-- <th scope="col">Delete Category</th> -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in filteredFacility" :key="item.id">
          <!-- <th scope="row">{{item.name}}</th> -->
          <!-- <th scope="row">{{index + 1}}</th> -->

          <th scope="row">{{ item.name }}</th>

          <td @click="updateCat(item.id)">
            <i
              class="fa fa-edit"
              aria-hidden="true"
              style="color:blue"
              :id="item.id"
              @click="$bvModal.show(item.id)"
            ></i>
          </td>
          <td>
            <i
              class="fa fa-plus"
              aria-hidden="true"
              style="color:green"
              :value="item.id"
              @click="edit(item.id)"
            ></i>
          </td>
          <td>
            <a href="javascript:;" @click="deleteTodo(item.id)">
              <i class="fas fa-trash-alt"></i>
            </a>
          </td>
          <div>
            <b-modal :id="item.id" hide-footer>
              <template v-slot:modal-title>
                <code>Update Name of the Sub category</code>
              </template>
              <div class="d-block text-center">
                <input
                  type="text"
                  class="login-input"
                  placeholder="category"
                  v-model="subCategories1"
                  required
                />
              </div>
              <b-button class="mt-3" block @click="updateCategory(item.id)"
                >Update Category</b-button
              >
            </b-modal>
          </div>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import router from "@/router";
import localforage from "localforage";
import User from "@/api/user.js";
const userReports = new User();
export default {
  name: "SignUp",
  components: {},
  data() {
    return {
      name: "",
      categories: [],
      search: "",
      value: "",
      id: "",
      subCategories: [],
      subCategories1: []
    };
  },
  computed: {
    filteredFacility: function() {
      console.log(this.subCategories, "hem");

      return this.subCategories.filter(todo => {
        return todo.name.toLowerCase().match(this.search.toLowerCase());
      });
    }
  },
  async created() {
    console.log(this.$route.params.id, "checking");
    const auth_token = await localforage.getItem("my_access_token");
    const postBody = {
      method: "GET",
      headers: {
        Authorization: auth_token,
        "Content-Type": "application/json"
      }
    };
    const response = await fetch(
      `https://ecomuvaca.herokuapp.com/api/Category/${this.$route.params.id}/getSubCategoryByCategoryId`,

      postBody
    );
    console.log(response, "jhiuuhkhyioukjljhihuj");

    const data = await response.json();
    console.log(data, "reportHistory");

    if (!data.error) {
      this.subCategories = data;
    } else {
      console.log("error in getting latest subCategories");
    }
  },
  mounted() {
    console.log(this.$route.params.id, "params");
    this.id = this.$route.params.id;
    localforage.setItem("catrgoryId", this.$route.params.id);
  },
  methods: {
    async updateCat(id) {
      console.log(id, "checking id so");
      //  console.log(this.$route.params.id ,"checking");
      const auth_token = await localforage.getItem("my_access_token");
      const postBody = {
        method: "GET",
        headers: {
          Authorization: auth_token,
          "Content-Type": "application/json"
        }
      };
      const response = await fetch(
        `https://ecomuvaca.herokuapp.com/api/Category/${id}/subCategory `,

        postBody
      );
      console.log(response, "checking id so");

      const data = await response.json();
      console.log(data, "");

      if (!data.error) {
        this.subCategories1 = data.name;
      } else {
        console.log("error in getting latest subCategories");
      }
    },
    async updateCategory(id) {
      console.log(id, "updateid");
      let newForm = {
        name: this.subCategories1
      };
      const auth_token = await localforage.getItem("my_access_token");
      let token = String(auth_token);

      const postBody = {
        method: "POST",
        body: JSON.stringify(newForm),
        headers: {
          Authorization: token,
          "Content-Type": "application/json"
        }
      };

      console.log(postBody);
      const response = await fetch(
        `https://ecomuvaca.herokuapp.com/api/Category/${id}/modifySubCategory`,
        postBody
      )
        .then(() => {
          alert("updated");
          this.$bvModal.hide(id);
        })
        .then(async () => {
          console.log(this.$route.params.id, "checking");
          const auth_token = await localforage.getItem("my_access_token");
          const postBody = {
            method: "GET",
            headers: {
              Authorization: auth_token,
              "Content-Type": "application/json"
            }
          };
          const response = await fetch(
            `https://ecomuvaca.herokuapp.com/api/Category/${this.$route.params.id}/getSubCategoryByCategoryId`,

            postBody
          );
          console.log(response, "jhiuuhkhyioukjljhihuj");

          const data = await response.json();
          console.log(data, "reportHistory");

          if (!data.error) {
            this.subCategories = data;
          } else {
            console.log("error in getting latest subCategories");
          }
        });
      // console.log(response, "updated");
    },
    async addCategory() {
      let form = {
        name: this.name
      };
      const auth_token = await localforage.getItem("my_access_token");
      let token = String(auth_token);
      const postBody = {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          Authorization: token,
          "Content-Type": "application/json"
        }
      };

      console.log(postBody);
      const response = fetch(
        `https://ecomuvaca.herokuapp.com/api/Category/${this.$route.params.id}/addSubCategory
`,
        postBody
      )
        // console.log(response, "Added");
        .then(async () => {
          // this.created()
          console.log("asdfghjkl;");
          const auth_token = await localforage.getItem("my_access_token");
          const postBody = {
            method: "GET",
            headers: {
              Authorization: auth_token,
              "Content-Type": "application/json"
            }
          };
          const response = await fetch(
            `https://ecomuvaca.herokuapp.com/api/Category/${this.$route.params.id}/getSubCategoryByCategoryId`,

            postBody
          );
          console.log(response, "jhiuuhkhyioukjljhihuj");

          const data = await response.json();
          console.log(data, "reportHistory");

          if (!data.error) {
            this.subCategories = data;
          } else {
            console.log("error in getting latest subCategories");
          }
        })
        .then(() => {
          alert("updated");
          this.$bvModal.hide(1);
          this.name = "";
        });
      // console.log(response, "updated");
    },
    async deleteTodo(id) {
      console.log(id, "id");
      if (confirm("are you sure?")) {
        const auth_token = await localforage.getItem("my_access_token");
        let token = String(auth_token);
        const postBody = {
          method: "DELETE",
          headers: {
            Authorization: token,
            "Content-Type": "application/json"
          }
        };

        await fetch(
          `https://ecomuvaca.herokuapp.com/api/Category/${id}/deleteSubCategoryBySubCategoryId`,
          postBody
        ).then(async () => {
          const auth_token = await localforage.getItem("my_access_token");
          const postBody = {
            method: "GET",
            headers: {
              Authorization: auth_token,
              "Content-Type": "application/json"
            }
          };
          const response = await fetch(
            `https://ecomuvaca.herokuapp.com/api/Category/${this.$route.params.id}/getSubCategoryByCategoryId`,

            postBody
          );
          console.log(response, "jhiuuhkhyioukjljhihuj");

          const data = await response.json();
          console.log(data, "reportHistory");

          if (!data.error) {
            this.subCategories = data;
          } else {
            console.log("error in getting latest subCategories");
          }
        });
      }
    },
    edit(value) {
      // console.log(this.myFacilities.id);
      this.value = value;
      console.log(value);

      router.push("/Items/" + value);
    },
    buttonBack() {
      router.go(-1);
    }
  }
};
</script>
<style  scoped>
.addButton {
  float: right;
}
i {
  color: red;
}
@media (max-width: 480px) {
  .t {
    width: fit-content;
  }
}

/* Media Query for low resolution  Tablets, Ipads */
@media (min-width: 481px) and (max-width: 767px) {
  .t {
    width: fit-content;
  }
}
</style>