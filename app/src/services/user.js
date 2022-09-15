import axios from "../redux/apis/axiosDeclaration";
import { useState } from "react";

export const getUserById = async (data) => {
  let url = "/api/creator/" + data;
  axios
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {});
};

export const blockUserById = async (userId) => {
  let url = "/api/creator/" + userId + "/block";
  axios
    .post(url)
    .then((res) => {
      return res;
    })
    .catch((e) => {
      alert("EXCEPTION");
    });
};

export const updateCreator = async (data) => {
  await axios.patch("/api/me/update", data);
};

export const sendReportData = async (data) => {
  await axios.patch("/api/me/update", data);
};

export const getIsFollowing = (user, otherUserId) =>
  new Promise((resolve, reject) => {});

export const queryUsers = async (searchQuery) => {
  return await axios.post("/api/creators/search", {
    query: searchQuery,
  });
};
