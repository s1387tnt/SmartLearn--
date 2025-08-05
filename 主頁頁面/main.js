// 用戶下拉選單功能
const profileButton = document.querySelector('.profile-button');
const dropdownMenu = document.querySelector('.dropdown-menu');

profileButton.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdownMenu.classList.toggle('show');
});

// 點擊其他地方關閉下拉選單
document.addEventListener('click', () => {
    dropdownMenu.classList.remove('show');
});

// 防止點擊下拉選單內容時關閉
dropdownMenu.addEventListener('click', (e) => {
    e.stopPropagation();
});

// 下拉選單項目點擊事件
const dropdownItems = document.querySelectorAll('.dropdown-item');
dropdownItems.forEach(item => {
    item.addEventListener('click', () => {
        console.log(`點擊了: ${item.textContent}`);
        dropdownMenu.classList.remove('show');
    });
});

// 日曆導航功能
const calendarNavs = document.querySelectorAll('.calendar-nav');
const calendarTitle = document.querySelector('.calendar-title');
const calendarGrid = document.querySelector('.calendar-grid');

const today = new Date();
let currentMonth = today.getMonth();  // 0-based
let currentYear = today.getFullYear();

const months = ['一月', '二月', '三月', '四月', '五月', '六月',
               '七月', '八月', '九月', '十月', '十一月', '十二月'];

const weekDays = ['日', '一', '二', '三', '四', '五', '六'];

// 獲取某月的天數
function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

// 獲取某月第一天是星期幾 (0=星期日, 1=星期一...)
function getFirstDayOfMonth(year, month) {
    return new Date(year, month, 1).getDay();
}

// 生成日曆
function generateCalendar() {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
    const today = new Date();
    const isCurrentMonth = today.getFullYear() === currentYear && today.getMonth() === currentMonth;
    const todayDate = today.getDate();

    // 清空現有內容
    calendarGrid.innerHTML = '';

    // 添加星期標題
    weekDays.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'calendar-day-header';
        dayHeader.textContent = day;
        calendarGrid.appendChild(dayHeader);
    });

    // 添加空白格子（上個月的最後幾天）
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day';
        calendarGrid.appendChild(emptyDay);
    }

    // 添加當月的日期
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;

        // 標記今天
        if (isCurrentMonth && day === todayDate) {
            dayElement.classList.add('today');
        }

        // 添加點擊事件
        dayElement.addEventListener('click', () => {
            // 移除之前的選中狀態
            document.querySelectorAll('.calendar-day.selected').forEach(el => {
                el.classList.remove('selected');
            });
            // 添加選中狀態
            dayElement.classList.add('selected');
        });

        calendarGrid.appendChild(dayElement);
    }

    // 計算剩餘格子並填充下個月的前幾天
    const totalCells = calendarGrid.children.length - 7; // 減去星期標題
    const remainingCells = 42 - totalCells; // 6行x7列 - 已用格子

    for (let day = 1; day <= remainingCells && remainingCells < 7; day++) {
        const nextMonthDay = document.createElement('div');
        nextMonthDay.className = 'calendar-day next-month';
        nextMonthDay.textContent = day;
        calendarGrid.appendChild(nextMonthDay);
    }
}

// 更新日曆
function updateCalendar() {
    calendarTitle.textContent = `${currentYear}年 ${months[currentMonth]}`;
    generateCalendar();
}

// 上一個月
calendarNavs[0].addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    updateCalendar();
});

// 下一個月
calendarNavs[1].addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    updateCalendar();
});

// 初始化日曆
updateCalendar();

// 更新學習進度
function updateProgress(percentage) {
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.game-banner .progress-text'); // 明確指定遊戲橫幅中的進度文字
    const gameCharacter = document.querySelector('.game-character');
    const progressContainer = document.querySelector('.progress-container');
    
    // 更新進度條寬度和文字
    progressFill.style.width = percentage + '%';
    if (progressText) {
        progressText.textContent = percentage + '%';
    }
    
    // 等待元素載入完成後計算位置
    setTimeout(() => {
        if (progressContainer && gameCharacter) {
            const containerWidth = progressContainer.offsetWidth;
            const characterWidth = 48;
            
            // 計算猴子應該在進度條上的位置
            const progressPosition = (percentage / 100) * (containerWidth - characterWidth);
            
            gameCharacter.style.left = progressPosition + 'px';
        }
    }, 50);
}
        
        // 更新左側班級進度（獨立函數）
        function updateClassProgress(percentage) {
            const classProgressText = document.querySelector('.class-card .progress-text');
            if (classProgressText) {
                classProgressText.textContent = ` ${percentage}%`;
            }
            
            // 更新進度點
            const progressDots = document.querySelectorAll('.class-card .progress-dot');
            const activeDots = Math.ceil((percentage / 100) * progressDots.length);
            
            progressDots.forEach((dot, index) => {
                if (index < activeDots) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
        
        // 頁面載入完成後初始化
        window.addEventListener('load', () => {
            updateProgress(65);
            updateClassProgress(60); // 班級進度保持60%
        });
        
        // 備用初始化（以防 load 事件已經觸發）
        setTimeout(() => {
            updateProgress(65);
            updateClassProgress(60);
        }, 200);
        
        // 測試進度變化（演示用，實際使用時可以刪除）
        setTimeout(() => {
            let testProgress = 65;
            const progressTest = setInterval(() => {
                testProgress += 10;
                if (testProgress > 100) {
                    testProgress = 10;
                }
                updateProgress(testProgress);
                // 左側班級進度保持獨立，不隨測試變化
            }, 2000);
        }, 1000);

// 商店按鈕點擊效果
const shopButton = document.querySelector('.shop-button');
shopButton.addEventListener('click', () => {
    console.log('商店按鈕被點擊');
    // 這裡可以添加跳轉到商店頁面的邏輯
});

// 更多按鈕點擊效果
const moreButton = document.querySelector('.more-button');
moreButton.addEventListener('click', () => {
    console.log('更多按鈕被點擊');
    // 這裡可以添加顯示更多功能選單的邏輯
});

// 課程卡片點擊效果
const classCard = document.querySelector('.class-card');
classCard.addEventListener('click', () => {
    classCard.style.transform = 'scale(0.98)';
    setTimeout(() => {
        classCard.style.transform = 'scale(1)';
    }, 100);
});