import axios from "../redux/apis/axiosDeclaration";
import {useState} from "react";


export const getUserById = async (data) => {
  let url = "/api/creator/" + data;
  axios
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const blockUserById = async (userId) => {
  let url = '/api/creator/' + userId + '/block';
  console.log('block user :: ' + url);
  axios.post(url)
      .then((res) => {
          return res;
      })
      .catch((e) => {
        alert('EXCEPTION');
        console.log(e);
      })

}



export const updateCreator = async (data) => {
  console.log("data to send");
  console.log(data);

  await axios.patch("/api/me/update", data);
};

export const sendReportData = async (data) => {
  console.log("data to send");
  console.log(data);

  await axios.patch("/api/me/update", data);
};



export const getIsFollowing = (user, otherUserId) =>
  new Promise((resolve, reject) => {});
