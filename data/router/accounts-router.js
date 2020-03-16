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
        res.status(500).json({errorMessage: "Could not find what your looking for"})
    })
})

module.exports = router