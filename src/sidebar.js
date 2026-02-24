// Getting current url
const lastURLElement = window.location.pathname;


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

// const navigation links
const sideNavLinks = [
    {
        title: "Dashboard",
        url: "/",
        path: ["m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"]
    },
    {
        title: "Tasks",
        url: "/tasks.html",
        path: ["M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122"]
    },
];

const sideNavLinksComponent = document.createElement("ul");
sideNavLinksComponent.classList.add("flex", "flex-col", "gap-1.5")
sideNavLinksComponent.innerHTML = `
${sideNavLinks.map((link, index) => (
    `<li key=${index}>
        <a
            href=${link.url}
            class="flex items-center gap-2 py-2 px-3 rounded-md transition-colors duration-200 ease-in-out ${lastURLElement === link.url ? "bg-blue-500 hover:bg-blue-600 text-white" : "hover:bg-blue-500/10 text-black"}"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-5"
            >
            ${link.path.map((path) => (
        `<path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="${path}"
                    />`
    )).join("")}
            </svg>
            <span class="text-base">${link.title}</span>
        </a>
    </li>`
)).join("")}
            
`;

const sidebarNavigation = document.getElementById("sidebar-navigation");
sidebarNavigation.appendChild(sideNavLinksComponent);




// time
const userNameSidebarComponent = document.createElement("div");

userNameSidebarComponent.className = `flex items-center gap-2 hover:bg-blue-500/10 py-2.5 px-3 rounded-md transition-colors duration-200 ease-in-out`;
userNameSidebarComponent.innerHTML = `            
        <div class="bg-blue-500 w-12 h-12 inline-flex items-center justify-center text-lg text-white rounded-full font-semibold leading-0" >
 Hi
        </div>
        <div>
            <div>Guest Mode</div>
            <div id="clock" class="text-sm text-black/50">—</div>
        </div>`;

const userNameSidebarComponentContainer = document.getElementById("sidebarUsername-container");
userNameSidebarComponentContainer.appendChild(userNameSidebarComponent);

setInterval(() => {
    const currentTime = new Date().toLocaleString("en-IN");
    const clock = document.getElementById("clock");
    if (clock) {
        clock.innerText = currentTime;
    }
}, 1000);


