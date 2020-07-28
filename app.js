//Defining UI variables
const form = document.querySelector("#task-form"),
      taskList = document.querySelector(".collection"),
      clearBtn = document.querySelector(".clear-tasks"),
      filter = document.querySelector("#filter"),
      taskInput = document.querySelector("#task");

//load all event Listeners
loadEventListeners();
//defining
function loadEventListeners() {
    //DOM Load Event
    document.addEventListener("DOMContentLoaded", getTasks);
    //add task event
    form.addEventListener("submit", addTask);
    //removing the task from the taskList
    taskList.addEventListener("click", removeTask);
    //clear task event
    clearBtn.addEventListener("click", clearTasks);
    //filter Tasks
    filter.addEventListener("keyup", filterTasks);
}
//get tasks from Local storage
function getTasks(){
    //getting tasks from the Local storage into a variable
    let tasks;
    if(localStorage.getItem("tasks") === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    //Show the tasks on the screen =====> add task to the ul by creating the li for each task
    tasks.forEach(function(task){

        //creating li
        const li = document.createElement("li");
        li.className = "collection-item";
        //taking the content form tasks stored in localStorage
        li.appendChild(document.createTextNode(task));
        
        // creating link
        const link = document.createElement("a");
        link.className = "delete-item secondary-content";
        link.innerHTML = "<i class='fa fa-remove'></i>";
        
        //append the link to li
        li.appendChild(link);
        
        //append the li to the ul
        taskList.appendChild(li);
    });
}   



//add new tasks
function addTask(e){
    if(taskInput.value === ""){
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
    //store in local storage
    LocalStorageStore(taskInput.value);
    //clear the input
    taskInput.value = "";

    e.preventDefault();
} 
//remove task

function removeTask(e) {
    
    if(e.target.classList.contains("fa")){
        if(confirm("Are You Sure?")){
            e.target.parentElement.parentElement.remove();
            
            //remove Task from Local Storage
            removeTaskfromLocalStorage(e.target.parentElement.parentElement);
        }
    }
   
}
//removeTaskFromLocalSotrage
function removeTaskfromLocalStorage(taskItem){
    let tasks;
    if (localStorage.getItem("tasks") === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem("tasks"))
    }
    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index ,1);
        }
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

//clearTasks

function clearTasks(e){
   if(confirm("Are You Sure?")){
        while(taskList.firstChild){
            taskList.removeChild(taskList.firstChild);
        }
        localStorage.clear("tasks");
   }
  
}
//filterTasks
function filterTasks(e){
    const text = e.target.value.toLowerCase();

    document.querySelectorAll(".collection-item").forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = "block";

        }else{
            task.style.display = "none";
        }
    });                          
}
function LocalStorageStore(task){
    let tasks;
    if(localStorage.getItem("tasks") === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));
}