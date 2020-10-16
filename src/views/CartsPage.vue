<template>
<div>
	<div >
    <div id="app">
	<div class="container">
		<table class="table table-bordered table-hover">				
			<tr>
			 
			  <td>
				   				  product name 
			  </td>
			  <td>
				   Commodity price
			   </td>
			  <td>
				   				  Number of Products 
			  </td>
			  <td>
				   Total merchandise
			  </td>
			  <td>
				   Operation
			  </td>
			  </tr>
            <tr v-for="item in cartItems[1]" :key="item.id">
             
				<td>{{item.name}}</td>
				<td>{{item.price}}</td>
				<td>
					<div style="display:flex;justify-content: center;
    align-items: baseline;">
						<button class="btn btn-default" @click="minus(item.id)">-</button>
					<!-- <input type="text"     v-model="calValue"/> -->
					<p>{{item.quantity}}</p>
					<button class="btn btn-default" @click="add(item.id)">+</button>
					</div>
					

				<td>
					{{item.price*item.quantity}}
				</td>
				<td>
					 <button class="btn btn-warning"  href="javascript:;" @click="delStock(item.id)">Delete</button>
				</td>
			</tr>				
				</table>
				<p class="text-right">
					 Total amount: {{cartItems[2]}}
				</p>
				<p class="text-right">
					 <!-- Number of items: {{cartItems[3].totalQuntity}} -->
				</p>
				<hr />
				<form>
					
					<div class="form-group">
						 <button class="btn btn-primary" type="button" >Add</button>
					</div>
				</form>
			</div>
			<!-- <div class="shopping-cart"> -->
  <!-- Title -->
  <!-- <div class="title">
    Shopping Bag
  </div> -->
 
  <!-- Product #1 -->
  <!-- <div class="item" v-for="item in cartItems" :key="item.id">
    <div class="buttons">
      <span class="delete-btn"></span>
      <span class="like-btn"></span>
    </div>
 
    <div class="image">
      <img      :src="item.image" alt="" />
    </div>
 
    <div class="description">
      <span>{{item.name}}</span>
    </div>
 
    <div class="quantity">
      <button class="plus-btn" type="button" name="button">
		  <i class="fa fa-minus" aria-hidden="true" style="color:black"></i>
      </button>
      <input type="text" name="name" value="1">
      <button class="minus-btn" type="button" name="button">
                <i class="fa fa-plus" aria-hidden="true" style="color:black"></i>

      </button>
    </div>
 
    <div class="total-price">{{item.price}}</div>
  </div> -->
 
  <!-- Product #2 -->
  </div>
  <!-- <div >
	  	<h1>No Products to shoe please add to cart</h1>
  </div> -->
</div>
</div>
</div>
</template>
<script>
import router from "@/router";
import localforage from "localforage";
import User from "@/api/user.js";
const userReports = new User();
export default {
	data(){
		return {
			cartItems:[],
			calValue:1
		}
	},
	  async created() {
    // console.log(this.$route.params.id, "checking");
    const auth_token = await localforage.getItem("my_access_token");
    // let userName = await localforage.getItem("name");
    // this.userNames = userName;

    // let role = await localforage.getItem("role");
    // this.roles = role;
    // console.log(this.roles, "mer4");
    const postBody = {
      method: "GET",
      headers: {
        Authorization: auth_token,
        "Content-Type": "application/json"
      }
    };
    const response = await fetch(
      `http://localhost:8085/api/Cart/getAllCartStock `,

      postBody
    );
    console.log(response, "jhiuuhkhyioukjljhihuj");

    const data = await response.json();
    console.log(data, "reportHistory");

    if (!data.error) {
      this.cartItems = data;
    } else {
      console.log("error in getting latest subCategories");
    }
  },
  methods:{
	  async add(id){
		  console.log(id);
		    const auth_token = await localforage.getItem("my_access_token");
        let token = String(auth_token);
        const postBody = {
          method: "POST",
          headers: {
            Authorization: token,
            "Content-Type": "application/json"
          }
        };

        await fetch(`http://localhost:8085/api/Cart/${id}/AddQuantity  `, postBody).then(
          async() => {
             const auth_token = await localforage.getItem("my_access_token");
    const postBody = {
      method: "GET",
      headers: {
        Authorization: auth_token,
        "Content-Type": "application/json"
      }
    };
    const response = await fetch(
      `http://localhost:8085/api/Cart/getAllCartStock`,
      
      postBody
    );
    console.log(response,"jhiuuhkhyioukjljhihuj");

    const data = await response.json();
    console.log(data, "reportHistory");

    if (!data.error) {
      this.cartItems = data;
    } else {
      console.log("error in getting latest subCategories");
    }
          }
        );
		  	
	  },
	  async minus(id){
   console.log(id);
		    const auth_token = await localforage.getItem("my_access_token");
        let token = String(auth_token);
        const postBody = {
          method: "POST",
          headers: {
            Authorization: token,
            "Content-Type": "application/json"
          }
        };

        await fetch(`http://localhost:8085/api/Cart/${id}/SubQuantity  `, postBody).then(
          async() => {
             const auth_token = await localforage.getItem("my_access_token");
    const postBody = {
      method: "GET",
      headers: {
        Authorization: auth_token,
        "Content-Type": "application/json"
      }
    };
    const response = await fetch(
      `http://localhost:8085/api/Cart/getAllCartStock`,
      
      postBody
    );
    console.log(response,"jhiuuhkhyioukjljhihuj");

    const data = await response.json();
    console.log(data, "reportHistory");

    if (!data.error) {
      this.cartItems = data;
    } else {
      console.log("error in getting latest subCategories");
    }
          }
        );
    },
	        async delStock(id) {
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

        await fetch(`http://localhost:8085/api/Cart/${id}/deleteCartItems`, postBody).then(
          async() => {
             const auth_token = await localforage.getItem("my_access_token");
    const postBody = {
      method: "GET",
      headers: {
        Authorization: auth_token,
        "Content-Type": "application/json"
      }
    };
    const response = await fetch(
      `http://localhost:8085/api/Cart/getAllCartStock`,
      
      postBody
    );
    console.log(response,"jhiuuhkhyioukjljhihuj");

    const data = await response.json();
    console.log(data, "reportHistory");

    if (!data.error) {
      this.cartItems = data;
    } else {
      console.log("error in getting latest subCategories");
    }
          }
        );
      }
    },
  }
}
</script>

