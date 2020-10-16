<template>
  <div>
    <div class="fix">
      <div class="headers">
        <div class="header">
          <span
            class="header_optionLineOne"
            style="margin-right:20px;color:white;margin-left:20px"
            ><h2>hi {{ this.userNames }}</h2></span
          >
          <button
            v-if="roles === 'merchant'"
            class="header_logo"
            @click.prevent="addProducts"
          >
            Add Products
          </button>
          <div class="header_search">
            <input class="header_searchInput" type="search" placeholder="Search" aria-label="Search"  v-model="search" />
          </div>
          <div class="header_nav">
            <div class="header_option" @click="cart">
              <span class="header_optionLineOne"
                ><i class="fas fa-shopping-cart"></i
              ></span>
              <span class="header_optionLineTwo">Cart</span>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="flex-item item-1" v-for="item in categories" :key="item.id">
          <button
              @click="edit(item.id)"
              style=" color: blue; border: none;  background-color: white;"
            >
              {{ item.name }}
            </button>
          <!-- <div @click="$bvModal.show(item.id)">
            <button
              @click="getSub(item.id)"
              style=" color: blue; border: none;  background-color: white;"
            >
              {{ item.name }}
            </button>
          </div> -->

          <!-- <div>
            <b-modal :id="item.id" hide-footer>
              <template v-slot:modal-title>
                <code>Select </code>
              </template>
              <div class="grid">
                <div class="d-block" v-for="item in getItems" :key="item.id">
                  <div>
                    <div class="items">
                      <h3>{{ item.name }}</h3>
                    </div>
                    <div v-for="post in item.itemsList" :key="post.id">
                      <ul class="itemslist">
                        <li :value="post.id" @click="edit(post.id)">
                          {{ post.name }}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
             
            </b-modal>
          </div> -->
        </div>
      </div>

      <hr />
    </div>
    <div class="container">
      <mdb-card v-for="post in filteredFacility" :key="post.id">
        <mdb-view hover>
          <img :src="post.image" alt="img" class="cardimg" />
          <mdb-mask flex-center waves overlay="white-slight"></mdb-mask>
        </mdb-view>
        <mdb-card-body>
          <mdb-card-title>{{post.name}}</mdb-card-title>
          <mdb-card-text
            >{{post.description}}</mdb-card-text
          >
          <mdb-card-text>Rs:{{post.price}}</mdb-card-text>
          <button type="button" class="btn btn-primary btn-sm mr-1 mb-2" @click="addToCart(post.id)">
            <i class="fas fa-shopping-cart pr-2"></i>Add to cart
          </button>
        </mdb-card-body>
      </mdb-card>
    </div>
    <div >

    <div v-if="value">
        Selected value is: <b>{{value}}</b>
        <br/><br/>
    </div>
  
    <treeview :value.sync="value"
        :model="tree"
        class="form-control treeview-custom"
    ></treeview>

</div>
  </div>
