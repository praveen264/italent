import React, { useState,useContext, useEffect } from 'react'
import UserContext from "../../context/UserContext";
import Axios from "axios";
import axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";
import { useHistory } from 'react-router-dom';
const Addorder = () => {
    const { userData } = useContext(UserContext);
    const [date, setDate] = useState("");
    const [item, setItem] = useState("");
    const [quantity, setQuantity] = useState("0");
    const [amount, setAmount] = useState("");
    const [error, setError] = useState();
    const [price, setPrice] = useState("");
    const [listofitemdatas, listofitemdata] = useState([]);
    const [listofpricedatas, listofpricedata] = useState();
    const history=useHistory();
    if(!userData.user)
    {
history.push('/login');
    }
    const change = async(val) =>{
     
   
      const request2 = await axios.get("https://manufac.herokuapp.com/users/viewitems/"+val);
      listofpricedata(request2.data);
      setItem(request2.data.item);
     
      setPrice(request2.data.price);
    }
    useEffect(() => {
      async function fetchData() {
          const request = await axios.get("https://manufac.herokuapp.com/users/viewitems");
          listofitemdata(request.data);

        
      }
      fetchData();
  }, []);
 
console.log(listofitemdatas);
// console.log('price'+listofpricedatas.price);
    const addorder = async(event)=>{
        event.preventDefault();
        try {
          const request=  await Axios.post("https://manufac.herokuapp.com/users/addorder", {
                date:date,
                item:item,
                itemquantity:quantity,
                totalamount:price*quantity,
                employeename:userData.user.displayName
            });
           console.log(request);
          
        }
        catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
          }
    }

  return (
    <>
      <h1>Add Order</h1>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
    <form action="">
  <div className="form-group">
    <label htmlFor="email">Date:</label>
    <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className="form-control col-sm-6" placeholder="Enter email" id="email" />
  </div>
  {/* {date} */}
  <div className="form-group">
    <label htmlFor="pwd">Item:</label>
    <select className="form-control col-sm-6" onChange={(e)=>change(e.target.value)}>
        <option value="" selected>Please select an item</option>
      {
        listofitemdatas.map((items)=>{
          return <option value={items._id}>
         {items.item}
       </option>
        })
      }
       
       
     </select>
     
  </div>
  {/* {item} */}
  <div className="form-group">
    <label htmlFor="quantity">Item Quantity:</label>
    <input type="number" value={quantity} onChange={(e)=>setQuantity(e.target.value)} className="form-control col-sm-6"  id="quantity" />
  </div>
  
 
  <div className="form-group">
    <label htmlFor="amount">Total Amount:</label>
  <span><input type="text" value={price*quantity} className="form-control col-sm-6" placeholder="Enter email" id="amount" /></span>
  </div>
  
  <button type="submit" className="btn btn-primary" onClick={addorder}>Add</button>
</form>

    </>
  )
}

export default Addorder
