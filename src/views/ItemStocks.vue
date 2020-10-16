<template>
  <div>
    <div>
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand style="margin-left:0%"
          ><i
            @click="buttonBack"
            class="fa fa-arrow-left"
            aria-hidden="true"
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
      <!-- Using modifiers -->
      <b-button v-b-toggle.collapse-2 class="m-1">Add Products</b-button>

      <!-- Element to collapse -->
      <b-collapse id="collapse-2">
        <div role="group">
          <label for="input-live">Name:</label>
          <b-form-input
            id="input-live"
            v-model="name"
            :state="nameState"
            aria-describedby="input-live-help input-live-feedback"
            placeholder="Enter Product name"
            trim
          ></b-form-input>

          <!-- This will only be shown if the preceding input has an invalid state -->

          <!-- This is a form text block (formerly known as help block) -->
        </div>
        <div>
          <label for="input-live">Product Description:</label>
          <b-form-textarea
            id="textarea"
            v-model="description"
            placeholder="Enter something..."
            rows="3"
            max-rows="6"
          ></b-form-textarea>

          <!-- <pre class="mt-3 mb-0">{{ text }}</pre> -->
        </div>
        <div>
          <label for="input-live">Cost of Product:</label>

          <b-form-input
            v-model="price"
            placeholder="Enter Cost of the Product"
            type="number"
          ></b-form-input>
          <!-- <div class="mt-2">Value: {{ text }}</div> -->
        </div>
        <div>
          <label for="input-live">Product Color:</label>

          <b-form-input
            v-model="color"
            placeholder="Enter Product color"
            type="text"
          ></b-form-input>
          <!-- <div class="mt-2">Value: {{ text }}</div> -->
        </div>
        <div>
          <label for="input-live">Product Tag:</label>

          <b-form-input
            v-model="tag"
            placeholder="Enter Product Tag"
            type="text"
          ></b-form-input>
          <!-- <div class="mt-2">Value: {{ text }}</div> -->
        </div>
        <div>
          <label for="input-live">Upload Product Image:</label>

          <b-form-file
            v-model="file"
            class="mt-3"
            name="image"
            accept="image/*"
            plain
          ></b-form-file>
          <!-- <div class="mt-3">Selected file: {{ file2 ? file2.name : '' }}</div> -->
        </div>
        <button @click="onFileChange">Submit</button>
      </b-collapse>
    </div>

    <table class="table">
      <thead class="thead-dark">
        <tr>
          <!-- <th scope="col">S.No</th> -->

          <th scope="col">Item Name</th>
          <th scope="col">Price</th>
          <th scope="col">Tag list</th>
          <th scope="col">Color</th>
          <th scope="col">Delete</th>

          <!-- <th scope="col">Delete Category</th> -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in itemStocks" :key="item.id">
          <!-- <th scope="row">{{index + 1}}</th> -->
          <th scope="row">{{ item.name }}</th>

          <!-- <td @click="updateCat(item.id)">              <i  class="fa fa-edit" aria-hidden="true" style="color:blue" :id="item.id" @click="$bvModal.show(item.id)"></i>
</td> -->
          <th scope="row">{{ item.price }}</th>
          <th scope="row">{{ item.tag }}</th>
          <th scope="row">{{ item.color }}</th>

          <!-- <td>
                          <i  class="fa fa-plus" aria-hidden="true" style="color:green" :value="item.id" @click="edit(item.id)"></i> -->

          <td>
            <a href="javascript:;" @click="deleteTodo(item.id)">
              <i class="fas fa-trash-alt"></i>
            </a>
          </td>
          <div>
            <b-modal :id="item.id" hide-footer>
              <template v-slot:modal-title>
                <code>Update Name of the Item</code>
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
                >Update Item</b-button
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

export default {
  computed: {
    nameState() {
      return this.name.length > 2 ? true : false;
    }
  },
  data() {
    return {
      name: "",
      description: "",
      file: "",
      number: "",
      image: "",
      price: "",
      tag: "",
      color: "",
      itemStocks: []
    };
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
      `https://ecomuvaca.herokuapp.com/api/Category/${this.$route.params.id}/getStockByItemsId `,

      postBody
    );
    console.log(response, "jhiuuhkhyioukjljhihuj");

    const data = await response.json();
    console.log(data, "reportHistory");

    if (!data.error) {
      this.itemStocks = data;
    } else {
      console.log("error in getting latest subCategories");
    }
  },
  methods: {
    onFileChange() {
      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = async e => {
        this.image = e.target.result;
        // console.log(this.image)

        let newForm = {
          name: this.name,
          image: this.image,
          price: this.price,
          tag: this.tag,
          description: this.description,
          color: this.color
        };
        const auth_token = await localforage.getItem("my_access_token");
        // let token = String(auth_token);

        const postBody = {
          method: "POST",
          body: JSON.stringify(newForm),
          headers: {
            Authorization: auth_token,
            "Content-Type": "application/json"
          }
        };

        console.log(postBody, "postbody");
        const response = await fetch(
          `https://ecomuvaca.herokuapp.com/api/Category/${this.$route.params.id}/addStock `,
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
            `https://ecomuvaca.herokuapp.com/api/Category/${this.$route.params.id}/getStockByItemsId `,

            postBody
          );
          console.log(response, "jhiuuhkhyioukjljhihuj");

          // const data = await response.json();
          // console.log(data, "reportHistory");

          if (!response.error) {
            this.itemStocks = response;
          } else {
            console.log("error in getting latest subCategories");
          }
        });

        console.log(response, "updated");

        const data = await response.json();
        if (!data.error) {
          alert("image added");
        } else {
          alert("Please enter all details");
        }
        (this.name = ""),
          (this.image = ""),
          (this.price = ""),
          (this.tag = ""),
          (this.description = ""),
          (this.color = "");
      };
    },

    buttonBack() {
      router.go(-1);
    }
  }
};
</script>
<style scoped>
.container {
  /* background: aqua; */
  display: flex;
  flex-wrap: wrap;
  /* width:130rem; */
  margin-left: auto;
  margin-right: auto;
}
</style>
