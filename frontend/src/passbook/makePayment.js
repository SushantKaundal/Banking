import React , {useState}from 'react'
import {useNavigate} from "react-router-dom"



const Payment = () => {

    const [transactionType, setTransactionType] = useState("credit");
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState('')
    const navigate = useNavigate();

    // console.log(transactionType,amount,description);

    const handleSubmit = async(e)=>{
        e.preventDefault()
        if(!amount || !description)
        {
            alert("AMOUNT AND DESCRIPTION REQUIRED")
        }
        const transactiondata ={
            credit: transactionType ==="credit" ? parseFloat(amount):0,
            debit: transactionType==="debit"?parseFloat(amount):0,
            description:description
        }

        try {

            const response = await fetch("http://localhost:5000/api/v1/banking",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(transactiondata)
            })
            if(response)
            {
                navigate('/')
            }
            
        } catch (error) {
            console.log("ERROR HERE IN THE CODE", error);
        }
    }
  return (
    <div>
   <h2>
    New Transaction
   </h2>
   <form  onSubmit={handleSubmit}>
    <div>
        <label style={{marginRight:"20px"}}>Transaction type</label>
        <select style={{width:"40%"}} value={transactionType} onChange={(e)=>{
            setTransactionType(e.target.value)
        }}>
            <option value = "credit">credit</option>
            <option value ="debit" >debit</option>
        </select>
        <div style={{marginTop:"20px"}}>
            <label style={{marginRight:"20px"}}>Amount</label>
            <input type='number' value={amount} onChange={(e)=> setAmount(e.target.value)} placeholder='Enter amount'></input>
        </div>
        <div style={{marginTop:"20px"}}>
            <label style={{marginRight:"20px"}}>Description</label>
            <input type='text' value={description} onChange={(e)=> setDescription(e.target.value)}></input>
        </div>


<div>
<button type='submit'>Save</button>
<button >Cancel</button>
</div>
   
        
    </div>
   </form>
        </div>
  )
}

export default Payment