var taskname = document.getElementById("taskname");
var desc = document.getElementById("descTask");
var assignee = document.getElementById("assignee");
var thumb = document.getElementById("formFile");
var thumbDisplay = document.getElementById("thumbDisplay");
var floatingInputs = document.getElementsByClassName("form-floating")
var warning = document.getElementsByClassName("warning");
var taskDescriptionModal = document.getElementById("taskDescriptionModal");
var tasksBoardNotDone = document.querySelector("#taskNotDone");
var toggledBtn = document.querySelector("#toggledBtn");
var clearSearchBar = document.querySelector("#clearSearchBar");
var taskBoardDone = document.querySelector("#taskDone");
var todoCount = document.querySelector("#todoCount");
var confirmedCount = document.querySelector("#confirmedCount");
var searchBar = document.getElementById("searchBar");
var toggle = 0;
var img_name;
var img_name_update;
var img_name_update_boolean;
var local_storage_data = [];
var elementToUpdate = -1;

displayData();
getLocalStorageData();
counter(); 

function getImgName(e) {
    img_name = e.files[0].name;
    thumbDisplay.src = "assets/imgs/" + img_name;

}


function markTaskAsDone(i) {
    Swal.fire({
        title: 'Do you want to confirm that task is done?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: `No`,
    }).then((result) => {
        if (result.isConfirmed) {
            local_storage_data[i].done = 1;
            let dataToSend = JSON.stringify(local_storage_data);
            localStorage.setItem("localData", dataToSend);
            displayData();
            counter ();
            Swal.fire('Task Is Done!', '', 'success')
        } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info')
        }
    })


}


function getLocalStorageData() {
    let stringArrayOfObjects = localStorage.getItem("localData");
    if (stringArrayOfObjects != null) {
        local_storage_data = JSON.parse(stringArrayOfObjects);
    }
}

function imageToUpdate(e) {
    img_name_update = e.files[0].name;
    document.getElementById("thumbDisplayUpdate").src = "assets/imgs/" + img_name_update;
    img_name_update_boolean = true;
}

function viewDescription(i) {
    taskDescriptionModal.innerHTML = local_storage_data[i].desc;
}



//THE FIRST FUNCTION IS TO DISPLAY DATA OF SPECIFIC ITEM ON MODAL
//THE SECOND FUNCTION TO SUBMIT FINAL EDIT ON THE TASK
function updateItem(i) {
    document.getElementById("tasknameupdate").value = local_storage_data[i].taskName;
    document.getElementById("Assigneeupdate").value = local_storage_data[i].assignee;
    document.getElementById("descTaskupdate").value = local_storage_data[i].desc;
    document.getElementById("thumbDisplayUpdate").src = "assets/imgs/" + local_storage_data[i].imageName;
    elementToUpdate = i;

}

document.getElementById("updateTask").addEventListener('click', function () {
    local_storage_data[elementToUpdate].taskName = document.getElementById("tasknameupdate").value;
    local_storage_data[elementToUpdate].assignee = document.getElementById("Assigneeupdate").value;
    local_storage_data[elementToUpdate].desc = document.getElementById("descTaskupdate").value;
    if (img_name_update_boolean) {
        local_storage_data[elementToUpdate].imageName = img_name_update;
    }
    let dataToSend = JSON.stringify(local_storage_data);
    localStorage.setItem("localData", dataToSend);
    displayData();
    let exp = "The Task Updated Successfully!";
    goodJobPopUp(exp)


});


