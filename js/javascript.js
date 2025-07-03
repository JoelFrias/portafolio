// Datos de los proyectos
const projectsData = {
    'ysapelli': {
        title: 'Sistema de Gestión Empresarial ysapelli',
        owner: 'www.ysapelli.com',
        duration: '3 meses',
        status: 'En Producción',
        technologies: 'PHP, JavaScript, MySQL, AJAX, HTML, CSS, Hosting Web',
        description: 'Sistema completo de gestión empresarial que incluye módulos de empleados, control de inventario, facturación, reportes, caja, ventas de vendedores ambulantes, graficos de ventas, reordenamiento de productos. La aplicación permite a las empresas gestionar de manera eficiente todos sus procesos internos desde una sola plataforma, con interfaces intuitivas y funcionalidades robustas para diferentes roles de usuario.',
        images: 9,
        imagePath: 'images/gallery/ysapelli/'
    },
    'mary-variedades': {
        title: 'Sistema de Ventas Mary Variedades',
        owner: '@mary_variddes',
        duration: '2 meses',
        status: 'En Producción',
        technologies: 'Java, NetBeans, MySQL, JasperReports',
        description: 'Sistema de gestión de ventas diseñado para pequeños comercios, que incluye módulos de control de inventario, facturación, generación de reportes, gestión de productos, y control de ventas por empleados. La aplicación facilita a los negocios minoristas gestionar de forma ordenada y eficiente sus operaciones diarias desde una única plataforma, con interfaces amigables y funciones robustas para distintos niveles de usuario.',
        images: 5,
        imagePath: 'images/gallery/mary-variedades/'
    }
};

function showSection(sectionName) {
    // Ocultar todas las secciones
    document.getElementById('about-section').classList.add('hidden');
    document.getElementById('projects-section').classList.add('hidden');
    
    // Mostrar la sección seleccionada
    document.getElementById(sectionName + '-section').classList.remove('hidden');
    
    // Actualizar navegación
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => link.classList.remove('active'));
    event.target.classList.add('active');
}

function openProject(projectId) {
    const project = projectsData[projectId];
    if (!project) return;

    // Llenar el modal con los datos del proyecto
    document.getElementById('modalTitle').textContent = project.title;
    document.getElementById('modalOwner').textContent = project.owner;
    document.getElementById('modalDuration').textContent = project.duration;
    document.getElementById('modalStatus').textContent = project.status;
    document.getElementById('modalTech').textContent = project.technologies;
    document.getElementById('modalDescription').textContent = project.description;

    // Generar galería de imágenes con imágenes reales
    const gallery = document.getElementById('modalGallery');
    gallery.innerHTML = '';
    
    for (let i = 1; i <= project.images; i++) {
        const imageContainer = document.createElement('div');
        imageContainer.className = 'gallery-image-container';
        
        const img = document.createElement('img');
        img.src = `${project.imagePath}image-${i}.png`;
        img.alt = `${project.title} - Imagen ${i}`;
        img.className = 'gallery-image';
        img.loading = 'lazy';
        
        // Manejar errores de carga de imagen
        img.onerror = function() {
            this.src = 'images/none.png'; // Imagen por defecto si no se encuentra
            this.alt = 'Imagen no disponible';
        };
        
        // Agregar evento click para ampliar imagen
        img.onclick = function() {
            openImageModal(this.src, this.alt);
        };
        
        imageContainer.appendChild(img);
        gallery.appendChild(imageContainer);
    }

    // Mostrar el modal
    document.getElementById('projectModal').style.display = 'block';
}

// Función mejorada para ampliar imágenes
function openImageModal(imageSrc, imageAlt) {
    // Verificar si ya existe un modal de imagen y eliminarlo
    const existingModal = document.getElementById('imageModal');
    if (existingModal) {
        document.body.removeChild(existingModal);
    }

    // Crear modal para imagen ampliada
    const imageModal = document.createElement('div');
    imageModal.id = 'imageModal';
    imageModal.className = 'image-modal';
    
    // Aplicar estilos directamente al modal
    imageModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        cursor: pointer;
    `;
    
    imageModal.innerHTML = `
        <div class="image-modal-content" style="
            position: relative;
            max-width: 90%;
            max-height: 90%;
            background: white;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
            cursor: default;
        ">
            <span class="close-image-modal" style="
                position: absolute;
                top: 1px;
                right: 3px;
                font-size: 28px;
                font-weight: bold;
                color: rgb(235 0 0);
                cursor: pointer;
                z-index: 10001;
                line-height: 1;
                user-select: none;
                transition: color 0.3s;
            ">&times;</span>
            <img src="${imageSrc}" alt="${imageAlt}" class="modal-image" style="
                max-width: 100%;
                max-height: 80vh;
                object-fit: contain;
                display: block;
                margin: 0 auto;
                border-radius: 4px;
            ">
            <p style="
                text-align: center;
                margin-top: 10px;
                color: #666;
                font-size: 14px;
            ">${imageAlt}</p>
        </div>
    `;
    
    document.body.appendChild(imageModal);
    
    // Prevenir scroll del body cuando el modal está abierto
    document.body.style.overflow = 'hidden';
    
    // Cerrar modal de imagen al hacer clic en la X
    const closeBtn = imageModal.querySelector('.close-image-modal');
    closeBtn.onmouseover = function() {
        this.style.color = '#ff0000';
    };
    closeBtn.onmouseout = function() {
        this.style.color = '#333';
    };
    closeBtn.onclick = function(e) {
        e.stopPropagation();
        closeImageModal();
    };
    
    // Cerrar modal al hacer clic en el fondo
    imageModal.onclick = function(event) {
        if (event.target === imageModal) {
            closeImageModal();
        }
    };
    
    // Prevenir que el clic en el contenido cierre el modal
    imageModal.querySelector('.image-modal-content').onclick = function(e) {
        e.stopPropagation();
    };
    
    // Cerrar modal con la tecla Escape
    const handleEscape = function(e) {
        if (e.key === 'Escape') {
            closeImageModal();
        }
    };
    document.addEventListener('keydown', handleEscape);
    
    // Guardar la referencia del event listener para poder removerlo después
    imageModal._escapeHandler = handleEscape;
}

// Función para cerrar el modal de imagen
function closeImageModal() {
    const imageModal = document.getElementById('imageModal');
    if (imageModal) {
        // Restaurar scroll del body
        document.body.style.overflow = '';
        
        // Remover event listener de escape
        if (imageModal._escapeHandler) {
            document.removeEventListener('keydown', imageModal._escapeHandler);
        }
        
        // Remover el modal
        document.body.removeChild(imageModal);
    }
}

function closeModal() {
    document.getElementById('projectModal').style.display = 'none';
}

// Cerrar modal al hacer clic fuera de él
window.onclick = function(event) {
    const modal = document.getElementById('projectModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}