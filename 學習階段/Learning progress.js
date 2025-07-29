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
