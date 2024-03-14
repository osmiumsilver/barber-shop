// Get the button


let dropdownElements = [];
let openDropdown = null;

function handleResize() {
    const windowWidth = window.innerWidth;

    // Remove existing event listeners
    dropdownElements.forEach(dropdownElement => {
        const dropdownLink = dropdownElement.querySelector('a');
        const dropdownMenu = dropdownElement.querySelector('.dropdown');

        if (dropdownMenu) {
            dropdownLink.removeEventListener('click', toggleDropdownMenu);
        }
    });

    // Reset dropdownElements array
    dropdownElements = [];

    if (windowWidth >= 200 && windowWidth <= 1024) {
        // Add event listeners within the breakpoint range
        const menuItems = document.querySelectorAll('.menu > li');

        menuItems.forEach(menuItem => {
            const dropdownLink = menuItem.querySelector('a');
            const dropdownMenu = menuItem.querySelector('.dropdown');

            if (dropdownMenu) {
                dropdownLink.addEventListener('click', toggleDropdownMenu);
                dropdownElements.push(menuItem);
            }
        });
    }
}

function toggleDropdownMenu(event) {
    const dropdownMenu = event.currentTarget.parentElement.querySelector('.dropdown');

    // Close any open dropdown menu
    if (openDropdown && openDropdown !== dropdownMenu) {
        toggleDisplayStyle(openDropdown);
    }

    toggleDisplayStyle(dropdownMenu);
    openDropdown = dropdownMenu.style.display === 'none' ? null : dropdownMenu;
    event.preventDefault(); // Prevent the link from navigating
}

function toggleDisplayStyle(element) {
    if (element.style.display === 'none' || element.style.display === '') {
        element.style.setProperty('display', 'block', 'important');
    } else {
        element.style.display = 'none';
    }
}

window.addEventListener('resize', handleResize);
handleResize(); // Initialize on page load



let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
    scrollFunction()
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}