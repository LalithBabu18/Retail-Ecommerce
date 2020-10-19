<template>
  <div class="t">
    <div>
      <b-navbar toggleable="lg" type="dark" variant="info">
        <!-- <b-navbar-brand style="margin-left:0%"><i @click="buttonBack" class="fa fa-arrow-left" aria-hidden="true" style="color:white"></i></b-navbar-brand> -->

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item right>
              <!-- Using 'button-content' slot -->
              <!-- <p>{{ this.UserName }}</p> -->
              <v-button style="margin-right:80px"
                ><strong>Welcome {{ this.UserName }}</strong></v-button
              >
              <!-- <v-button @click="AddCat" style="margin-right:30px"
                >Add Categories</v-button
              > -->

              <v-button @click="logout">Sign Out</v-button>
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <div>
      <!-- <div style="display:flex;">
      <div style="margin:10px">
        <select v-model="selected" @change="onChange">
          <option disabled value="">Please select Category </option>
          <option
            v-for="(item, index) in filteredFacility"
            :key="item.id"
            :value="item.id"
            >{{ item.name }}</option
          >
        </select>
      </div>
        <div style="margin:10px">
        <select v-model="selectedSub" @change="onChange2">
          <option disabled value="">Please select SubCategory </option>
          <option
            v-for="(item, index) in subCategoriesDrop"
            :key="item.id"
            :value="item.id"
            >{{ item.name }}</option
          >
        </select>
      </div>
        <div style="margin:10px">
        <select v-model="selectedItem" >
          <option disabled value="">Please select Items </option>
          <option
            v-for="(item, index) in ItemsDrop"
            :key="item.id"
            :value="item.id"
            >{{ item.name }}</option
          >
        </select>
      </div>
      </div> -->
    </div>
    <!-- </div>
   <div role="group">
      <label for="input-live">Name:</label>
      <b-form-input
        id="input-live"
        v-model="name"
       
        aria-describedby="input-live-help input-live-feedback"
        placeholder="Enter Product name"
        trim
      ></b-form-input>

     
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

    </div>
    <div>
      <label for="input-live">Cost of Product:</label>

      <b-form-input
        v-model="price"
        placeholder="Enter Cost of the Product"
        type="number"
      ></b-form-input>
    </div>
    <div>
      <label for="input-live">Product Color:</label>

      <b-form-input
        v-model="color"
        placeholder="Enter Product color"
        type="text"
      ></b-form-input>
    </div>
    <br>

     <div >
       
      <label for="input-live">Select Sizes:</label>
  
    <b-form-checkbox-group

      v-model="selectedSize"
      :options="sizes"
      class="mb-3"
      value-field="item"
      text-field="name"
      disabled-field="notEnabled"
    ></b-form-checkbox-group>
  
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
    </div>
    <button @click="onFileChange">Submit</button> -->
    <div id="parent">
      <div id="left">
        <b-button
          type="button"
          class="btn btn-success btn-md pull-right"
          :id="1"
          @click="$bvModal.show(1)"
        >
          Add Category
        </b-button>
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
            <b-button type="submit" class="mt-3" block @click="addCategory"
              >Add Category</b-button
            >
          </b-modal>
        </div>
        <treeview v-for="(item, index) in list" :key="item.id">
          <li data-expanded="false">
            <span class="k-icon k-i-folder"></span>
            {{ item.name }}
            <v-button :id="item.id" variant="outline-success">
              <i
                @click="$bvModal.show(item.id)"
                class="fa fa-plus"
                style="font-size:10px;margin-left:20px;cursor:pointer;color:black;"
              ></i>
            </v-button>
            <b-tooltip :target="item.id" triggers="hover" placement="right">
              Click If you want to add subcategory under <b>{{ item.name }}</b>
            </b-tooltip>
            <v-button
              :id="item.id"
              href="javascript:;"
              @click="deleteCat(item.id)"
            >
              <i
                class="fa fa-trash"
                style="font-size:10px;margin-left:20px;cursor:pointer;color:red;"
              ></i>
            </v-button>
            <v-button @click="updateCat(item.id)">
              <i
                @click="$bvModal.show(item.id + 1)"
                class="fas fa-pencil-alt"
                style="font-size:10px;margin-left:20px;cursor:pointer;color:blue;"
              >
                <div>
                  <b-modal :id="item.id + 1" hide-footer>
                    <template v-slot:modal-title>
                      <code>Enter rename of the category</code>
                    </template>
                    <div class="d-block text-center">
                      <input
                        type="text"
                        class="login-input"
                        placeholder="category"
                        v-model="subCategories"
                        required
                      />
                    </div>
                    <b-button
                      class="mt-3"
                      block
                      @click="updateCategory(item.id)"
                      >Add SubCategory</b-button
                    >
                  </b-modal>
                </div>
              </i>
            </v-button>

            <ul>
              <li
                data-expanded="false"
                v-for="(post, index) in item.subCategoryArr"
                :key="post.id"
              >
                <span class="k-icon k-i-folder"></span>{{ post.name }}
                <v-button :id="post.id" variant="outline-success">
                  <i
                    @click="$bvModal.show(post.id)"
                    class="fa fa-plus"
                    style="font-size:10px;margin-left:20px;cursor:pointer;color:black;"
                  ></i>
                  <div>
                    <b-modal :id="post.id" hide-footer>
                      <template v-slot:modal-title>
                        <code>Enter Name of the Item</code>
                      </template>
                      <div class="d-block text-center">
                        <input
                          type="text"
                          class="login-input"
                          placeholder="category"
                          v-model="itemName"
                          required
                        />
                      </div>
                      <b-button
                        class="mt-3"
                        block
                        @click="addItems(post.id, item.id)"
                        >Add Item</b-button
                      >
                    </b-modal>
                  </div>
                </v-button>
                <b-tooltip :target="post.id" triggers="hover" placement="right">
                  Click If you want to add Item under
                  <b>{{ post.name }}</b>
                </b-tooltip>
                <v-button :id="post.id" @click="deleteSub(post.id)">
                  <i
                    class="fa fa-trash"
                    style="font-size:10px;margin-left:20px;cursor:pointer;color:red;"
                  ></i>
                </v-button>
                <v-button @click="updateSub(post.id)">
                  <i
                    @click="$bvModal.show(post.id + 1)"
                    class="fas fa-pencil-alt"
                    style="font-size:10px;margin-left:20px;cursor:pointer;color:blue;"
                  >
                    <div>
                      <b-modal :id="post.id + 1" hide-footer>
                        <template v-slot:modal-title>
                          <code> rename of the category</code>
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
                        <b-button
                          class="mt-3"
                          block
                          @click="updateSubCat(post.id)"
                          >Add SubCategory</b-button
                        >
                      </b-modal>
                    </div>
                  </i>
                </v-button>

                <ul>
                  <li v-for="(i, index) in post.items" :key="i.id">
                    <span class="k-icon k-i-image"></span>{{ i.name }}
                    <v-button :id="i.id" @click="deleteItem(i.id)">
                      <i
                        class="fa fa-trash"
                        style="font-size:10px;margin-left:20px;cursor:pointer;color:red;"
                      ></i>
                    </v-button>
                    <v-button @click="updateItems(i.id)">
                      <i
                        @click="$bvModal.show(i.id + 1)"
                        class="fas fa-pencil-alt"
                        style="font-size:10px;margin-left:20px;cursor:pointer;color:blue;"
                      >
                        <div>
                          <b-modal :id="i.id + 1" hide-footer>
                            <template v-slot:modal-title>
                              <code> rename of the Item</code>
                            </template>
                            <div class="d-block text-center">
                              <input
                                type="text"
                                class="login-input"
                                placeholder="category"
                                v-model="Items1"
                                required
                              />
                            </div>
                            <b-button
                              class="mt-3"
                              block
                              @click="updateItem(i.id)"
                              >Add SubCategory</b-button
                            >
                          </b-modal>
                        </div></i
                      >
                    </v-button>
                  </li>
                  <!-- <li><span class="k-icon k-i-image"></span>body-back.png</li>
                        <li><span class="k-icon k-i-image"></span>my-photo.jpg</li> -->
                </ul>
              </li>
              <!-- <li data-expanded="true">
                    <span class="k-icon k-i-folder"></span>resources
                    <ul>
                        <li data-expanded="true">
                            <span class="k-icon k-i-folder"></span>pdf
                            <ul>
                                <li><span class="k-icon k-i-pdf"></span>brochure.pdf</li>
                                <li><span class="k-icon k-i-pdf"></span>prices.pdf</li>
                            </ul>
                        </li>
                        <li><span class="k-icon k-i-folder"></span>zip</li>
                    </ul>
                </li>
                <li><span class="k-icon k-i-html5"></span>about.html</li>
                <li><span class="k-icon k-i-html5"></span>contacts.html</li>
                <li><span class="k-icon k-i-html5"></span>index.html</li>
                <li><span class="k-icon k-i-html5"></span>portfolio.html</li> -->
            </ul>
          </li>
          <div>
            <b-modal :id="item.id" hide-footer>
              <template v-slot:modal-title>
                <code>Enter Name of the Subcategory</code>
              </template>
              <div class="d-block text-center">
                <input
                  type="text"
                  class="login-input"
                  placeholder="Sub-category"
                  v-model="SubName"
                  required
                />
              </div>
              <b-button class="mt-3" block @click="addSubCategory(item.id)"
                >Add SubCategory</b-button
              >
            </b-modal>
          </div>
        </treeview>
      </div>
      <div id="right">
        <div>
          <b-form-group label="Filter Using:">
            <b-form-checkbox-group
              @change="selectCategory"
              v-model="categorySelected2"
              :options="onMountStocks[0]"
              class="mb-3"
              value-field="id"
              text-field="name"
            ></b-form-checkbox-group>
          </b-form-group>
          <b-form-group label="Filter Using:" v-if="onMountStocks[2]">
            <b-form-checkbox-group
              @change="selectCategory"
              v-model="categorySelected2"
              :options="onMountStocks[2]"
              class="mb-3"
              value-field="id"
              text-field="name"
            ></b-form-checkbox-group>
          </b-form-group>
          <b-card-footer v-for="j in onMountStocks[1]" :key="j.id">{{
            j.name
          }}</b-card-footer>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { TreeView } from "@progress/kendo-treeview-vue-wrapper";
