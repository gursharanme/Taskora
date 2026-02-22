document.addEventListener("click", function (e) {
    const button = e.target.closest(".more-options-btn");

    // Close all dropdowns first
    document.querySelectorAll(".dropdown-menu").forEach(menu => {
        if (!menu.contains(e.target)) {
            menu.classList.add("hidden");
        }
    });

    // If button clicked → toggle its menu
    if (button) {
        const menu = button.parentElement.querySelector(".dropdown-menu");
        menu.classList.toggle("hidden");
    }
});