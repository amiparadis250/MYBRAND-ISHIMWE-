const hamMenu = document.querySelector('.ham-menu');
const navMenuu = document.querySelector('navigation-menu');  
hamMenu.addEventListener('click', () => {
    hamMenu.classList.toggle('active');
    navMenuu.classList.toggle('active'); 
});



