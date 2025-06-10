import { useEffect } from 'react';

export function useScrollAnimation() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');


          if (entry.target.classList.contains('timeline-item')) {

            const dot = entry.target.querySelector('.timeline-dot');
            if (dot) {
              setTimeout(() => dot.classList.add('active'), 200);
            }
          }


          if (entry.target.classList.contains('timeline-line')) {
            entry.target.classList.add('active');
          }
        }
      });
    }, observerOptions);


    const revealElements = document.querySelectorAll('.reveal, .reveal-stagger, .timeline-item, .timeline-line');
    revealElements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      revealElements.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, []);
}