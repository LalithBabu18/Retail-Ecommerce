/* eslint-disable prettier/prettier */
import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login";
import SignUp from "../views/SignUp";
import LoginRedirect from "../views/LoginRedirect";
import CustomerSignup from "../views/CustomerSignup.vue";

import WelcomeScreen from "../views/WelcomeScreen";
import SubCat1 from "../views/SubCat1";
import Items from "../views/Items";
import ItemStocks from "../views/ItemStocks";
import ProductDetails from "../views/ProductDetails";
import CartsPage from "../views/CartsPage";


import Home from "../views/Home.vue";
import HomeScreen from "../views/HomeScreen.vue";
import WorkingWelcomeScreen from "../views/WorkingWelcomeScreen.vue";




import Welcome from "../views/Welcome";
// import SelectLatestReport from "../views/SelectLatestReport"


Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "Login",
        component: Login
    },
    {
        path: "/SignUp",
        name: "SignUp",
        component: SignUp
    },
    {
        path: "/CustomerSignup",
        name: "CustomerSignup",
        component: CustomerSignup
    },
    {
        path: "/Home/:id",
        name: "Home",
        component: Home
    },
    {
        path: "/HomeScreen",
        name: "HomeScreen",
        component: HomeScreen
    },
    {
        path: "/WorkingWelcomeScreen",
        name: "WorkingWelcomeScreen",
        component: WorkingWelcomeScreen
    },

    {
        path: "/CartsPage",
        name: "CartsPage",
        component: CartsPage
    },
    {
        path: "/LoginRedirect",
        name: "LoginRedirect",
        component: LoginRedirect
    },
    {
        path: "/categories",
        name: "WelcomeScreen",
        component: WelcomeScreen
    },
    {
        path: "/subCat1/:id",
        name: "SubCat1",
        component: SubCat1
    },
    {
        path: "/Items/:id",
        name: "Items",
        component: Items
    },
    {
        path: "/ItemStocks/:id",
        name: "ItemStocks",
        component: ItemStocks
    },
    {
        path: "/ProductDetails",
        name: "ProductDetails",
        component: ProductDetails
    },

    {
        path: "/Welcome",
        name: "Welcome",
        component: Welcome
    },



];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;