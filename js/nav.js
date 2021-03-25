// Function to slide the navbar on click
const navslide = () => {
    // call elements
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".navlinks");
    const navlinks = document.querySelectorAll(".navlinks li");
    const clip=document.getElementById("social")
    // toggle nav
    burger.addEventListener("click", () => {
        nav.classList.toggle("nav-active");
        clip.classList.toggle("nav-clip");
        // animate links
        navlinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = ""
            }
            else {
                link.style.animation = `navlinkfade 0.5s ease forwards ${index / 7 + 0.5}s`
            }
        })
        //burger icon change
        burger.classList.toggle("toggle");
    })
};
navslide();