import router from "@/router";
import localforage from "localforage";
import User from "@/api/user.js";
const userReports = new User();
const _ = require("lodash");
export default {
  name: "WelcomeScreen",
  components: { treeview: TreeView },
  data() {
    return {
      SubName: "",
      UserName: "",
      Categoryname: "",
      categorySelected2: [],
      subCatSelected1: [],
      name: "",
      itemName: "",
      Items1: [],
      subCategories1: [],
      selectedSize: [],
      categories: [],
      search: "",
      value: "",
      subCategories: [],
      selected: "",
      subCategoriesDrop: [],
      selectedSub: "",
      selectedItem: "",
      ItemsDrop: [],
      description: "",
      file: "",
      number: "",
      image: "",
      price: "",
      tag: "",
      color: "",
      itemStocks: [],
      list: [],
      onMountStocks: [],
      getStocksByUserId: [],
      sizes: [
        { item: "XS", name: "XS" },
        { item: "S", name: "S" },
        { item: "M", name: "M" },
        { item: "L", name: "L" },

        { item: "Xl", name: "XL" },
        { item: "XXl", name: "XXL" },
        { item: "XXXl", name: "XXXL" }
      ]
    };
  },
  computed: {
    filteredFacility: function() {
      // console.log(this.facilities, "hem");

      return this.categories.filter(todo => {
        return todo.name.toLowerCase().match(this.search.toLowerCase());
      });
    }
  },
  async created() {
    this.UserName = await localforage.getItem("name");
    const auth_token = await localforage.getItem("my_access_token");
    let categorySelected1 = "";
    let subCatSelected2 = "";
    console.log(subCatSelected2, "subCatSelected2");
    const postBody = {
      method: "GET",
      headers: {
        Authorization: auth_token,
        "Content-Type": "application/json"
      }
    };
    const response = await fetch(
      `https://ecomuvaca.herokuapp.com/api/Category/getCategoryAndStockByListOfCategoryIds?categoryIds=${categorySelected1}&subCategoryIds=${subCatSelected2}`,

      postBody
    );
    console.log(response, "onMountStocksCreated");

    const data = await response.json();
    console.log(data, "categoryNullkkkkkkkk");

    if (!data.error) {
      this.onMountStocks = data;
    } else {
      console.log("error in getting latest subCategories");
    }
  },

  mounted() {
    userReports.getSubCategories().then(resp => {
      console.log(resp, "categories");

      if (!resp.error) {
        this.categories = resp;
      } else {
        console.log("error in getting categories");
      }
    });
    userReports.getStocksByUserId().then(resp => {
      console.log(resp, "categories");

      if (!resp.error) {
        this.getStocksByUserId = resp;
      } else {
        console.log("error in getting getStocksByUserId");
      }
    });
    userReports.getList().then(resp => {
      if (!resp.error) {
        console.log(resp, "getList");
        let data = resp;
        let dataMod = data.map(d => {
          let sub = _.chunk(d[1], 2);
          let subCategoryArr = sub.map(s => {
            return { ...s[0], items: s[1] };
          });
          return { ...d[0], subCategoryArr };
        });

        console.log(dataMod, "dat5a");
        this.list = dataMod;
        console.log(this.list, "list");
        console.log(this.list.subCategoryArr, "list2");
      } else {
        console.log("error in getting lists");
      }
    });
  },
  methods: {
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
        `https://ecomuvaca.herokuapp.com/api/Category/addCategory`,
        postBody
      )
        // console.log(response, "Added");
        .then(() => {
          userReports.getList().then(resp => {
            if (!resp.error) {
              console.log(resp, "getList");
              let data = resp;
              let dataMod = data.map(d => {
                let sub = _.chunk(d[1], 2);
                let subCategoryArr = sub.map(s => {
                  return { ...s[0], items: s[1] };
                });
                return { ...d[0], subCategoryArr };
              });

              console.log(dataMod, "dat5a");
              this.list = dataMod;
              console.log(this.list, "list");
              console.log(this.list.subCategoryArr, "list2");
            } else {
              console.log("error in getting lists");
            }
          });
        })
        .then(() => {
          alert("updated");
          this.$bvModal.hide(1);
          this.name = "";
        });
      // console.log(response, "updated");
    },
    async addItems(subid, catid) {
      let form = {
        name: this.itemName
      };
      console.log("success");
      // const categoryId = await localforage.getItem("catrgoryId");
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
        `https://ecomuvaca.herokuapp.com/api/Category/${catid}/addItems/${subid}`,
        postBody
      )
        // console.log(response, "Added");
        .then(async () => {
          userReports.getList().then(resp => {
            if (!resp.error) {
              console.log(resp, "getList");
              let data = resp;
              let dataMod = data.map(d => {
                let sub = _.chunk(d[1], 2);
                let subCategoryArr = sub.map(s => {
                  return { ...s[0], items: s[1] };
                });
                return { ...d[0], subCategoryArr };
              });

              console.log(dataMod, "dat5a");
              this.list = dataMod;
              console.log(this.list, "list");
              console.log(this.list.subCategoryArr, "list2");
            } else {
              console.log("error in getting lists");
            }
          });
        })
        .then(() => {
          alert("updated");
          this.$bvModal.hide(subid);
          this.name = "";
        });
      // console.log(response, "updated");
    },
    AddCat() {
      router.push("/WorkingWelcomeScreen");
    },
    buttonBack() {
      router.go(-1);
    },
    async onChange(id) {
      console.log(id, "subcategoryid");
      const auth_token = await localforage.getItem("my_access_token");
      const postBody = {
        method: "GET",
        headers: {
          Authorization: auth_token,
          "Content-Type": "application/json"
        }
      };
      const response = await fetch(
        `https://ecomuvaca.herokuapp.com/api/Category/${id}/getSubCategoryByCategoryId`,

        postBody
      );
      console.log(response, "jhiuuhkhyioukjljhihuj");

      const data = await response.json();
      console.log(data, "reportHistory");

      if (!data.error) {
        this.subCategoriesDrop = data;
      } else {
        console.log("error in getting latest subCategories");
      }
    },
    async onChange2() {
      const auth_token = await localforage.getItem("my_access_token");
      const postBody = {
        method: "GET",
        headers: {
          Authorization: auth_token,
          "Content-Type": "application/json"
        }
      };
      const response = await fetch(
        `https://ecomuvaca.herokuapp.com/api/Category/${this.selectedSub}/getItemsBySubCategoryId `,

        postBody
      );
      console.log(response, "items");

      const data = await response.json();
      console.log(data, "items2");

      if (!data.error) {
        this.ItemsDrop = data;
      } else {
        console.log("error in getting latest subCategories");
      }
    },
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
          color: this.color,
          size: this.selectedSize
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

        console.log(postBody, "postbody");
        const response = await fetch(
          `https://ecomuvaca.herokuapp.com/api/Category/${this.selectedItem}/addStock/${this.selected}/${this.selectedSub} `,
          postBody
        );

        console.log(response, "updated");

        // const data = await response.json();
        if (!response.error) {
          alert("product added");
        } else {
          alert("Please enter all details");
        }
        (this.name = ""),
          (this.image = ""),
          (this.price = ""),
          (this.tag = ""),
          (this.description = ""),
          (this.color = ""),
          (this.file = ""),
          (this.selected = ""),
          (this.selectedSub = ""),
          (this.selectedItem = ""),
          (this.selectedSize = "");
      };
    },
    async logout() {
      const auth_token = await localforage.getItem("my_access_token");
      const postBody = {
        method: "GET",
        headers: {
          Authorization: auth_token,
          "Content-Type": "application/json"
        }
      };
      const response = await fetch(
        `https://ecomuvaca.herokuapp.com/api/users/logout`,

        postBody
      ).then(() => {
        localforage.removeItem("my_access_token");
        localforage.removeItem("tokenExpiryDate");
        localforage.removeItem("myDetails");
        localforage.removeItem("newUserId");
        localforage.removeItem("newUserEmail");
        console.log(response);
        router.push("/");
      });
    },
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
        `https://ecomuvaca.herokuapp.com/api/Category/${id}/getCategoryByCategoryId `,

        postBody
      );
      console.log(response, "checking id so");

      const data = await response.json();
      console.log(data, "reportHistory");

      if (!data.error) {
        this.subCategories = data[0].name;
      } else {
        console.log("error in getting latest subCategories");
      }
    },
    async updateCategory(id) {
      console.log(id, "updateid");
      let newForm = {
        name: this.subCategories
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
        `https://ecomuvaca.herokuapp.com/api/Category/${id}/modifyCategory`,
        postBody
      )
        .then(() => {
          alert("updated");
          this.$bvModal.hide(id + 1);
        })
        .then(() => {
          userReports.getList().then(resp => {
            if (!resp.error) {
              console.log(resp, "getList");
              let data = resp;
              let dataMod = data.map(d => {
                let sub = _.chunk(d[1], 2);
                let subCategoryArr = sub.map(s => {
                  return { ...s[0], items: s[1] };
                });
                return { ...d[0], subCategoryArr };
              });

              console.log(dataMod, "dat5a");
              this.list = dataMod;
              console.log(this.list, "list");
              console.log(this.list.subCategoryArr, "list2");
            } else {
              console.log("error in getting lists");
            }
          });
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
        `https://ecomuvaca.herokuapp.com/api/Category/addCategory`,
        postBody
      )
        // console.log(response, "Added");
        .then(() => {
          userReports.getList().then(resp => {
            if (!resp.error) {
              let data = resp;
              let dataMod = data.map(d => {
                let sub = _.chunk(d[1], 2);
                let subCategoryArr = sub.map(s => {
                  return { ...s[0], items: s[1] };
                });
                return { ...d[0], subCategoryArr };
              });

              console.log(dataMod, "dat5a");
              this.list = dataMod;
              console.log(this.list, "list");
              console.log(this.list.subCategoryArr, "list2");
            } else {
              console.log("error in getting lists");
            }
          });
        })
        .then(() => {
          alert("updated");
          this.$bvModal.hide(1);
          this.name = "";
        });
      // console.log(response, "updated");
    },
    async addSubCategory(id) {
      console.log(id, "id");
      let form = {
        name: this.SubName
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
        `https://ecomuvaca.herokuapp.com/api/Category/${id}/addSubCategory`,
        postBody
      )
        // console.log(response, "Added");
        .then(() => {
          userReports.getList().then(resp => {
            if (!resp.error) {
              let data = resp;
              console.log(data, "checking data");
              let dataMod = data.map(d => {
                let sub = _.chunk(d[1], 2);
                let subCategoryArr = sub.map(s => {
                  return { ...s[0], items: s[1] };
                });
                return { ...d[0], subCategoryArr };
              });

              console.log(dataMod, "dat5a");
              this.list = dataMod;
              console.log(this.list, "list");
              console.log(this.list.subCategoryArr, "list2");
            } else {
              console.log("error in getting lists");
            }
          });
        })
        .then(() => {
          alert("updated");
          this.$bvModal.hide(id);
          this.SubName = "";
        });
      // console.log(response, "updated");
    },
    async deleteCat(id) {
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
          `https://ecomuvaca.herokuapp.com/api/Category/${id}/deleteCategory`,
          postBody
        ).then(() => {
          userReports.getList().then(resp => {
            if (!resp.error) {
              let data = resp;
              console.log(data, "checking data");
              let dataMod = data.map(d => {
                let sub = _.chunk(d[1], 2);
                let subCategoryArr = sub.map(s => {
                  return { ...s[0], items: s[1] };
                });
                return { ...d[0], subCategoryArr };
              });

              console.log(dataMod, "dat5a");
              this.list = dataMod;
              console.log(this.list, "list");
              console.log(this.list.subCategoryArr, "list2");
            } else {
              console.log("error in getting lists");
            }
          });
        });
      }
    },
    edit(value) {
      // console.log(this.myFacilities.id);
      this.value = value;
      console.log(value);

      router.push("/subCat1/" + value);
    },
    async updateSub(id) {
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
      console.log(data, "please");

      if (!data.error) {
        this.subCategories1 = data.name;
      } else {
        console.log("error in getting latest subCategories");
      }
    },
    async updateSubCat(id) {
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
          this.$bvModal.hide(id + 1);
        })
        .then(async () => {
          userReports.getList().then(resp => {
            if (!resp.error) {
              console.log(resp, "getList");
              let data = resp;
              let dataMod = data.map(d => {
                let sub = _.chunk(d[1], 2);
                let subCategoryArr = sub.map(s => {
                  return { ...s[0], items: s[1] };
                });
                return { ...d[0], subCategoryArr };
              });

              console.log(dataMod, "dat5a");
              this.list = dataMod;
              console.log(this.list, "list");
              console.log(this.list.subCategoryArr, "list2");
            } else {
              console.log("error in getting lists");
            }
          });
        });
      // console.log(response, "updated");
    },
    async deleteSub(id) {
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
          userReports.getList().then(resp => {
            if (!resp.error) {
              console.log(resp, "getList");
              let data = resp;
              let dataMod = data.map(d => {
                let sub = _.chunk(d[1], 2);
                let subCategoryArr = sub.map(s => {
                  return { ...s[0], items: s[1] };
                });
                return { ...d[0], subCategoryArr };
              });

              console.log(dataMod, "dat5a");
              this.list = dataMod;
              console.log(this.list, "list");
              console.log(this.list.subCategoryArr, "list2");
            } else {
              console.log("error in getting lists");
            }
          });
        });
      }
    },
    async updateItems(id) {
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
        `https://ecomuvaca.herokuapp.com/api/Category/${id}/items `,

        postBody
      );
      console.log(response, "checking id so");

      const data = await response.json();
      console.log(data, "item history");

      if (!data.error) {
        this.Items1 = data.name;
      } else {
        console.log("error in getting latest subCategories");
      }
    },
    async updateItem(id) {
      console.log(id, "updateid");
      let newForm = {
        name: this.Items1
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
        `https://ecomuvaca.herokuapp.com/api/Category/${id}/modifyItems `,
        postBody
      )
        .then(() => {
          alert("updated");
          this.$bvModal.hide(id + 1);
        })
        .then(async () => {
          userReports.getList().then(resp => {
            if (!resp.error) {
              console.log(resp, "getList");
              let data = resp;
              let dataMod = data.map(d => {
                let sub = _.chunk(d[1], 2);
                let subCategoryArr = sub.map(s => {
                  return { ...s[0], items: s[1] };
                });
                return { ...d[0], subCategoryArr };
              });

              console.log(dataMod, "dat5a");
              this.list = dataMod;
              console.log(this.list, "list");
              console.log(this.list.subCategoryArr, "list2");
            } else {
              console.log("error in getting lists");
            }
          });
        });
      // console.log(response, "updated");
    },
    async deleteItem(id) {
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
          `https://ecomuvaca.herokuapp.com/api/Category/${id}/deleteItemsByItemsId `,
          postBody
        ).then(async () => {
          userReports.getList().then(resp => {
            if (!resp.error) {
              console.log(resp, "getList");
              let data = resp;
              let dataMod = data.map(d => {
                let sub = _.chunk(d[1], 2);
                let subCategoryArr = sub.map(s => {
                  return { ...s[0], items: s[1] };
                });
                return { ...d[0], subCategoryArr };
              });

              console.log(dataMod, "dat5a");
              this.list = dataMod;
              console.log(this.list, "list");
              console.log(this.list.subCategoryArr, "list2");
            } else {
              console.log("error in getting lists");
            }
          });
        });
      }
    },
    async selectCategory() {
      const auth_token = await localforage.getItem("my_access_token");
      let categorySelected1 = this.categorySelected2.toString();
      let subCatSelected2 = this.subCatSelected1.toString();
      console.log(categorySelected1, "categorySelected1");

      console.log(subCatSelected2, "subCatSelected2");
      const postBody = {
        method: "GET",
        headers: {
          Authorization: auth_token,
          "Content-Type": "application/json"
        }
      };
      const response = await fetch(
        `https://ecomuvaca.herokuapp.com/api/Category/getCategoryAndStockByListOfCategoryIds?categoryIds=${categorySelected1}&subCategoryIds=${subCatSelected2}`,

        postBody
      );
      console.log(response, "onMountStocksCategory");

      const data = await response.json();
      console.log(data, "filterBy category");

      if (!data.error) {
        this.onMountStocks = data;
      } else {
        console.log("error in getting latest subCategories");
      }
    }
  }
};
</script>
<style scoped>
.addButton {
  float: right;
}
i {
  color: red;
}
/* 
@media (max-width: 480px) {
  .t {
    width: fit-content;
  }
} */

/* Media Query for low resolution  Tablets, Ipads */
/* @media (min-width: 481px) and (max-width: 767px) {
  .t {
    width: fit-content;
  }
} */
#parent {
  display: flex;
  justify-content: space-around;
}

#left {
  border: 1px solid lightgray;
  /* background-color: red; */
  width: 50%;
  margin-bottom: 10%;
}

#right {
  border: 1px solid lightgray;
  /* background-color: green; */
  width: 40%;
  margin-bottom: 10%;
}

/* Media Query for Tablets Ipads portrait mode */
</style>