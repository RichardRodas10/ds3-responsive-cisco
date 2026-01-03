// Sistema de carga de componentes HTML: Carga navbar, submenu, breadcrumb, footer de forma dinámica
const ComponentLoader = {
  /**
   * Carga un componente HTML en el elemento especificado
   */
  async load(componentPath, targetSelector = 'body', position = 'afterbegin', callback = null) {
    try {
      console.log(`Cargando: ${componentPath}`);
      
      const response = await fetch(componentPath);
      
      if (!response.ok) {
        throw new Error(`Error loading component: ${componentPath} (${response.status})`);
      }
      
      const html = await response.text();
      const target = document.querySelector(targetSelector);
      
      if (!target) {
        // Cambiamos a warn para no detener la ejecución si un contenedor opcional no existe
        console.warn(`Target element not found: ${targetSelector}`);
        return false;
      }
      
      if (targetSelector.includes('-container')) {
        target.innerHTML = html;
      } else {
        target.insertAdjacentHTML(position, html);
      }
      
      console.log(`${componentPath} cargado en ${targetSelector}`);
      
      if (callback && typeof callback === 'function') {
        callback();
      }
      
      return true;
    } catch (error) {
      console.error('ComponentLoader Error:', error);
      return false;
    }
  },

  async loadMultiple(components) {
    for (const config of components) {
      await this.load(
        config.path,
        config.target || 'body',
        config.position || 'beforeend',
        config.callback || null
      );
    }
  },

  generateBreadcrumb(breadcrumbData) {
    const nav = document.getElementById('breadcrumb-nav');
    if (!nav) return;

    let html = `
      <a href="https://www.ds3comunicaciones.com/index.html" 
         class="flex-shrink-0 hover:text-blue-600 transition-colors">
        <i class="fa-solid fa-house text-[0.9em]"></i>
      </a>
    `;

    breadcrumbData.forEach((item, index) => {
      const isLast = index === breadcrumbData.length - 1;
      html += `
        <span class="text-gray-400 flex-shrink-0">
          <i class="fa-solid fa-angle-right text-[0.8em]"></i>
        </span>
      `;
      if (isLast) {
        html += `<span class="text-slate-800 font-medium flex-shrink-0">${item.label}</span>`;
      } else {
        html += `<a href="${item.url}" class="flex-shrink-0 hover:underline hover:text-blue-600">${item.label}</a>`;
      }
    });

    nav.innerHTML = html;
  },

  async initCommonComponents() {
    console.log('Iniciando carga de componentes...');
    
    // Carga en secuencia para respetar el DOM
    await this.loadMultiple([
      {
        path: './components/navbar.html',
        target: '#navbar-container',
        callback: () => {
          // Intenta inicializar si la función existe y el HTML ya está inyectado
          // Elimina llamadas redundantes para evitar el error "Elementos no encontrados"
          console.log('Navbar inyectado');
        }
      },
      {
        path: './components/submenu.html',
        target: '#submenu-container'
      },
      {
        path: './components/breadcrumb.html',
        target: '#breadcrumb-container',
        callback: () => {
          const breadcrumbData = window.breadcrumbData || [];
          if (breadcrumbData.length > 0) {
            this.generateBreadcrumb(breadcrumbData);
          }
        }
      },
      {
        path: './components/footer.html',
        target: '#footer-container'
      }
    ]);
    
    // UNA SOLA INICIALIZACIÓN AL FINAL DE TODO
    this.refreshScripts();
    console.log('Todos los componentes cargados y scripts refrescados');
  },

  /**
   * Llama a las funciones de inicialización una sola vez cuando todo el DOM está listo
   */
  refreshScripts() {
      if (typeof window.initializeNavbar === 'function') {
          window.initializeNavbar();
      }
  }
};

// Evitar doble ejecución con el listener
let isInitialized = false;
const startApp = () => {
    if (!isInitialized) {
        isInitialized = true;
        ComponentLoader.initCommonComponents();
    }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startApp);
} else {
  startApp();
}

window.ComponentLoader = ComponentLoader;