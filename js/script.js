const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        const icon = mobileMenuButton.querySelector('svg path');
        if (mobileMenu.classList.contains('active')) {
            icon.setAttribute('d', 'M6 18L18 6M6 6l12 12');
        } else {
            icon.setAttribute('d', 'M4 6h16M4 12h16m-4 6h4');
        }
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            mobileMenuButton.querySelector('svg path').setAttribute('d', 'M4 6h16M4 12h16m-4 6h4');
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    const highlightNavLink = () => {
        const currentPath = window.location.pathname.split('/').pop();

        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkHref = link.getAttribute('href');

            if (currentPath === '' || currentPath === 'index.html') {
                if (linkHref === 'index.html' || linkHref === '#home') {
                    link.classList.add('active');
                }
                let currentSectionId = '';
                sections.forEach(section => {
                    if (section.closest('main')) {
                        const sectionTop = section.offsetTop - 100;
                        const sectionHeight = section.clientHeight;
                        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                            currentSectionId = section.getAttribute('id');
                        }
                    }
                });
                if (linkHref.includes(currentSectionId) && currentSectionId !== '') {
                    link.classList.add('active');
                }

            } else if (linkHref.includes(currentPath)) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', highlightNavLink);
    highlightNavLink();

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const headerOffset = document.querySelector('header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

//cloud animation
    // const cloudElement = document.getElementById('animated-cloud');

    // function animateCloud() {
    //     if (!cloudElement) return;

    //     // Reset to initial off-screen, hidden state
    //     cloudElement.style.opacity = '0';
    //     cloudElement.style.transform = 'translateX(0)'; // Assuming it starts off-screen to the left

    //     // Start animation after a short delay
    //     setTimeout(() => {
    //         // Fade in and move across the screen
    //         cloudElement.style.opacity = '1';
    //         // Move across the entire width of the viewport plus a bit more
    //         const viewportWidth = window.innerWidth;
    //         cloudElement.style.transform = `translateX(${viewportWidth + 200}px)`; // Move past the right edge

    //         // Optional: Hide and reset after it goes off-screen
    //         setTimeout(() => {
    //             cloudElement.style.opacity = '0';
    //             cloudElement.style.transform = 'translateX(0)'; // Reset position for next loop
    //         }, 10000); // Matches the transform transition time
    //     }, 1000); // Initial delay before starting the first animation

    // }

    // // Call the animation on page load
    // animateCloud();

    // // To make it loop continuously, set an interval for re-triggering the animation
    // setInterval(animateCloud, 12000); // Adjust this time based on animation duration and desired pause
});