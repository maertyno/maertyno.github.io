(() => {
  const desktopMotion = window.matchMedia("(min-width: 901px) and (any-hover: hover) and (any-pointer: fine) and (prefers-reduced-motion: no-preference)");
  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  document.querySelectorAll(".app-showcase").forEach((showcase) => {
    const carousel = showcase.querySelector("[data-app-carousel]");
    if (!carousel) return;
    let frame = 0;
    let target = { x: 0, y: 0, lift: 0 };

    const render = () => {
      frame = 0;
      carousel.style.setProperty("--app-tilt-x", `${target.x.toFixed(2)}deg`);
      carousel.style.setProperty("--app-tilt-y", `${target.y.toFixed(2)}deg`);
      carousel.style.setProperty("--app-lift", `${target.lift.toFixed(2)}px`);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(render); };
    const reset = () => {
      target = { x: 0, y: 0, lift: 0 };
      showcase.classList.remove("is-tilting");
      schedule();
    };

    showcase.addEventListener("pointermove", (event) => {
      if (!desktopMotion.matches || event.pointerType !== "mouse") return;
      const rect = showcase.getBoundingClientRect();
      const x = clamp((event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2), -1, 1);
      const y = clamp((event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2), -1, 1);
      target = { x: -y * 5.2, y: x * 6.8, lift: -4.5 };
      showcase.classList.add("is-tilting");
      schedule();
    }, { passive: true });
    showcase.addEventListener("pointerleave", reset, { passive: true });
    window.addEventListener("blur", reset);
    desktopMotion.addEventListener?.("change", reset);
  });
})();