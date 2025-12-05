import React, { useState } from 'react';
import '../styles/app.css';

const LoginForm = ({ onToggle }) => {
  // Dalam proyek React sesungguhnya, state untuk input form akan di handle di sini
  // dan fungsi untuk submit form juga akan ada di sini
  return (
    <form id="login-form" className="auth-form" onSubmit={(e) => e.preventDefault()}>
      <div className="logo-auth">CookConnect</div>
      <h2>Selamat Datang Kembali!</h2>

      <div className="form-group">
        <label htmlFor="login-email">Email/Username</label>
        <input type="email" id="login-email" required />
      </div>
      <div className="form-group">
        <label htmlFor="login-password">Password</label>
        <div className="password-wrapper">
          <input type="password" id="login-password" required />
          {/* Ikon mata untuk toggle password (perlu implementasi JS untuk fungsinya) */}
          <i
            className="fas fa-eye-slash password-toggle-icon"
            id="toggle-password"
          ></i>
        </div>
      </div>
      <div className="form-extra">
        {/* Mengganti href ke link React Router/function jika menggunakan router */}
        <a href="/forgot-password" className="forgot-password">
          Lupa Password?
        </a>
      </div>

      {/* Mengganti <a> dengan <button type="submit"> untuk aksi form sesungguhnya */}
      <button type="submit" className="cta-button auth-button">
        Login
      </button>

      <div className="auth-divider">
        <span>ATAU</span>
      </div>

      <a
        href="https://accounts.google.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="cta-button google-auth-button"
      >
        <i className="fab fa-google"></i> Login dengan Google
      </a>

      <p className="auth-toggle">
        Belum punya akun?{' '}
        <a href="#" onClick={onToggle}>
          Daftar di sini
        </a>
      </p>
    </form>
  );
};

const RegisterForm = ({ onToggle }) => {
  // Dalam proyek React sesungguhnya, state untuk input form akan di handle di sini
  // dan fungsi untuk submit form juga akan ada di sini
  return (
    <form id="register-form" className="auth-form" onSubmit={(e) => e.preventDefault()}>
      <div className="logo-auth">CookConnect</div>
      <h2>Buat Akun Baru</h2>

      <div className="form-group">
        <label htmlFor="reg-name">Nama</label>
        <input type="text" id="reg-name" required />
      </div>

      <div className="form-group">
        <label htmlFor="reg-email">Email</label>
        <input type="email" id="reg-email" required />
      </div>

      <div className="form-group">
        <label htmlFor="reg-password">Password</label>
        <div className="password-wrapper">
          <input type="password" id="reg-password" required />
          {/* Ikon mata untuk toggle password */}
          <i
            className="fas fa-eye-slash password-toggle-icon"
            id="toggle-reg-password"
          ></i>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="reg-password-confirm">Konfirmasi Password</label>
        <div className="password-wrapper">
          <input type="password" id="reg-password-confirm" required />
          {/* Ikon mata untuk toggle password */}
          <i
            className="fas fa-eye-slash password-toggle-icon"
            id="toggle-reg-confirm"
          ></i>
        </div>
      </div>

      <p className="auth-policy">
        Dengan mendaftar, Anda menyetujui
        <a href="/terms#terms" target="_blank" rel="noopener noreferrer">
          Syarat & Ketentuan
        </a>
        serta
        <a href="/terms#privacy" target="_blank" rel="noopener noreferrer">
          Kebijakan Privasi
        </a>
        kami.
      </p>

      {/* Mengganti <a> dengan <button type="submit"> untuk aksi form sesungguhnya */}
      <button type="submit" className="cta-button auth-button">
        Register
      </button>

      <div className="auth-divider">
        <span>ATAU</span>
      </div>
      <a
        href="https://accounts.google.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="cta-button google-auth-button"
      >
        <i className="fab fa-google"></i> Daftar dengan Google
      </a>

      <p className="auth-toggle">
        Sudah punya akun?{' '}
        <a href="#" onClick={onToggle}>
          Login di sini
        </a>
      </p>
    </form>
  );
};

const AuthPage = () => {
  // State untuk menentukan formulir mana yang ditampilkan: 'login' atau 'register'
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = (e) => {
    e.preventDefault();
    setIsLogin((prev) => !prev);
  };

  return (
    <div className="login-page-body">
      <header className="login-header">
        <div className="container">
          <a href="/" className="logo-link">
            <div className="logo">CookConnect</div>
          </a>
        </div>
      </header>

      <div className="login-container">
        {isLogin ? (
          <LoginForm onToggle={toggleForm} />
        ) : (
          <RegisterForm onToggle={toggleForm} />
        )}
      </div>

      <footer>
        <p>&copy; 2025 CookConnect. Developed for Web Programming Class.</p>
      </footer>
    </div>
  );
};

export default AuthPage;