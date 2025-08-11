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
          
          // 添加點擊事件
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
        {
          id: 1,
          name: "小明",
          avatar: "👦",
          status: "online",
          statusText: "線上",
        },
        {
          id: 2,
          name: "小美",
          avatar: "👧",
          status: "online",
          statusText: "線上",
        },
        {
          id: 3,
          name: "阿華",
          avatar: "🧑",
          status: "offline",
          statusText: "離線",
        },
        {
          id: 4,
          name: "小花",
          avatar: "👩",
          status: "online",
          statusText: "線上",
        },
        {
          id: 5,
          name: "大雄",
          avatar: "👨",
          status: "offline",
          statusText: "離線",
        },
      ];

      // 好友列表功能
      const friendsListTrigger = document.getElementById("friendsListTrigger");
      const friendsSidebar = document.getElementById("friendsSidebar");
      const friendsOverlay = document.getElementById("friendsOverlay");
      const closeFriendsBtn = document.getElementById("closeFriendsBtn");
      const friendsContent = document.getElementById("friendsContent");
      const addFriendBtn = document.getElementById("addFriendBtn");
      const friendRequestsBtn = document.getElementById("friendRequestsBtn");

      // 渲染好友列表
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
              <div class="friend-status ${friend.status}">
                ${friend.statusText}
              </div>
            </div>
          `;
          friendsContent.appendChild(friendElement);
        });
      }

      // 根據ID生成頭像顏色
      function getAvatarColor(id) {
        const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD"];
        return colors[id % colors.length];
      }

      // 顯示好友列表
      function showFriendsList() {
        renderFriends();
        friendsSidebar.classList.add("show");
        friendsOverlay.classList.add("show");
        document.body.style.overflow = "hidden";
      }

      // 隱藏好友列表
      function hideFriendsList() {
        friendsSidebar.classList.remove("show");
        friendsOverlay.classList.remove("show");
        document.body.style.overflow = "";
      }

      // 事件監聽器
      friendsListTrigger.addEventListener("click", showFriendsList);
      closeFriendsBtn.addEventListener("click", hideFriendsList);
      friendsOverlay.addEventListener("click", hideFriendsList);

      // 按鈕功能
      addFriendBtn.addEventListener("click", () => {
        alert("新增好友功能");
        // 這裡可以添加新增好友的邏輯
      });

      friendRequestsBtn.addEventListener("click", () => {
        alert("好友請求功能");
        // 這裡可以添加查看好友請求的邏輯
      });

      // 原有的用戶下拉選單功能
      const profileButton = document.querySelector(".profile-button");
      const dropdownMenu = document.querySelector(".dropdown-menu");

      profileButton.addEventListener("click", (e) => {
        e.stopPropagation();
        dropdownMenu.classList.toggle("show");
      });

      // 點擊其他地方關閉下拉選單
      document.addEventListener("click", () => {
        dropdownMenu.classList.remove("show");
      });

      // 防止點擊下拉選單內容時關閉
      dropdownMenu.addEventListener("click", (e) => {
        e.stopPropagation();
      });

      // 下拉選單項目點擊事件
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

      const today = new Date();
      let currentMonth = today.getMonth(); // 0-based
      let currentYear = today.getFullYear();

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
        const isCurrentMonth =
          today.getFullYear() === currentYear && today.getMonth() === currentMonth;
        const todayDate = today.getDate();

        // 清空現有內容
        calendarGrid.innerHTML = "";

        // 添加星期標題
        weekDays.forEach((day) => {
          const dayHeader = document.createElement("div");
          dayHeader.className = "calendar-day-header";
          dayHeader.textContent = day;
          calendarGrid.appendChild(dayHeader);
        });

        // 添加空白格子（上個月的最後幾天）
        for (let i = 0; i < firstDay; i++) {
          const emptyDay = document.createElement("div");
          emptyDay.className = "calendar-day";
          calendarGrid.appendChild(emptyDay);
        }

        // 添加當月的日期
        for (let day = 1; day <= daysInMonth; day++) {
          const dayElement = document.createElement("div");
          dayElement.className = "calendar-day";
          dayElement.textContent = day;

          // 標記今天
          if (isCurrentMonth && day === todayDate) {
            dayElement.classList.add("today");
          }

          // 添加點擊事件
          dayElement.addEventListener("click", () => {
            // 移除之前的選中狀態
            document.querySelectorAll(".calendar-day.selected").forEach((el) => {
              el.classList.remove("selected");
            });
            // 添加選中狀態
            dayElement.classList.add("selected");
          });

          calendarGrid.appendChild(dayElement);
        }

        // 計算剩餘格子並填充下個月的前幾天
        const totalCells = calendarGrid.children.length - 7; // 減去星期標題
        const remainingCells = 42 - totalCells; // 6行x7列 - 已用格子

        for (let day = 1; day <= remainingCells && remainingCells < 7; day++) {
          const nextMonthDay = document.createElement("div");
          nextMonthDay.className = "calendar-day next-month";
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
      calendarNavs[0].addEventListener("click", () => {
        currentMonth--;
        if (currentMonth < 0) {
          currentMonth = 11;
          currentYear--;
        }
        updateCalendar();
      });

      // 下一個月
      calendarNavs[1].addEventListener("click", () => {
        currentMonth++;
        if (currentMonth > 11) {
          currentMonth = 0;
          currentYear++;
        }
        updateCalendar();
      });

      // 初始化日曆
      updateCalendar();

      // 香蕉被吃掉的狀態記錄
      let eatenBananas = new Set();

      // 修正後的學習進度更新函數（加入香蕉邏輯）
      function updateProgress(percentage) {
        const progressFill = document.querySelector(".progress-fill");
        const progressText = document.querySelector(".game-banner .progress-text");
        const gameCharacter = document.querySelector(".game-character");
        const progressContainer = document.querySelector(".progress-container");
        const progressTrack = document.querySelector(".progress-track");
        const bananas = document.querySelectorAll('.banana');

        // 更新進度條寬度和文字
        progressFill.style.width = percentage + "%";
        if (progressText) {
          progressText.textContent = percentage + "%";
        }

        // 等待元素載入完成後計算位置
        setTimeout(() => {
          if (progressContainer && gameCharacter && progressTrack) {
            // 使用進度軌道的實際寬度來計算位置
            const trackWidth = progressTrack.offsetWidth;
            const characterWidth = 34;
            
            // 關鍵修正：讓猴子的中心點對準進度條的末端
            // 猴子位置 = (進度百分比 / 100) * 軌道寬度 - (猴子寬度/2)
            const progressPixels = (percentage / 100) * trackWidth;
            const adjustedPosition = Math.max(characterWidth / 2, progressPixels - characterWidth / 2);
            
            gameCharacter.style.left = adjustedPosition + 'px';
            
            // 香蕉邏輯
            bananas.forEach(banana => {
              const bananaPosition = parseInt(banana.getAttribute('data-position'));
              
              // 如果猴子的進度超過或等於香蕉位置，且該香蕉還沒被吃掉
              if (percentage >= bananaPosition && !eatenBananas.has(bananaPosition)) {
                // 標記為已吃掉
                eatenBananas.add(bananaPosition);
                banana.classList.add('eaten');
                
                // 播放吃掉動畫效果
                console.log(`🐵 猴子吃掉了在 ${bananaPosition}% 位置的香蕉！`);
                
                // 400毫秒後完全隱藏
                setTimeout(() => {
                  banana.style.display = 'none';
                }, 400);
              }
              
              // 如果進度回退，重新顯示香蕉
              if (percentage < bananaPosition && eatenBananas.has(bananaPosition)) {
                eatenBananas.delete(bananaPosition);
                banana.classList.remove('eaten');
                banana.style.display = 'block';
                banana.style.opacity = '1';
                banana.style.transform = 'translateX(-50%)';
                console.log(`🍌 重新顯示在 ${bananaPosition}% 位置的香蕉`);
              }
            });
          }
        }, 50);
      }

      // 頁面載入完成後初始化
      window.addEventListener("load", () => {
        updateProgress(65);
        renderTasks(); // 初始化任務列表
      });

      // 備用初始化（以防 load 事件已經觸發）
      setTimeout(() => {
        updateProgress(65);
        renderTasks(); // 初始化任務列表
      }, 200);

      // 測試進度變化（演示用，實際使用時可以刪除）
      setTimeout(() => {
        let testProgress = 10;
        const progressTest = setInterval(() => {
          updateProgress(testProgress);
          console.log(`當前進度: ${testProgress}%`);
          
          testProgress += 10;
          if (testProgress > 100) {
            testProgress = 10;
            // 重置香蕉狀態
            eatenBananas.clear();
            document.querySelectorAll('.banana').forEach(banana => {
              banana.classList.remove('eaten');
              banana.style.display = 'block';
              banana.style.opacity = '1';
              banana.style.transform = 'translateX(-50%)';
            });
          }
        }, 2000);
      }, 1000);

      // 商店按鈕點擊效果
      const shopButton = document.querySelector(".shop-button");
      shopButton.addEventListener("click", () => {
        console.log("商店按鈕被點擊");
        // 這裡可以添加跳轉到商店頁面的邏輯
      });

      // 更多按鈕點擊效果
      const moreButton = document.querySelector(".more-button");
      moreButton.addEventListener("click", () => {
        console.log("更多按鈕被點擊");
        // 這裡可以添加顯示更多功能選單的邏輯
      });

      // 日曆點擊跳轉
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