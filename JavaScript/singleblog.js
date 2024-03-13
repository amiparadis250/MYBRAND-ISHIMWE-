
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
      

       //liking functionality
         const numberlikes = document.getElementById("likeNumbers");
         numberlikes.innerText = blogData.likes;
         const numberUnlikes = document.getElementById("dislikeNumbers");
         numberUnlikes.innerText = blogData.dislikes;  
         const likeButton = document.getElementById("like");
         const unlikeButton = document.getElementById("dislike");
        //  likeButton.addEventListener("click", (event) => {
        //     event.preventDefault();
        //     if (likeButton.style.color !== "blue") {
        //         fetch(`https://mybrand-ishimwe-be-halx.onrender.com/api/blogs/${blogId}/likes`, {
        //             method: "POST",
        //             headers: {
        //                 "Content-Type": "application/json",
        //             }
        //         }).then(response => response.json())
        //         .then(data => {
        //             const updatedLikes = data.data.likes;
        //             numberlikes.innerText = updatedLikes;
        //             likeButton.style.color = "blue";
        //         });
        //     } else if(likeButton.style.color === "blue"){
        //         fetch(`https://mybrand-ishimwe-be-halx.onrender.com/api/blogs/${blogId}/likes`, {
        //             method: "DELETE",
        //             headers: {
        //                 "Content-Type": "application/json",
        //             }
        //         }).then(response => response.json())
        //         .then(data => {
        //             const updatedLikes = data.data.likes;
        //             numberlikes.innerText = updatedLikes;
        //             likeButton.style.color = "#EAB308";
        //         });
        //     }
        //     else if(unlikeButton.style.color === "blue"){
        //         fetch(`https://mybrand-ishimwe-be-halx.onrender.com/api/blogs/${blogId}/dislikes`, {
        //             method: "DELETE",
        //             headers: {
        //                 "Content-Type": "application/json",
        //             }
        //         }).then(response => response.json())
        //       .then(data => {
        //         const updateddisLikes = data.data.dislikes;
        //         numberUnlikes.innerText = updateddisLikes;
        //         unlikeButton.style.color = "#EAB308";
        //         likeButton.style.color ="blue";
        //     fetch(`https://mybrand-ishimwe-be-halx.onrender.com/api/blogs/${blogId}/likes`,{
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //         }
        //     })

        //       })

        //     }
        // });
        // unlikeButton.addEventListener("click", (event) => {
        //     event.preventDefault();
        //     if (unlikeButton.style.color!== "blue") {
        //         fetch(`https://mybrand-ishimwe-be-halx.onrender.com/api/blogs/${blogId}/dislikes`, {
        //             method: "POST",
        //             headers: {
        //                 "Content-Type": "application/json",
        //             }
        //         }).then(response => response.json())
        //       .then(data => {
        //         const updateddisLikes = data.data.dislikes;
        //         numberUnlikes.innerText = updateddisLikes;
        //         unlikeButton.style.color = "blue";
        //         likeButton.style.color ="#EAB308";
        //       })
        //     }
        //     else if(unlikeButton.style.color === "blue"){
        //         fetch(`https://mybrand-ishimwe-be-halx.onrender.com/api/blogs/${blogId}/dislikes`, {
        //             method: "DELETE",
        //             headers: {
        //                 "Content-Type": "application/json",
        //             }
        //         }).then(response => response.json())
        //     .then(data => {
        //         const updateddisLikes = data.data.dislikes;
        //         numberUnlikes.innerText = updateddisLikes;
        //         unlikeButton.style.color = "#EAB308";
                
        //     })
        // }
        // else if(likeButton.style.color === "blue"){
        //     fetch(`https://mybrand-ishimwe-be-halx.onrender.com/api/blogs/${blogId}/likes`,{
        //         method: "DELETE",
        //         headers: {
        //             "Content-Type": "application/json",
        //         }
        //     }).
        //     then(response => response.json())
        //     .then(data =>{
        //         const updatedLikes = data.data.likes;
        //         numberlikes.innerText = (updatedLikes-1);
        //         likeButton.style.color = "#EAB308";
        //     })
        //     fetch(`https://mybrand-ishimwe-be-halx.onrender.com/api/blogs/${blogId}/dislikes`,{
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //         }

        //     })
        //     .then(responce=>responce.json())
        //     .then(data=>{
        //         const updateddisLikes = data.data.dislikes;
        //         numberUnlikes.innerText = updateddisLikes;
        //         unlikeButton.style.color = "blue";
        //         likeButton.style.color ="#EAB308";
                

        //     })

        //     }

        // }
        // )
        // likeButton.addEventListener("click", (event) => {
        //     event.preventDefault();
        //     if (likeButton.style.color !== "blue") {
        //         // Like the post
        //         fetch(`https://mybrand-ishimwe-be-halx.onrender.com/api/blogs/${blogId}/likes`, {
        //             method: "POST",
        //             headers: {
        //                 "Content-Type": "application/json",
        //             }
        //         }).then(response => response.json())
        //           .then(data => {
        //             const updatedLikes = data.data.likes;
        //             numberlikes.innerText = updatedLikes;
        //             likeButton.style.color = "blue";
        //             unlikeButton.style.color = "#EAB308"; // Remove dislike color
        //             if (unlikeButton.style.color === "blue") {
        //                 // If dislike was already selected, remove it
        //                 fetch(`https://mybrand-ishimwe-be-halx.onrender.com/api/blogs/${blogId}/dislikes`, {
        //                     method: "DELETE",
        //                     headers: {
        //                         "Content-Type": "application/json",
        //                     }
        //                 }).then(response => response.json())
        //                   .then(data => {
        //                     const updatedDislikes = data.data.dislikes;
        //                     numberUnlikes.innerText = updatedDislikes;
        //                     unlikeButton.style.color = "#EAB308";
        //                 });
        //             }
        //         });
        //     } else {
        //         // Unlike the post
        //         fetch(`https://mybrand-ishimwe-be-halx.onrender.com/api/blogs/${blogId}/likes`, {
        //             method: "DELETE",
        //             headers: {
        //                 "Content-Type": "application/json",
        //             }
        //         }).then(response => response.json())
        //           .then(data => {
        //             const updatedLikes = data.data.likes;
        //             numberlikes.innerText = updatedLikes;
        //             likeButton.style.color = "#EAB308";
        //         });
        //     }
        // });
        
        // unlikeButton.addEventListener("click", (event) => {
        //     event.preventDefault();
        //     if (unlikeButton.style.color !== "blue") {
        //         // Dislike the post
        //         fetch(`https://mybrand-ishimwe-be-halx.onrender.com/api/blogs/${blogId}/dislikes`, {
        //             method: "POST",
        //             headers: {
        //                 "Content-Type": "application/json",
        //             }
        //         }).then(response => response.json())
        //           .then(data => {
        //             const updateddisLikes = data.data.dislikes;
        //             numberUnlikes.innerText = updateddisLikes;
        //             unlikeButton.style.color = "blue";
        //             likeButton.style.color = "#EAB308"; // Remove like color
        //             if (likeButton.style.color === "blue") {
        //                 // If like was already selected, remove it
        //                 fetch(`https://mybrand-ishimwe-be-halx.onrender.com/api/blogs/${blogId}/likes`, {
        //                     method: "DELETE",
        //                     headers: {
        //                         "Content-Type": "application/json",
        //                     }
        //                 }).then(response => response.json())
        //                   .then(data => {
        //                     const updatedLikes = data.data.likes;
        //                     numberlikes.innerText = updatedLikes;
        //                     likeButton.style.color = "#EAB308";
        //                 });
        //             }
        //         });
        //     } else {
        //         // Remove dislike
        //         fetch(`https://mybrand-ishimwe-be-halx.onrender.com/api/blogs/${blogId}/dislikes`, {
        //             method: "DELETE",
        //             headers: {
        //                 "Content-Type": "application/json",
        //             }
        //         }).then(response => response.json())
        //           .then(data => {
        //             const updateddisLikes = data.data.dislikes;
        //             numberUnlikes.innerText = updateddisLikes;
        //             unlikeButton.style.color = "#EAB308";
        //         });
        //     }
        // });
        likeButton.addEventListener("click", (event) => {
            event.preventDefault();
            if (unlikeButton.style.color === "blue") {
                // Remove dislike first
                removeDislike();
                likePost();
            } else {
                // Directly like the post
                likePost();
            }
        });
        
        function likePost() {
            if (likeButton.style.color !== "blue") {
                // Like the post
                fetch(`https://mybrand-ishimwe-be-halx.onrender.com/api/blogs/${blogId}/likes`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    }
                }).then(response => response.json())
                  .then(data => {
                    const updatedLikes = data.data.likes;
                    numberlikes.innerText = updatedLikes;
                    likeButton.style.color = "blue";
                    unlikeButton.style.color = "#EAB308"; // Remove dislike color
                })
                .catch(error => console.error('Error:', error));
            } else {
                // Unlike the post
                unlikePost();
            }
        }
        
        function unlikePost() {
            fetch(`https://mybrand-ishimwe-be-halx.onrender.com/api/blogs/${blogId}/likes`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                }
            }).then(response => response.json())
              .then(data => {
                const updatedLikes = data.data.likes;
                numberlikes.innerText = updatedLikes;
                likeButton.style.color = "#EAB308";
            })
            .catch(error => console.error('Error:', error));
        }
        
        unlikeButton.addEventListener("click", (event) => {
            event.preventDefault();
            if (likeButton.style.color === "blue") {
                // Remove like first
                removeLike();
            } else {
                // Directly dislike the post
                dislikePost();
            }
        });
        
        function removeLike() {
            fetch(`https://mybrand-ishimwe-be-halx.onrender.com/api/blogs/${blogId}/likes`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                }
            }).then(response => response.json())
              .then(data => {
                const updatedLikes = data.data.likes;
                numberlikes.innerText = updatedLikes;
                likeButton.style.color = "#EAB308";
                dislikePost();
            })
            .catch(error => console.error('Error:', error));
        }
        
        function dislikePost() {
            if (unlikeButton.style.color !== "blue") {
                // Dislike the post
                fetch(`https://mybrand-ishimwe-be-halx.onrender.com/api/blogs/${blogId}/dislikes`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    }
                }).then(response => response.json())
                  .then(data => {
                    const updateddisLikes = data.data.dislikes;
                    numberUnlikes.innerText = updateddisLikes;
                    unlikeButton.style.color = "blue";
                    likeButton.style.color = "#EAB308"; // Remove like color
                })
                .catch(error => console.error('Error:', error));
            } else {
                // Remove dislike
                removeDislike();
            }
        }
        
        function removeDislike() {
            fetch(`https://mybrand-ishimwe-be-halx.onrender.com/api/blogs/${blogId}/dislikes`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                }
            }).then(response => response.json())
              .then(data => {
                const updateddisLikes = data.data.dislikes;
                numberUnlikes.innerText = updateddisLikes;
                unlikeButton.style.color = "#EAB308";
            })
            .catch(error => console.error('Error:', error));
        }
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
});
function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}




