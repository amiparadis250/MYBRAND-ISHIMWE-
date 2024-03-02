
    function validateForm() {
        var name = document.getElementById('name').value;

        // Reset error message
        document.getElementById('nameError').innerHTML = '';

        // Validate Name
        if (name === '') {
            document.getElementById('nameError').innerHTML = 'Name is required';
            return false;
        } else if (/[\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(name)) {
            document.getElementById('nameError').innerHTML = 'Name cannot contain numbers or special characters';
            return false;
        }

        return true;
    }
document.addEventListener('DOMContentLoaded', function () {
  var menuIcon = document.querySelector('.menuicon');
  var navMenu = document.querySelector('.navigation-menu');
  var navLinks = document.querySelectorAll('.navigation-menu a');

  function scrollToSection(target) {
    var targetElement = document.getElementById(target);

    if (targetElement) {
      var offsetTop = targetElement.offsetTop;

      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  }

  menuIcon.addEventListener('click', function () {
    navMenu.classList.toggle('active');
  });

  navLinks.forEach(function (link) {
    link.addEventListener('click', function (event) {
      event.preventDefault();

      var targetSection = link.getAttribute('href').substring(1);
      scrollToSection(targetSection);

      navMenu.classList.remove('active');
    });
  });
});
    const initSlider = () => {
        var bloglist = document.getElementById("blogSlider");
        var slideButtons = document.querySelectorAll(".helper");
    
        console.log(slideButtons);
    
        slideButtons.forEach(button => {
            console.log(button.id);
            button.addEventListener("click", () => {
                const direction = button.id === "left" ? -1 : 1;
                const scrollAmount = bloglist.clientWidth * direction;
    
                bloglist.scrollBy({ left: scrollAmount, behavior: "smooth" });
                console.log(bloglist.clientWidth);
            });
        });
    
        const handleSlideButtons = () => {
            slideButtons[0].style.display = "block";
    slideButtons[1].style.display = "block";
        };
        const getMaxScrollLeft = () => {
            const blogContainers = document.querySelectorAll(".Eachblog_container");
            const totalWidth = Array.from(blogContainers).reduce((acc, container) => acc + container.offsetWidth, 0);
            return totalWidth - bloglist.clientWidth;
        };
    
        bloglist.addEventListener("scroll", () => {
            handleSlideButtons();
        });
    
        // Set the initial scrollLeft after elements have loaded
        setTimeout(() => {
            bloglist.scrollLeft = 0;
            handleSlideButtons();
        }, 0);
    };
    
    window.addEventListener("load", initSlider);
document.addEventListener("DOMContentLoaded", function () {
    var storedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
    var blogSlider = document.getElementById("blogSlider");

    storedBlogs.forEach(function(blog, index) {
        var blogContainer = document.createElement("div");
        blogContainer.classList.add("Eachblog_container");

        blogContainer.innerHTML = `
            <div class="blog-image"><img src="${blog.image}" class="blog-img"></div>
            <div class="bloginfo" id="blogInfo_${index}">
                <div class="title" id="blogTitle_${index}">${blog.title}</div>
                <span id="blogDesc_${index}">${blog.desc}</span><br>
                <span id="learnMore_${index}" id="t" style="color: #EAB308; position:relative;top:18px">Learn More </span>;
                  <div class="blogicons" id="blogIcons_${index}">
                    <span id="thumbsUp_${index}"><i class="fa-solid fa-thumbs-up"></i></span>
                    <span id="comment_${index}"><i class="fa-solid fa-comment"></i></span>
                    <span id="eye_${index}"><i class="fa-solid fa-eye"></i></span>
                </div>
            </div>
        `;

        blogSlider.appendChild(blogContainer);
       
        // Add click event listener for "Learn More" to navigate to detailed view
        var learnMoreElement = document.getElementById(`learnMore_${index}`);
        learnMoreElement.addEventListener("click", function() {
            window.location.href = `detailedView.html?blogId=${index}`;
        });
    });

    document.getElementById("clearLocalStorage").addEventListener("click", function() {
        localStorage.clear();
        alert("LocalStorage cleared!");
    });
});