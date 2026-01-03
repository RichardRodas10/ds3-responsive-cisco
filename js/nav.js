// Funcionalidad del Navbar. Maneja menú móvil hamburguesa y submenús
(function() {
  'use strict';

  // Inicializa el menú móvil hamburguesa
  function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileMenuSidebar = document.getElementById('mobile-menu-sidebar');
    const closeMenuBtn = document.getElementById('close-menu-btn');

    if (!mobileMenuBtn || !mobileMenuOverlay || !mobileMenuSidebar) {
      console.log('Esperando elementos del menú móvil...');
      return;
    }

    // Abre el menú lateral
    function openMenu() {
      mobileMenuOverlay.classList.remove('pointer-events-none', 'opacity-0');
      mobileMenuOverlay.classList.add('pointer-events-auto', 'opacity-100');
      
      setTimeout(() => {
        mobileMenuSidebar.classList.remove('-translate-x-full');
      }, 10);
      
      document.body.style.overflow = 'hidden';
    }

    // Cierra el menú lateral
    function closeMenu() {
      mobileMenuSidebar.classList.add('-translate-x-full');
      
      setTimeout(() => {
        mobileMenuOverlay.classList.remove('pointer-events-auto', 'opacity-100');
        mobileMenuOverlay.classList.add('pointer-events-none', 'opacity-0');
      }, 300);
      
      document.body.style.overflow = '';
    }

    // Event Listeners
    mobileMenuBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      openMenu();
    });

    if (closeMenuBtn) {
      closeMenuBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        closeMenu();
      });
    }

    mobileMenuOverlay.addEventListener('click', function(e) {
      if (e.target === mobileMenuOverlay) {
        closeMenu();
      }
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        closeMenu();
      }
    });

    console.log('Menú móvil inicializado');
  }

  // Inicializa los submenús desplegables del menú lateral
  function initializeSubmenuToggles() {
    const menuToggles = document.querySelectorAll('.menu-toggle');

    if (menuToggles.length === 0) {
      return;
    }

    menuToggles.forEach(toggle => {
      // Clona el nodo para evitar duplicar eventos si se llama varias veces
      const newToggle = toggle.cloneNode(true);
      toggle.parentNode.replaceChild(newToggle, toggle);

      newToggle.addEventListener('click', function() {
        const targetId = this.getAttribute('data-target');
        const submenu = document.getElementById(`${targetId}-submenu`);
        const icon = this.querySelector('.menu-icon');
        
        if (submenu && icon) {
          submenu.classList.toggle('hidden');
          icon.classList.toggle('rotate-180');
        }
      });
    });

    console.log(`${menuToggles.length} submenús inicializados`);
  }

  // Función de inicialización principal
  function initializeNavbar() {
    console.log('Invocando funcionalidades del navbar...');
    initializeMobileMenu();
    initializeSubmenuToggles();
  }

  // Exportar funciones globales para que ComponentLoader pueda verlas
  window.initializeNavbar = initializeNavbar;
  window.initializeMobileMenu = initializeMobileMenu;
})();