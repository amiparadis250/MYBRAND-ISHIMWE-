window.addEventListener("load", function () {
    const saveBlogButton = document.getElementById("saveblog");
    const blogTitle = document.getElementById("blog-title");
    const fileInput = document.getElementById("fileInput");
    const description = document.getElementById("description");
    const richText = document.getElementById("richtext");

    const titleError = document.getElementById("titleError");
    const imageError = document.getElementById("imageError");
    const descError = document.getElementById("descError");
    const textError = document.getElementById("textError");

    let isFetching = false;

    function validateTitle() {
        titleError.textContent = "";
        blogTitle.style.border = "";

        var title = blogTitle.value.trim();

        if (!/^\S/.test(title) || /[^a-zA-Z0-9\s]/.test(title)) {
            titleError.textContent = "Invalid title format.";
            blogTitle.style.border = "1px solid red";
        }

        if (title.length > 50) {
            titleError.textContent = "Title must not exceed 50 characters.";
            blogTitle.style.border = "1px solid red";
        }
    }

    function validateImage() {
        imageError.textContent = "";
        fileInput.style.border = "";

        var image = fileInput.files[0];

        if (!image) {
            imageError.textContent = "Please select an image.";
            fileInput.style.border = "1px solid red";
        }
    }

    function validateDescription() {
        descError.textContent = "";
        description.style.border = "";

        var desc = description.value.trim();

        if (desc.length < 23 || desc.length > 160) {
            descError.textContent = "Description must be between 23 and 160 characters.";
            description.style.border = "1px solid red";
        }
    }

    function validateText() {
        textError.textContent = "";
        richText.style.border = "";

        var text = richText.value.trim();

        var wordCount = text.split(/\s+/).length;
        if (wordCount < 23) {
            textError.textContent = "Text must contain at least 23 words.";
            richText.style.border = "1px solid red";
        }
    }

    function validateBlog() {
        validateTitle();
        validateImage();
        validateDescription();
        validateText();
    }

    blogTitle.addEventListener("input", validateTitle);
    fileInput.addEventListener("change", validateImage);
    description.addEventListener("input", validateDescription);
    richText.addEventListener("input", validateText);

//APIS for creating blog
    
saveBlogButton.addEventListener("click", async function (event) {
    saveBlogButton.style.color = "blue";
    event.preventDefault();

    validateBlog();

    // getting elements to use while posting
    const title = document.getElementById("blog-title").value;
    const file = document.getElementById("fileInput").files[0];
    const desc = document.getElementById("description").value;
    const content = document.getElementById("richtext").value;
    

    const formData = new FormData();
    formData.append('title', title);
    formData.append('file', file);
    formData.append('desc', desc);
    formData.append('content', content);

    let authToken = localStorage.getItem("token");
    if (!authToken) {
        window.location.href = "../../index.html";
    }

    try {
        const result = await fetch("https://mybrand-ishimwe-be-halx.onrender.com/api/blogs", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${authToken}`,
            },
            body: formData
        });

        if (!result.ok) {
            const errorMessage = await result.json(); 
            alert(`Something went wrong. Please try again: ${errorMessage}`);
        } else {
            alert("Blog created successfully!");
           clearForm();
        }
    } catch (error) {
        console.log("Error:", error);
    }
});
});
function clearForm() {
    blogTitle.value = "";
    fileInput.value = "";
    description.value = "";
    richText.value = "";

    // Clear error messages and borders
    titleError.textContent = "";
    imageError.textContent = "";
    descError.textContent = "";
    textError.textContent = "";
}

