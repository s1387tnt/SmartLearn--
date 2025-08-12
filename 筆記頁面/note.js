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

// ====== 資料結構 ======
let folders = [
  {
    name: "資安知識",
    files: [
      { name: "密碼學", content: "" },
      { name: "漏洞分類", content: "" }
    ]
  },
  {
    name: "語言學習",
    files: [
      { name: "日文", content: "" },
      { name: "英文", content: "" }
    ]
  }
];

let currentFile = null;

// ====== DOM 元素 ======
const sidebar = document.querySelector("aside .p-6");
const noteArea = document.getElementById("noteArea");
const addFileBtn = document.querySelector(".fab");
const addFolderBtn = document.querySelector(".fab-secondary");

// ====== 初始化側欄 ======
function renderSidebar() {
  sidebar.innerHTML = `<h3 class="font-semibold text-gray-900">收藏夾</h3>`;

  folders.forEach((folder, folderIndex) => {
    const details = document.createElement("details");
    details.classList.add("group");
    details.open = true;

    const summary = document.createElement("summary");
    summary.className =
      "flex items-center justify-between cursor-pointer select-none";
    summary.innerHTML = `
      <span class="font-semibold text-gray-900">${folder.name}</span>
      <div class="flex items-center gap-2">
        <button class="text-red-500 hover:text-red-700 text-sm" data-action="delete-folder" data-folder="${folderIndex}">🗑️</button>
        <svg class="w-4 h-4 text-gray-500 caret" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </div>
    `;
    details.appendChild(summary);

    const fileList = document.createElement("div");
    fileList.className = "mt-2 ml-3 space-y-1";

    folder.files.forEach((file, fileIndex) => {
      const fileItem = document.createElement("div");
      fileItem.className =
        "flex items-center justify-between text-sm text-gray-700 hover:bg-gray-100 px-2 py-1 rounded cursor-pointer";
      fileItem.innerHTML = `
        <span>${file.name}</span>
        <button class="text-red-500 hover:text-red-700 text-xs" data-action="delete-file" data-folder="${folderIndex}" data-file="${fileIndex}">🗑️</button>
      `;
      fileItem.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") return; // 點刪除不要開檔案
        openFile(folderIndex, fileIndex);
      });
      fileList.appendChild(fileItem);
    });

    details.appendChild(fileList);
    sidebar.appendChild(details);
  });
}

// ====== 開啟檔案 ======
function openFile(folderIndex, fileIndex) {
  currentFile = { folderIndex, fileIndex };
  noteArea.value = folders[folderIndex].files[fileIndex].content;
}

// ====== 新增檔案 ======
addFileBtn.addEventListener("click", () => {
  const folderIndex = prompt("請輸入要新增檔案的資料夾編號（從 0 開始）");
  if (folderIndex === null || folderIndex === "") return;
  if (!folders[folderIndex]) {
    alert("資料夾不存在");
    return;
  }
  const fileName = prompt("請輸入檔案名稱");
  if (!fileName) return;
  folders[folderIndex].files.push({ name: fileName, content: "" });
  renderSidebar();
});

// ====== 新增資料夾 ======
addFolderBtn.addEventListener("click", () => {
  const folderName = prompt("請輸入資料夾名稱");
  if (!folderName) return;
  folders.push({ name: folderName, files: [] });
  renderSidebar();
});

// ====== 刪除功能（事件委派） ======
sidebar.addEventListener("click", (e) => {
  const action = e.target.dataset.action;
  if (!action) return;

  if (action === "delete-folder") {
    const idx = parseInt(e.target.dataset.folder);
    if (confirm(`確定要刪除資料夾「${folders[idx].name}」？`)) {
      folders.splice(idx, 1);
      renderSidebar();
    }
  }
  if (action === "delete-file") {
    const fIdx = parseInt(e.target.dataset.folder);
    const fileIdx = parseInt(e.target.dataset.file);
    if (confirm(`確定要刪除檔案「${folders[fIdx].files[fileIdx].name}」？`)) {
      folders[fIdx].files.splice(fileIdx, 1);
      renderSidebar();
    }
  }
});

// ====== 筆記內容即時儲存 ======
noteArea.addEventListener("input", () => {
  if (currentFile) {
    const { folderIndex, fileIndex } = currentFile;
    folders[folderIndex].files[fileIndex].content = noteArea.value;
  }
});

// ====== 初始化 ======
renderSidebar();

