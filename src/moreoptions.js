const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const taskList = document.getElementById("taskListContainerPendingOnly");
if (taskList) {
  // view or hide more options for task
  taskList.addEventListener("click", (e) => {
    const button = e.target.closest(".more-options-btn");
    const menus = taskList.querySelectorAll(".dropdown-menu");

    // Close all menus
    menus.forEach(menu => menu.classList.add("hidden"));

    // If a button was clicked, open its menu
    if (button) {
      const menu = button.parentElement.querySelector(".dropdown-menu");
      menu.classList.remove("hidden");
    }
  });

  // delete task
  taskList.addEventListener("click", (e) => {
    const deleteButton = e.target.closest(".delete-task");
    e.preventDefault();

    if (!deleteButton) return;

    const taskItem = deleteButton.closest(".task-item");
    const taskId = taskItem.getAttribute("id");

    const updatedTasks = tasks.filter((task) => task.id !== Number(taskId));
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    location.reload();
  })


  // complete task
  taskList.addEventListener("click", (e) => {
    e.preventDefault();

    const markCompleteButton = e.target.closest(".mark-complete");
    if (!markCompleteButton) return;

    const taskItem = markCompleteButton.closest(".task-item");
    const taskId = taskItem.getAttribute("id");

    const targetTask = tasks.find((task) => task.id === Number(taskId));

    if (targetTask) {
      targetTask.isCompleted = !targetTask.isCompleted;
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    location.reload();

  })

  taskList.addEventListener("click", (e) => {
    e.preventDefault();

    const editTaskButton = e.target.closest(".edit-task");

    if (!editTaskButton) return;

    const targetTaskItem = editTaskButton.closest(".task-item");
    const taskId = targetTaskItem.getAttribute("id");
    const taskNameTarget = targetTaskItem.querySelector(".task-name");
    const taskName = taskNameTarget.textContent.trim();

    const taskPriorityTarget = targetTaskItem.querySelector(".task-priority");
    const taskPriority = taskPriorityTarget.textContent.trim();
    const now = new Date().toLocaleString("en-IN");

    const targetTask = tasks.find((task) => task.id === Number(taskId));

    if (targetTask) {
      // form
      const formContainer = taskList.getElementById("add-new-modal");
      formContainer.innerHTML = `
                      <div
            class="flex flex-col gap-3 items-center bg-white p-4 md:p-6 w-[95%] max-w-md rounded-lg"
          >
            <!-- form header -->
            <div
              class="flex items-center justify-between w-full border-b border-black/10 pb-2 mb-4"
            >
              <div class="text-lg font-bold">Edit Task</div>
              <button
                id="close-createNewModal"
                class="bg-transparent hover:bg-black/10 transition-colors duration-200 ease-in-out p-2 rounded-full cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <!-- create new Form -->
            <form action="" class="w-full flex flex-col gap-6">
              <!-- name -->
              <div class="flex flex-col gap-1.5 w-full">
                <label
                  for="taskName"
                  class="text-sm text-neutral-800 font-semibold"
                  >Name*</label
                >
                <input
                  type="text"
                  name="search"
                  id="taskName"
                  placeholder="Buy groceries"
                  class="flex items-center gap-2 py-2 px-3 rounded-md transition-colors duration-200 ease-in-out bg-neutral-100 text-black border border-blue-500/10 focus:border focus:border-blue-500 focus:outline-0 text-sm md:text-base w-full placeholder:text-neutral-500"
                  required
                />
              </div>

              <!-- Priority -->
              <div class="flex flex-col gap-1.5 w-full relative">
                <label
                  for="priority"
                  class="text-sm text-neutral-800 font-semibold"
                  >Priority*</label
                >
                <select
                  name="priority"
                  id="priority"
                  class="appearance-none flex items-center gap-2 py-2 px-3 rounded-md transition-colors duration-200 ease-in-out bg-neutral-100 text-neutral-500 border border-blue-500/10 focus:border focus:border-blue-500 focus:outline-0 text-sm md:text-base w-full placeholder:text-neutral-500"
                  required
                >
                  <option value="" selected>Select priority level</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>

                <button
                  class="pointer-events-none bg-transparent hover:bg-black/10 transition-colors duration-200 ease-in-out p-2 rounded-full cursor-pointer absolute bottom-1 right-2 text-neutral-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </button>
              </div>

              <!-- Submit Button -->
              <button
                id="createNewTaskButton"
                class="flex items-center gap-2 py-2 px-3 rounded-md transition-colors duration-200 ease-in-out bg-blue-500 hover:bg-blue-600 text-white cursor-pointer font-semibold"
              >
                <span class="text-base uppercase text-center w-full"
                  >Add Now</span
                >
              </button>
            </form>
          </div>
        `



      targetTask.name = "new name is here";
      targetTask.priority = "new task priority";
      targetTask.lastModified = now;

      localStorage.setItem("tasks", JSON.stringify(tasks));
      location.reload();
    }

  })
}

const allTaskList = document.getElementById("taskListContainerAllTasks")
if (allTaskList) {
  // view or hide more options for task
  allTaskList.addEventListener("click", (e) => {
    const button = e.target.closest(".more-options-btn");
    const menus = allTaskList.querySelectorAll(".dropdown-menu");

    // Close all menus
    menus.forEach(menu => menu.classList.add("hidden"));

    // If a button was clicked, open its menu
    if (button) {
      const menu = button.parentElement.querySelector(".dropdown-menu");
      menu.classList.remove("hidden");
    }
  });

  // delete task
  allTaskList.addEventListener("click", (e) => {
    const deleteButton = e.target.closest(".delete-task");
    e.preventDefault();

    if (!deleteButton) return;

    const taskItem = deleteButton.closest(".task-item");
    const taskId = taskItem.getAttribute("id");

    const updatedTasks = tasks.filter((task) => task.id !== Number(taskId));
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    location.reload();
  })


  // complete task
  allTaskList.addEventListener("click", (e) => {
    e.preventDefault();

    const markCompleteButton = e.target.closest(".mark-complete");
    if (!markCompleteButton) return;

    const taskItem = markCompleteButton.closest(".task-item");
    const taskId = taskItem.getAttribute("id");

    const targetTask = tasks.find((task) => task.id === Number(taskId));

    if (targetTask) {
      targetTask.isCompleted = !targetTask.isCompleted;
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    location.reload();

  })

  allTaskList.addEventListener("click", (e) => {
    e.preventDefault();

    const editTaskButton = e.target.closest(".edit-task");

    if (!editTaskButton) return;

    const targetTaskItem = editTaskButton.closest(".task-item");
    const taskId = targetTaskItem.getAttribute("id");
    const taskNameTarget = targetTaskItem.querySelector(".task-name");
    const taskName = taskNameTarget.textContent.trim();

    const taskPriorityTarget = targetTaskItem.querySelector(".task-priority");
    const taskPriority = taskPriorityTarget.textContent.trim();
    const now = new Date().toLocaleString("en-IN");

    const targetTask = tasks.find((task) => task.id === Number(taskId));

    if (targetTask) {
      // form
      const formContainer = allTaskList.getElementById("add-new-modal");
      formContainer.innerHTML = `
                      <div
            class="flex flex-col gap-3 items-center bg-white p-4 md:p-6 w-[95%] max-w-md rounded-lg"
          >
            <!-- form header -->
            <div
              class="flex items-center justify-between w-full border-b border-black/10 pb-2 mb-4"
            >
              <div class="text-lg font-bold">Edit Task</div>
              <button
                id="close-createNewModal"
                class="bg-transparent hover:bg-black/10 transition-colors duration-200 ease-in-out p-2 rounded-full cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <!-- create new Form -->
            <form action="" class="w-full flex flex-col gap-6">
              <!-- name -->
              <div class="flex flex-col gap-1.5 w-full">
                <label
                  for="taskName"
                  class="text-sm text-neutral-800 font-semibold"
                  >Name*</label
                >
                <input
                  type="text"
                  name="search"
                  id="taskName"
                  placeholder="Buy groceries"
                  class="flex items-center gap-2 py-2 px-3 rounded-md transition-colors duration-200 ease-in-out bg-neutral-100 text-black border border-blue-500/10 focus:border focus:border-blue-500 focus:outline-0 text-sm md:text-base w-full placeholder:text-neutral-500"
                  required
                />
              </div>

              <!-- Priority -->
              <div class="flex flex-col gap-1.5 w-full relative">
                <label
                  for="priority"
                  class="text-sm text-neutral-800 font-semibold"
                  >Priority*</label
                >
                <select
                  name="priority"
                  id="priority"
                  class="appearance-none flex items-center gap-2 py-2 px-3 rounded-md transition-colors duration-200 ease-in-out bg-neutral-100 text-neutral-500 border border-blue-500/10 focus:border focus:border-blue-500 focus:outline-0 text-sm md:text-base w-full placeholder:text-neutral-500"
                  required
                >
                  <option value="" selected>Select priority level</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>

                <button
                  class="pointer-events-none bg-transparent hover:bg-black/10 transition-colors duration-200 ease-in-out p-2 rounded-full cursor-pointer absolute bottom-1 right-2 text-neutral-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </button>
              </div>

              <!-- Submit Button -->
              <button
                id="createNewTaskButton"
                class="flex items-center gap-2 py-2 px-3 rounded-md transition-colors duration-200 ease-in-out bg-blue-500 hover:bg-blue-600 text-white cursor-pointer font-semibold"
              >
                <span class="text-base uppercase text-center w-full"
                  >Add Now</span
                >
              </button>
            </form>
          </div>
        `



      targetTask.name = "new name is here";
      targetTask.priority = "new task priority";
      targetTask.lastModified = now;

      localStorage.setItem("tasks", JSON.stringify(tasks));
      location.reload();
    }

  })
}