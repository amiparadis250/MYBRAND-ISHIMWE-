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
            row.innerHTML = `<td>${i+1}</td><td>${name}</td><td>${email}</td><td>${message}</td><td><i id="reply" style="color:#EAB308;font-size: 20px;" class="fa-solid fa-reply"></i></td><td  style="color:#EAB308"><i  id="deleteIcon${i}" class="fas fa-trash"></i>
            <i id="loader${i}" style="display:none;font-size:20px;color:blue" class="fa fa-spinner fa-spin"></i></td>`;
            table.appendChild(row);


              //deleting message
const deleteIcon = document.getElementById(`deleteIcon${i}`)
deleteIcon.addEventListener("click",(event)=>{
    event.preventDefault();
    const deleteIcon = document.getElementById(`deleteIcon${i}`);
    deleteIcon.style.display = "none";
    const loaderIcon = document.getElementById(`loader${i}`);
    loaderIcon.style.display = "inline-block";
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
        loaderIcon.style.display = "none";
        setTimeout(() =>{
            alert("Message deleted")
        },10)
       
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

  

    
