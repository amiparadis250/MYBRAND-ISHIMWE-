document.addEventListener("DOMContentLoaded", (event) => {
    event.preventDefault();
    // getting all users and displaying users in Table
    let authToken = localStorage.getItem("token");
    const table = document.getElementById("userTable");
    fetch("https://mybrand-ishimwe-be-halx.onrender.com/api/users", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authToken}`
        }
    }).
        then(responce => responce.json())
        .then(data => {
            const allUsers = data.data || [];
            for (let i = 0; i < 5; i++) {
                const user = allUsers[i];
                console.log(allUsers);
                let role;
                if (user.isAdmin == true) {
                    role = "admin";
                }
                else {
                    role = "Guest";
                }
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${i + 1}</td>
                    <td>${user.fullName}</td>
                    <td>${user.email}</td>
                    <td>${role}</td>
                    <td><i id="deleteIcon${i}" class="fa-solid fa-trash"></i>
                    <i id="loader${i}" style="display:none;font-size:20px;color:blue" class="fa fa-spinner fa-spin"></i></td>`
                    
                
                table.appendChild(row);

                // deleting user
                const userId = user._id;
                const deleteIcon = document.getElementById(`deleteIcon${i}`);
                deleteIcon.addEventListener("click", (event) => {
                    event.preventDefault();
                    deleteIcon.style.color = "red";
                    
                    fetch(`https://mybrand-ishimwe-be-halx.onrender.com/api/users/profile/${userId}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${authToken}`
                        }
                    }).
                        then(response => {
                            if (!response.ok) {
                                alert("user not deleted: ");
                            }
                            else {
                                alert("user deleted")
                                location.reload();
                            }
                        })

                });
            }
        })
});
