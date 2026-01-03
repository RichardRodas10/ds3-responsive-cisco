// Sistema de modal para visualización de imágenes ampliadas. Incluye funcionalidad de zoom y navegación con teclado
class ImageModal {
    constructor() {
      this.modal = null;
      this.modalImage = null;
      this.init();
    }
  
    init() {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.setup());
      } else {
        this.setup();
      }
    }
  
    setup() {
      this.modal = document.getElementById('image-modal');
      this.modalImage = document.getElementById('modal-image');
  
      if (!this.modal || !this.modalImage) {
        console.warn('Image modal: Elementos del modal no encontrados');
        return;
      }
  
      // Event listeners
      this.setupEventListeners();
    }
  
    setupEventListeners() {
      // Cerrar modal con tecla ESC
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !this.modal.classList.contains('hidden')) {
          this.close();
        }
      });
  
      // Cerrar modal al hacer click fuera de la imagen
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) {
          this.close();
        }
      });
    }
  
    open(imageSrc) {
      if (!this.modal || !this.modalImage) return;
  
      this.modalImage.src = imageSrc;
      this.modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden'; // Prevenir scroll del body
    }
  
    close() {
      if (!this.modal) return;
  
      this.modal.classList.add('hidden');
      this.modalImage.src = '';
      document.body.style.overflow = ''; // Restaurar scroll del body
    }
  }
  
  // Inicializar el modal
  const imageModal = new ImageModal();
  
  /**
   * Función global para abrir el modal (llamada desde onclick en HTML)
   * @param {string} src - URL de la imagen a mostrar
   */
  function viewImage(src) {
    imageModal.open(src);
  }
  
  /**
   * Función global para cerrar el modal (llamada desde onclick en HTML)
   */
  function closeModal() {
    imageModal.close();
  }
  
  /**
   * Función para cambiar la imagen principal en la galería
   * @param {HTMLImageElement} thumbnail - Elemento de imagen miniatura clickeada
   */
  function toExchangeImage(thumbnail) {
    const mainImage = document.getElementById('img_main');
    if (mainImage && thumbnail) {
      mainImage.src = thumbnail.src;
    }
  }

  /**
 * Función para seleccionar miniatura y actualizar imagen principal
 * @param {HTMLImageElement} thumbnail - Miniatura clickeada
 */
function selectThumbnail(thumbnail) {
  // Remover selección de todas las miniaturas
  document.querySelectorAll('.thumbnail-img').forEach(img => {
    img.classList.remove('border-blue-600');
    img.classList.add('border-gray-300');
  });
  
  // Marcar miniatura seleccionada
  thumbnail.classList.remove('border-gray-300');
  thumbnail.classList.add('border-blue-600');
  
  // Cambiar imagen principal
  const mainImage = document.getElementById('img_main');
  if (mainImage) {
    mainImage.src = thumbnail.src;
  }
}

// Exportar función
window.selectThumbnail = selectThumbnail;
  
  // Exportar para uso global
  window.ImageModal = ImageModal;
  window.viewImage = viewImage;
  window.closeModal = closeModal;
  window.toExchangeImage = toExchangeImage;