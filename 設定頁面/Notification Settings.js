// 返回按鈕功能（回到首頁）
document.getElementById("backButton").addEventListener("click", () => {
  console.log("返回按鈕被點擊"); // 測試點擊
  window.location.href = "../主頁頁面/main.html"; // 確認路徑正確
});

// 高亮顯示當前頁面
const path = window.location.pathname;
if (path.includes("Notification")) {
  document
    .querySelector("[onclick*='Notification']")
    .classList.add("bg-white", "border-r-2", "border-blue-500");
} else if (path.includes("Privacy")) {
  document
    .querySelector("[onclick*='Privacy']")
    .classList.add("bg-white", "border-r-2", "border-blue-500");
}
