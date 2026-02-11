// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// Custom Cursor Logic
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1
    });
});

// Hero Animation (GSAP)
const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

tl.from(".prism-main-title", { y: 100, opacity: 0, duration: 1.5, letterSpacing: "50px" })
  .from(".prism-subtitle", { opacity: 0, y: 20, duration: 1 }, "-=1")
  .from(".prism-img", { scale: 0.8, opacity: 0, duration: 2, ease: "expo.out" }, "-=1.2")
  .from(".label-pill", { 
      opacity: 0, 
      scale: 0.5, 
      stagger: 0.2, 
      duration: 1, 
      ease: "back.out(1.7)" 
  }, "-=1")
  .from(".hero-footer > *", { opacity: 0, y: 30, stagger: 0.2, duration: 1 }, "-=0.5");

// Parallax Effect for Prism & Pills
document.addEventListener('mousemove', (e) => {
    const xPos = (e.clientX / window.innerWidth - 0.5) * 2;
    const yPos = (e.clientY / window.innerHeight - 0.5) * 2;

    gsap.to(".prism-img", {
        x: xPos * 20,
        y: yPos * 20,
        rotationY: xPos * 10,
        rotationX: -yPos * 10,
        duration: 1
    });

    gsap.to(".intake", { x: xPos * 40, y: yPos * 40, duration: 1.2 });
    gsap.to(".scoring", { x: xPos * 30, y: yPos * 30, duration: 1.2 });
    gsap.to(".scheduling", { x: xPos * 50, y: yPos * 50, duration: 1.2 });
});

// Scroll Reveal Animations
gsap.utils.toArray('[data-gsap="fade-up"]').forEach(card => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: "top 85%",
        },
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
    });
});

// Button Interactions
document.querySelectorAll('button, .label-pill').forEach(el => {
    el.addEventListener('mouseenter', () => {
        gsap.to(cursor, { scale: 3, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(5px)' });
    });
    el.addEventListener('mouseleave', () => {
        gsap.to(cursor, { scale: 1, background: '#fff', backdropFilter: 'none' });
    });
});
