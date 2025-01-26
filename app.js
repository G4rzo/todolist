const input = document.querySelector('.input-task') ///id serve para identificar o elemento////
const button = document.querySelector('.button-add-task')
const completeList = document.querySelector('.list-tasks')

let itemList = []
let draggedItemIndex = null


function addNewTask(){
    if(input.value != ''){
        itemList.push({
            item: input.value,
            complete: false
        })
        input.value = ''
        
        showTasks()
    }
}

function showTasks(){

    let newList = ''

    itemList.forEach((task, index) => {
        newList = newList + `
            <li class="task ${task.complete && "done"}" draggable="true" ondragstart="drag(event, ${index})" ondragover="allowDrop(event)" ondrop="drop(event, ${index})" ondragend="dragEnd(event)">
                <img src="img/check.png".img alt="Concluir" onclick="completeTask(${index})">
                <p>${task.item}</p>
                <img src="img/edit.png".img alt="Editar" onclick="editTask(${index})">
                <img src="img/trash.png".img alt="Excluir" onclick="deleteTask(${index})">	
            </li>
            `
    } )

    completeList.innerHTML = newList
}

function editTask(index){
    const newTask = prompt('Digite a nova tarefa: ')
    itemList[index].item = newTask
    showTasks()
}


/*FAZER O BAGULHO DA BINARY TREE PARA PODER MOVER OS OBJ E SALVAR NO LOCAL STORAGE*/
function completeTask(index){
    
    itemList[index].complete = !itemList[index].complete
    console.log(itemList[index])
    showTasks()
}

function deleteTask(index){
    itemList.splice(index, 1)
    
    showTasks()
}

function dragStart(event, index) {
    draggedItemIndex = index
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/html', event.target.innerHTML)
    event.target.classList.add('dragging')
}

function dragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move'
}

function drop(event, index) {
    event.preventDefault()
    const draggedItem = itemList[draggedItemIndex]
    itemList.splice(draggedItemIndex, 1)
    itemList.splice(index, 0, draggedItem)
    showTasks()
}

function dragEnd(event) {
    event.target.classList.remove('dragging')
}


button.addEventListener('click', addNewTask)
input.addEventListener('keypress', function(e){
    if(e.keyCode === 13){
        addNewTask()
    }
})