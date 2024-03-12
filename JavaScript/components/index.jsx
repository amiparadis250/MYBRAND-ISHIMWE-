
function BlogsContainer() {
    const useState = React.useState;
    const useEffect = React.useEffect;

    const [blogs, setBlogs] = useState([]);


    useEffect(() => {
        fetchBlogs();
    }, []);

    function fetchBlogs() {
        window.addEventListener("load", initSlider);
        fetch('https://mybrand-ishimwe-be-halx.onrender.com/api/blogs')
            .then(response => response.json())
            .then(data => {
                const storedBlogs = data.data || [];
                setBlogs(storedBlogs);
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    return (
        <div className="blogs">
            <div className="blogscontainer" id="blogs">
                <div className="blogtitle">Blogs</div>
                <p>
                    Tech Tales: A Full-Stack Developer's Insights. Explore my journey,
                    coding wisdom, and innovative solutions in a concise and engaging format.
                    Stay on track of release of new latest technologies
                </p>

                <div className="superdiv">
                    <div className="superdiv2">
                        <button id="left" className="helper">left</button>
                        <div className="bloglist" id="blogSlider">
                            {blogs.map((blog, index) => (
                                <div key={index} className="Eachblog_container">
                                    <div className="blog-image">
                                        <img src={blog.imgsrc} className="blog-img" alt=""/>
                                    </div>
                                    <div className="bloginfo" id={`blogInfo_${index}`}>
                                        <div className="title" id={`blogTitle_${index}`}>{blog.title}</div>
                                        <span id={`blogDesc_${index}`}>{blog.desc}</span><br />
                                        <span id={`learnMore_${index}`} style={{ color: '#EAB308', position: 'relative', top: '18px' }}>Learn More</span>;
                                        <div className="blogicons" id={`blogIcons_${index}`}>
                                            <span id={`thumbsUp_${index}`}><i className="fa-solid fa-thumbs-up"></i></span>
                                            <span id={`comment_${index}`}><i className="fa-solid fa-comment"></i></span>
                                            <span id={`eye_${index}`}><i className="fa-solid fa-eye"></i></span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button id="right" className="helper">right</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

ReactDOM.render(<BlogsContainer />, document.getElementById("blog-container"));
