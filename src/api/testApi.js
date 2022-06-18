import { TEST_END_POINT } from "../helpers/constants";
import Router from 'next/router'

function parseResponse(response) {
    return response.json().then((json) => {
        if (!response.ok) {
            return Promise.reject(json);
        }
        return json;
    });
}



const TESTAPI = {
    //get url access
    get(url) {
        const token = JSON.parse(window.localStorage.getItem('user_token'));
        const bearer = 'Bearer ' + token;
        let result = fetch(`${TEST_END_POINT}${url}`, {
            method: 'GET',
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": bearer
            }),
        })
            .then(parseResponse).catch((e) => {
                console.log(e)
            });

        return result;
    },

    //post url access
    post(url, data) {
        const body = JSON.stringify(data);
        const token = JSON.parse(localStorage.getItem('user_token'));
        const bearer = 'Bearer ' + token;
        return fetch(`${TEST_END_POINT}${url}`, {
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
        return fetch(`${TEST_END_POINT}${url}`, {
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
        return fetch(`${TEST_END_POINT}${url}`, {
            method: 'DELETE',
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": bearer
            }),
        })
            .then(parseResponse);
    },



}
export default TESTAPI;