// Sistema de pestañas para alternar entre vista de producto e imágenes
class TabSystem {
    constructor() {
    this.productTab = null;
    this.imagesTab = null;
    this.productSection = null;
    this.imagesSection = null;
    this.init();
    }

    init() {
    // Esperar a que el DOM esté completamente cargado
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
        this.setup();
    }
    }

    setup() {
    // Obtener referencias a los elementos
    this.productTab = document.getElementById('product-tab');
    this.imagesTab = document.getElementById('images-tab');
    this.productSection = document.getElementById('information-section');
    this.imagesSection = document.getElementById('images-section');

    // Verificar que todos los elementos existan
    if (!this.productTab || !this.imagesTab || !this.productSection || !this.imagesSection) {
        console.warn('Tab system: Algunos elementos no se encontraron');
        return;
    }

    // Asignar event listeners
    this.productTab.addEventListener('click', () => this.switchToProduct());
    this.imagesTab.addEventListener('click', () => this.switchToImages());

    // Establecer estado inicial
    this.switchToProduct();
    }

    switchToProduct() {
    // Mostrar sección de producto
    this.productSection.classList.remove('hidden');
    this.imagesSection.classList.add('hidden');

    // Actualizar estilos de los tabs
    this.productTab.classList.remove('bg-gray-100', 'text-gray-700');
    this.productTab.classList.add('bg-blue-600', 'text-white');

    this.imagesTab.classList.remove('bg-blue-600', 'text-white');
    this.imagesTab.classList.add('bg-gray-100', 'text-gray-700');
    }

    switchToImages() {
    // Mostrar sección de imágenes
    this.productSection.classList.add('hidden');
    this.imagesSection.classList.remove('hidden');

    // Actualizar estilos de los tabs
    this.imagesTab.classList.remove('bg-gray-100', 'text-gray-700');
    this.imagesTab.classList.add('bg-blue-600', 'text-white');

    this.productTab.classList.remove('bg-blue-600', 'text-white');
    this.productTab.classList.add('bg-gray-100', 'text-gray-700');
    }
}

// Inicializar el sistema de pestañas
const tabSystem = new TabSystem();

// Exportar para uso global si es necesario
window.TabSystem = TabSystem;