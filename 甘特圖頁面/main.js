// 用戶下拉選單功能
const profileButton = document.querySelector(".profile-button");
const dropdownMenu = document.querySelector(".dropdown-menu");

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

// 日曆導航功能
const calendarNavs = document.querySelectorAll(".calendar-nav");
const calendarTitle = document.querySelector(".calendar-title");
const calendarGrid = document.querySelector(".calendar-grid");

let currentMonth = 4;
let currentYear = 2025;

const months = [
  "一月",
  "二月",
  "三月",
  "四月",
  "五月",
  "六月",
  "七月",
  "八月",
  "九月",
  "十月",
  "十一月",
  "十二月",
];

const weekDays = ["日", "一", "二", "三", "四", "五", "六"];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

function generateCalendar() {
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
  const today = new Date();
  const isCurrentMonth =
    today.getFullYear() === currentYear && today.getMonth() === currentMonth;
  const todayDate = today.getDate();

  calendarGrid.innerHTML = "";

  weekDays.forEach((day) => {
    const dayHeader = document.createElement("div");
    dayHeader.className = "calendar-day-header";
    dayHeader.textContent = day;
    calendarGrid.appendChild(dayHeader);
  });

  for (let i = 0; i < firstDay; i++) {
    const emptyDay = document.createElement("div");
    emptyDay.className = "calendar-day";
    calendarGrid.appendChild(emptyDay);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dayElement = document.createElement("div");
    dayElement.className = "calendar-day";
    dayElement.textContent = day;

    if (isCurrentMonth && day === todayDate) {
      dayElement.classList.add("today");
    }

    dayElement.addEventListener("click", () => {
      document
        .querySelectorAll(".calendar-day.selected")
        .forEach((el) => el.classList.remove("selected"));
      dayElement.classList.add("selected");
    });

    calendarGrid.appendChild(dayElement);
  }

  const totalCells = calendarGrid.children.length - 7;
  const remainingCells = 42 - totalCells;

  for (let day = 1; day <= remainingCells && remainingCells < 7; day++) {
    const nextMonthDay = document.createElement("div");
    nextMonthDay.className = "calendar-day next-month";
    nextMonthDay.textContent = day;
    calendarGrid.appendChild(nextMonthDay);
  }
}

function updateCalendar() {
  calendarTitle.textContent = `${currentYear}年 ${months[currentMonth]}`;
  generateCalendar();
}

calendarNavs[0].addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  updateCalendar();
});

calendarNavs[1].addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  updateCalendar();
});

updateCalendar();

// 商店與更多按鈕
const shopButton = document.querySelector(".shop-button");
shopButton.addEventListener("click", () => {
  console.log("商店按鈕被點擊");
});

const moreButton = document.querySelector(".more-button");
moreButton.addEventListener("click", () => {
  console.log("更多按鈕被點擊");
});

// 課程卡片點擊效果
const classCard = document.querySelector(".class-card");
classCard.addEventListener("click", () => {
  classCard.style.transform = "scale(0.98)";
  setTimeout(() => {
    classCard.style.transform = "scale(1)";
  }, 100);
});
