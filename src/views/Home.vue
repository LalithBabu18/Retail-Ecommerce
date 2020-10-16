<template>
  <div>
    <div class="fix">
      <div class="headers">
        <div class="header">
          <!-- <img
        class="header_logo"
        src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
        alt="abc"
      /> -->
          <!-- <div class="header_search">
            <input class="header_searchInput"  type="search" placeholder="Search" aria-label="Search"  v-model="search" />
         
          </div> -->
          <div class="header_nav">
            <div class="header_option" @click="cart">
              <span class="header_optionLineOne"
                ><i class="fas fa-shopping-cart"></i
              ></span>
              <span class="header_optionLineTwo">Cart</span>
            </div>
          </div>
        </div>
        <div></div>
      </div>


    </div>
    <div class="sidebar">
      <h3>Filter By</h3>
  
    <b-form-checkbox-group
      @change="selectBoxes1"
      v-model="subCategorySelected"
      :options="changeForFilter[1]"
      class="mb-3"
        value-field="id"
      text-field="name"
     
    ></b-form-checkbox-group>
      <!-- <div class="mt-3">Selected: <strong>{{ subCategorySelected }}</strong></div> -->
 
  
       <h3>Filter By </h3>
       <b-form-checkbox-group
      @change="selectBoxes2"

      v-model="itemSelected"
      :options="changeForFilter[2]"
      class="mb-3"
      value-field="id"
      text-field="name"
      disabled-field="notEnabled"
    ></b-form-checkbox-group>
      <!-- <div class="mt-3">Selected: <strong>{{ itemSelected }}</strong></div> -->
       <h4>Price Range</h4>

         <b-form-checkbox-group
     @click.prevent="setFilter(price)"

      v-model="filterApplied"
      :options="prices"
      class="mb-3"
      value-field="prices"
      text-field="prices"
      disabled-field="notEnabled"
    ></b-form-checkbox-group>
       <!-- <h4>Price Range</h4>
        <input type="checkbox" class="filters" v-for="price in prices" @click.prevent="setFilter(price)" :key="price" :id="price" :value="price"/>
        <label :for="price">{{price}}</label> -->
        <!-- <span class="filters" @click.stop="clearFilter">Clear All Filters</span> -->


    </div>

   
    <div class="container">
      <mdb-card v-for="post in filteredProducts" :key="post.id">
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
          <button type="button" class="btn btn-primary btn-sm mr-1 mb-2">
            <i class="fas fa-shopping-cart pr-2"></i>Add to cart
          </button>
        </mdb-card-body>
      </mdb-card>
    </div>
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
      subCategorySelected:[],
      itemSelected:[],
      search: "",
      value: "",
      subCategories: [],
      getItems: [],
      changeForFilter:[],
       filterApplied: [],
          prices: [
            'Under 500', '500 to 1000', '1000 to 1500', 'Over 1500'
        ],
        filtersAsNumbers: {
          'Under 500': [0, 500], '500 to 1000': [500, 1000], '1000 to 1500': [1000, 1500], 'Over 1500': [1500, 10000000]
        }
    };
  },
  computed: {
    filteredFacility: function() {
      // console.log(this.facilities, "hem");

      return this.subCategories.filter((todo) => {
        return todo.name.toLowerCase().match(this.search.toLowerCase());
      });
    },
          filteredProducts() {
         return this.subCategories.filter(product => {
            if (this.filterApplied.length < 1) {
              return product 
            } else {
              var productReturn 
              Object.keys(this.filtersAsNumbers)
                .filter(priceRange=> 
                  this.filterApplied.includes(priceRange)
                )
                .filter(priceRangeFiltered=>{
                  let low = this.filtersAsNumbers[priceRangeFiltered][0]
                  let high = this.filtersAsNumbers[priceRangeFiltered][1]
                  if (product.price >= low && product.price <= high) {
                    productReturn = product
                  }  
                })
              return productReturn
            }
          })
  },
  },
  async created() {
    console.log(this.$route.params.id, "checking");
    const auth_token = await localforage.getItem("my_access_token");
    let subCategorySelected1 =  this.subCategorySelected.toString()
    let itemSelected2 =  this.itemSelected.toString()

    const postBody = {
      method: "GET",
      headers: {
        Authorization: auth_token,
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(
      `http://localhost:8085/api/Category/findStockBySubCategoryIdAndItemsId?subCategoryIds=${subCategorySelected1}&itemsIds=${itemSelected2}&categoryId=${this.$route.params.id}`,

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
  async mounted() {
    console.log(this.$route.params.id, "params");
    this.id = this.$route.params.id;
  
        const auth_token = await localforage.getItem("my_access_token");
      const postBody = {
        method: "GET",
        headers: {
          Authorization: auth_token,
          "Content-Type": "application/json"
        }
      };
      const response = await fetch(
        `http://localhost:8085/api/Category/${this.$route.params.id}/getCategory `,

        postBody
      );
      console.log(response, "checking id so");

      const data = await response.json();
      console.log(data, "getSub and items");

      if (!data.error) {
        this.changeForFilter = data 
        }else {
          console.log("eror in getting subs and items");
        }
  

    userReports.getCategories().then((resp) => {
      console.log(resp, "categories");

      if (!resp.error) {
        this.categories = resp;
      } else {
        console.log("error in getting categories");
      }
    });
  },
  methods: {
          setFilter(filter) {
            if (this.filterApplied.indexOf(filter) > -1) {
                this.filterApplied.pop(filter);
            } else {
                this.filterApplied.push(filter);
            }
            console.log(this.filterApplied);
        },
        clearFilter(){
          this.filterApplied = []
          this.itemSelected = []
          this.subCategorySelected = []
        },
     async selectBoxes1(){
         const auth_token = await localforage.getItem("my_access_token");
    let subCategorySelected1 = await this.subCategorySelected.toString()
      
    let itemSelected2 = this.itemSelected.toString()
    console.log(itemSelected2,subCategorySelected1,"consoling");

    const postBody = {
      method: "GET",
      headers: {
        Authorization: auth_token,
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(
      `http://localhost:8085/api/Category/findStockBySubCategoryIdAndItemsId?subCategoryIds=${subCategorySelected1}&itemsIds=${itemSelected2}&categoryId=${this.$route.params.id}`,

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
      async selectBoxes2(){
         const auth_token = await localforage.getItem("my_access_token");
    let subCategorySelected1 = this.subCategorySelected.toString()
    let itemSelected2 =  this.itemSelected.toString()
    console.log(itemSelected2,subCategorySelected1,"consoling2");

    const postBody = {
      method: "GET",
      headers: {
        Authorization: auth_token,
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(
      `http://localhost:8085/api/Category/findStockBySubCategoryIdAndItemsId?subCategoryIds=${subCategorySelected1}&itemsIds=${itemSelected2}&categoryId=${this.$route.params.id}`,

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

    cart() {
      router.push("/CartsPage");
    },
    async updateCat(id) {
      console.log(id, "checking id so");
      //  console.log(this.$route.params.id ,"checking");
      const auth_token = await localforage.getItem("my_access_token");
      const postBody = {
        method: "GET",
        headers: {
          Authorization: auth_token,
          "Content-Type": "application/json",
        },
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
          "Content-Type": "application/json",
        },
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
          let x = arr.map((i) => {
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
        name: this.subCategories,
      };
      const auth_token = await localforage.getItem("my_access_token");
      let token = String(auth_token);

      const postBody = {
        method: "POST",
        body: JSON.stringify(newForm),
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
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
          userReports.getCategories().then((resp) => {
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
        name: this.name,
      };
      const auth_token = await localforage.getItem("my_access_token");
      let token = String(auth_token);
      const postBody = {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      };

      console.log(postBody);
      const response = fetch(
        `http://localhost:8085/api/Category/addCategory`,
        postBody
      )
        // console.log(response, "Added");
        .then(() => {
          userReports.getCategories().then((resp) => {
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
            "Content-Type": "application/json",
          },
        };

        await fetch(
          `http://localhost:8085/api/Category/${id}/deleteCategory`,
          postBody
        ).then(() => {
          userReports.getCategories().then((resp) => {
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

      router.push("/subCat1/" + value);
    },
  },
}

</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
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
.card img[data-v-fae5bece]  {
  width: 100%;
  height: 25vh;
  object-fit: cover;
  margin-top: 10px;
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
  height: 200px;
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
  margin-top: 18px;
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
}
.mb-3 {
  display: flex;
    flex-direction: column;
    /* margin: auto; */
    margin-left: 20%;
}


@media screen and (width: 800px) {
  .header {
    width: 640px;
  }
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


</style>
