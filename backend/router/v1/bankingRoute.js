const express = require("express");
const router = express.Router();
const {BankingModel} = require('../../models')

router.post("/", async(req,res)=>{


const lastTransaction = await  BankingModel.findOne().sort({createdAt: -1});
const previousBalance = lastTransaction? lastTransaction.balance :0;


console.log("LAST TRANSACTIONS",lastTransaction);

const {credit, debit, description} = req.body;


const newBalance = previousBalance + credit - debit;
console.log(credit, debit, description, newBalance);

const newEntry = new BankingModel({
    credit: credit,
    debit: debit, 
    balance:newBalance,
    description:description,
})

const savedEntry = await newEntry.save();

console.log("HERE IS THE SAVED NEW ENTRY", savedEntry);
res.send(savedEntry)
})

router.get("/", async(req,res)=>
{
    const response = await BankingModel.find();
    res.send(response)
})

module.exports= router;