function displayData() {
    let innerHTMLOfToDoContainer = "";
    getLocalStorageData();
    for (let i = 0; i < local_storage_data.length; i++) {
        if (local_storage_data[i].done == 0) {
            innerHTMLOfToDoContainer += `
                <div class="todo-item d-flex mb-2">
                    <div style=" height:100%; width:24%; background-size: cover; " id="hhhh">
                         <img style="width:100%; height:100%" src="assets/imgs/${local_storage_data[i].imageName}" id="tt"/> 
                    </div>
                    <div class="task-info ps-3 pt-3 pb-3 d-flex flex-column justify-content-between  w-68">
                        <h2>${local_storage_data[i].taskName}</h2>
                        <h6>${local_storage_data[i].assignee}</h6>
                        <button data-bs-toggle="modal" data-bs-target="#taskDesc" id="desc" type="button"
                        onclick="viewDescription(${i})"    
                        class="btn btn-primary">Description</button>
                    </div>
                    <div class="actions h-100 pe-3 pt-2 pb-2">
                        <button onclick="markTaskAsDone(${i})" type="button" class="btn btn-success"><i class="fa-solid fa-check"></i></button>
                        <button data-bs-toggle="modal" data-bs-target="#updateTaskModal" onclick="updateItem(${i})" type="button" class="btn btn-warning"><i class="fa-solid fa-pen-to-square"></i></button>
                        <button onclick="deleteItem(${i})" type="button" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i></button>
                    </div>
                </div>
          `;

        }
    }
    tasksBoardNotDone.innerHTML = innerHTMLOfToDoContainer;

}


function displayDataConfirmed() {
    let innerHTMLOfToDoContainer = "";
    getLocalStorageData();
    for (let i = 0; i < local_storage_data.length; i++) {
        if (local_storage_data[i].done == 1) {
            innerHTMLOfToDoContainer += `
                <div class="todo-item d-flex mb-2">
                    <div style=" height:100%; width:24%; background-size: cover; " id="hhhh">
                         <img style="width:100%; height:100%" src="assets/imgs/${local_storage_data[i].imageName}" id="tt"/> 
                    </div>
                    <div class="task-info ps-3 pt-3 pb-3 d-flex flex-column justify-content-between  w-68">
                        <h2>${local_storage_data[i].taskName}</h2>
                        <h6>${local_storage_data[i].assignee}</h6>
                        <button data-bs-toggle="modal" data-bs-target="#taskDesc" id="desc" type="button"
                        onclick="viewDescription(${i})"    
                        class="btn btn-primary">Description</button>
                    </div>
                    <div class="actions h-100 pe-3 pt-2 pb-2">
                        <button onclick="goBack(${i})" type="button" class="btn btn-success"><i class="fa-solid fa-rotate-left"></i></button>
                    </div>
                </div>
          `;

        }
    }
    taskBoardDone.innerHTML = innerHTMLOfToDoContainer;

}


function deleteItem(i) {
    Swal.fire({
        title: 'Are you sure to delete this task?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem("localData");
            local_storage_data.splice(i, 1);
            let dataToSend = JSON.stringify(local_storage_data);
            localStorage.setItem("localData", dataToSend);
            displayData();
            counter ();
            Swal.fire(
                'Deleted!',
                'Selected Task has been deleted.',
                'success'
            )
        }
    })
}

function goodJobPopUp(exp) {
    Swal.fire(
        'Good job!',
        exp,
        'success'
    )
}



var addNewTask = document.getElementById("addNewTask");
addNewTask.addEventListener("click", function () {
    if (taskname.value == "") {
        taskname.classList.add("is-invalid");
        warning[0].style.display = "block";
    }
    else if (assignee.value == "") {
        assignee.classList.add("is-invalid");
        warning[1].style.display = "block";
    }
    else if (desc.value == "") {
        desc.classList.add("is-invalid");
        warning[2].style.display = "block";
    }
    else {

        var done = 0;
        let obj = {
            done: done,
            taskName: taskname.value,
            assignee: assignee.value,
            desc: desc.value,
            imageName: img_name
        }

        local_storage_data.push(obj);
        let dataToSend = JSON.stringify(local_storage_data);
        localStorage.setItem("localData", dataToSend);
        let exp = "New Task Added Successfully!";
        goodJobPopUp(exp);
        displayData();
        counter ();
    }

})


console.log(desc);


