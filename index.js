const inquirer = require ("inquirer");
const axios = require ("axios");
const fs = require ("fs");
// const generate = require("./generate");

inquirer
    .prompt([{
        type: "input",
        message: "Your GitHub username?",
        name: "name"
    },{
        type:"input",
        message: "What is the project title?",
        name: "title"
    },{
        type: "input",
        message: "What is the project description?",
        name: "description"
    },{
        type: "list",
        choices: ["MIT", "Mozilla Public License 2.0", "Microsoft Public License","Academic Free License v3.0", "Apache license 2.0", "No License"],
        message: "What license is used?",
        name: "license"

    },{
        type: "input",
        message: "How do you install this app?",
        name: "install"
    },{
        type: "input",
        message: "How is this used?",
        name: "usage"
    },{
        type: "input",
        message: "Who contributed to it?",
        name: "contributors"
    },{
        type: "input",
        message: "How to test app?",
        name: "tests"
    },{
        type: "input",
        message: "What is your real name?",
        name: "realName"
    }]).then(function(response) {
        const queryURL = `https://api.github.com/users/${response.name}`;
        axios.get(queryURL).then(function(data) {
            const profilePic = response.avatar_url;
            // const email = data.

            const readMeFile = `
            # ${response.title}
            Made by ${response.realName}
            ${profilePic}

            ## Description
            ${response.description}

            ## Table of Contents
                [Install](#Install)
                [Usage](#Usage)
                [License](#Liscense)
                [Contributors](#Contributors)
                [Tests](#Tests)
                [Questions](#Questions)

            ## Install
            ${response.install}

            ## Usage
            ${response.usage}

            ## License
            ${response.license}

            ## Contributors
            ${response.contributors}

            ## Tests
            ${response.tests}

            ## Questions
            Contact ${response.name} at EMAIL GOES HERE.
            `

            fs.writeFile("README.md", readMeFile, function(err) {
                if (err) {
                    throw err;
                }
                else {
                    console.log("README made!!!")
                }
            });
        });
    });