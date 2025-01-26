// Optional: Add interactive transitions (e.g., hover effect)
const progressBars = document.querySelectorAll('.progress');

progressBars.forEach((bar) => {
    bar.addEventListener('mouseover', () => {
        bar.style.transform = 'scale(1.1)';
        bar.style.transition = 'transform 0.3s ease-in-out';
    });

    bar.addEventListener('mouseout', () => {
        bar.style.transform = 'scale(1)';
    });
});
