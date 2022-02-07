const socket = io();
const textarea = document.querySelector("#input");
const message_area  = document.querySelector('.message_area');
let Name;
do{
    Name = prompt('Enter Your Name ');
}while(!Name);

textarea.addEventListener('keyup',(e)=>{
    if(e.key === 'Enter' ){
        let messageObj ={
            name:Name,
            message:textarea.value,
        }
        sendMessage(messageObj,'outgoing');
        message_area.scrollTop = message_area.scrollHeight;
        socket.emit('message',messageObj);
        textarea.value ='';
    }
});

function sendMessage(obj,type){
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className,'message');

    let markup = `<h4>${obj.name}</h4><p>${obj.message}</p>`
    mainDiv.innerHTML = markup;
    message_area.appendChild(mainDiv);
}
//recieve
socket.on('message',(data)=>{
    sendMessage(data,'incoming');
    message_area.scrollTop = message_area.scrollHeight;
})