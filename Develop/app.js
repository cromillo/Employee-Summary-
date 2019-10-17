const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const Employee = require("./lib/Employee");


const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name?"
    },
    {
      type: "input",
      message: "Are you an Engineer, Manager, or Intern?",
      name: "role",
    },
    {
      type: "input",
      name: "id",
      message: "What is your ID number?"
    },
    {
      type: "input",
      name: "email",
      message: "What is your email address?"
    },
    {
      type: "input",
      name: "school",
      message: "What school do you attend?"
    },
    {
      type: "input",
      name: "github",
      message: "Enter your GitHub Username"
    },
    {
      type: "input",
      name: "officeNumber",
      message: "Enter your office number"
    }
  ]);
}
function generateHTML(answers) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
    <title>Employee Summary</title>
  </head>
  <body>
    <div class="jumbotron jumbotron-fluid bg-danger">
      <div class="container">
        <h5 class="display-4 text-white text-center">My Team</h5>
      </div>
    </div>
    <div class="container">
  
        <div class="row col-md-12 mx-auto">
  
          <!--MANAGER CARD-->
          <div class="card mx-auto" style="width: 20rem;">
            <div class="card-body bg-primary text-white">
              <h5 class="card-title">${answers.name}</h5>
              <h5 class="card-text">${answers.role}</h5>
            </div>
            <div class="container">
              <div class="card-body pl-1">
            <ul class="list-group " style="width: 17rem;">
              <li class="list-group-item">ID: ${answers.id}</li>
              <li class="list-group-item">Email:${answers.email}</li>
              <li class="list-group-item">Office Number: ${answers.officeNumber}</li>
              <li class="list-group-item">School: ${answers.school}</li>
              <li class="list-group-item">Github: ${answers.github}</li>
            </ul>
          </div>
            </div>
          </div>
  
       
      </div>
    </div>
  </body>
  </html>`;
}

promptUser()
  .then(function(answers) {
    const html = generateHTML(answers);

    return writeFileAsync("team.html", html);
  })
  .then(function() {
   
  })
  .catch(function(err) {
    console.log(err);
  });