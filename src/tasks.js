document.addEventListener("DOMContentLoaded", () => {
  const createTaskButton = document.getElementById("createNewTaskButton");
  const taskNameInput = document.getElementById("taskName");
  const taskPriority = document.getElementById("priority");

  if (!createTaskButton) return;

  const createTask = () => {
    const taskName = taskNameInput.value.trim();
    const priority = taskPriority.value.trim();

    if (!taskName || !priority) {
      alert("Please enter all information of task");
      return;
    }

    const existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const newTask = {
      id: Date.now(),
      name: taskName,
      priority: priority,
      lastModified: new Date().toLocaleString("en-IN"),
      isCompleted: false
    };

    existingTasks.push(newTask);

    localStorage.setItem("tasks", JSON.stringify(existingTasks));

    console.log("Task saved:", newTask);

    taskNameInput.value = "";
    taskPriority.value = "";
    location.reload();
  };

  createTaskButton.addEventListener("click", (e) => {
    e.preventDefault();
    createTask();
  });


  // showing all tasks
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const pendingTasksList = tasks.filter((task) => task.isCompleted === false);

  const completedTasks = tasks.filter((task) => task.isCompleted === true);
  const pendingTasks = tasks.filter((task) => task.isCompleted === false);
  let completionRate = "—";

  if (tasks.length > 0) {
    const rate = (completedTasks.length / tasks.length) * 100;
    completionRate = `${rate.toFixed(0)}%`;
  }

  const completedTasksContainer = document.getElementById("completed-task-container");
  if (completedTasksContainer) {
    completedTasksContainer.textContent = completedTasks.length;
  }

  const pendingTasksContainer = document.getElementById("pending-task-container");
  if (pendingTasksContainer) {
    pendingTasksContainer.textContent = pendingTasks.length;
  }

  const completionRateContainer = document.getElementById("completion-rate-container");
  if (completionRateContainer) {
    completionRateContainer.textContent = completionRate;
  }




  const priorityStyles = {
    High: "bg-red-200 text-red-700",
    Medium: "bg-amber-200 text-amber-700",
    Low: "bg-green-200 text-green-700"
  };

  const isCompleted = {
    true: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
    false: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
  }

  const taskList = document.getElementById("taskListContainerPendingOnly");
  if (taskList) {
    if (pendingTasksList.length < 1) {
      taskList.innerHTML = `
              <div
            class="w-full h-[30vh] bg-neutral-100 border border-black/10 rounded-lg px-2 py-4 md:px-4 md:py-5 flex"
          >
            <div
              class="w-full h-full flex flex-col gap-2 flex-1 justify-center items-center"
            >
              <div
                class="text-xs lg:text-sm text-black/60 font-semibold text-center"
              >
                No tasks to complete. <br />
              </div>
              <div
                class="text-xs lg:text-sm text-black/60 font-semibold text-center flex items-center gap-1"
              >
                Click
                [<svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.8"
                  stroke="currentColor"
                  class="size-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                <span class="hidden sm:block">Add New</span>]
                icon at the top.
              </div>
            </div>
          </div>
    `
    } else {
      taskList.innerHTML = pendingTasksList.map((task) => (
        `              <li
      id=${task.id}
                class="task-item flex items-center gap-1 bg-neutral-100 border border-black/10 rounded-lg px-4 py-2.5 pr-2}"
              >
                <div class="flex flex-1 items-center justify-between">
                  <div class="flex items-center gap-2 md:gap-3">
                    <!-- completion mark -->
                    <div class="mark-complete">
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
                          d="${isCompleted[task.isCompleted]}"
                        />
                      </svg>
                    </div>

                    <!-- task name -->
                    <div class="task-name ${task.isCompleted ? "line-through" : ""}">${task.name}</div>
                  </div>

                  <!-- priority -->
                  <div
                    class="task-priority ${priorityStyles[task.priority]} px-3 py-1 text-xs rounded-full"
                  >
                    ${task.priority}
                  </div>
                </div>

                <!-- more options -->
                <div class="relative">
                  <button
                    class="more-options-btn bg-transparent hover:bg-black/10 transition-colors duration-200 ease-in-out p-2 rounded-full cursor-pointer"
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
                        d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                      />
                    </svg>
                  </button>

                  <!-- option popup -->
                  <div
                    class="dropdown-menu absolute top-0 right-0 bg-white border shadow border-black/10 rounded-lg p-1 z-99 w-52 hidden"
                  >
                    <ul>
                      <li
                        class="mark-complete flex items-center gap-3 px-3 py-2 border-b border-black/10 text-sm hover:bg-blue-500/10 transition-colors duration-200 ease-in-out cursor-pointer"
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
                            d="${task.isCompleted ? "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" : "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"}"
                          />
                        </svg>
                        <span>${task.isCompleted ? "Mark Incomplete" : "Mark Complete"}</span>                      
                      </li>

                      <li
                        class="delete-task flex items-center gap-3 px-3 py-2 text-red-500 text-sm hover:bg-red-500/10 transition-colors duration-200 ease-in-out cursor-pointer"
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
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                        <span class="">Delete</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>`
      )).join("");
    }
  }

  const allTaskList = document.getElementById("taskListContainerAllTasks");
  if (allTaskList) {
    if (tasks.length < 1) {
      allTaskList.innerHTML = `
              <div
            class="w-full h-[30vh] bg-neutral-100 border border-black/10 rounded-lg px-2 py-4 md:px-4 md:py-5 flex"
          >
            <div
              class="w-full h-full flex flex-col gap-2 flex-1 justify-center items-center"
            >
              <div
                class="text-xs lg:text-sm text-black/60 font-semibold text-center"
              >
                No tasks to complete. <br />
              </div>
              <div
                class="text-xs lg:text-sm text-black/60 font-semibold text-center flex items-center gap-1"
              >
                Click
                [<svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.8"
                  stroke="currentColor"
                  class="size-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                <span class="hidden sm:block">Add New</span>]
                icon at the top.
              </div>
            </div>
          </div>
    `
    } else {
      allTaskList.innerHTML = tasks.map((task) => (
        `              <li
      id=${task.id}
                class="task-item flex items-center gap-1 bg-neutral-100 border border-black/10 rounded-lg px-4 py-2.5 pr-2}"
              >
                <div class="flex flex-1 items-center justify-between">
                  <div class="flex items-center gap-2 md:gap-3">
                    <!-- completion mark -->
                    <div class="mark-complete">
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
                          d="${isCompleted[task.isCompleted]}"
                        />
                      </svg>
                    </div>

                    <!-- task name -->
                    <div class="task-name ${task.isCompleted ? "line-through" : ""}">${task.name}</div>
                  </div>

                  <!-- priority -->
                  <div
                    class="task-priority ${priorityStyles[task.priority]} px-3 py-1 text-xs rounded-full"
                  >
                    ${task.priority}
                  </div>
                </div>

                <!-- more options -->
                <div class="relative">
                  <button
                    class="more-options-btn bg-transparent hover:bg-black/10 transition-colors duration-200 ease-in-out p-2 rounded-full cursor-pointer"
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
                        d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                      />
                    </svg>
                  </button>

                  <!-- option popup -->
                  <div
                    class="dropdown-menu absolute top-0 right-0 bg-white border shadow border-black/10 rounded-lg p-1 z-99 w-52 hidden"
                  >
                    <ul>
                      <li
                        class="mark-complete flex items-center gap-3 px-3 py-2 border-b border-black/10 text-sm hover:bg-blue-500/10 transition-colors duration-200 ease-in-out cursor-pointer"
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
                            d="${task.isCompleted ? "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" : "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"}"
                          />
                        </svg>
                        <span>${task.isCompleted ? "Mark Incomplete" : "Mark Complete"}</span>                      
                      </li>

                      <li
                        class="delete-task flex items-center gap-3 px-3 py-2 text-red-500 text-sm hover:bg-red-500/10 transition-colors duration-200 ease-in-out cursor-pointer"
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
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                        <span class="">Delete</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>`
      )).join("");
    }
  }



  // seach tasks

  document.getElementById("searchTasksForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const searchInput = document.getElementById("searchTerm");
    const searchTerm = searchInput.value.trim();

    const searchResults = tasks.filter((task) => task.name.includes(searchTerm));
    console.log(searchResults);

    const taskList = document.getElementById("taskListContainerPendingOnly");
    if (taskList) {
      if (searchResults.length < 1) {
        taskList.innerHTML = `
              <div
            class="w-full h-[30vh] bg-neutral-100 border border-black/10 rounded-lg px-2 py-4 md:px-4 md:py-5 flex"
          >
            <div
              class="w-full h-full flex flex-col gap-2 flex-1 justify-center items-center"
            >
              <div
                class="text-xs lg:text-sm text-black/60 font-semibold text-center"
              >
                No tasks found with "${searchTerm}" <br />
              </div>
              <div
                class="text-xs lg:text-sm text-black/60 font-semibold text-center flex items-center gap-1"
              >
                Click
                [<svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.8"
                  stroke="currentColor"
                  class="size-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                <span class="hidden sm:block">Add New</span>]
                icon at the top.
              </div>
            </div>
          </div>
    `
      } else {
        taskList.innerHTML = searchResults.map((task) => (
          `              <li
      id=${task.id}
                class="task-item flex items-center gap-1 bg-neutral-100 border border-black/10 rounded-lg px-4 py-2.5 pr-2}"
              >
                <div class="flex flex-1 items-center justify-between">
                  <div class="flex items-center gap-2 md:gap-3">
                    <!-- completion mark -->
                    <div class="mark-complete">
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
                          d="${isCompleted[task.isCompleted]}"
                        />
                      </svg>
                    </div>

                    <!-- task name -->
                    <div class="task-name ${task.isCompleted ? "line-through" : ""}">${task.name}</div>
                  </div>

                  <!-- priority -->
                  <div
                    class="task-priority ${priorityStyles[task.priority]} px-3 py-1 text-xs rounded-full"
                  >
                    ${task.priority}
                  </div>
                </div>

                <!-- more options -->
                <div class="relative">
                  <button
                    class="more-options-btn bg-transparent hover:bg-black/10 transition-colors duration-200 ease-in-out p-2 rounded-full cursor-pointer"
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
                        d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                      />
                    </svg>
                  </button>

                  <!-- option popup -->
                  <div
                    class="dropdown-menu absolute top-0 right-0 bg-white border shadow border-black/10 rounded-lg p-1 z-99 w-52 hidden"
                  >
                    <ul>
                      <li
                        class="mark-complete flex items-center gap-3 px-3 py-2 border-b border-black/10 text-sm hover:bg-blue-500/10 transition-colors duration-200 ease-in-out cursor-pointer"
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
                            d="${task.isCompleted ? "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" : "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"}"
                          />
                        </svg>
                        <span>${task.isCompleted ? "Mark Incomplete" : "Mark Complete"}</span>                      
                      </li>

                      <li
                        class="delete-task flex items-center gap-3 px-3 py-2 text-red-500 text-sm hover:bg-red-500/10 transition-colors duration-200 ease-in-out cursor-pointer"
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
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                        <span class="">Delete</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>`
        )).join("");
      }
    }

    const allTaskList = document.getElementById("taskListContainerAllTasks");
    if (allTaskList) {
      if (searchResults.length < 1) {
        allTaskList.innerHTML = `
              <div
            class="w-full h-[30vh] bg-neutral-100 border border-black/10 rounded-lg px-2 py-4 md:px-4 md:py-5 flex"
          >
            <div
              class="w-full h-full flex flex-col gap-2 flex-1 justify-center items-center"
            >
              <div
                class="text-xs lg:text-sm text-black/60 font-semibold text-center"
              >
               No tasks found with "${searchTerm}" <br />
              </div>
              <div
                class="text-xs lg:text-sm text-black/60 font-semibold text-center flex items-center gap-1"
              >
                Click
                [<svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.8"
                  stroke="currentColor"
                  class="size-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                <span class="hidden sm:block">Add New</span>]
                icon at the top.
              </div>
            </div>
          </div>
    `
      } else {
        allTaskList.innerHTML = searchResults.map((task) => (
          `              <li
      id=${task.id}
                class="task-item flex items-center gap-1 bg-neutral-100 border border-black/10 rounded-lg px-4 py-2.5 pr-2}"
              >
                <div class="flex flex-1 items-center justify-between">
                  <div class="flex items-center gap-2 md:gap-3">
                    <!-- completion mark -->
                    <div class="mark-complete">
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
                          d="${isCompleted[task.isCompleted]}"
                        />
                      </svg>
                    </div>

                    <!-- task name -->
                    <div class="task-name ${task.isCompleted ? "line-through" : ""}">${task.name}</div>
                  </div>

                  <!-- priority -->
                  <div
                    class="task-priority ${priorityStyles[task.priority]} px-3 py-1 text-xs rounded-full"
                  >
                    ${task.priority}
                  </div>
                </div>

                <!-- more options -->
                <div class="relative">
                  <button
                    class="more-options-btn bg-transparent hover:bg-black/10 transition-colors duration-200 ease-in-out p-2 rounded-full cursor-pointer"
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
                        d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                      />
                    </svg>
                  </button>

                  <!-- option popup -->
                  <div
                    class="dropdown-menu absolute top-0 right-0 bg-white border shadow border-black/10 rounded-lg p-1 z-99 w-52 hidden"
                  >
                    <ul>
                      <li
                        class="mark-complete flex items-center gap-3 px-3 py-2 border-b border-black/10 text-sm hover:bg-blue-500/10 transition-colors duration-200 ease-in-out cursor-pointer"
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
                            d="${task.isCompleted ? "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" : "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"}"
                          />
                        </svg>
                        <span>${task.isCompleted ? "Mark Incomplete" : "Mark Complete"}</span>                      
                      </li>

                      <li
                        class="delete-task flex items-center gap-3 px-3 py-2 text-red-500 text-sm hover:bg-red-500/10 transition-colors duration-200 ease-in-out cursor-pointer"
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
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                        <span class="">Delete</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>`
        )).join("");
      }
    }

    searchInput.value = "";
  });
});