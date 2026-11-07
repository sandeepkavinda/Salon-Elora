let instance = null;

export const setLenis = (lenis) => {
  instance = lenis;
};
export const getLenis = () => instance;

export const scrollToTop = () => {
  if (instance) instance.scrollTo(0, { immediate: true, force: true });
  window.scrollTo(0, 0);
};

export const lockScroll = () => {
  instance?.stop();
  document.documentElement.style.overflow = 'hidden';
};
export const unlockScroll = () => {
  instance?.start();
  document.documentElement.style.overflow = '';
};
