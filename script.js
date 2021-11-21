// Select items
const alertBox = document.getElementById("alert");
const form = document.querySelector(".grocery-list-form");
const inputGrocery = document.getElementById("input-grocery");
const submitBtn = document.querySelector(".submit-btn");
//const editBtn = document.querySelector(".edit-btn");
//const deleteBtn = document.querySelector(".remove-btn");
const listOfItems = document.querySelector(".grocery-items-container");
const clearBtn = document.querySelector(".clear-btn");

// edit option
//declare variables to help edit list later on

/***  Event Listeners ***/
form.addEventListener("submit", addItem);
clearBtn.addEventListener("click", clearList);
//deleteBtn.addEventListener("click", deleteItem); //CANT DO THIS... ITEMS ADDED DYNAMICALLY
//event listeners here only work on items accessible in initial page load

//for editing items
let editElement;
let editFlag;
let editID;

/***  Functions ***/

//e: an event listener points to this function
function addItem(e) {
    e.preventDefault();
    const groceryItemInput = inputGrocery.value;
    const id = new Date().getTime().toString();
    //  account for all conditions of input;
    if (groceryItemInput && !editFlag) {
        //input case: input is not empty and user NOT editing
        //add item to the grocery list
        const newElement = document.createElement("article");
        newElement.classList.add("grocery-item");

        //creates a new attribute to be considered for use in the whole document
        const attrID = document.createAttribute("data-id");
        attrID.value = id;

        //sets the specific grocery item's created ID attribute
        newElement.setAttributeNode(attrID);
        newElement.innerHTML = `<p class="grocery-title">${groceryItemInput}</p>
                                <div class="item-btn-container">
                                    <button type="button" class="edit-btn"></button>
                                    <button type="button" class="remove-btn"></button>
                                </div>`;

        //this is where I have access to the individual items... need to keep access
        //adds event listeners when they are created, event listeners then excecute correct func on click
        const deleteBtn = newElement.querySelector(".remove-btn");
        const editBtn = newElement.querySelector(".edit-btn");
        deleteBtn.addEventListener("click", deleteItem);
        editBtn.addEventListener("click", editItem);

        listOfItems.appendChild(newElement);
        clearBtn.classList.add("show-container");
        displayAlert("Successfully added item", "success");

        //adding to local storage
        //addToLocalStorage(id, inputGrocery);
        setBackToDefault();
    } else if (groceryItemInput && editFlag) {
        //input case: input is not empty and user IS editing
        editElement.innerHTML = inputGrocery.value;
        displayAlert("Successfully edited item", "success");
        setBackToDefault();
    } else {
        //empty input
        displayAlert("Please enter a value", "danger");
    }
}

//display alert
function displayAlert(text, typeOfAlert) {
    alertBox.textContent = text;
    alertBox.classList.add(`alert-${typeOfAlert}`);

    setTimeout(function () {
        alertBox.textContent = "";
        alertBox.classList.remove(`alert-${typeOfAlert}`);
    }, 2000);
}

//set back to default
function setBackToDefault() {
    //placerholder
    //console.log("Set to default");
    inputGrocery.value = "";
    editFlag = false;
    editID = "";
    submitBtn.textContent = "Add Item";
}

//clear all items from grocery list
function clearList() {
    const items = document.querySelectorAll(".grocery-item"); //returns array / list

    //in items, loop through, store in a variable called item for each loop, then remove that child based on
    if (items.length > 0) {
        items.forEach(function (item) {
            listOfItems.removeChild(item);
        });
    }

    clearBtn.classList.remove("show-container");
    displayAlert("Items cleared", "danger");
    setBackToDefault();
}

// remove an item
function deleteItem(e) {
    //console.log("Delete function");
    const itemElement = e.currentTarget.parentElement.parentElement; //current target: del-button, parent: container for item buttons, 2ndparent: grocery-item (type article)
    listOfItems.removeChild(itemElement);
    let id = itemElement.dataset.id; // dataset.id accesses id attribute set in addItem();

    //if(listOfItems.length === 0){  //listOfItems is an ELEMENT... misleading variable name, todo
    if (listOfItems.children.length === 0) {
        clearBtn.classList.remove("show-container");
        clearBtn.classList.add("hidden-container");
    }
    setBackToDefault();
    displayAlert("Item deleted", "danger");
    //removeFromLocalStorage(id);
}

// edit an item
function editItem(e) {
    const itemElement = e.currentTarget.parentElement.parentElement;
    editElement = e.currentTarget.parentElement.previousElementSibling; // gets the title/text content of the item
    
    inputGrocery.value = editElement.innerHTML;
    submitBtn.innerHTML = "Edit";
    inputGrocery.focus();

    editFlag = 1;
    editID = itemElement.dataset.id; 
}

/***  Local Storage ***/
function addToLocalStorage() {
    //placeholder
    console.log("Add to local storage");
}

function removeFromLocalStorage(id) {}

/*** Setup Items ***/
