import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from "react-router-dom"
const Listing = () => {


    const [Passbookdata, setPassbookdata] = useState([])
    const navigate = useNavigate();

    const fetchData = async() =>
    {
        const response = await fetch("http://localhost:5000/api/v1/banking",{
            method:"GET",
            headers:{
                "Content-type":"application/json"
            }
        })

        if(response.ok)
        {

            const data = await response.json();
            const sorteddata = data.sort((a,b) => new Date(b.createdAt)-new Date(a.createdAt))
            setPassbookdata(sorteddata)
            console.log("HERE IS THE DATA", data);
        }
    }

    useEffect(()=>{
        fetchData();
    },[])
  return (
    <div>
        <table className="table table-striped">
         <thead>
            <tr>
                <th>Office Transactions</th>
                <th>Description</th>
                <th scope='col'>Credit</th>
                <th scope='col'>Debit</th>
                <th scope='col'>Balance</th>
            </tr>
         </thead>
         <tbody>
   {
    Passbookdata.map((data, index)=>
    {
        return(
            <tr key={data._id || index}>
                <th scope='row'>{data.createdAt}</th>
                <th scope='row'>{data.description}</th>
                <td style={{color:"green"}}>{data.credit}</td>
                <td style={{color:'red'}}>{data.debit}</td>
                <td>-/{data.balance}</td>
            </tr>
        )
    })
   }
         </tbody>

        </table>

        <button onClick={()=>navigate('/payment')}>Make payment</button>
    </div>
  )
}

export default Listing