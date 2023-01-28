import React, { useState } from "react";
import { View, Text } from "react-native";
import axios from "../redux/apis/axiosDeclaration";


export const getAllCarouselImages = async () => {
  try {
    const result = await axios.get(`/api/carousel`);
    return result.data;
  } catch (e) {

  }
};

