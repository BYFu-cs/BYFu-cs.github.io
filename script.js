// script.js

document.addEventListener('DOMContentLoaded', function() {
    const popupBox = document.getElementById('popupBox');
    const agreeBtn = document.getElementById('agreeBtn');
    const disagreeBtn = document.getElementById('disagreeBtn');
    //for pagination-container
    const postsPerPage = 4;
    const postsContainer = document.querySelector('.posts');
    const paginationContainer = document.getElementById('pagination-container');
    const posts = Array.from(postsContainer.getElementsByClassName('post'));
    const totalPages = Math.ceil(posts.length / postsPerPage);

    function showPage(page) {
      posts.forEach((post, index) => {
        post.style.display = (index >= (page - 1) * postsPerPage && index < page * postsPerPage) ? 'block' : 'none';
      });
    }

    function createPagination() {
      paginationContainer.innerHTML = '';
      const maxVisiblePages = 5;
      const currentPage = parseInt(document.querySelector('.pagination-link.active')?.textContent || 1);

      for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
          const link = document.createElement('a');
          link.href = '#';
          link.textContent = i;
          link.className = 'pagination-link';
          link.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelectorAll('.pagination-link').forEach(link => link.classList.remove('active'));
            this.classList.add('active');
            showPage(i);
            createPagination();
          });
          paginationContainer.appendChild(link);
        } else if (i === currentPage - 3 || i === currentPage + 3) {
          const ellipsis = document.createElement('span');
          ellipsis.textContent = '...';
          paginationContainer.appendChild(ellipsis);
        }
      }
    }

    createPagination();
    showPage(1); // show the first page by default
    document.querySelector('.pagination-link').classList.add('active');

    
    // 检查是否已显示过弹窗
    const hasShownPopup = sessionStorage.getItem('hasShownPopup');
    if (!hasShownPopup) {
        // 显示弹窗
        popupBox.style.display = 'block';
        document.getElementById("popupBox").classList.add("active");
    }

    // 处理“同意”按钮点击
    agreeBtn.addEventListener('click', function() {
        // 在这里执行同意操作
        // 例如继续浏览页面或执行其他操作
        console.log('用户同意继续浏览页面');
        // 设置标记，表示已显示过弹窗
        sessionStorage.setItem('hasShownPopup', 'true');
        // 隐藏弹窗
        popupBox.style.display = 'none';
        document.getElementById("popupBox").classList.remove("active");
    });

    // 处理“不同意”按钮点击
    disagreeBtn.addEventListener('click', function() {
        // 在这里执行不同意操作
        // 例如关闭弹窗或执行其他操作
        console.log('用户不同意继续浏览页面');
        // 设置标记，表示已显示过弹窗
        sessionStorage.setItem('hasShownPopup', 'true');
        // 隐藏弹窗
        popupBox.style.display = 'none';
        document.getElementById("popupBox").classList.remove("active");
    });
});

document.querySelector('.menu-toggle').addEventListener('click', function() {
      var menuContainer = this.nextElementSibling;
      var buttonRect = this.getBoundingClientRect();
      var menuRect = menuContainer.getBoundingClientRect();
      var windowHeight = window.innerHeight;
      var windowWidth = window.innerWidth;

      // 检查菜单是否超出视口底部
      if (buttonRect.top + menuRect.height > windowHeight) {
        // 将菜单向上移动以适应视口
        menuContainer.style.top = (buttonRect.top - menuRect.height) + 'px';
      } else {
        // 将菜单向下移动以适应视口
        menuContainer.style.top = (buttonRect.top + buttonRect.height) + 'px';
      }

      // 检查菜单是否超出视口右侧
      if (buttonRect.left + menuRect.width > windowWidth) {
        // 将菜单向左移动以适应视口
        menuContainer.style.left = (buttonRect.left - menuRect.width) + 'px';
      } else {
        // 将菜单向右移动以适应视口
        menuContainer.style.left = (buttonRect.left) + 'px';
      }
    });


// script.js
window.onscroll = function() {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("backToTop").style.display = "block";
  } else {
    document.getElementById("backToTop").style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

