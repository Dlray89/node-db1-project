const express = require("express")

const accountDB = require("../dbConfig")

const router = express.Router()

router.get('/', (req,res)=> {
    accountDB.select("*")
    .from("accounts")
    .then(rows => {
        res.status(200).json({ data: rows})
    })
    .catch(error => {
        res.status(500).json({errorMessage: `${error} Could not find what your looking for`})
    })
})

router.get("/:id", (req,res) =>{
    accountDB('accounts')
    .where({id: req.params.id})
    .first()
    .then(account => {
        if (account) {
            res.status(200).json({ data:account})
        } else {
            res.status(404).json({message: "account not found"})
        }
    })
    .catch(error =>{
       res.status(500).json({errorMessage: `${error} sorry having trouble with the information`}) 
    })
})


router.post("/", (req,res) =>{
    accountDB("accounts")
    .insert(req.body)
    .then( ids => [
        res.status(200).json({ results: ids})
    ])
    .catch( error => {
        res.status(500).json({errorMessage: `${error} sorry we're having trouble with the information`})
    })
})

router.put("/:id", (req,res) => {
    accountDB("accounts")
    .where({id: req.params.id})
    .update(changes)
    .then(count => {
        if(count > 0){
            res.status(200).json({message: "Accounts updated successfully"})
        }else {
            res.status(400).json({message: "Post not found"})
        }
    })
    .catch(error =>{
        res.status(500).json({errorMessage: `${error} could not find information`})
    })
})

router.delete("/:id", (req,res) => {
    accountDB('accounts')
    .where({id: req.params.id})
    .del()
    .then(count => {
        if(count > 0) {
            res.status(200).json({message: "Account deleted successfully"})
        } else {
            res.status(404).json({message: "Account not found"})
        }
    })
    .catch(error => {
        res.status(500).json({errorMessage: `${error} ran into an error`})
    })
})


module.exports = router