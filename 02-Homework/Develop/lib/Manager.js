// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "ID",
      message: "Please enter your ID name or Number:"
    },
    {
      type: "input",
      name: "Email",
      message: "Please enter our email address."
    },
    
    {
      type: "input",
      name: "Office Number",
      message: "Please enter your phone number."
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
    <h2 class="card-title">{{ name }}</h2>
    <h3 class="card-title"><i class="fas fa-mug-hot mr-2"></i>{{ role }}</h3>
</div>
<div class="card-body">
    <ul class="list-group">
        <li class="list-group-item">ID: {{ id }}</li>
        <li class="list-group-item">Email: <a href="mailto:{{ email }}">{{ email }}</a></li>
        <li class="list-group-item">Office number: {{ officeNumber }}</li>
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
