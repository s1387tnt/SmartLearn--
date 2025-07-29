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

const subjectButton = document.querySelector(".subject-button");
const arrowButtons = document.querySelectorAll(".arrow-button");

if (subjectButton) {
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

// 📌 [2] 學習進度下拉選單開關
const progressButton = document.getElementById("progressBtn");
const progressDropdown = document.getElementById("progressDropdown");

if (progressButton && progressDropdown) {
  progressButton.addEventListener("click", (event) => {
    event.stopPropagation();
    progressDropdown.classList.toggle("hidden");
  });

  window.addEventListener("click", () => {
    if (!progressDropdown.classList.contains("hidden")) {
      progressDropdown.classList.add("hidden");
    }
  });
}

// 📌 [3] 甘特圖卡片分頁顯示
const cards = Array.from({ length: 12 }, (_, i) => `甘特圖 ${i + 1}`);
const cardsPerPage = 6;
let currentPage = 0;

const grid = document.getElementById("cardGrid");
const prev = document.getElementById("prevPage");
const next = document.getElementById("nextPage");
const addInput = document.getElementById("newCardInput");
const addBtn = document.getElementById("addCardBtn");

function renderPage() {
  if (!grid) return;
  grid.innerHTML = "";
  const start = currentPage * cardsPerPage;
  const end = start + cardsPerPage;

  cards.slice(start, end).forEach((title) => {
    const card = document.createElement("div");
    card.className =
      "bg-white rounded-xl shadow-sm aspect-[4/3] p-4 flex flex-col justify-between";

    card.innerHTML = `
        <div class="flex-1"></div>
        <button class="gantt-title-btn w-full bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 rounded-b-xl transition">
          ${title}
        </button>
      `;

    const titleBtn = card.querySelector(".gantt-title-btn");
    titleBtn.addEventListener("click", () => {
      const encodedTitle = encodeURIComponent(title);
      window.location.href = `gantt.html?title=${encodedTitle}`;
    });

    grid.appendChild(card);
  });

  if (prev) {
    prev.style.display = currentPage > 0 ? "flex" : "none";
  }
  if (next) {
    next.style.display =
      (currentPage + 1) * cardsPerPage < cards.length ? "flex" : "none";
  }
}

if (prev && next) {
  prev.addEventListener("click", () => {
    if (currentPage > 0) {
      currentPage--;
      renderPage();
    }
  });

  next.addEventListener("click", () => {
    if ((currentPage + 1) * cardsPerPage < cards.length) {
      currentPage++;
      renderPage();
    }
  });
}

if (addBtn && addInput) {
  addBtn.addEventListener("click", () => {
    const newCardName = addInput.value.trim();
    if (newCardName !== "") {
      cards.push(newCardName);
      addInput.value = "";
      currentPage = Math.floor((cards.length - 1) / cardsPerPage);
      renderPage();
    }
  });
}

renderPage();
