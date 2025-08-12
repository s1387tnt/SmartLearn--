// 模擬任務資料 
const tasksData = [
  {
    id: 1,
    name: "每日登入",
    description: "連續登入7天",
    progress: 85,
    maxProgress: 100,
    coins: 50,
    status: "in-progress"
  },
  {
    id: 2,
    name: "完成3堂課程",
    description: "學習任意3個課程單元",
    progress: 66,
    maxProgress: 100,
    coins: 100,
    status: "in-progress"
  },
  {
    id: 3,
    name: "測驗滿分",
    description: "在任一測驗中獲得滿分",
    progress: 100,
    maxProgress: 100,
    coins: 200,
    status: "completed"
  },
  {
    id: 4,
    name: "新增好友",
    description: "邀請一位朋友加入學習",
    progress: 0,
    maxProgress: 100,
    coins: 150,
    status: "available"
  },
  {
    id: 5,
    name: "學習時長",
    description: "累積學習時間達30分鐘",
    progress: 75,
    maxProgress: 100,
    coins: 80,
    status: "in-progress"
  }
];

// 渲染任務列表
function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  
  tasksData.forEach((task) => {
    const taskElement = document.createElement("div");
    taskElement.className = `task-item ${task.status}`;
    taskElement.innerHTML = `
      <div class="task-name">${task.name}</div>
      <div class="task-description">${task.description}</div>
      <div class="task-progress">
        <div class="task-progress-bar">
          <div class="task-progress-fill" style="width: ${task.progress}%"></div>
        </div>
        <div class="task-progress-text">${task.progress}%</div>
      </div>
      <div class="task-reward">
        <div class="task-coins">
          <span>🪙</span>
          <span>+${task.coins}</span>
        </div>
        <div class="task-status ${task.status}">
          ${task.status === 'completed' ? '已完成' : 
            task.status === 'in-progress' ? '進行中' : '可領取'}
        </div>
      </div>
    `;
    
    taskElement.addEventListener("click", () => {
      handleTaskClick(task);
    });
    
    taskList.appendChild(taskElement);
  });
}

// 處理任務點擊
function handleTaskClick(task) {
  if (task.status === 'completed') {
    alert(`恭喜！你已完成「${task.name}」任務，獲得 ${task.coins} 金幣！`);
  } else if (task.status === 'in-progress') {
    alert(`「${task.name}」任務進行中，當前進度：${task.progress}%`);
  } else {
    alert(`「${task.name}」任務可以開始執行了！`);
  }
}

// 模擬好友資料
const friendsData = [
  { id: 1, name: "小明", avatar: "👦", status: "online", statusText: "線上" },
  { id: 2, name: "小美", avatar: "👧", status: "online", statusText: "線上" },
  { id: 3, name: "阿華", avatar: "🧑", status: "offline", statusText: "離線" },
  { id: 4, name: "小花", avatar: "👩", status: "online", statusText: "線上" },
  { id: 5, name: "大雄", avatar: "👨", status: "offline", statusText: "離線" },
];

// 好友列表功能
const friendsListTrigger = document.getElementById("friendsListTrigger");
const friendsSidebar = document.getElementById("friendsSidebar");
const friendsOverlay = document.getElementById("friendsOverlay");
const closeFriendsBtn = document.getElementById("closeFriendsBtn");
const friendsContent = document.getElementById("friendsContent");
const addFriendBtn = document.getElementById("addFriendBtn");
const friendRequestsBtn = document.getElementById("friendRequestsBtn");

function renderFriends() {
  friendsContent.innerHTML = "";
  friendsData.forEach((friend) => {
    const friendElement = document.createElement("div");
    friendElement.className = "friend-item";
    friendElement.innerHTML = `
      <div class="friend-avatar" style="background-color: ${getAvatarColor(friend.id)}">
        ${friend.avatar}
      </div>
      <div class="friend-info">
        <div class="friend-name">${friend.name}</div>
        <div class="friend-status ${friend.status}">${friend.statusText}</div>
      </div>
    `;
    friendsContent.appendChild(friendElement);
  });
}

function getAvatarColor(id) {
  const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD"];
  return colors[id % colors.length];
}

