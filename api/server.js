const express = require("express");
const morgan = require('morgan')

const db = require("../data/dbConfig.js");

const accountRouter = require("../data/router/accounts-router")

const server = express();
server.use(morgan("dev"))
server.use(express.json());
server.use("/api/accounts", accountRouter)

server.get("/", (req,res)=> {
    res.staus(200).json({message: "Success"})
})

module.exports = server;
