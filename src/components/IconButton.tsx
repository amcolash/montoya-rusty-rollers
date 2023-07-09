import React, { ButtonHTMLAttributes } from 'react';
import { style } from 'typestyle';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  buttonType?: 'cta' | 'destructive' | 'warning' | 'success';
}

export function IconButton(props: IconButtonProps) {
  const type = props.buttonType || 'cta';

  const buttonStyle = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.25rem',
    background: `var(--${type})`,
    border: `1px solid var(--${type}-border)`,

    $nest: {
      '&:hover': {
        background: `var(--${type}-hover)`,
      },
      '&:disabled': {
        background: `var(--${type}-disabled)`,
      },
    },
  });

  return (
    <button {...props} icon={undefined} className={buttonStyle}>
      {props.icon}
      {props.children}
    </button>
  );
}