//TO CLEAR THE WARNING WHEN THE USER FILL ALL INPUTS 
taskname.addEventListener('keydown', function () {
    taskname.classList.remove("is-invalid");
    warning[0].style.display = "none";
})

assignee.addEventListener('keydown', function () {
    assignee.classList.remove("is-invalid");
    warning[1].style.display = "none";
})

desc.addEventListener('keyup', function (e) {
    console.log(e.target.value)
    // desc.classList.remove("is-invalid"); 
    // warning[2].style.display = "none"; 
})


toggledBtn.addEventListener('click', function () {
    if (toggle) {
        taskBoardDone.style.display = "none";
        tasksBoardNotDone.style.display = "block";
        toggledBtn.innerHTML = "Confirmed";
        displayData();
        toggle = !toggle;
    }
    else {
        taskBoardDone.style.display = "block";
        tasksBoardNotDone.style.display = "none";
        toggledBtn.innerHTML = "TODO";
        displayDataConfirmed();
        toggle = !toggle;
    }

})


//TO RETURN THE TASK FROM CONFIRMATION LIST TO TODO LIST
function goBack(i) {
    Swal.fire({
        title: 'Are you sure that you want to remove confirmation of this task?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.isConfirmed) {
            local_storage_data[i].done = 0;
            let dataToSend = JSON.stringify(local_storage_data);
            localStorage.setItem("localData", dataToSend);
            displayDataConfirmed();
            counter ();
            Swal.fire(
                'Done!',
                'Your task are currently in TODO List.',
                'success'
            )
        }
    })


}


//SEARCHING FUNCTIONALITY
searchBar.addEventListener('keyup', function (e) {
    let key = e.target.value;
    let searchResult = "";
    for (let i = 0; i < local_storage_data.length; i++) {
        if (local_storage_data[i].taskName.toUpperCase().includes(key) || local_storage_data[i].taskName.toLowerCase().includes(key)) {
            searchResult += `
            <div class="todo-item d-flex mb-2">
                <div style=" height:100%; width:24%; background-size: cover; " id="hhhh">
                     <img style="width:100%; height:100%" src="assets/imgs/${local_storage_data[i].imageName}" id="tt"/> 
                </div>
                <div class="task-info ps-3 pt-3 pb-3 d-flex flex-column justify-content-between  w-68">
                    <h2>${local_storage_data[i].taskName}</h2>
                    <h6>${local_storage_data[i].assignee}</h6>
                    <button data-bs-toggle="modal" data-bs-target="#taskDesc" id="desc" type="button"
                    onclick="viewDescription(${i})"    
                    class="btn btn-primary">Description</button>
                </div>
                <div class="actions h-100 pe-3 pt-2 pb-2">
                    <button onclick="markTaskAsDone(${i})" type="button" class="btn btn-success"><i class="fa-solid fa-check"></i></button>
                    <button data-bs-toggle="modal" data-bs-target="#updateTaskModal" onclick="updateItem(${i})" type="button" class="btn btn-warning"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button onclick="deleteItem(${i})" type="button" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i></button>
                </div>
            </div>
      `;
        }
    }
    if (searchResult==""){
        tasksBoardNotDone.innerHTML=
        `
        <div class="alert alert-danger" role="alert">
            No Search Results, Try To Enter Another Task Name Correctly
        </div>
        `;

    }
    else{
        tasksBoardNotDone.innerHTML = searchResult;

    }


}); 


clearSearchBar.addEventListener('click', function(){
  searchBar.value = ""
}); 


//COUNT CONFIRMED AND TODO TASKS
function counter (){
    var todoTasksCounter = 0; 
    var confirmedTasksCounter = 0; 
    local_storage_data.map((item)=>{
        if(item.done){
            confirmedTasksCounter++;
        }
        else{
            todoTasksCounter++;
        }

    })
    todoCount.innerHTML = todoTasksCounter; 
    confirmedCount.innerHTML = confirmedTasksCounter; 
}