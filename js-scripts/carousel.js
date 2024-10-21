const images = [
    "images/fondo_generico.jpg",
    "images/fondo_portada.jpg",
    "images/fondogenericocolor.jpg"
  ];
  
  const scrollContainer = document.getElementById('scrollContainer');
  let currentImageIndex = 0;
  let currentImage = null;
  let containerInitialized = false;
  let isTransitioning = false;
  let autoSlideInterval;
  
  // Estilos básicos para el contenedor
  scrollContainer.classList.add('scroll-container');
  
  // Create dots container
  const dotsContainer = document.createElement('div');
  dotsContainer.className = 'dots-container';
  scrollContainer.parentNode.appendChild(dotsContainer);
  
  // Create indicator dots
  images.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.className = 'dot';
    dot.addEventListener('click', () => {
        if (!isTransitioning && index !== currentImageIndex) {
            clearInterval(autoSlideInterval);
            loadImage(index);
            startAutoSlide();
        }
    });
    dotsContainer.appendChild(dot);
  });
  
  function updateDots() {
    const dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        if (index === currentImageIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
  }
  
  function loadImage(index) {
    if (isTransitioning) return;
    isTransitioning = true;
    currentImageIndex = index;
  
    const imgElement = document.createElement('img');
    imgElement.src = images[index];
    imgElement.alt = "MTG background images";
    imgElement.className = 'carousel-image';
  
    // Precargar la imagen
    const preloadImage = new Image();
    preloadImage.src = images[index];
    preloadImage.onload = () => {
        if (!containerInitialized) {
            scrollContainer.appendChild(imgElement);
            setTimeout(() => {
                imgElement.style.opacity = '1';
                currentImage = imgElement;
                containerInitialized = true;
                isTransitioning = false;
                updateDots();
            }, 50);
        } else {
            scrollContainer.appendChild(imgElement);
            setTimeout(() => {
                imgElement.style.opacity = '1';
                
                if (currentImage) {
                    currentImage.style.opacity = '0';
                    setTimeout(() => {
                        scrollContainer.removeChild(currentImage);
                        currentImage = imgElement;
                        isTransitioning = false;
                        updateDots();
                    }, 100);
                }
            }, 50);
        }
    };
  }
  
  function autoMoveSlider() {
    if (!isTransitioning) {
        const nextIndex = (currentImageIndex + 1) % images.length;
        loadImage(nextIndex);
    }
  }
  
  function startAutoSlide() {
    autoSlideInterval = setInterval(autoMoveSlider, 5000);
  }
  
  // Load first image
  loadImage(currentImageIndex);
  
  // Start automatic sliding
  startAutoSlide();