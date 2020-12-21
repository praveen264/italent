import Axios from "axios";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Login from "../auth/Login";
import "./Home.css";
import axios from 'axios';
import Header from "../layout/Header";
export default function Home() {
  const { userData } = useContext(UserContext);

  return (
    <div className="page">
     
      {userData.user ? (
        <>
        
     
       
        <table border="1">
        <tr><td>Welcome</td> <td>{userData.user.displayName}</td></tr>

        
        <tr><td>Email</td> <td>{userData.user.email}</td></tr>
       
        <tr><td>Contact Number</td> <td>{userData.user.contact}</td></tr>
       
        <tr><td>Address</td> <td> {userData.user.address}</td></tr>
        </table>
        <br></br>
 <Link to='/addorder' ><button type="button" className="btn btn-primary">Add Order</button></Link>
&nbsp;&nbsp; <Link to='/viewreport' ><button type="button" className="btn btn-primary">View Report</button></Link>

        </>
      ) : (
        <>
         
          <Login></Login>
        </>
      )}
    </div>
  );
}
