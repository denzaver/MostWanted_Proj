"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      // TODO: search by traits
      searchResults = searchByTraitorOccupation(people);
      break;
      default:
    app(people); // restart app
      break;
  }

  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
  
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");
  ;
  switch(displayOption){
    case "info":
    // TODO: get person's info
    displayPerson(person);
    console.log();
    break;
    case "family":
    // TODO: get person's family
    break;
    case "descendants":
    // TODO: get person's descendants
    displayDescendants(people);
    console.log();
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  let foundPerson = people.filter(function(person){
    if(person.firstName === firstName && person.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person using the name they entered
  return foundPerson[0];
}

function searchByTraitorOccupation(people){
 
  let searchTrait = promptFor("Do you know the trait you want to seach by?: gender, dob, height, weight, eye color, occupation", chars).toLowerCase();
  let traitsFound;
  switch(searchTrait){
    case "gender":
      traitsFound = genderSearch(people);
      displayPeople(traitsFound);
      break;

     case "dob":
       traitsFound = dobSearch(people);
       displayPeople(traitsFound);
     break;

    case "height":
      traitsFound = heightSearch(people)
      displayPeople(traitsFound)
      break;

    case "weight":
        traitsFound = weightSearch(people)
        displayPeople(traitsFound)
        break;

    case "eye color":
      traitsFound = eyeColorSearch(people)
      displayPeople(traitsFound)
      break;

    case "occupation":
      traitsFound = occupationSearch(people)
      displayPeople(traitsFound)
      break;

    case "restart":
      app(people);
      break;

    case "quit":
      return;

    default:
    return mainMenue(person, people);
    
  }
  return searchByTraitorOccupation(traitsFound);
}

function genderSearch(people){
  let gender = promptFor ("What gender are they: male or female?", chars).toLowerCase();

  let foundPerson = people.filter(function(person){
    if(person.gender === gender){
      return true;
    }
    else{
      return false;
    }
  })
  return foundPerson;
}

function dobSearch(people){
  let dob = promptFor ("What is the persons date of birth", chars);

  let foundPerson = people.filter(function(person){
    if(person.dob == dob){
      return true;
    }
    else{
    return false;
    }
    
  })
  return foundPerson;
}

function heightSearch(people){
  let height = promptFor("What is the persons height?:", chars).toLowerCase();

  let foundPerson = people.filter(function(person){
    if(person.height === height){
      return true;
    }
    else {
      return false;
    }
  })
  return foundPerson;
}

function weightSearch(people){
  let weight = promptFor("What is the persons wieght?:", chars).toLowerCase();

  let foundPerson = people.filter(function(person){
    if(person.weight === weight){
      return true;
    }
    else{
      return false;
    }
  })
  return foundPerson;
}

function eyeColorSearch(people){
  let eyeColor = promptFor("What is the persons eye color?: brown, black, hazel, blue, green", chars).toLowerCase();

  let foundPerson = people.filter(function(person){
    if(person.eyeColor === eyeColor){
      return true;
    }
    else{
      return false;
    }
  })
  return foundPerson;
}

function occupationSearch(people){
  let occupation = promptFor("What is the persons occupation?: programmer, assistant," + "\n",
   "landscaper, nurse, student, architect, doctor, politician", chars).toLowerCase();

   let foundPerson = people.filter(function(person){
     if(person.occupation === occupation){
       return true;
     }
     else{
       return false;
     }
   })
   return foundPerson;
}

function parentSearch(people){
  let parents = promptFor("Who are the persons parent(s)?", chars).toLowerCase();

  let foundPerson = people.filter(function(person){
    if(person.parents === parents){
      return true;
    }
    else{
      return false;
    }
  })
  return foundPerson;
}

function idSearch(people){
  let id = promptFor("What is the persons Id?", chars).toLowerCase();

  let foundPerson = people.filter(function(person){
    if(person.id === id){
      return true;
    }
    else{
      return false;
    }
  })
  return foundPerson;
}


function displayDescendants(people){
  let descendants = people.filter(function(person){
    if (person.parents[0] === person.id || person.parents[1] === person.id ){
      return true;
    }
    else{
      return false;
    }
  })
  return descendants;
}
// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  
    // TODO: finish getting the rest of the information to display
  alert(personInfo);
}

// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}
