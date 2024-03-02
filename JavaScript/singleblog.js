document.addEventListener("DOMContentLoaded", () => {
    var blogId = getQueryParam('blogId');
    fetch(`https://mybrand-ishimwe-be-halx.onrender.com/api/blogs/${blogId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(response => response.json())
    .then(data => {
        const blogData = data.data; 
        document.getElementById("blogTextContent").innerHTML = blogData.content;
        document.getElementById("blogImage").src = blogData.imgsrc;
        document.getElementById("blogTitle").innerText = blogData.title;
  
        //displaying all comments along with the blog
        const AllCommentscomments = blogData.comments
       console.log(AllCommentscomments);
       for(let i=0; i<AllCommentscomments.length; i++){
        const oneComeComment = AllCommentscomments[i];
        console.log(oneComeComment);
        const submittedComment = document.createElement("div");
        submittedComment.className = "submittedComment";
        submittedComment.innerHTML =`
        <div class="comment">
        <div class="commenter">
            <p id="commenterName">${oneComeComment.commenterName} <span class="commentDate">${oneComeComment.date}</span></p>
        </div>
        <div class="commentText">
            <p id="commentText">${oneComeComment.text}</p>
        </div>
    </div>
        `
        document.getElementById("commentContainer").appendChild(submittedComment);
       }
         //total blog comment
        const numberComments = document.getElementById("commentsNumber");
       numberComments.innerText = AllCommentscomments.length;
         //total likes comments
         const numberlikes = document.getElementById("likeNumbers");
         numberlikes.innerText = blogData.likes;
         //total unlikes comments
         const numberUnlikes = document.getElementById("unlikeNumber");
         numberUnlikes.innerText = blogData.dislikes;      

    })
    .catch(err => {
        console.error(err);
    });
    

    //Comments creation
    const sendButton = document.getElementById("send"); 

    sendButton.addEventListener("click", async(event) => {
        event.preventDefault();

        const commenterName = document.getElementById("name").value;
        const commenterEmail = document.getElementById("email").value;
        const CommentText = document.getElementById("ifuza");
        
        let authToken = localStorage.getItem("token");


        if (!authToken) {
            alert("Login to Add your Comment");
            window.location.href = "../html/register.html";
        } else {
            sendButton.disabled = true;
            sendButton.style.backgroundColor = "green";
      
     
    //   console.log(authToken);
    //   console.log(blogId);
    //   console.log(commenterName);
    //   console.log(commenterEmail);
    //   console.log(CommentText.value);
      const commentObject = {
        
        text: CommentText.value,
        commenterName:commenterName,
        commenterEmail:commenterEmail
      }
            await fetch(`https://mybrand-ishimwe-be-halx.onrender.com/api/blogs/${blogId}/comments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`
                },
                body: JSON.stringify(commentObject)
            })
            .then(response => {
                if (!response.ok) {
                    alert();
                } else {
                    alert("Comment Added");
                    sendButton.disabled = false;
                    sendButton.style.backgroundColor = ""; 
                    location.reload(true); //reloading automatically
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert(`ERROR ${error}`);
                sendButton.disabled = false;
                sendButton.style.backgroundColor = ""; 
                
            });
        }
    });
});
document.addEventListener("DOMContentLoaded", (event) => {
    event.preventDefault();
    
    const blogId = getQueryParam('blogId');
    
    // Like functionality
    const likeButton = document.getElementById("like");
    const likeNumbers = document.getElementById("likeNumbers");

    let hasLiked = false;

    likeButton.addEventListener("click", async () => {
        try {
            if (hasLiked) {
                console.error("User has already liked the blog.");
                return;
            }

            const response = await fetch(`https://mybrand-ishimwe-be-halx.onrender.com/api/blogs/${blogId}/likes`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to like the blog: ${response.status}`);
            }

            const result = await response.json();
            const updatedLikeCount = result.data.likes;
            likeNumbers.textContent = updatedLikeCount;

            hasLiked = true;
            likeButton.disabled = true;

        } catch (error) {
            console.error(error);
        }
    });

    // Dislike functionality
    const unLikeButton = document.getElementById("dislike");
    const unLikeNumbers = document.getElementById("dislikeNumbers");

    let hasUnLiked = false;

    unLikeButton.addEventListener("click", async () => {
        try {
            if (hasUnLiked) {
                console.error("User has already disliked the blog.");
                return;
            }

            const response = await fetch(`https://mybrand-ishimwe-be-halx.onrender.com/api/blogs/${blogId}/dislikes`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to dislike the blog: ${response.status}`);
            }

            const result = await response.json();
            const updatedDisLikeCount = result.data.dislikes;
            unLikeNumbers.textContent = updatedDisLikeCount;

            hasUnLiked = true;
            unLikeButton.disabled = true;

        } catch (error) {
            console.error(error);
        }
    });
});




function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}
