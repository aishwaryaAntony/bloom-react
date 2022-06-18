import { ACCOUNT_END_POINT } from "../helpers/constants";
import axios from "axios";
import Router from 'next/router'

function parseResponse(response) {
    return response.json().then((json) => {
     if (!response.ok) {
         return Promise.reject(json);
       }
        return json;
    });
}

function parseAxiosResponse(response) {
    if (response.statusText === "OK" || response.status === 200) {
        return response.data
    } else {
        return Promise.reject(response.statusText);
    }
}

const ACCOUNTAPI = {
    //get url access
    get(url) {
        const token = JSON.parse(window.localStorage.getItem('user_token'));
        const bearer = 'Bearer ' + token;
        return fetch(`${ACCOUNT_END_POINT}${url}`, {
            method: 'GET',
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": bearer
            }),
        })
            .then(parseResponse).catch((e) => {
                console.log(e)
            });

    },

    applePassGet(url) {
        let result = fetch(`${ACCOUNT_END_POINT}${url}`, {
            method: 'GET',
            headers: new Headers({
                "Content-Type": "application/vnd.apple.pkpass"
            }),
        })
        return result;
    },

    //post url access
    post(url, data) {
        const body = JSON.stringify(data);
        const token = JSON.parse(localStorage.getItem('user_token'));
        const bearer = 'Bearer ' + token;
        return fetch(`${ACCOUNT_END_POINT}${url}`, {
            method: 'POST',
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": bearer
            }),
            body,
        })
            .then(parseResponse)
    },



    //put url access
    put(url, data) {
        const body = JSON.stringify(data);
        const token = JSON.parse(window.localStorage.getItem('user_token'));
        const bearer = 'Bearer ' + token;
        return fetch(`${ACCOUNT_END_POINT}${url}`, {
            method: 'PUT',
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": bearer
            }),
            body,
        })
            .then(parseResponse)
    },

    //delete url access
    delete(url) {
        const token = JSON.parse(window.localStorage.getItem('user_token'));
        const bearer = 'Bearer ' + token;
        return fetch(`${ACCOUNT_END_POINT}${url}`, {
            method: 'DELETE',
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": bearer
            }),
        })
            .then(parseResponse);
    },

    async multipartPost(url, data) {
        const token = JSON.parse(window.localStorage.getItem('user_token'));
        // const bearer = 'Bearer ' + token;
        const instance = axios.create({
            headers: { 'Authorization': 'Bearer ' + token }
        });
        return instance.post(`${ACCOUNT_END_POINT}${url}`, data).then((response) => {
            return parseAxiosResponse(response)
        }).catch(function (error) {
            var obj = {}
            obj.data = null;
            obj.error = "Looks like there was a problem";
            return (obj)
        });
    },

}
export default ACCOUNTAPI;