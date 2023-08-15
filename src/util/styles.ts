export const cardStyle: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(0.25rem)',
  borderRadius: '1rem',
  padding: '1.5rem min(3vw, 3rem)',
  width: 'calc(100% - 2rem - 8vw)',
};

export const mobileBreakpoint = getComputedStyle(document.documentElement).getPropertyValue('--mobile-width');
