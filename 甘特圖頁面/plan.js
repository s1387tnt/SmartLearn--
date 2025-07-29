document.addEventListener("DOMContentLoaded", () => {
  const calendarGrid = document.getElementById("calendar-grid");
  const calendarTitle = document.getElementById("calendarTitle");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  const today = new Date();
  let currentMonth = today.getMonth(); // 0-based
  let currentYear = today.getFullYear();

  function generateCalendar(year, month) {
    calendarGrid.innerHTML = "";

    const firstDay = new Date(year, month, 1);
    const totalDays = new Date(year, month + 1, 0).getDate();
    const startDay = firstDay.getDay(); // 0: Sunday

    const monthText = `${year}年 ${month + 1}月`;
    calendarTitle.textContent = monthText;

    // 空格子填補
    for (let i = 0; i < startDay; i++) {
      const blank = document.createElement("div");
      blank.className = "h-12";
      calendarGrid.appendChild(blank);
    }

    // 日期格子
    for (let i = 1; i <= totalDays; i++) {
      const dateBox = document.createElement("div");
      dateBox.className =
        "h-12 flex items-center justify-center rounded hover:bg-gray-100 cursor-pointer";
      dateBox.textContent = i;

      // 若為今天，預設高亮
      if (
        year === today.getFullYear() &&
        month === today.getMonth() &&
        i === today.getDate()
      ) {
        dateBox.classList.add("bg-blue-500", "text-white");
      }

      // 點選事件：切換高亮
      dateBox.addEventListener("click", () => {
        document
          .querySelectorAll("#calendar-grid .h-12")
          .forEach((el) => el.classList.remove("bg-blue-500", "text-white"));
        dateBox.classList.add("bg-blue-500", "text-white");
      });

      calendarGrid.appendChild(dateBox);
    }
  }

  prevBtn.addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    generateCalendar(currentYear, currentMonth);
  });

  nextBtn.addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    generateCalendar(currentYear, currentMonth);
  });

  generateCalendar(currentYear, currentMonth);

  const todoInput = document.getElementById("todoInput");
  const addTodoBtn = document.getElementById("addTodoBtn");
  const todoList = document.getElementById("todoList");

  addTodoBtn.addEventListener("click", () => {
    const text = todoInput.value.trim();
    if (text === "") return;

    const li = document.createElement("li");
    li.className =
      "flex items-center justify-between bg-gray-100 rounded px-4 py-2";

    li.innerHTML = `
      <div class="flex items-center gap-2">
        <input type="checkbox" class="todo-checkbox" />
        <span class="todo-text">${text}</span>
      </div>
      <button class="text-red-500 hover:text-red-700 delete-btn">✕</button>
    `;

    todoList.appendChild(li);
    todoInput.value = "";

    // 勾選變更樣式
    const checkbox = li.querySelector(".todo-checkbox");
    const textSpan = li.querySelector(".todo-text");
    checkbox.addEventListener("change", () => {
      textSpan.classList.toggle("line-through", checkbox.checked);
      textSpan.classList.toggle("text-gray-400", checkbox.checked);
    });

    // 刪除按鈕功能
    li.querySelector(".delete-btn").addEventListener("click", () => {
      li.remove();
    });
  });
});
