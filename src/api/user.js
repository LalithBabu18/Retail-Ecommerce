/* eslint-disable prettier/prettier */
import Vue from "vue";
import localforage from "localforage";

export default class User {
    constructor() {
        setTimeout(() => {
            this.baseUri = Vue.prototype.$API_BASE_URI;
        }, 100);
    }

    async getAllUsers() {
        const auth_token = await localforage.getItem("my_access_token");
        const postBody = {
            method: "GET",
            headers: {
                Authorization: auth_token,
            },
        };
        const response = await fetch(`${this.baseUri}users`, postBody);

        const data = await response.json();
        console.log(data, "response History");
        return data;
    }


    // ----------------------------------------
    async getCategories() {
        const auth_token = await localforage.getItem("my_access_token");
        const postBody = {
            method: "GET",
            headers: {
                Authorization: auth_token,
            },
        };
        const response = await fetch(
            `https://ecomuvaca.herokuapp.com/api/Category/getAllCategories`,
            postBody
        );

        const data = await response.json();
        console.log(data, "response History");
        return data;
    }
    async getList() {
        const auth_token = await localforage.getItem("my_access_token");
        const postBody = {
            method: "GET",
            headers: {
                Authorization: auth_token,
            },
        };
        const response = await fetch(
            `https://ecomuvaca.herokuapp.com/api/Cart/getAllByUserLoggedIn`,
            postBody
        );

        const data = await response.json();
        console.log(data, "list History");
        return data;
    }
    async getStocksByUserId() {
        const auth_token = await localforage.getItem("my_access_token");
        const postBody = {
            method: "GET",
            headers: {
                Authorization: auth_token,
            },
        };
        const response = await fetch(
            `https://ecomuvaca.herokuapp.com/api/Cart/getStocksForUserLoggedIn`,
            postBody
        );

        const data = await response.json();
        console.log(data, "response History");
        return data;
    }
    async getSubCategories() {
        const auth_token = await localforage.getItem("my_access_token");
        const postBody = {
            method: "GET",
            headers: {
                Authorization: auth_token,
            },
        };
        const response = await fetch(
            `https://ecomuvaca.herokuapp.com/api/Category/categories`,
            postBody
        );

        const data = await response.json();
        console.log(data, "response History");
        return data;
    }
    async getAllStocks() {
        const auth_token = await localforage.getItem("my_access_token");
        const postBody = {
            method: "GET",
            headers: {
                Authorization: auth_token,
            },
        };
        const response = await fetch(
            `https://ecomuvaca.herokuapp.com/api/Category/getAllStocks`,
            postBody
        );

        const data = await response.json();
        console.log(data, "response History");
        return data;
    }
}