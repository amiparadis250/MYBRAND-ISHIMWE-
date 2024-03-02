
        window.addEventListener("load", function() {
    const saveBlogButton = document.getElementById("saveblog");
    const blogTitle = document.getElementById("blog-title");
    const fileInput = document.getElementById("fileInput");
    const description = document.getElementById("description");
    const richText = document.getElementById("richtext");

    const titleError = document.getElementById("titleError");
    const imageError = document.getElementById("imageError");
    const descError = document.getElementById("descError");
    const textError = document.getElementById("textError");

    // Function to validate title
    function validateTitle() {
        titleError.textContent = "";
        blogTitle.style.border = "";

        var title = blogTitle.value.trim();

        // Validate title format (no leading whitespace, no special characters)
        if (!/^\S/.test(title) || /[^a-zA-Z0-9\s]/.test(title)) {
            titleError.textContent = "Invalid title format.";
            blogTitle.style.border = "1px solid red";
        }

        // Additional validation for title length (not exceeding 25 characters)
        if (title.length > 50) {
            titleError.textContent = "Title must not exceed 25 characters.";
            blogTitle.style.border = "1px solid red";
        }
    }

    // Function to validate image
    function validateImage() {
        imageError.textContent = "";
        fileInput.style.border = "";

        var image = fileInput.files[0];

        if (!image) {
            imageError.textContent = "Please select an image.";
            fileInput.style.border = "1px solid red";
        }
    }

    // Function to validate description
    function validateDescription() {
        descError.textContent = "";
        description.style.border = "";

        var desc = description.value.trim();

        // Validate description length (between 23 and 160 characters)
        if (desc.length < 23) {
            descError.textContent = "Description must be between 23 and 160 characters.";
            description.style.border = "1px solid red";
        }
    }

    // Function to validate text
    function validateText() {
        textError.textContent = "";
        richText.style.border = "";

        var text = richText.value.trim();

        // Validate text length (at least 23 words)
        var wordCount = text.split(/\s+/).length;
        if (wordCount < 23) {
            textError.textContent = "Text must contain at least 23 words.";
            richText.style.border = "1px solid red";
        }
    }

    // Event listeners for real-time validation
    blogTitle.addEventListener("input", validateTitle);
    fileInput.addEventListener("change", validateImage);
    description.addEventListener("input", validateDescription);
    richText.addEventListener("input", validateText);

    saveBlogButton.addEventListener("click", function() {
     

        validateTitle();
        validateImage();
        validateDescription();
        validateText();

                // Additional validation logic can be added here
                // ...
    
                var title = blogTitle.value.trim();
                var image = fileInput.files[0];
                var desc = description.value.trim();
                var text = richText.value.trim();
    
                if (title && image && desc && text) {
                    // Continue with the save operation
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        var imageSrc = e.target.result;
    
                        var blog = {
                            title: title,
                            image: imageSrc,
                            desc: desc,
                            text: text
                        };
    
                        saveBlogToLocalStorage(blog);
                        alert("Blog saved successfully!");
    
                        // Clear the form and errors
                        clearForm();
                    };
    
                    reader.readAsDataURL(image);
                }
            });
    
            function saveBlogToLocalStorage(blog) {
                var existingBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
                existingBlogs.push(blog);
                localStorage.setItem("blogs", JSON.stringify(existingBlogs));
            }
    
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
        });
   