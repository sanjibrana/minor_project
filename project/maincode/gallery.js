document.addEventListener('DOMContentLoaded', function() {
    // Filter gallery items
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.grid-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Lightbox functionality
    const lightboxModal = document.querySelector('.lightbox-modal');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxCaption = document.querySelector('.image-caption h3');
    const lightboxDesc = document.querySelector('.image-caption p');
    const closeLightbox = document.querySelector('.close-lightbox');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentImageIndex = 0;
    const images = Array.from(document.querySelectorAll('.grid-item'));
    
    // Open lightbox when clicking on gallery image
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            currentImageIndex = index;
            updateLightbox();
            lightboxModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close lightbox
    closeLightbox.addEventListener('click', function() {
        lightboxModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Close when clicking outside the image
    lightboxModal.addEventListener('click', function(e) {
        if (e.target === lightboxModal) {
            lightboxModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Navigation between images
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightboxModal.style.display === 'block') {
            if (e.key === 'ArrowLeft') {
                showPrevImage();
            } else if (e.key === 'ArrowRight') {
                showNextImage();
            } else if (e.key === 'Escape') {
                lightboxModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }
    });
    
    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateLightbox();
    }
    
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateLightbox();
    }
    
    function updateLightbox() {
        const imgSrc = images[currentImageIndex].querySelector('img').src;
        const imgAlt = images[currentImageIndex].querySelector('img').alt;
        const caption = images[currentImageIndex].querySelector('.image-overlay h3').textContent;
        const desc = images[currentImageIndex].querySelector('.image-overlay p').textContent;
        
        lightboxImage.src = imgSrc;
        lightboxImage.alt = imgAlt;
        lightboxCaption.textContent = caption;
        lightboxDesc.textContent = desc;
    }
    
    // Video play buttons (placeholder functionality)
    const videoThumbnails = document.querySelectorAll('.video-thumbnail');
    videoThumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            alert('Video playback would open here. In a real implementation, this would embed a YouTube/Vimeo player or open a video file.');
        });
    });
    
    // Load more button (placeholder functionality)
    const loadMoreBtn = document.querySelector('.load-more button');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            alert('In a real implementation, this would load additional gallery items via AJAX or show hidden items.');
        });
    }
});