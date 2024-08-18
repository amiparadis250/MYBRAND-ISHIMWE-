function Comments() {
    const useState = React.useState;
    const useEffect = React.useEffect;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [messageError, setMessageError] = useState('');
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogData = async () => {
            try {
                const blogId = getQueryParam('blogId');
                const response = await fetch(`https://mybrand-ishimwe-be-halx.onrender.com/api/blogs/${blogId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch blog data');
                }
                const data = await response.json();
                const blogData = data.data;
                document.getElementById("blogTextContent").innerHTML = blogData.content;
                document.getElementById("blogImage").src = blogData.imgsrc;
                document.getElementById("blogTitle").innerText = blogData.title;

                // Set comments state
                setComments(blogData.comments);
            } catch (error) {
                alert(error.message); 
            } finally {
                setLoading(false);
            }
        };

        fetchBlogData();
    }, []);

    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);

        // Real-time validation
        if (value.trim() === '') {
            setNameError('Name is required');
        } else if (!/^[a-zA-Z ]+$/.test(value)) {
            setNameError('Name should only contain letters and spaces');
        } else {
            setNameError('');
        }
    };

    const handleEmailChange = (event) => {
        const value = event.target.value;
        setEmail(value);

        // Real-time validation
        if (value.trim() === '') {
            setEmailError('Email is required');
        } else if (!/\S+@\S+\.\S+/.test(value)) {
            setEmailError('Invalid email format');
        } else {
            setEmailError('');
        }
    };

    const handleMessageChange = (event) => {
        const value = event.target.value;
        setMessage(value);

        // Real-time validation
        if (value.trim() === '') {
            setMessageError('Message is required');
        } else {
            setMessageError('');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Reset previous errors
        setNameError('');
        setEmailError('');
        setMessageError('');

        // Validation
        let isValid = true;
        if (name.trim() === '') {
            setNameError('Name is required');
            isValid = false;
        } else if (!/^[a-zA-Z ]+$/.test(name)) {
            setNameError('Name should only contain letters and spaces');
            isValid = false;
        }
        if (email.trim() === '') {
            setEmailError('Email is required');
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError('Invalid email format');
            isValid = false;
        }
        if (message.trim() === '') {
            setMessageError('Message is required');
            isValid = false;
        }

        // If all fields are valid, proceed with submission
        if (isValid) {
            try {
                const blogId = getQueryParam('blogId');
                const authToken = localStorage.getItem("token");
                const commentObject = {
                    text: message,
                    commenterName: name,
                    commenterEmail: email
                };

                const response = await fetch(`https://mybrand-ishimwe-be-halx.onrender.com/api/blogs/${blogId}/comments`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${authToken}`
                    },
                    body: JSON.stringify(commentObject)
                });

                if (!response.ok) {
                    throw new Error('Failed to add comment');
                }

                // Clear form fields after successful submission
                setName('');
                setEmail('');
                setMessage('');

                // Reload comments after posting a new comment
                setLoading(true);
                const updatedResponse = await fetch(`https://mybrand-ishimwe-be-halx.onrender.com/api/blogs/${blogId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                if (!updatedResponse.ok) {
                    throw new Error('Failed to fetch updated blog data');
                }
                const updatedData = await updatedResponse.json();
                setComments(updatedData.data.comments);
            } catch (error) {
                alert(error.message); // Show error in alert
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="contact" id="contact">
            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <p style={{ paddingBottom: '10px', fontSize: '20px' }}>Leave Message or Comment?</p>
                    <form id="commentForm" onSubmit={handleSubmit}>
                        <small style={{ color: 'red', fontSize: '1.2em' }}>{nameError}</small>
                        <p><input id="name" type="text" placeholder="Name" value={name} onChange={handleNameChange} /><br/></p>
                        <small style={{ color: 'red', fontSize: '1.2em' }}>{emailError}</small>
                        <p><input id="email" type="text" placeholder="Email" value={email} onChange={handleEmailChange} /><br/></p>
                        <small style={{ color: 'red', fontSize: '1.2em' }}>{messageError}</small>
                        <p><textarea id="ifuza" rows="10" cols="50" placeholder="Enter your message" value={message} onChange={handleMessageChange}></textarea><br/></p>
                        <button id="send" type="submit" style={{ backgroundColor: '#EAB308' }}>
                            <span id="commentsWord">Send</span>
                        </button>
                    </form>
                    <div id="commentContainer">
                        {comments.map((comment, index) => (
                            <div key={index} className="submittedComment">
                                <div className="comment">
                                    <div className="commenter">
                                        <p id="commenterName">{comment.commenterName} <span className="commentDate">{comment.date}</span></p>
                                    </div>
                                    <div className="commentText">
                                        <p id="commentText">{comment.text}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

ReactDOM.render(<Comments />, document.getElementById('comments'));
