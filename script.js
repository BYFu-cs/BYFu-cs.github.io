// script.js

// script.js

document.addEventListener('DOMContentLoaded', function() {
    const popupBox = document.getElementById('popupBox');
    const agreeBtn = document.getElementById('agreeBtn');
    const disagreeBtn = document.getElementById('disagreeBtn');

    // 检查是否已显示过弹窗
    const hasShownPopup = localStorage.getItem('hasShownPopup');
    if (!hasShownPopup) {
        // 显示弹窗
        popupBox.style.display = 'block';
    }

    // 处理“同意”按钮点击
    agreeBtn.addEventListener('click', function() {
        // 在这里执行同意操作
        // 例如继续浏览页面或执行其他操作
        console.log('用户同意继续浏览页面');
        // 设置标记，表示已显示过弹窗
        localStorage.setItem('hasShownPopup', 'true');
        // 隐藏弹窗
        popupBox.style.display = 'none';
    });

    // 处理“不同意”按钮点击
    disagreeBtn.addEventListener('click', function() {
        // 在这里执行不同意操作
        // 例如关闭弹窗或执行其他操作
        console.log('用户不同意继续浏览页面');
        // 设置标记，表示已显示过弹窗
        localStorage.setItem('hasShownPopup', 'true');
        // 隐藏弹窗
        popupBox.style.display = 'none';
    });
});

