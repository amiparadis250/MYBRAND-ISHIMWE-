

function Feedback() {
    const useState = React.useState;
    const useEffect = React.useEffect;
    const [blogData, setBlogData] = useState(null);
    const [numberLikes, setNumberLikes] = useState(0);
    const [numberUnlikes, setNumberUnlikes] = useState(0);
    const [likeColor, setLikeColor] = useState('');
    const [dislikeColor, setDislikeColor] = useState('');

    useEffect(() => {
        // Fetch blog data
        const fetchBlogData = async () => {
            try {
                const response = await fetchBlog();
                setBlogData(response.data);
                setNumberLikes(response.data.likes);
                setNumberUnlikes(response.data.dislikes);
            } catch (error) {
                console.error('Error fetching blog data:', error);
            }
        };
        fetchBlogData();
    }, []);

    const fetchBlog = async () => {
        const blogId = getQueryParam('blogId');
        const url = `https://mybrand-ishimwe-be-halx.onrender.com/api/blogs/${blogId}`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch blog data');
        }
        return await response.json();
    };

    const handleLike = async () => {
        if (likeColor !== 'blue') {
            try {
                const response = await fetchLike();
                setNumberLikes(response.data.likes);
                setLikeColor('blue');
                setDislikeColor('#EAB308');
            } catch (error) {
                console.error('Error liking the post:', error);
            }
        } else {
            handleUnlike();
        }
    };

    const fetchLike = async () => {
        const blogId = getQueryParam('blogId');
        const url = `https://mybrand-ishimwe-be-halx.onrender.com/api/blogs/${blogId}/likes`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        });
        if (!response.ok) {
            throw new Error('Failed to like the post');
        }
        return await response.json();
    };

    const handleUnlike = async () => {
        try {
            const response = await fetchUnlike();
            setNumberLikes(response.data.likes);
            setLikeColor('#EAB308');
        } catch (error) {
            console.error('Error unliking the post:', error);
        }
    };

    const fetchUnlike = async () => {
        const blogId = getQueryParam('blogId');
        const url = `https://mybrand-ishimwe-be-halx.onrender.com/api/blogs/${blogId}/likes`;
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        });
        if (!response.ok) {
            throw new Error('Failed to unlike the post');
        }
        return await response.json();
    };

    const handleDislike = async () => {
        if (dislikeColor !== 'blue') {
            try {
                const response = await fetchDislike();
                setNumberUnlikes(response.data.dislikes);
                setDislikeColor('blue');
                setLikeColor('#EAB308');
            } catch (error) {
                console.error('Error disliking the post:', error);
            }
        } else {
            handleRemoveDislike();
        }
    };

    const fetchDislike = async () => {
        const blogId = getQueryParam('blogId');
        const url = `https://mybrand-ishimwe-be-halx.onrender.com/api/blogs/${blogId}/dislikes`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        });
        if (!response.ok) {
            throw new Error('Failed to dislike the post');
        }
        return await response.json();
    };

    const handleRemoveDislike = async () => {
        try {
            const response = await fetchRemoveDislike();
            setNumberUnlikes(response.data.dislikes);
            setDislikeColor('#EAB308');
        } catch (error) {
            console.error('Error removing dislike from the post:', error);
        }
    };

    const fetchRemoveDislike = async () => {
        const blogId = getQueryParam('blogId');
        const url = `https://mybrand-ishimwe-be-halx.onrender.com/api/blogs/${blogId}/dislikes`;
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        });
        if (!response.ok) {
            throw new Error('Failed to remove dislike from the post');
        }
        return await response.json();
    };

    // Function to get query parameters
    function getQueryParam(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    return (
        <div className="feedback">
            <p>Is this article helpful 
                <div className="rates">
                    <i className="fas fa-thumbs-up" id="like" style={{ color: likeColor, cursor: 'pointer' }} onClick={handleLike}>
                        <sup id="likeNumbers" style={{ color: 'white', fontSize: '13px' }}>{numberLikes}</sup>
                    </i>
                    <i className="fas fa-thumbs-down" id="dislike" style={{ color: dislikeColor, cursor: 'pointer' }} onClick={handleDislike}>
                        <sup id="dislikeNumbers" style={{ color: 'white', fontSize: '13px' }}>{numberUnlikes}</sup>
                    </i>
                </div>
            </p>
        </div>
    );
}

// Render the Feedback component
ReactDOM.render(<Feedback />, document.getElementById("feedback"));
