// toggle sidebar
const sidebarCloseButton = document.querySelector("#close-sidebar-mobile");
const sidebarOpenButton = document.querySelector("#open-sidebar-mobile");
const sidebar = document.querySelector("#sidebar");

sidebarOpenButton.addEventListener("click", () => {
    sidebar.classList.remove("hidden");
})

sidebarCloseButton.addEventListener("click", () => {
    sidebar.classList.add("hidden");
})