import Axios from 'axios';
import React, { Component, useContext, useEffect, useState } from 'react'
import Chart from 'react-google-charts'
import { useHistory } from 'react-router-dom';
import UserContext from "../../context/UserContext";
const Viewreport = () => {
    const { userData } = useContext(UserContext);
    const [listofdatas,listofdata]=useState([]);
    const chartData = [['Date', 'Sales']];
    const history=useHistory();
    if(!userData.user)
    {
history.push('/login');
    }
    useEffect(() => {
        async function fetchData() {
            const request = await Axios.get("https://manufac.herokuapp.com/users/viewreports/"+userData.user.displayName);
            listofdata(request.data);
  
          
        }
        fetchData();
    }, []);
console.log(listofdatas);

  return (
    <>
      <h1>Welcome to report</h1>
     
    
      <table border="1" width="50%">
<tr>
  <td>Date</td>
  <td>Item</td>
  <td>Quantity</td>

  <td></td>
</tr>
     
     {
       listofdatas.map((item)=>{
         return <tr>
           <td>{item.date}</td>
           <td>{item.item}</td>
           <td>{item.itemquantity}</td>
         </tr>
       })
     }
   </table>

    </>
  )
}

export default Viewreport
