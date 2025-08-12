let dialogVisible = false;

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

function toggleDialog() {
    const dialogBox = document.getElementById('dialogBox');
    const progressContainer = document.getElementById('progressContainer');
    const progressTitle = document.getElementById('progressTitle');
    const chatButton = document.getElementById('chatButton');

    if (!dialogVisible) {
        // 顯示對話框並調整進度區域寬度
        dialogBox.classList.add('show');
        progressContainer.classList.add('compressed');
        progressTitle.textContent = '我的學習進度';
        chatButton.classList.add('active');
        dialogVisible = true;
    } else {
        // 隱藏對話框並恢復進度區域滿版
        dialogBox.classList.remove('show');
        progressContainer.classList.remove('compressed');
        progressTitle.textContent = '我的學習進度';
        chatButton.classList.remove('active');
        dialogVisible = false;
    }
}

function selectCard(index) {
    const cards = document.querySelectorAll('.progress-card');
    cards.forEach(card => card.classList.remove('selected'));
    cards[index].classList.add('selected');
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const messagesContainer = document.getElementById('chatMessages');
    const message = input.value.trim();

    if (message === '') return;

    const userMessage = document.createElement('div');
    userMessage.className = 'bg-blue-500 text-white rounded-lg p-3 text-sm ml-8 text-right';
    userMessage.textContent = message;
    messagesContainer.appendChild(userMessage);

    input.value = '';
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    setTimeout(() => {
        const aiResponse = document.createElement('div');
        aiResponse.className = 'bg-gray-100 rounded-lg p-3 text-sm text-gray-700';
        aiResponse.textContent = '謝謝您的問題！我正在為您分析學習進度和建議...';
        messagesContainer.appendChild(aiResponse);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 500);
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function goToCalendar() {
    const progressPage = document.getElementById('progressPage');
    const calendarPage = document.getElementById('calendarPage');
    const dialogBox = document.getElementById('dialogBox');
    const chatButton = document.getElementById('chatButton');

    progressPage.style.display = 'none';
    calendarPage.style.display = 'block';

    if (dialogVisible) {
        dialogBox.classList.remove('show');
        chatButton.classList.remove('active');
        dialogVisible = false;
    }
}

// 點擊其他地方關閉對話框
document.addEventListener('click', function(e) {
    const dialogBox = document.getElementById('dialogBox');
    const progressContainer = document.getElementById('progressContainer');
    const progressTitle = document.getElementById('progressTitle');
    const chatButton = document.getElementById('chatButton');
    
    if (dialogVisible && 
        !e.target.closest('#dialogBox') && 
        !e.target.closest('#chatButton')) {
        
        dialogBox.classList.remove('show');
        progressContainer.classList.remove('compressed');
        progressTitle.textContent = '我的學習進度';
        chatButton.classList.remove('active');
        dialogVisible = false;
    }
});

// 防止點擊對話框內部時關閉對話框
document.addEventListener('DOMContentLoaded', function() {
    const dialogBox = document.getElementById('dialogBox');
    if (dialogBox) {
        dialogBox.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
});

// 頁面載入完成後的初始化
window.onload = function() {
    document.getElementById('progressPage').style.display = 'block';
    document.getElementById('calendarPage').style.display = 'none';
    document.getElementById('dialogBox').classList.remove('show');
};