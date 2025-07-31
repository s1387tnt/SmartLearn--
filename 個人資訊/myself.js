// 頁面導航功能
const navItems = document.querySelectorAll(".nav-item");
const pages = document.querySelectorAll(".page-content");

// 導航項目對應的頁面ID
const pageMapping = {
  "nav-intro": "intro-page",
  "nav-info": "info-page",
  "nav-edit": "edit-page",
  "nav-password": "password-page",
};

// 切換頁面函數
function switchPage(targetPageId) {
  // 隱藏所有頁面
  pages.forEach((page) => page.classList.add("hidden"));

  // 顯示目標頁面
  document.getElementById(targetPageId).classList.remove("hidden");

  // 更新導航項目樣式
  navItems.forEach((item) => {
    item.classList.remove("bg-white", "border-r-2", "border-blue-500");
    item.classList.add("hover:bg-gray-200");
  });

  // 設置當前活動項目樣式
  const activeNavId = Object.keys(pageMapping).find(
    (key) => pageMapping[key] === targetPageId
  );
  if (activeNavId) {
    const activeNav = document.getElementById(activeNavId);
    activeNav.classList.add("bg-white", "border-r-2", "border-blue-500");
    activeNav.classList.remove("hover:bg-gray-200");
  }
}

// 為每個導航項目添加點擊事件
navItems.forEach((item) => {
  item.addEventListener("click", () => {
    const targetPageId = pageMapping[item.id];
    if (targetPageId) {
      switchPage(targetPageId);
    }
  });
});

// 返回按鈕功能（回到首頁）
document.getElementById("backButton").addEventListener("click", () => {
  window.location.href = "../主頁頁面/main.html"; // 這裡改成你的主頁面檔案路徑
});

// 表單提交處理
document.querySelectorAll("form").forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("功能已提交！");
  });
});
