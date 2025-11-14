import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Komponen Tombol CTA yang Fleksibel.
 * Menerima props untuk styling, tipe, dan tujuan (link internal/eksternal/button).
 * * @param {object} props
 * @param {string} props.variant - 'primary' (default), 'secondary', 'danger'.
 * @param {string} props.size - 'default', 'small'.
 * @param {string} props.to - Jika ada, akan dirender sebagai Link (internal router).
 * @param {string} props.href - Jika ada, akan dirender sebagai <a> tag (eksternal/biasa).
 * @param {string} props.type - Tipe button HTML ('button'/'submit').
 * @param {function} props.onClick - Handler klik.
 * @param {React.ReactNode} props.children - Konten tombol.
 */
const CtaButton = ({ 
  variant = 'primary', 
  size = 'default',
  to, 
  href, 
  type = 'button',
  onClick, 
  children, 
  ...rest 
}) => {
  
  const baseClass = 'cta-button';
  const variantClass = {
    'primary': '', // Class cta-button default
    'secondary': 'button-secondary',
    'danger': 'button-danger',
  }[variant] || '';
  
  const sizeClass = {
    'small': 'small',
    'default': '',
  }[size] || '';
  
  const classNames = `${baseClass} ${variantClass} ${sizeClass}`.trim();
  
  // Jika props 'to' diberikan, gunakan Link dari react-router-dom
  if (to) {
    return (
      <Link to={to} className={classNames} {...rest}>
        {children}
      </Link>
    );
  }

  // Jika props 'href' diberikan, gunakan tag <a> standar
  if (href) {
    return (
      <a href={href} className={classNames} {...rest}>
        {children}
      </a>
    );
  }

  // Default: Render sebagai <button> HTML
  return (
    <button 
      type={type} 
      className={classNames} 
      onClick={onClick} 
      {...rest}
    >
      {children}
    </button>
  );
};

export default CtaButton;