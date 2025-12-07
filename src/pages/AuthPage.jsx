import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Wajib import ini
import '../styles/app.css';

const LoginForm = ({ onToggle }) => {
  const navigate = useNavigate();
  
  // State untuk input & toggle password
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    // id input harus sesuai (login-email -> email, login-password -> password)
    // atau kita sesuaikan id-nya biar simpel
    const key = e.target.id === 'login-email' ? 'email' : 'password';
    setFormData({ ...formData, [key]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Di sini nanti logika API ke Backend
    console.log("Login Data:", formData);
    
    // Simulasi Login Sukses -> Pindah ke Feed
    navigate('/feed');
  };

  return (
    <form id="login-form" className="auth-form" onSubmit={handleSubmit}>
      <div className="logo-auth">CookConnect</div>
      <h2>Selamat Datang Kembali!</h2>

      <div className="form-group">
        <label htmlFor="login-email">Email/Username</label>
        <input 
          type="text" // Bisa text/email
          id="login-email" 
          value={formData.email}
          onChange={handleChange}
          required 
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="login-password">Password</label>
        <div className="password-wrapper">
          <input 
            type={showPassword ? "text" : "password"} // Logika Show/Hide
            id="login-password" 
            value={formData.password}
            onChange={handleChange}
            required 
          />
          {/* Ikon Mata diklik -> ubah state showPassword */}
          <i
            className={`fas ${showPassword ? "fa-eye" : "fa-eye-slash"} password-toggle-icon`}
            onClick={() => setShowPassword(!showPassword)}
            style={{ cursor: 'pointer' }}
          ></i>
        </div>
      </div>
      
      <div className="form-extra">
        {/* Pakai Link agar tidak reload */}
        <Link to="/forgot-password" className="forgot-password">
          Lupa Password?
        </Link>
      </div>

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
  const navigate = useNavigate();
  
  // State password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // State Input
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    // Mapping ID ke key state (agak manual karena ID kamu spesifik)
    let key = '';
    if (e.target.id === 'reg-name') key = 'name';
    else if (e.target.id === 'reg-email') key = 'email';
    else if (e.target.id === 'reg-password') key = 'password';
    else if (e.target.id === 'reg-password-confirm') key = 'confirmPassword';
    
    setFormData({ ...formData, [key]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validasi sederhana
    if (formData.password !== formData.confirmPassword) {
      alert("Password dan Konfirmasi tidak cocok!");
      return;
    }

    console.log("Register Data:", formData);
    
    // Simulasi Register Sukses -> Pindah ke Setup Profile
    // Sesuai cerita: "Setelah registrasi... user dimintai melengkapi profil"
    navigate('/setup-profile');
  };

  return (
    <form id="register-form" className="auth-form" onSubmit={handleSubmit}>
      <div className="logo-auth">CookConnect</div>
      <h2>Buat Akun Baru</h2>

      <div className="form-group">
        <label htmlFor="reg-name">Nama</label>
        <input type="text" id="reg-name" required onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="reg-email">Email</label>
        <input type="email" id="reg-email" required onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="reg-password">Password</label>
        <div className="password-wrapper">
          <input 
            type={showPassword ? "text" : "password"} 
            id="reg-password" 
            required 
            onChange={handleChange} 
          />
          <i
            className={`fas ${showPassword ? "fa-eye" : "fa-eye-slash"} password-toggle-icon`}
            onClick={() => setShowPassword(!showPassword)}
            style={{ cursor: 'pointer' }}
          ></i>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="reg-password-confirm">Konfirmasi Password</label>
        <div className="password-wrapper">
          <input 
            type={showConfirm ? "text" : "password"} 
            id="reg-password-confirm" 
            required 
            onChange={handleChange} 
          />
          <i
            className={`fas ${showConfirm ? "fa-eye" : "fa-eye-slash"} password-toggle-icon`}
            onClick={() => setShowConfirm(!showConfirm)}
            style={{ cursor: 'pointer' }}
          ></i>
        </div>
      </div>

      <p className="auth-policy">
        Dengan mendaftar, Anda menyetujui{' '}
        <Link to="/terms" target="_blank">Syarat & Ketentuan</Link>
        {' '}serta{' '}
        <Link to="/privacy" target="_blank">Kebijakan Privasi</Link>
        {' '}kami.
      </p>

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
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = (e) => {
    e.preventDefault();
    setIsLogin((prev) => !prev);
  };

  return (
    <div className="login-page-body">
      <header className="login-header">
        <div className="container">
          <Link to="/" className="logo-link">
            <div className="logo">CookConnect</div>
          </Link>
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