document.addEventListener("DOMContentLoaded", async (event) => {
    event.preventDefault();
    let authToken = localStorage.getItem("token");
    if (!authToken) {
        window.location.href = "../../index.html";
    }
    const table = document.getElementById("table");

    const response = await fetch("https://mybrand-ishimwe-be-halx.onrender.com/api/blogs", {
        method: "GET",
        headers: {
            "content-type": "application/json",
        }
    })
        .then(response => response.json())
        .then(data => {
            const blogData = data.data || [];
            const blogLength = blogData.length;
            for (let i = 0; i < blogData.length; ++i) {
                const blog = blogData[i];
                const title = blog.title;
                const likes = blog.likes;
                const dislikes = blog.dislikes;
                const commentsLength = blog.comments.length

                // Creating a new table row
                const row = document.createElement("tr");
                const blogId = blog._id;  // Move blogId declaration inside the loop
                row.innerHTML = `
                    <td>${i + 1}</td>
                    <td>${title}</td>
                    <td>${commentsLength}</td>
                    <td>${likes}</td>
                    <td>${dislikes}</td>
                    <td id="actionCell">
                        <i id="deleteIcon${i}" class="fa-solid fa-trash"></i>
                        <i id="editIcon${i}" class="fa-solid fa-file-pen"></i>
                    </td>
                `;
                table.appendChild(row);

                // Deleting blog
                document.getElementById(`deleteIcon${i}`).addEventListener("click", async (event) => {
                    event.preventDefault();
                    event.target.style.color = "#EAB308";
                    
                    const result = await fetch(`https://mybrand-ishimwe-be-halx.onrender.com/api/blogs/${blogId}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${authToken}`
                        }
                    })
                        .then(response => {
                            if (!response.ok) {
                                console.log("Failed to delete a blog");
                            } else {
                                alert("Blog deleted");
                                location.reload(true);
                            }
                        })
                        .catch(error => console.log(error));
                });
                //updating blog
                  document.getElementById(`editIcon${i}`).addEventListener("click",(event)=>{
                    event.preventDefault();
                     window.location.href = `../html/updateBlog.html?blogId=${blogId}`;
                 });
            }
        });
});
