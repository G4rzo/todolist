const input = document.querySelector('input.input-task') ///id serve para identificar o elemento////
const button = document.querySelector('button.button-add-task')

let itemList = []


function addNewTask(){
    itemList.push(input.value)
    
    showTasks()
}

function showTasks(){

    let newLi
}

button.addEventListener('click', addNewTask)