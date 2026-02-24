// toggle create new modal
const createNewModalCloseButton = document.querySelector("#close-createNewModal");
const createNewModalOpenButton = document.querySelector("#open-createNewModal");
const createNewModal = document.querySelector("#add-new-modal");

createNewModalOpenButton.addEventListener("click", () => {
    createNewModal.classList.remove("hidden");
})

createNewModalCloseButton.addEventListener("click", () => {
    createNewModal.classList.add("hidden");
})
