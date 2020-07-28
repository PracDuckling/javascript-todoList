//what does the querySecector method returns when applied on a ul ---> returns ul and its child elements
//Can we use chid, Children etc methods on HTML collection ====> we can't use these methods, but we can use these methods on the a paticular item in the HTMLcollection

const form = document.querySelector("#task-form"),
    taskList = document.querySelector(".collection"),
    clearBtn = document.querySelector(".clear-tasks"),
    filter = document.querySelector("#filter"),
    taskInput = document.querySelector("#task")

//load all event Listeners
loadEventListeners();
//defining
function loadEventListeners() {
    //add task event
    form.addEventListener("submit", addTask);
    
}

function addTask(e) {
    if (taskInput.value === "") {
        return alert("Add a task");
    }
    //create li element
    const li = document.createElement("li");
    //add class
    li.className = "collection-item";
    //create text node and append
    li.appendChild(document.createTextNode(taskInput.value));
    //create new link element
    const link = document.createElement("a");
    //add class
    link.className = "delete-item secondary-content";
    //add icon
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //append the link to li
    li.appendChild(link);
    //append li to the ul
    taskList.appendChild(li);

    //clear the input
    taskInput.value = "";

    console.log(e);
    e.preventDefault();
}