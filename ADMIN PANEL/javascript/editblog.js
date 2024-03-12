document.addEventListener("DOMContentLoaded", async (event) => {
    event.preventDefault();
    let authToken = localStorage.getItem("token");
    if (!authToken) {
        window.location.href = "../../index.html";
    }
    const table = document.getElementById("table");
    function Loaders(){
        const loaderIcon = document.getElementById("loader");
        loaderIcon.style.display = "block";
        loaderIcon.style.position = "absolute";
       loaderIcon.style.top = "50%";
     loaderIcon.style.left = "50%";
     loaderIcon.style.transform = "translate(-50%, -50%)";
}
function unLoad(){
    const loaderIcon = document.getElementById("loader");
    loaderIcon.style.display = "none";
}
Loaders();

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
                        <i id="loader${i}" style="display:none;font-size:20px;color:blue" class="fa fa-spinner fa-spin"></i>
                    </td>
                `;
                table.appendChild(row);
                unLoad()
                // Deleting blog
                document.getElementById(`deleteIcon${i}`).addEventListener("click", async (event) => {
                    event.preventDefault();
                    const deleteIcon = document.getElementById(`deleteIcon${i}`);
                    deleteIcon.style.display = "none";
                    const loaderIcon = document.getElementById(`loader${i}`);
                    loaderIcon.style.display = "inline-block";
                
                    try {
                        const confirmed = confirm("Are you sure you want to delete this blog?");
                        if (confirmed) {
                            const result = await fetch(`https://mybrand-ishimwe-be-halx.onrender.com/api/blogs/${blogId}`, {
                                method: "DELETE",
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `Bearer ${authToken}`
                                }
                            });
                
                            if (!result.ok) {
                                console.log("Failed to delete a blog");
                            } else {
                                loaderIcon.style.display = "none";
                                setTimeout(() => {
                                    alert("Blog deleted");

                                }, 6);
                                location.reload(true);
                            }
                        } else {
                            // User clicked Cancel in the confirmation dialog
                            deleteIcon.style.display = "inline-block";
                            loaderIcon.style.display = "none";
                        }
                    } catch (error) {
                        console.log(error);
                    }
                });
                
                //updating blog
                  document.getElementById(`editIcon${i}`).addEventListener("click",(event)=>{
                    event.preventDefault();
                     window.location.href = `../html/updateBlog.html?blogId=${blogId}`;
                 });
            }
        });
});
