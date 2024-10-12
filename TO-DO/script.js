
document.addEventListener('DOMContentLoaded',()=>{
const inputtext=document.getElementById("todo-input")
const inputbttn=document.getElementById("add-el-bttn")
const todolist=document.getElementById("todo-list")

let tasks=JSON.parse(localStorage.getItem("tasks"))||[];

tasks.forEach(task =>rendertask(task));

inputbttn.addEventListener('click',()=>{
   const textel= inputtext.value.trim()
    if(textel==="")return;
    const newtsk={
        id:Date.now(),
        text:textel,
        completed:false
    }
    tasks.push(newtsk);
    savetasks();
    rendertask(newtsk)
    inputtext.value="";
    // rendertask(newtsk);
    // console.log(items)
})
function rendertask(task){
    console.log(task.text);

    // TO CREATE A LI ELEMENT

    const li=document.createElement("li");
    li.setAttribute("data-id",task.id)
    if(task.completed) li.classList.add('completed')
    li.innerHTML=
    `<span>${task.text}</span>
    <button>delete</button>`


    //TO DELETE THE ITEM

        //if button is not touched
    li.addEventListener('click',e=>{
        if(e.target.tagName==="BUTTON")return;
        task.completed=!task.completed;
        li.classList.toggle('completed')
        savetasks()
    })
    //if button is touched
    li.querySelector('button').addEventListener('click',(e)=>{
        e.stopPropagation();
        tasks=tasks.filter(t=>t.id===task.id) ;
       li.remove();
    })
    todolist.appendChild(li);
    savetasks();
}
function savetasks(){
    localStorage.setItem("tasks",JSON.stringify(tasks))//key should be in the string, and the keyvalue should be in string
}
})





