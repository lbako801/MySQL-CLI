const express = require("express");

const cTable = require("console.table");

const cliPrompt = require("./prompts/prompts");

const connection = require("./db/connection");

let ascii_text_generator = require("ascii-text-generator");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

function startCLI() {

  let ascii_text_generator = require("ascii-text-generator");

  let input_text = "CLI PRO";
  console.log(ascii_text_generator(input_text, "2"));
  console.log("");
  console.log("");

  cliPrompt();
};

startCLI();