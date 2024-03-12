let authToken = localStorage.getItem("token")
    if (!authToken) {
        alert("Your Session is Over");
        window.location.href = "../../index.html";
    }


document.addEventListener("DOMContentLoaded", async (event) => {
    event.preventDefault();
    const blogId = getQueryParam('blogId');

    try {
        const response = await fetch(`https://mybrand-ishimwe-be-halx.onrender.com/api/blogs/${blogId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (response.ok) {
            const data = await response.json();
            var blogData = data.data;

            if (blogData) {

                document.getElementById("blog-title").value = blogData.title;
                document.getElementById("description1").value = blogData.desc;
                editor1.setHTML(blogData.content);
            
            } else {
                console.error("Blog data not available.");
            }
        } else {
            console.error("Failed to fetch blog data.");
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
});
const updateButton = document.getElementById("updateBlog")
updateButton.addEventListener("click", async function (event) {
    updateButton.style.color = "blue";
    event.preventDefault();

    // getting elements to use while posting
    const title = document.getElementById("blog-title").value;
    const file = document.getElementById("fileInput").files[0];
    const desc = document.getElementById("description1").value;
    const content = document.getElementById("richtext").value;
    console.log(title, file, desc, content);

    const formData = new FormData();
    formData.append('title', title);
    if(file){
        formData.append('file', file);
    }

    formData.append('desc', desc);
    formData.append('content', content);

    let authToken = localStorage.getItem("token");
    if (!authToken) {
        window.location.href = "../../index.html";
    }
  const blogId = getQueryParam("blogId");
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
    try {
        const result = await fetch(`https://mybrand-ishimwe-be-halx.onrender.com/api/blogs/${blogId}`, {
            method: "PATCH",
            headers: {

                contentType: "multipart/form-data",
                Authorization: `Bearer ${authToken}`,
                

            },
            body: formData
        });

        if (!result.ok) {
            const errorMessage = await result.json(); 
            unLoad();
            alert(`Failed to update blog!`);
        } else {
            unLoad();
        
            setTimeout(()=>{
                alert("Blog Updated successfully!");
            },10)
        }
    } catch (error) {
        console.log("Error:", error);
    }
});



function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}