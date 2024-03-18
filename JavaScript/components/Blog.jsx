// Blog.js
function Blog() {
    return (
        <div className="blog">
            <div className="newstitle">
                <p id="blogTitle"></p>
                <p id="author">by Ami Paradis</p>
                <span id="blogDate" style={{ color: 'blue' }}></span>
            </div>
            <img id="blogImage" alt="" width="70%" />
            <div id="blogTextContent"></div>
        </div>
    );
}

ReactDOM.render(<Blog />, document.getElementById("blog"));
