const inquirer = require ("inquirer");
const axios = require ("axios");
const fs = require ("fs");
const generate = require("./generate");

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
        message: "Any questions",
        name: "questions"
    }]).then(function(response) {
        const queryURL = `https://api.github.com/users/${response.name}`;
        let info = response
        axios.get(queryURL).then(function(data) {
            const profilePic = data.avatar_url;
            // const email = data.

            let readMeFile = generate(name, profilePic, info);
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