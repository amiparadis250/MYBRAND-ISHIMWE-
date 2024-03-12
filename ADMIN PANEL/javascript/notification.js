let authToken = localStorage.getItem("authToken");
if(authToken){
    window.location.href = "../../index.html"
}

document.addEventListener("DOMContentLoaded", (event) => {
    event.preventDefault();
    const table = document.getElementById("table");

    fetch("https://mybrand-ishimwe-be-halx.onrender.com/api/blogs")
        .then(response => response.json())
        .then(data => {
            var storedBlogs = data.data || [];

            for (var i = 0; i < storedBlogs.length; i++) {
                let blogTitle = storedBlogs[i].title;
                let blogComments = storedBlogs[i].comments;
                let blogId = storedBlogs[i]._id;
                for (let j = 0; j < blogComments.length; j++) {
                    let comment = blogComments[j].text;
                    let commenterName = blogComments[j].commenterName;
                    let email = blogComments[j].commenterEmail;
                    let commentID = blogComments[j]._id;
                    let row = document.createElement("tr");
                    row.innerHTML = `<td>${j + 1}</td><td>${commenterName}</td><td>${email}</td><td>${comment}</td><td>${blogTitle}</td><td style="color:red">
                    <i id="delete${j}"  class="fas fa-trash"></i>
                    <i id="loader${j}" style="display:none;font-size:24px;color:blue" class="fa fa-spinner fa-spin"></i>
                    </td>`;
                    table.appendChild(row);
                

                //deleting comment

                const deleteIcon = document.getElementById(`delete${j}`);
                deleteIcon.addEventListener("click", (event) => {
                    event.preventDefault();

                    // Update variable names consistently
                    const loaderIcon = document.getElementById(`loader${j}`);

                    // Update the display style
                    deleteIcon.style.display = "none";
                    loaderIcon.style.display = "inline-block";

                    fetch(`https://mybrand-ishimwe-be-halx.onrender.com/api/comments/${commentID}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${authToken}`
                        }
                    })
                    .then(response => {
                        if (!response.ok) {
                            setTimeout(() => {
                                alert("Message not deleted");
                            }, 20);
                        }
                        location.reload();
                    })
                    .catch(error => console.error(error));
                });
            }
        }
    })
    .catch(error => console.error(error));
});

function getQueryParam(name) {
const urlParams = new URLSearchParams(window.location.search);
return urlParams.get(name);
}


