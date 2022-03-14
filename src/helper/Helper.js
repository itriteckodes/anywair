import axios from "axios";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { API_BASE_URL } from "../components/values/strings";

export async function Api(url, method, data, ) {
 const result =  await axios({
    method: method,
    url: API_BASE_URL + url,
    headers: {
      "Content-Type": "application/json",
      accept: "*/*",
      Authorization:
        "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbnl3YWlyX3N0YWZmIiwicm9sZSI6IkNSRURJVF9PRkZJQ0VSIiwibmFtZSI6IkNSRURJVCBPRkZJQ0VSIiwiaXNzIjoiQW55d2FpciBHcm91cCIsImlkIjoiMTI0NjMwZWItMWFmYi00ZTg3LTkyM2MtZDk1OTVjZGE1YzZlIiwiZXhwIjoxNjQ3MjcyMTY5LCJpYXQiOjE2NDcxODU3NjksImVtYWlsIjoiY3JlZGl0QGFueXdhaXIuY29tIn0.NQPwpukdW86mEhofa9ikImnr_d9XRVtrMDBTAHkleQs",
    },
    data: data,
  }).then((response) => {
      console.log(response)
    if (response.data.title === "success") {
        console.log(response)
       return response.data.data; 
    } else {
      Swal.fire({
        title: "Error!",
        text: response.data.message,
        icon: "error",
      });
    }
  });
  console.log(result)
  return result;
}
