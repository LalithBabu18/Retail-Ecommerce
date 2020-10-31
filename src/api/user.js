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
            `http://localhost:8085/api/Category/getAllCategories`,
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
            `http://localhost:8085/api/Cart/getAllByUserLoggedIn`,
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
            `http://localhost:8085/api/Cart/getStocksForUserLoggedIn`,
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
            `http://localhost:8085/api/Category/categories`,
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
            `http://localhost:8085/api/Category/getAllStocks`,
            postBody
        );

        const data = await response.json();
        console.log(data, "response History");
        return data;
    }
    async getAllMerchants() {
        const auth_token = await localforage.getItem("my_access_token");
        const postBody = {
            method: "GET",
            headers: {
                Authorization: auth_token,
            },
        };
        const response = await fetch(
            `
            http://localhost:8085/api/users/getAllMerchants`,
            postBody
        );

        const data = await response.json();
        console.log(data, "response History");
        return data;
    }
    async getListByUserId(id) {
        const auth_token = await localforage.getItem("my_access_token");
        const postBody = {
            method: "GET",
            headers: {
                Authorization: auth_token,
            },
        };
        const response = await fetch(
            `
            http://localhost:8085/api/users/${id}/getAllByUserId"
            `,
            postBody
        );

        const data = await response.json();
        console.log(data, "response History");
        return data;
    }
}