</template>
<script>
import router from "@/router";
import localforage from "localforage";
import User from "@/api/user.js";
const userReports = new User();
import {
  mdbCard,
  mdbCardImage,
  mdbCardBody,
  mdbCardTitle,
  mdbCardText,
  mdbBtn,
  mdbView,
  mdbMask
} from "mdbvue";
export default {
  name: "SignUp",
  components: {
    mdbCard,
    mdbCardBody,
    mdbCardTitle,
    mdbCardText,
    mdbView,
    mdbMask
  },
  data() {
    return {
      name: "",
      categories: [],
      search: "",
      value: "",
      subCategories: [],
      getItems: [],
      slide: 0,
      sliding: null,
      roles: "",
      stocks: [],
      userNames: "",
       value: '',
    tree: [
      {
        name: 'clothes',
        id: 1,
        nodes: [
          {
            name: 'man #1',
            id: 2,
            nodes: [
              {
                name: 'pants 1 from #1',
                id: 3
              },
              {
                name: 'shirts 2 from #1',
                id: 13
              }
            ]
          },
          {
            name: 'women #2',
            id: 4,
            nodes: [
              {
                name: 'kurta 1 from #2',
                id: 5
              },
            ]
          },
          
        ],
      },
      {
        label: 'catgory2',
        value: 1,
        nodes: [
          {
            label: 'SUbCAtegory #1',
            value: 12,
            nodes: [
              {
                label: 'item1 1 from #1',
                value: 3
              },
              {
                label: 'item2 2 from #1',
                value: 13
              }
            ]
          },
          {
            label: 'Subcategory #2',
            value: 4,
            nodes: [
              {
                label: 'item1 1 from #2',
                value: 5
              },
            ]
          },
          
        ],
      }
    ],
    };
  },
  computed: {
    filteredFacility: function() {
      // console.log(this.facilities, "hem");

      return this.stocks.filter(todo => {
        return todo.name.toLowerCase().match(this.search.toLowerCase());
        

      });
    }
  },
  async created() {
    console.log(this.$route.params.id, "checking");
    const auth_token = await localforage.getItem("my_access_token");
    let userName = await localforage.getItem("name");
    this.userNames = userName;

    let role = await localforage.getItem("role");
    this.roles = role;
    console.log(this.roles, "mer4");
    const postBody = {
      method: "GET",
      headers: {
        Authorization: auth_token,
        "Content-Type": "application/json"
      }
    };
    const response = await fetch(
      `http://localhost:8085/api/Category/${this.$route.params.id}/getSubCategoryByCategoryId`,

      postBody
    );
    console.log(response, "jhiuuhkhyioukjljhihuj");

    // const data = await response.json();
    // console.log(data, "reportHistory");

    if (!response.error) {
      this.subCategories = response;
    } else {
      console.log("error in getting latest subCategories");
    }
  },
  mounted() {
    // console.log(this.$route.params.id, "params");
    // this.id = this.$route.params.id;

    userReports.getCategories().then(resp => {
      console.log(resp, "categories");

      if (!resp.error) {
        this.categories = resp;
      } else {
        console.log("error in getting categories");
      }
    });

    userReports.getAllStocks().then(resp => {
      console.log(resp, "stocks");

      if (!resp.error) {
        this.stocks = resp;
      } else {
        console.log("error in getting stocks");
      }
    });
  },
  methods: {
    productDetails() {
      console.log("clicked");
      router.push("ProductDetails");
    },
    addProducts() {
      router.push("categories");
    },
    cart() {
      router.push("CartsPage");
    },
    async addToCart(id) {
       const auth_token = await localforage.getItem("my_access_token");
      let token = String(auth_token);

      const postBody = {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json"
        }
      };
       const response = await fetch(
        `http://localhost:8085/api/Cart/${id}/addStockToCart`,
        postBody
      )
      if(!response.error) {
        alert("added to cart")
      }
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
        `http://localhost:8085/api/Category/${id}/getCategoryByCategoryId `,

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
    async getSub(id) {
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
        `http://localhost:8085/api/Category/${id}/getCategory `,

        postBody
      );
      console.log(response, "checking id so");

      const data = await response.json();
      console.log(data, "getSub");

      if (!data.error) {
        let subcategory = data[1];
        let items = data[2];
        let combinedArray = [];

        for (let s = 0; s < subcategory.length; s++) {
          let obj = subcategory[s];
          let arr = [];
          for (let i = 0; i < items.length; i++) {
            if (obj["id"] == items[i]["subCategoryId"]) {
              console.log(items[i], "items[i]");
              arr.push(items[i]);
            }
            obj["itemsList"] = arr;
          }

          combinedArray.push(obj);
          this.getItems = combinedArray;
          console.log(combinedArray, " this.getItems");
          console.log(this.getItems, " this.getItems");
          let x = arr.map(i => {
            return i.name;
          });
          console.log(x, "xxxxxxxxx");
        }
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
        `http://localhost:8085/api/Category/${id}/modifyCategory`,
        postBody
      )
        .then(() => {
          alert("updated");
          this.$bvModal.hide(id);
        })
        .then(() => {
          userReports.getCategories().then(resp => {
            console.log(resp, "categories");

            if (!resp.error) {
              this.categories = resp;
            } else {
              console.log("error in getting categories");
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
        `http://localhost:8085/api/Category/addCategory`,
        postBody
      )
        // console.log(response, "Added");
        .then(() => {
          userReports.getCategories().then(resp => {
            console.log(resp, "categories List");

            if (!resp.error) {
              this.categories = resp;
            } else {
              console.log("error in getting categories");
            }
          });
        })
        .then(() => {
          alert("updated");
          this.$bvModal.hide(1);
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
          `http://localhost:8085/api/Category/${id}/deleteCategory`,
          postBody
        ).then(() => {
          userReports.getCategories().then(resp => {
            console.log(resp, "Users getCategories");

            if (!resp.error) {
              this.categories = resp;
            } else {
              console.log("error in getting getCategories");
            }
          });
        });
      }
    },
    edit(value) {
      // console.log(this.myFacilities.id);
      this.value = value;
      console.log(value);

      router.push("/Home/" + value);
    }
  }
};
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
.cardimg {
  margin-top: 5px;
}

.itemslist {
  list-style-type: none;
}
.items {
  text-align: center;
}
.d-block {
  text-align: left;
}
.fix {
  position: relative;
}
.sidebar {
  margin-top: 0%;
  padding: 0;
  width: 200px;
  background-color: #f1f1f1;
  position: fixed;
  height: 100%;
  overflow: auto;
}

.sidebar a {
  display: block;
  color: black;
  padding: 16px;
  text-decoration: none;
}

div.content {
  margin-left: 200px;
  padding: 1px 16px;
  height: 1000px;
}

@media screen and (max-width: 700px) {
  .sidebar {
    width: 100%;
    height: auto;
    position: relative;
  }
  .sidebar a {
    float: left;
  }
  div.content {
    margin-left: 0;
  }
}

@media screen and (max-width: 400px) {
  .sidebar a {
    text-align: center;
    float: none;
  }
}

.mat {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 60px;
  gap: 20px;
}
.card img {
  width: 100%;
  height: 25vh;
  object-fit: cover;
}
.card {
  display: flex;
  align-items: center;
  justify-content: center;
  height: fit-content;
  border-radius: 3%;
  box-shadow: 0 1px 1px;
  width: 25rem;
  margin-bottom: 10px;
  margin-left: 10%;
}
.headers {
  margin: 0%;
}
.container {
  /* background: aqua; */
  display: flex;
  flex-wrap: wrap;
  /* width:130rem; */
  margin-left: auto;
  margin-right: auto;
}
.flex-item {
  font-size: 1rem;
  padding: 0.8rem;
  text-align: center;
}
.header {
  height: 60px;
  display: flex;
  align-items: center;
  background-color: #131921;
  position: sticky;
  top: 0;
  z-index: 100;
}
.header1 {
  height: 60px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  background-color: #dddddd;
}
.header_logo {
  width: 100px;
  object-fit: contain;
  margin: 0 20px;
  margin-top: 0px;
}
.header_search {
  display: flex;
  flex: 1;
  align-items: center;
  border-radius: 24px;
  margin-left: 20%;
}
.header_searchIcon {
  padding: 5px;
  height: 20px !important;
  background-color: #ffffff;
}
.header_searchInput {
  height: 12px;
  padding: 10px;
  border: none;
  width: 50%;
}
.header_nav {
  display: flex;
  justify-content: space-evenly;
}

.header_option {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  margin-right: 10px;
  color: white;
}
.header_option1 {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  margin-right: 10px;
  color: black;
}
.header_optionLineOne {
  font-size: 10px;
}
.header_optionLineTwo {
  font-size: 13px;
  font-weight: 800;
}
.header_optionBasket {
  display: flex;
  align-items: center;
  color: white;
}
.header_basketCount {
  margin-left: 10px;
  margin-right: 10px;
}

@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  .header1 {
    width: 100%;
  }
  .card img {
    width: 100%;
    height: 60vw;
    object-fit: cover;
  }
}

@media screen and (width: 800px) {
  .header {
    width: 640px;
  }
}
@media only screen and (max-width: 1024px) and (min-width: 768px) {
  .card img {
    width: 100%;
    height: 30vw;
    object-fit: cover;
  }
}
</style>
