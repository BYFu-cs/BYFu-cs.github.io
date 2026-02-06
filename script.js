// script.js
// 目標：全站通用、在缺少對應 DOM 元素時也不報錯。

document.addEventListener('DOMContentLoaded', function () {
  // for pagination-container（只有存在 .posts + #pagination-container 才啟用）
  const postsContainer = document.querySelector('.posts');
  const paginationContainer = document.getElementById('pagination-container');

  if (postsContainer && paginationContainer) {
    const postsPerPage = 3;
    const posts = Array.from(postsContainer.getElementsByClassName('post'));
    const totalPages = Math.ceil(posts.length / postsPerPage);

    function showPage(page) {
      posts.forEach((post, index) => {
        post.style.display =
          index >= (page - 1) * postsPerPage && index < page * postsPerPage
            ? 'block'
            : 'none';
      });
    }

    function createPagination() {
      paginationContainer.innerHTML = '';
      const currentActive = document.querySelector('.pagination-link.active');
      const currentPage = parseInt(currentActive ? currentActive.textContent : '1', 10) || 1;

      for (let i = 1; i <= totalPages; i++) {
        if (
          i === 1 ||
          i === totalPages ||
          (i >= currentPage - 2 && i <= currentPage + 2)
        ) {
          const link = document.createElement('a');
          link.href = '#';
          link.textContent = String(i);
          link.className = 'pagination-link';
          link.addEventListener('click', function (e) {
            e.preventDefault();
            document
              .querySelectorAll('.pagination-link')
              .forEach((link) => link.classList.remove('active'));
            this.classList.add('active');
            showPage(i);
            createPagination();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          });
          paginationContainer.appendChild(link);
        } else if (i === currentPage - 3 || i === currentPage + 3) {
          const ellipsis = document.createElement('span');
          ellipsis.textContent = '...';
          paginationContainer.appendChild(ellipsis);
        }
      }
    }

    if (posts.length > 0) {
      createPagination();
      showPage(1); // show the first page by default
      const first = document.querySelector('.pagination-link');
      if (first) first.classList.add('active');
    }
  }

  // Cookie popup（只有存在 popupBox + buttons 才啟用）
  const popupBox = document.getElementById('popupBox');
  const agreeBtn = document.getElementById('agreeBtn');
  const disagreeBtn = document.getElementById('disagreeBtn');

  if (popupBox && agreeBtn && disagreeBtn) {
    // 检查是否已显示过弹窗
    const hasShownPopup = sessionStorage.getItem('hasShownPopup');
    if (!hasShownPopup) {
      popupBox.style.display = 'block';
      popupBox.classList.add('active');
    }

    // 处理“同意”按钮点击
    agreeBtn.addEventListener('click', function () {
      sessionStorage.setItem('hasShownPopup', 'true');
      popupBox.style.display = 'none';
      popupBox.classList.remove('active');
    });

    // 处理“不同意”按钮点击
    disagreeBtn.addEventListener('click', function () {
      sessionStorage.setItem('hasShownPopup', 'true');
      popupBox.style.display = 'none';
      popupBox.classList.remove('active');
    });
  }
});
/*
function toggleMenu() {
    var menu = document.getElementById('menu');
    var menuIcon = document.querySelector('.menu-icon');
    if (menu.style.display === 'block') {
        menu.style.display = 'none';
        window.removeEventListener('scroll', updateMenuPosition);
    } else {
        var rect = menuIcon.getBoundingClientRect();
        menu.style.top = rect.bottom + 'px';
        menu.style.left = rect.left + 'px';
        menu.style.display = 'block';
        window.addEventListener('scroll', updateMenuPosition);
    }
}

function updateMenuPosition() {
    var menu = document.getElementById('menu');
    var menuIcon = document.querySelector('.menu-icon');
    var rect = menuIcon.getBoundingClientRect();
    menu.style.top = rect.bottom + 'px';
    menu.style.left = rect.left + 'px';
}
*/

function toggleMenu() {
            var menu = document.getElementById('menu');
            if (menu.style.display === 'block') {
                menu.style.display = 'none';
            } else {
                menu.style.display = 'block';
            }
        }

// script.js
window.onscroll = function() {
  scrollFunction();
};

function scrollFunction() {
  var btn = document.getElementById('backToTop');
  if (!btn) return;
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    btn.style.display = 'block';
  } else {
    btn.style.display = 'none';
  }
}

function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

// 搜索圖標點擊：不做“提交”，只聚焦輸入框，避免未定義函數報錯
function performSearch() {
  var input = document.getElementById('search-input');
  if (input) input.focus();
}

