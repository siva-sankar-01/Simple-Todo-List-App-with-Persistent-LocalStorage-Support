let todoItemsContainer=document.getElementById('todoItemsContainer');
let savetodoButton=document.getElementById('saveTodoBtn');
savetodoButton.onclick=function()
{
    localStorage.setItem("todoList",JSON.stringify(todoList));
}
let addTodobtnElement=document.getElementById('addTodoButton');
addTodobtnElement.onclick=function()
{
    onAddTodo();
}

let todoList=gettodoListFromLocalStorage();

function ontostatuschange(checkboxId,labelId,todoId)
{
    let checkboxElement=document.getElementById(checkboxId);
    let labelElement=document.getElementById(labelId);
   labelElement.classList.toggle('checked');
   let todoObjectIndex=todoList.findIndex(function(eachTodo)
{
let eachTodoId="todo"+eachTodo.UniqueNo;
if(eachTodoId===todoId)
{
return true;
}
else{
    return false;
}
}
);
let todoObject=todoList[todoObjectIndex];
if(todoObject.isChecked===true)
{
    todoObject.isChecked=false;
}
else 
{
    todoObject.isChecked=true;
}
}
function gettodoListFromLocalStorage()
{
    let strigifiedText=localStorage.getItem('todoList');
    let parsedList=JSON.parse(strigifiedText);
    if(parsedList===null)
    {
        return[];
    }
    else
    {
        return parsedList;
    }
}

let todoscount=todoList.length;

function createAndAppendTodo(todo){
    let todoId="todo"+todo.UniqueNo;
let todoEle=document.createElement('li');
todoEle.classList.add('todo-item-container','d-flex','flex-row');
todoEle.id=todoId;
todoItemsContainer.appendChild(todoEle);
console.log(todoItemsContainer);

let inputEle=document.createElement('input');
inputEle.type="checkbox";
inputEle.checked=todo.isChecked;
let checkboxId="checkboxInput"+todo.UniqueNo;
let labelId="label"+todo.UniqueNo;

inputEle.id=checkboxId;
inputEle.onclick=function()
{
    ontostatuschange(checkboxId,labelId,todoId);
}
inputEle.classList.add('checkbox-input');
todoEle.appendChild(inputEle);

let labelContainer=document.createElement('div');
labelContainer.classList.add('label-container','d-flex','flex-row');
todoEle.appendChild(labelContainer);

let labelEle=document.createElement('label');
labelEle.setAttribute('for',checkboxId);
labelEle.id=labelId;
labelEle.textContent=todo.text;
if(todo.isChecked===true)
{
    labelEle.classList.add('checked');
}
labelEle.classList.add('checkbox-label');
labelContainer.appendChild(labelEle);

let deleteiconContainer=document.createElement('div');
deleteiconContainer.classList.add('delete-icon-container');
labelContainer.appendChild(deleteiconContainer);

let deleteIcon=document.createElement('i');
deleteIcon.classList.add('far','fa-trash-alt','delete-icon');
deleteiconContainer.appendChild(deleteIcon);
deleteIcon.onclick=function()
{
    onDeleteTodo(todoId);
}
}

for(let each_item of todoList)
{
    createAndAppendTodo(each_item);
}
function onDeleteTodo(todoId)
{
    let todoDele=document.getElementById(todoId);
    todoItemsContainer.removeChild(todoDele);
    let deleteIndex=todoList.findIndex(function(each_item)
{
    let eachTodoid="todo"+each_item.UniqueNo;
    if(eachTodoid===todoId)
    {
        return true;
    }
    else{
        return false;
    }
})
todoList.splice(deleteIndex,1);

}
function onAddTodo()
{
   let userInputElement=document.getElementById('todoUserInput');
   let userInputValue=userInputElement.value;
   if (userInputValue==="")
   {
    alert("Enter a valid Text");
    return;
   }
   todoscount=todoscount+1;
   let newtodo={
    text:userInputValue,
    UniqueNo:todoscount,
    isChecked:false
   } 
   todoList.push(newtodo);
   createAndAppendTodo(newtodo);
   userInputElement.value="";
}
