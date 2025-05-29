// JavaScript for Mobile Menu Toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        // Optional: Change hamburger icon to close icon
        const icon = mobileMenuButton.querySelector('svg path');
        if (mobileMenu.classList.contains('active')) {
            icon.setAttribute('d', 'M6 18L18 6M6 6l12 12'); // Close icon
        } else {
            icon.setAttribute('d', 'M4 6h16M4 12h16m-4 6h4'); // Hamburger icon
        }
    });

    // Close mobile menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            mobileMenuButton.querySelector('svg path').setAttribute('d', 'M4 6h16M4 12h16m-4 6h4'); // Reset icon
        });
    });
}

// JavaScript for Smooth Scrolling and Active Nav Link Highlighting
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    // Function to add/remove active class based on scroll position
    const highlightNavLink = () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; // Adjust for fixed header
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    };

    // Add event listeners for scroll and click
    window.addEventListener('scroll', highlightNavLink);
    // Initial call to set active link on page load
    highlightNavLink();

    // Smooth scroll for all internal anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                // Calculate offset to account for fixed header
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
});
