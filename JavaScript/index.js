//
    //Nvigation menu
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
});

    //sliding efect

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
    window.addEventListener("load", initSlider);
    document.addEventListener("DOMContentLoaded", function () {
        var blogSlider = document.getElementById("blogSlider");
    
        // Fetch data from the API
        fetch('https://mybrand-ishimwe-be-halx.onrender.com/api/blogs')
            .then(response => response.json())
            .then(data => {
                var storedBlogs = data.data || [];
    
                storedBlogs.forEach(function (blog, index) {
                    var blogContainer = document.createElement("div");
                    blogContainer.classList.add("Eachblog_container");
    
                    blogContainer.innerHTML = `
                        <div class="blog-image"><img src="${blog.imgsrc}" class="blog-img"></div>
                        <div class="bloginfo" id="blogInfo_${index}">
                            <div class="title" id="blogTitle_${index}">${blog.title}</div>
                            <span id="blogDesc_${index}">${blog.desc}</span><br>
                            <span id="learnMore_${index}" style="color: #EAB308; position:relative;top:18px">Learn More </span>;
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
                    learnMoreElement.addEventListener("click", function () {
                        window.location.href = `html/detailedView.html?blogId=${blog._id}`;
                    });
                });
            })
            .catch(error => console.error('Error fetching data:', error));
    
        
    });
    