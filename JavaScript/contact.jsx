function ContactPage() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const successMessage = document.getElementById('successMessage');
        successMessage.style.display = 'block';
    };

    return (
        <div className="contactpage">
            <div className="contactHeader">
                <div className="title1">Contact <span>Me</span></div>
                <p>Kindly take your Handset, call me or drop me an email, I will be happy to reach out to you</p>
            </div>
            <div className="contactcontainer">
                <div className="adress">
                    <p><span>Address _</span> Nyarugenge, Kigali, Rwanda</p>
                    <p><span>Phone _ </span>+250791966291</p>
                    <p><span>Email _</span> pishimweaime7@gmail.com</p>
                    <p><span>Website _</span> www.abc.aboutme.com</p>
                </div>
                <div className="contact" id="contact">
                    <form id="myForm" onSubmit={handleSubmit}>
                        <input id="name" type="text" placeholder="Name" /><br />
                        <span id="nameError" className="error-message"></span><br />
                        <input id="email" type="text" placeholder="Email" /><br />
                        <span id="emailError" className="error-message"></span><br />
                        <textarea id="message" rows="5" cols="40" placeholder="Enter your message"></textarea><br />
                        <button type="submit" id="sendButton"><span id="contactKeyword">Contact Us</span></button>
                        <span id="successMessage" style={{ display: 'none', color: 'green' }}>Message sent successfully!</span>
                    </form>
                </div>
            </div>
        </div>
    );
}
ReactDOM.render(<ContactPage />, document.getElementById("root_contact"))