<style  scoped>
/* .shopping-cart {
  width: 750px;
  height: 423px;
  margin: 80px auto;
  background: #FFFFFF;
  box-shadow: 1px 2px 3px 0px rgba(0,0,0,0.10);
  border-radius: 6px;
 
  display: flex;
  flex-direction: column;
}
.title {
  height: 60px;
  border-bottom: 1px solid #E1E8EE;
  padding: 20px 30px;
  color: #5E6977;
  font-size: 18px;
  font-weight: 400;
}
 
.item {
  padding: 20px 30px;
  height: 120px;
  display: flex;
}
 
.item:nth-child(3) {
  border-top:  1px solid #E1E8EE;
  border-bottom:  1px solid #E1E8EE;
}
.buttons {
  position: relative;
  padding-top: 30px;
  margin-right: 60px;
}
.delete-btn,
.like-btn {
  display: inline-block;
  Cursor: pointer;
}
.delete-btn {
  width: 18px;
  height: 17px;
  background: url(&amp;quot;delete-icn.svg&amp;quot;) no-repeat center;
}
 
.like-btn {
  position: absolute;
  top: 9px;
  left: 15px;
  background: url('twitter-heart.png');
  width: 60px;
  height: 60px;
  background-size: 2900%;
  background-repeat: no-repeat;
}
.is-active {
  animation-name: animate;
  animation-duration: .8s;
  animation-iteration-count: 1;
  animation-timing-function: steps(28);
  animation-fill-mode: forwards;
}
 
@keyframes animate {
  0%   { background-position: left;  }
  50%  { background-position: right; }
  100% { background-position: right; }
}
.image {
  margin-right: auto;


}
 
Let’s add some basic style to  product name and description.
.description {
  padding-top: 10px;
  margin-right: 60px;
  width: 115px;
}
 
.description span {
  display: block;
  font-size: 14px;
  color: #43484D;
  font-weight: 400;
}
 
.description span:first-child {
  margin-bottom: 5px;
}
.description span:last-child {
  font-weight: 300;
  margin-top: 8px;
  color: #86939E;
}
.quantity {
  padding-top: 20px;
  margin-right: 60px;
}
.quantity input {
  -webkit-appearance: none;
  border: none;
  text-align: center;
  width: 32px;
  font-size: 16px;
  color: #43484D;
  font-weight: 300;
}
 
button[class*=btn] {
  width: 30px;
  height: 30px;
  background-color: #E1E8EE;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}
.minus-btn img {
  margin-bottom: 3px;
}
.plus-btn img {
  margin-top: 2px;
}
 
button:focus,
input:focus {
  outline:0;
}
.total-price {
  width: 83px;
  padding-top: 27px;
  text-align: center;
  font-size: 16px;
  color: #43484D;
  font-weight: 300;
} */
</style>