function showFriendsList() {
  renderFriends();
  friendsSidebar.classList.add("show");
  friendsOverlay.classList.add("show");
  document.body.style.overflow = "hidden";
}

function hideFriendsList() {
  friendsSidebar.classList.remove("show");
  friendsOverlay.classList.remove("show");
  document.body.style.overflow = "";
}

friendsListTrigger.addEventListener("click", showFriendsList);
closeFriendsBtn.addEventListener("click", hideFriendsList);
friendsOverlay.addEventListener("click", hideFriendsList);

addFriendBtn.addEventListener("click", () => {
  alert("新增好友功能");
});

friendRequestsBtn.addEventListener("click", () => {
  alert("好友請求功能");
});

// 用戶下拉選單
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

// 日曆功能
const calendarNavs = document.querySelectorAll(".calendar-nav");
const calendarTitle = document.querySelector(".calendar-title");
const calendarGrid = document.querySelector(".calendar-grid");

const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

const months = [
  "一月","二月","三月","四月","五月","六月",
  "七月","八月","九月","十月","十一月","十二月"
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
      document.querySelectorAll(".calendar-day.selected").forEach((el) => {
        el.classList.remove("selected");
      });
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

// ====== 猴子進度條 JS 核心 ======
let current = 0;      
let target = 0;       
let ticking = false;  
let autoTimer = null; 

const bar   = document.getElementById('bar');
const fill  = document.getElementById('fill');
const monkey= document.getElementById('monkey');
const nowEl = document.getElementById('now');
const bananasBox = document.getElementById('bananas');

let bananas = []; 

function initBananas(pcts = [25,50,75,100], bananaSrc = 'images/banana.png'){
  bananasBox.innerHTML = '';
  bananas = pcts.map(pct => {
    const img = document.createElement('img');
    img.src = bananaSrc;
    img.alt = `banana-${pct}`;
    img.className = 'banana';
    img.style.left = pct + '%';
    bananasBox.appendChild(img);
    return { pct, el: img, eaten: false };
  });
}

function setProgress(p){
  target = clamp(Math.round(p), 0, 100);
  if (!ticking) stepTowardTarget();
}

function stepTowardTarget(){
  if (current === target){ ticking = false; return; }
  ticking = true;

  if (current < target) current += 1;
  else                  current -= 1;

  applyProgress(current);
  window.setTimeout(stepTowardTarget, 18);
}

function applyProgress(pct){
  fill.style.width = pct + '%';
  const barRect = bar.getBoundingClientRect();
  const x = (barRect.width * pct) / 100;
  monkey.style.left = x + 'px';

  bananas.forEach(b => {
    if (!b.eaten && pct >= b.pct){
      b.eaten = true;
      b.el.classList.add('eaten');
    }
  });

  nowEl && (nowEl.textContent = pct);
}

function clamp(v, min, max){ return Math.max(min, Math.min(max, v)); }

function bump(delta){ setProgress(current + delta); }
function autoRun(){
  clearInterval(autoTimer);
  setProgress(0);
  autoTimer = setInterval(()=>{
    if (current >= 100){ clearInterval(autoTimer); return; }
    setProgress(current + 1);
  }, 60);
}

// 初始化猴子進度條
window.addEventListener("load", () => {
  renderTasks();
  initBananas([25,50,75,100], "images/banana.png");
  setProgress(3); // 初始進度
});

document.addEventListener("DOMContentLoaded", () => {
  const calendarEl = document.querySelector(".calendar");
  if (calendarEl) {
    calendarEl.addEventListener("click", () => {
      window.location.href = "../行事曆頁面/plan.html";
    });
  }
});

// ESC鍵關閉好友列表
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && friendsSidebar.classList.contains("show")) {
    hideFriendsList();
  }
});

// 商店按鈕
const shopButton = document.querySelector(".shop-button");
shopButton.addEventListener("click", () => {
  console.log("商店按鈕被點擊");
});

// 更多按鈕
const moreButton = document.querySelector(".more-button");
moreButton.addEventListener("click", () => {
  console.log("更多按鈕被點擊");
});
