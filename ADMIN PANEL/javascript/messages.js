let authToken = localStorage.getItem("token");
if(!authToken){
    alert("Login to View your message");
   window.location.href = "../../index.html";

}
else{
console.log(authToken);
const table = document.getElementById("table");

fetch("https://mybrand-ishimwe-be-halx.onrender.com/api/queries", {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}` 
    }
})
    .then(response => response.json())
    .then(data => {
        for (let i = 0; i <7; i++) {
            const message = data.data[i].guestQuery;
            const name = data.data[i].guestName;
            const email = data.data[i].email;
            const CommentID = data.data[i]._id;
            const row = document.createElement("tr");
            row.innerHTML = `<td>${i+1}</td><td>${name}</td><td>${email}</td><td>${message}</td><td><i id="reply" style="color:#EAB308;font-size: 20px;" class="fa-solid fa-reply"></i></td><td  style="color:#EAB308"><i  id="deleteIcon${i}" class="fas fa-trash"></i></td>`;
            table.appendChild(row);


              //deleting message
const deleteIcon = document.getElementById(`deleteIcon${i}`)
deleteIcon.addEventListener("click",(event)=>{
    event.preventDefault();
    deleteIcon.style.color ="red";
fetch(`https://mybrand-ishimwe-be-halx.onrender.com/api/queries/${CommentID}`,{
    method:"DELETE",
    headers:{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${authToken}`
    }
})
.then(responce =>{
    if(!responce.ok){
        console.log("message not deleted: " + responce);
    }
    else{
        alert("Message deleted")
        location.reload();
    }
})

})


        }
    })
    .catch(error => {
        console.error(error);
    });
}

  

    
