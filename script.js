// script.js
// 全站共用行為：無對應 DOM 時仍可安全運行
document.addEventListener('DOMContentLoaded', function () {
  // 分頁（僅當 .posts + #pagination-container 同時存在時啟用）
  const postsContainer = document.querySelector('.posts');
  const paginationContainer = document.getElementById('pagination-container');

  if (postsContainer && paginationContainer) {
    const postsPerPage = 3;
    const posts = Array.from(postsContainer.getElementsByClassName('post'));
    const totalPages = Math.ceil(posts.length / postsPerPage);

    if (posts.length > 0) {
      function showPage(page) {
        posts.forEach((post, index) => {
          post.style.display =
            index >= (page - 1) * postsPerPage && index < page * postsPerPage
              ? 'block'
              : 'none';
        });
      }

      function createPagination(currentPage = 1) {
        paginationContainer.innerHTML = '';

        for (let i = 1; i <= totalPages; i++) {
          if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
            const link = document.createElement('a');
            link.href = '#';
            link.textContent = String(i);
            link.className = 'pagination-link';
            if (i === currentPage) {
              link.classList.add('active');
            }
            link.addEventListener('click', function (e) {
              e.preventDefault();
              createPagination(i);
              showPage(i);
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

      createPagination(1);
      showPage(1);
    }
  }

  // Cookie 同意彈窗（僅當元素都存在才啟用）
  const popupBox = document.getElementById('popupBox');
  const agreeBtn = document.getElementById('agreeBtn');
  const disagreeBtn = document.getElementById('disagreeBtn');

  if (popupBox && agreeBtn && disagreeBtn) {
    if (!sessionStorage.getItem('hasShownPopup')) {
      popupBox.style.display = 'block';
      popupBox.classList.add('active');
    }

    function hidePopup() {
      popupBox.style.display = 'none';
      popupBox.classList.remove('active');
      sessionStorage.setItem('hasShownPopup', 'true');
    }

    agreeBtn.addEventListener('click', hidePopup);
    disagreeBtn.addEventListener('click', hidePopup);
  }

  // 行動版導覽選單：按鈕下方自然展開、背景不突兀
  const menuToggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu');

  if (menuToggle && menu) {
    const BREAKPOINT = 860;
    let isOpen = false;

    function syncMenuState(nextState) {
      isOpen = nextState;
      menu.hidden = !nextState;
      menu.classList.toggle('is-open', nextState);
      menuToggle.classList.toggle('is-active', nextState);
      menuToggle.setAttribute('aria-expanded', String(nextState));
      menuToggle.setAttribute('aria-label', nextState ? 'Close main menu' : 'Open main menu');
    }

    function closeMenu() {
      syncMenuState(false);
    }

    function openMenu() {
      syncMenuState(true);
    }

    function toggleMenu() {
      isOpen ? closeMenu() : openMenu();
    }

    function closeOnResize() {
      if (window.innerWidth > BREAKPOINT && isOpen) {
        closeMenu();
      }
    }

    menu.hidden = true;
    menu.setAttribute('aria-hidden', 'true');
    syncMenuState(false);

    menuToggle.addEventListener('click', function () {
      toggleMenu();
    });

    menu.addEventListener('click', function (event) {
      if (event.target.tagName === 'A') {
        closeMenu();
      }
    });

    document.addEventListener('click', function (event) {
      if (!isOpen) return;
      if (!menu.contains(event.target) && !menuToggle.contains(event.target)) {
        closeMenu();
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && isOpen) {
        closeMenu();
      }
    });

    window.addEventListener('resize', closeOnResize);
    closeOnResize();

    window.toggleMenu = toggleMenu;
  }
});

window.addEventListener('scroll', function () {
  scrollFunction();
});

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

