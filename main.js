let new_item = document.getElementById("newItem");
let add_btn = document.getElementById("add_btn");
let para1 = document.getElementById("para1");
let para2 = document.getElementById("para2");

let item_name = []; // prepare for creating unique name or id for each list item

// let's generate a new name whenever a new item is added
function name_generator() {
    // Their name is the order they've been created
    let new_name = item_name.length;
    item_name.push(new_name);
    return new_name;
}

// Insert this item to the top of list
// Reference: move div with javascript
// https://stackoverflow.com/questions/26221050/move-div-with-javascript
let add_item_to_top = function(itsParent, thisDiv) {
    if (itsParent.querySelectorAll("div").length > 0) {
        let topdiv = itsParent.querySelectorAll("div")[0];
        topdiv.parentNode.insertBefore(thisDiv, topdiv);
    } else {
        itsParent.appendChild(thisDiv);
    }
};

// When "Add" button is clicked, create checkbox, label, delete button
// and put them in a div, then append the div in para
function add_into_list() {
    let new_div = document.createElement("div");
    let new_checkbox = document.createElement("input");
    let new_label = document.createElement("label");
    let del_btn = document.createElement("button");
    let new_name = name_generator();

    new_checkbox.setAttribute("type", "checkbox");
    new_checkbox.setAttribute("name", new_name);
    new_checkbox.setAttribute("id", new_name);
    new_checkbox.setAttribute("class", "list_checkbox");
    new_label.setAttribute("for", new_name);
    new_label.setAttribute("class", "list_label");
    new_label.appendChild(document.createTextNode(new_item.value));
    del_btn.appendChild(document.createTextNode(" X "));
    del_btn.setAttribute("class", "delete_btn");

    new_div.setAttribute("class", new_name);
    new_div.appendChild(new_checkbox);
    new_div.appendChild(new_label);
    new_div.appendChild(del_btn);
    add_item_to_top(para1, new_div); // add new_div at the top of para1

    console.log("I've added: ");
    console.log(new_div);
    new_item.value = ""; // empty the input text
}

// When add button is click, invoke two functions
add_btn.addEventListener("click", function() {
    // add new item into the list
    add_into_list();
    // Count how many delete button on the list everytime when I create new item
    count_del_btn();
});

// When add new item and the enter is pressed, invoke two functions
// Reference:
// https://stackoverflow.com/questions/14542062/eventlistener-enter-key/50993410
new_item.addEventListener("keypress", function(e) {
    let key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter
        add_into_list();
        count_del_btn();
    }
});


let del_btn; // Claim a variable to get all the delete button
let list_div; // Claim a variable to get all the div in the list

// Count delete button
// then I'll be able to invoke onclick method on delete button
let count_del_btn = function() {
    del_btn = document.getElementsByClassName("delete_btn");
    for (let i = 0; i < del_btn.length; i++) {
        del_btn[i].onclick = remove_from_list();
    }

    list_div = document.querySelectorAll("div");
    for (let i = 0; i < list_div.length; i++) {
        list_div[i].querySelector("input").onchange = checkedbox_change();
    }
}


// References:
// Common Mistake #6: Incorrect use of function definitions inside for loops
// https://www.toptal.com/javascript/10-most-common-javascript-mistakes
let remove_from_list = function() {
    return function() {
        var remove_div = this.parentElement;
        var parant_p = remove_div.parentElement
        console.log("I removed: ");
        console.log(remove_div);
        parant_p.removeChild(remove_div);
    };
};


let checkedbox_change = function() {
    return function() {
        if (this.checked) {
            let change_div = this.parentElement;
            console.log("I've done: ");
            console.log(change_div);
            //// We can change css either in js or css file
            // change_div.style.fontStyle = "italic";
            // change_div.style.textDecoration = "line-through";
            // change_div.style.color = "grey";
            add_item_to_top(para2, change_div); // add change_div to the top of para2
        } else {
            let change_div = this.parentElement;
            console.log("I haven't done: ");
            console.log(change_div);
            // change_div.style.fontStyle = "normal";
            // change_div.style.textDecoration = "initial";
            // change_div.style.color = "initial";
            add_item_to_top(para1, change_div); // add change_div to the top of para1
        }
    };
};