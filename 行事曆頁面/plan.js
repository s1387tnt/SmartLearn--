document.addEventListener("DOMContentLoaded", () => {
  const calendarGrid = document.getElementById("calendar-grid");
  const calendarTitle = document.getElementById("calendarTitle");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  const todoInput = document.getElementById("todoInput");
  const addTodoBtn = document.getElementById("addTodoBtn");
  const todoList = document.getElementById("todoList");
  const selectedDateLabel = document.getElementById("selectedDateLabel");

  const today = new Date();
  
  // 檢查是否有從首頁傳來的日期資訊
  let initialMonth = today.getMonth();
  let initialYear = today.getFullYear();
  let initialSelectedDate = new Date(initialYear, initialMonth, today.getDate());

  // 從 localStorage 讀取選中的日期（如果有的話）
  const selectedDateString = localStorage.getItem('selectedCalendarDate');
  const selectedYear = localStorage.getItem('selectedCalendarYear');
  const selectedMonth = localStorage.getItem('selectedCalendarMonth');

  if (selectedDateString && selectedYear && selectedMonth) {
    // 解析傳來的日期
    const dateParts = selectedDateString.split('-');
    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1; // JavaScript 月份是 0-based
    const day = parseInt(dateParts[2]);
    
    // 設置初始顯示的月份和年份
    initialYear = year;
    initialMonth = month;
    initialSelectedDate = new Date(year, month, day);
    
    // 清除 localStorage 中的資訊（避免下次進入時還是這個日期）
    localStorage.removeItem('selectedCalendarDate');
    localStorage.removeItem('selectedCalendarYear');
    localStorage.removeItem('selectedCalendarMonth');
  }

  let currentMonth = initialMonth;
  let currentYear = initialYear;

  // === 代辦：以日期為 key 的物件，存 { [YYYY-MM-DD]: Array<Todo> } ===
  // Todo = { id: string, text: string, done: boolean }
  const STORAGE_KEY = "smartlearn_todos_by_date";

  const state = {
    selectedDate: initialSelectedDate, // 使用初始選中的日期
    todosByDate: loadFromStorage(),
  };

  function loadFromStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }
  function saveToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.todosByDate));
  }

  function dateKey(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }

  function formatLabel(d) {
    const w = ["日", "一", "二", "三", "四", "五", "六"][d.getDay()];
    return `${d.getFullYear()} 年 ${
      d.getMonth() + 1
    } 月 ${d.getDate()} 日（週${w}）`;
  }

  function getTodosFor(date) {
    return state.todosByDate[dateKey(date)] || [];
  }

  function setTodosFor(date, todos) {
    state.todosByDate[dateKey(date)] = todos;
    saveToStorage();
  }

  // === 日曆 ===
  function generateCalendar(year, month) {
    calendarGrid.innerHTML = "";

    const firstDay = new Date(year, month, 1);
    const totalDays = new Date(year, month + 1, 0).getDate();
    const startDay = firstDay.getDay(); // 0: Sunday

    calendarTitle.textContent = `${year}年 ${month + 1}月`;

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
        "h-12 flex items-center justify-center rounded hover:bg-gray-100 cursor-pointer relative";
      dateBox.textContent = i;

      const cellDate = new Date(year, month, i);

      // 若為今天，預設以灰框標示（選取的會是藍底）
      if (
        year === today.getFullYear() &&
        month === today.getMonth() &&
        i === today.getDate()
      ) {
        dateBox.classList.add("ring-1", "ring-gray-300");
      }

      // 若為目前選取日期，高亮
      if (
        cellDate.getFullYear() === state.selectedDate.getFullYear() &&
        cellDate.getMonth() === state.selectedDate.getMonth() &&
        cellDate.getDate() === state.selectedDate.getDate()
      ) {
        dateBox.classList.add("bg-blue-500", "text-white");
      }

      // 若該日期有代辦，加一個小圓點提示
      const list = getTodosFor(cellDate);
      if (list.length > 0) {
        const dot = document.createElement("span");
        dot.className =
          "absolute bottom-1 w-1.5 h-1.5 rounded-full bg-gray-400";
        dot.style.left = "50%";
        dot.style.transform = "translateX(-50%)";
        dateBox.appendChild(dot);
      }

      // 點選事件：切換選取日期 & 重刷代辦
      dateBox.addEventListener("click", () => {
        state.selectedDate = cellDate;
        // 移除其他格子的選取樣式
        document
          .querySelectorAll("#calendar-grid .h-12")
          .forEach((el) => el.classList.remove("bg-blue-500", "text-white"));
        dateBox.classList.add("bg-blue-500", "text-white");

        renderSelectedDateLabel();
        renderTodos();
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

  // === 代辦 ===
  function renderSelectedDateLabel() {
    selectedDateLabel.textContent = `目前選取：${formatLabel(
      state.selectedDate
    )}`;
  }

  function renderTodos() {
    const list = getTodosFor(state.selectedDate);
    todoList.innerHTML = "";

    list.forEach((t) => {
      const li = document.createElement("li");
      li.className =
        "flex items-center justify-between bg-gray-100 rounded px-4 py-2";

      li.innerHTML = `
        <div class="flex items-center gap-2">
          <input type="checkbox" class="todo-checkbox" ${
            t.done ? "checked" : ""
          } />
          <span class="todo-text ${
            t.done ? "line-through text-gray-400" : ""
          }">${escapeHtml(t.text)}</span>
        </div>
        <button class="text-red-500 hover:text-red-700 delete-btn">✕</button>
      `;

      // 勾選切換
      li.querySelector(".todo-checkbox").addEventListener("change", (e) => {
        t.done = e.target.checked;
        setTodosFor(state.selectedDate, list);
        renderTodos(); // 重新渲染，更新樣式
        // 同步更新日曆小圓點（若全刪/全無）
        generateCalendar(currentYear, currentMonth);
      });

      // 刪除
      li.querySelector(".delete-btn").addEventListener("click", () => {
        const newList = list.filter((x) => x.id !== t.id);
        setTodosFor(state.selectedDate, newList);
        renderTodos();
        generateCalendar(currentYear, currentMonth);
      });

      todoList.appendChild(li);
    });
  }

  function addTodoForSelectedDate(text) {
    const trimmed = text.trim();
    if (!trimmed) return;

    const list = getTodosFor(state.selectedDate).slice();
    list.push({
      id: cryptoRandomId(),
      text: trimmed,
      done: false,
    });
    setTodosFor(state.selectedDate, list);
    renderTodos();
    generateCalendar(currentYear, currentMonth);
  }

  addTodoBtn.addEventListener("click", () => {
    addTodoForSelectedDate(todoInput.value);
    todoInput.value = "";
    todoInput.focus();
  });

  // Enter 快速新增
  todoInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      addTodoForSelectedDate(todoInput.value);
      todoInput.value = "";
    }
  });

  // === 轉義，避免 XSS ===
  function escapeHtml(str) {
    return str
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  // 簡易亂數 id（不支援舊環境時 fallback）
  function cryptoRandomId() {
    if (window.crypto?.getRandomValues) {
      const arr = new Uint32Array(2);
      window.crypto.getRandomValues(arr);
      return `${arr[0].toString(36)}${arr[1].toString(36)}`;
    }
    return Math.random().toString(36).slice(2);
  }

  // === 你的「使用者下拉選單」原本的邏輯（保留） ===
  const profileButton = document.querySelector(".profile-button");
  const dropdownMenu = document.querySelector(".dropdown-menu");

  if (profileButton && dropdownMenu) {
    profileButton.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdownMenu.classList.toggle("show");
    });

    document.addEventListener("click", () => {
      dropdownMenu.classList.remove("show");
    });

    dropdownMenu.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    const dropdownItems = document.querySelectorAll(".dropdown-item");
    dropdownItems.forEach((item) => {
      item.addEventListener("click", () => {
        console.log(`點擊了: ${item.textContent}`);
        dropdownMenu.classList.remove("show");
      });
    });
  }

  // === 你的「科目切換」原本的邏輯（保留，若外部有 subjects 才會啟動） ===
  const subjectButton = document.querySelector(".subject-button");
  const arrowButtons = document.querySelectorAll(".arrow-button");
  let currentSubjectIndex = 0;
  const subjects = window.subjects || null;

  if (subjectButton && subjects?.length) {
    subjectButton.textContent = subjects[currentSubjectIndex].name;

    arrowButtons.forEach((button, index) => {
      button.addEventListener("click", () => {
        currentSubjectIndex =
          index === 0
            ? (currentSubjectIndex - 1 + subjects.length) % subjects.length
            : (currentSubjectIndex + 1) % subjects.length;

        subjectButton.textContent = subjects[currentSubjectIndex].name;
      });
    });

    subjectButton.addEventListener("click", () => {
      const targetUrl = subjects[currentSubjectIndex].url;
      window.location.href = targetUrl;
    });
  }

  // === 初始化 ===
  generateCalendar(currentYear, currentMonth);
  renderSelectedDateLabel();
  renderTodos();
  
  // 添加頁面加載完成後的提示（可選）
  if (selectedDateString) {
    // 如果是從首頁跳轉過來的，可以顯示一個簡短的提示
    console.log(`已跳轉到 ${formatLabel(state.selectedDate)} 的代辦事項`);
  }
});