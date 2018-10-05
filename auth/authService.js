import Vue from 'vue'


import axios from 'axios';
export default {


    login(value, cb) {
        return new Promise(function (resolve, reject) {
              axios.post("https://localhost:3000/api" + '/login', value)
            .then(function (res) {
                resolve(res.email);
            })
            .catch(function (err) {
                reject(err.response.email)
            })
        });
      

    }


}