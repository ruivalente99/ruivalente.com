export const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

export const SECRET_COMMANDS = [
  {
    command: 'matrix',
    description: 'Enter the Matrix mode',
    action: () => document.documentElement.classList.add('matrix-effect')
  },
  {
    command: 'flip',
    description: 'Flip the entire UI',
    action: () => document.body.style.transform = 'rotate(180deg)'
  },
  {
    command: 'rainbow',
    description: 'Enable rainbow mode',
    action: () => document.documentElement.classList.add('rainbow-mode')
  },
  {
    command: 'reset',
    description: 'Reset all effects',
    action: () => {
      document.documentElement.classList.remove('matrix-effect', 'rainbow-mode');
      document.body.style.transform = '';
    }
  }
];