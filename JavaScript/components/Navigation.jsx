function Navigation() {
    return (
        <div className="navigation">
            <div className="logo">About<span>Me</span></div>
            <div className="navlinks">
                <a href="#">Programming</a>
                <a href="#">Ecommerce</a>
                <a href="#">Data analytics</a>
                <a href="#">Trends</a>
                <a href="#">Home</a>
            </div>
            <div className="menuicon" style={{ display: 'none' }}><i className="fa-solid fa-bars"></i></div>
        </div>
    );
}

ReactDOM.render(<Navigation />, document.getElementById("navigation"))