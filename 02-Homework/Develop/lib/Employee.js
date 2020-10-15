// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Please enter your name:"
    },
    {
      type: "list",
      name: "role",
      message: "What is your job title:",
      choices: ["Manager", "Engineer", "Intern"],
    },
    {
      type: "input",
      name: "id",
      message: "Please enter your ID or Number:"
    },
    {
      type: "input",
      name: "email",
      message: "Please enter our email address:"
    },
    {
      type: "input",
      name: "officeNumber",
      message: "Please enter your phone number:"
    },
      
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
</head>

<body>
<div class="card employee-card">
<div class="card-header">
    <h2 class="card-title">${answers.name}</h2>
    <h3 class="card-title"><i class="fas fa-mug-hot mr-2"></i>${answers.role}</h3>
</div>
<div class="card-body">
    <ul class="list-group">
        <li class="list-group-item">ID: ${answers.id}</li>
        <li class="list-group-item">Email: <a href="mailto:${answers.email}">${answers.email}</a></li>
        <li class="list-group-item">Office number: ${answers.officeNumber}</li>
    </ul>
</div>
</div>

</html>`;
}

promptUser()
  .then(function(answers) {
    const html = generateHTML(answers);

    return writeFileAsync("manager.html", html);
  })
  .then(function() {
    console.log("Thank you for your information.");
  })
  .catch(function(err) {
    console.log(err);
  });
