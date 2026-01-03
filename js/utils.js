// Funciones utilitarias reutilizables para el proyecto
const Utils = {
  /**
   * Smooth scroll a un elemento
   * @param {string} selector - Selector del elemento destino
   */
  smoothScrollTo(selector) {
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  },

  /**
   * Debounce para limitar ejecución de funciones
   * @param {function} func - Función a ejecutar
   * @param {number} wait - Tiempo de espera en ms
   */
  debounce(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  /**
   * Formatear precio con separadores de miles
   * @param {number} price - Precio a formatear
   * @param {string} currency - Símbolo de moneda
   */
  formatPrice(price, currency = 'U$') {
    return `${currency} ${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  },

  // Lazy loading de imágenes
  initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  },

  /**
   * Copiar texto al portapapeles
   * @param {string} text - Texto a copiar
   */
  async copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.error('Error al copiar:', err);
      return false;
    }
  },

  /**
   * Detectar si es dispositivo móvil
   */
  isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  },

  /**
   * Obtener parámetros de la URL
   * @param {string} param - Nombre del parámetro
   */
  getUrlParameter(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  },

  /**
   * Validar email
   * @param {string} email - Email a validar
   */
  isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },

  /**
   * Agregar animación de entrada a elementos
   * @param {string} selector - Selector de elementos
   * @param {string} animationClass - Clase de animación
   */
  animateOnScroll(selector, animationClass = 'fade-in') {
    const elements = document.querySelectorAll(selector);
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(animationClass);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });

    elements.forEach(el => observer.observe(el));
  },

  /**
   * Inicializar tooltips
   */
  initTooltips() {
    const tooltips = document.querySelectorAll('[data-tooltip]');
    
    tooltips.forEach(element => {
      element.addEventListener('mouseenter', (e) => {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip-popup absolute bg-gray-800 text-white text-xs rounded py-1 px-2 z-50';
        tooltip.textContent = e.target.dataset.tooltip;
        tooltip.style.top = `${e.target.offsetTop - 30}px`;
        tooltip.style.left = `${e.target.offsetLeft}px`;
        document.body.appendChild(tooltip);
        
        e.target.addEventListener('mouseleave', () => {
          tooltip.remove();
        }, { once: true });
      });
    });
  },

  /**
   * Scroll to top suave
   */
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
};

// Inicializar funcionalidades útiles al cargar
document.addEventListener('DOMContentLoaded', () => {
  // Lazy loading de imágenes
  Utils.initLazyLoading();
  
  // Tooltips
  Utils.initTooltips();
});

// Exportar para uso global
window.Utils = Utils;