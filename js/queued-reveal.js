/* Osmo Supply — Queued Scroll Reveal (GSAP + ScrollTrigger) */
function initQueuedScrollReveal() {
  const queue = [];
  let isRunning = false;
  const seen = initQueuedScrollReveal.seen || (initQueuedScrollReveal.seen = new WeakSet());

  // Drop triggers whose element was removed by a re-render (collection filters)
  ScrollTrigger.getAll().forEach((st) => { if (!st.trigger.isConnected) st.kill(); });

  document.querySelectorAll('[data-queued-reveal-group]').forEach((group) => {
    const items = group.hasAttribute('data-queued-reveal-children') ? [...group.children] : [...group.querySelectorAll('[data-queued-reveal-item]')];
    if (!items.length) return;

    items.forEach((item) => {
      if (seen.has(item) || item.hasAttribute('data-queued-skip')) return;
      seen.add(item);
      if (item.getBoundingClientRect().bottom <= 0) return;

      // Set items on load
      gsap.set(item, {autoAlpha: 0, y: "4em"});

      ScrollTrigger.create({
        trigger: item,
        start: 'top 100%', // Reveal offset
        once: true,
        onEnter: () => {
          queue.push(item);
          if (queue.length > 12) reveal(queue.shift()); // Max queue length

          if (!isRunning) {
            isRunning = true;
            gsap.delayedCall(0.1, revealNext); // Delay
          }
        }
      });
    });
  });

  function reveal(item) {
    gsap.to(item, {autoAlpha: 1, duration: 1.2, ease: 'power1.out', clearProps: "opacity, visibility"});
    gsap.to(item, {y: "0em", duration: 1.2, ease: 'expo.out', clearProps: "transform"});
  }

  function revealNext() {
    const item = queue.shift();
    if (!item) {isRunning = false; return;}

    // Animate items on scroll
    reveal(item);
    gsap.delayedCall(0.075, revealNext); // Stagger
  }
}

// Initialize Queued Scroll Reveal
document.addEventListener("DOMContentLoaded", () => {
  initQueuedScrollReveal();
});

// Re-run for content rendered later (collection filters, sort, load more)
document.addEventListener("regalo:render", () => {
  if (window.gsap && window.ScrollTrigger) initQueuedScrollReveal();
});
