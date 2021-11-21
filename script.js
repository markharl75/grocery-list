// Select items
const alertBox = document.getElementById("alert");
const form = document.querySelector(".grocery-list-form");
const inputGrocery = document.getElementById("input-grocery"); 
const submitBtn = document.querySelector(".submit-btn");
const editBtn = document.querySelector(".edit-btn");
const deleteBtn = document.querySelector(".remove-btn");
const listOfItems = document.querySelector(".grocery-items-container");

// edit option
//declare variables to help edit list later on

// Event Listeners
form.addEventListener("submit", addItem);

//for editing items
let editElement;
let editFlag;
let editID;

// Functions
function addItem(e){
    e.preventDefault();
    const groceryItemInput = inputGrocery.value;
    const id = new Date().getTime().toString();
    //  account for all conditions of input; 
    if(groceryItemInput && !editFlag){   //input case: input is not empty and user NOT editing
        //add item to the grocery list
        const newElement = document.createElement("article");
        newElement.classList.add("grocery-item");

        //creates a new attribute to be considered for use in the whole document
        const attrID = document.createAttribute('data-id');
        attrID.value = id;

        //sets the specific grocery item's created ID attribute 
        newElement.setAttributeNode(attrID);
        newElement.innerHTML = `<p class="grocery-title">${groceryItemInput}</p>
                                <div class="item-btn-container">
                                    <button type="button" class="edit-btn">edit</button>
                                    <button type="button" class="remove-btn">del.</button>
                                </div>`;
        listOfItems.appendChild(newElement);
        displayAlert("Item added successfully", "success");
    } else if(groceryItemInput && editFlag) { //input case: input is not empty and user IS editing
        //edit the option selected
        
    } else { //empty input
        displayAlert("Please enter a value", "danger");
    }
}


//display alert
function displayAlert(text, typeOfAlert){
    alertBox.textContent = text;
    alertBox.classList.add(`alert-${typeOfAlert}`);
    
    setTimeout(function(){
        alertBox.textContent = '';
        alertBox.classList.remove(`alert-${typeOfAlert}`);
    }, 3000);
    
}

// Local Storage

// Setup Items