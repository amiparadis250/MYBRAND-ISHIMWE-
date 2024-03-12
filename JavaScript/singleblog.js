
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
      
         const numberlikes = document.getElementById("likeNumbers");
         numberlikes.innerText = blogData.likes;
         //total unlikes comments
         const numberUnlikes = document.getElementById("dislikeNumbers");
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

            sendButton.disabled = true;
            
      
     
    //   console.log(authToken);
    //   console.log(blogId);
    //   console.log(commenterName);
    //   console.log(commenterEmail);
    //   console.log(CommentText.value);
      const commentObject = {
        
        text: CommentText.value,
        commenterName:commenterName,
        commenterEmail:commenterEmail
      
      };
      const loader = document.getElementById("loader");
      loader.style.display = "block";
      const commentsWord = document.getElementById("commentsWord");
      commentsWord.style.display = "none";
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
                    alert("Failed to add comment");
                    loader.style.display = "none";
                    commentsWord.style.display = "inline";
                } else {
                    loader.style.display = "none";
                  commentsWord.style.display = "inline";
                    alert("Comment Added");
                    sendButton.disabled = false;
                    location.reload(true); 
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert(`ERROR ${error}`);
                sendButton.disabled = false;
                sendButton.style.backgroundColor = ""; 
                
            })
        });
    });

document.addEventListener("DOMContentLoaded", (event) => {
    event.preventDefault();
    
    const blogId = getQueryParam('blogId');
    
    // Like functionality
const likeButton = document.getElementById("like");
const likeNumbers = document.getElementById("likeNumbers");



likeButton.addEventListener("click", async (event) => {
    event.preventDefault();
    

    try {
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
        likeButton.style.color ="blue";

        

    } catch (error) {
        console.error(error);
    }
});

// Dislike functionality
const unLikeButton = document.getElementById("dislike");
const unLikeNumbers = document.getElementById("dislikeNumbers");


unLikeButton.addEventListener("click", async (event) => {
    event.preventDefault();
    
   

    try {
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
        unLikeButton.style.color ="blue";
        const updatedDisLikeCount = result.data.dislikes;
        unLikeNumbers.textContent = updatedDisLikeCount;
       

        
       

    } catch (error) {
        console.error(error);
    }
});
});



function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}
