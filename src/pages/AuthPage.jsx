import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axiosInstance";
import "../styles/app.css";
import { SharedFooter } from "./LandingPage";
import { showPopup } from "../utils/swal"; // IMPOR POPUP

const LoginForm = ({ onToggle }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const key = e.target.id === "login-email" ? "email" : "password";
    setFormData({ ...formData, [key]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await api.post("/auth/login", {
        username_or_email: formData.email,
        password: formData.password,
      });

      const { token, user } = response.data.data;

      if (token) {
        localStorage.setItem("authToken", token);
        localStorage.setItem("userProfileData", JSON.stringify(user));
        
        // GANTI ALERT DENGAN POPUP
        await showPopup("Berhasil!", "Selamat datang kembali.", "success");
        navigate("/feed");
      } else {
        throw new Error("Token kosong dari server");
      }
    } catch (error) {
      console.error("Login Error:", error.response || error);
      // GANTI ALERT ERROR DENGAN POPUP
      showPopup("Login Gagal", "Cek email atau password Anda.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form id="login-form" className="auth-form" onSubmit={handleSubmit}>
      <div className="logo-auth">CookConnect</div>
      <h2>Selamat Datang Kembali!</h2>

      <div className="form-group">
        <label htmlFor="login-email">Email/Username</label>
        <input type="text" id="login-email" value={formData.email} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label htmlFor="login-password">Password</label>
        <div className="password-wrapper">
          <input type={showPassword ? "text" : "password"} id="login-password" value={formData.password} onChange={handleChange} required />
          <i className={`fas ${showPassword ? "fa-eye" : "fa-eye-slash"} password-toggle-icon`} onClick={() => setShowPassword(!showPassword)} style={{ cursor: "pointer" }}></i>
        </div>
      </div>

      <div className="form-extra">
        <Link to="/forgot-password" className="forgot-password">Lupa Password?</Link>
      </div>

      <button type="submit" className="cta-button auth-button" disabled={isLoading}>
        {isLoading ? "Memproses..." : "Login"}
      </button>

      <p className="auth-toggle">
        Belum punya akun? <a href="#" onClick={onToggle}>Daftar di sini</a>
      </p>
    </form>
  );
};

const RegisterForm = ({ onToggle }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    let key = "";
    if (e.target.id === "reg-name") key = "name";
    else if (e.target.id === "reg-username") key = "username";
    else if (e.target.id === "reg-email") key = "email";
    else if (e.target.id === "reg-password") key = "password";
    else if (e.target.id === "reg-password-confirm") key = "confirmPassword";

    setFormData({ ...formData, [key]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      showPopup("Oops!", "Password dan Konfirmasi tidak cocok!", "warning");
      return;
    }

    if (formData.password.length < 8) {
      showPopup("Password Lemah", "Password minimal 8 karakter!", "warning");
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.post("/auth/register", {
        full_name: formData.name,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      const { token, user } = response.data.data;

      if (token) {
        localStorage.setItem("authToken", token);
        localStorage.setItem("userProfileData", JSON.stringify(user));
        
        await showPopup("Registrasi Berhasil!", "Silakan lengkapi profil Anda.", "success");
        navigate("/setup-profile");
      } else {
        throw new Error("Token kosong dari server");
      }
    } catch (error) {
      console.error("Register Error:", error.response || error);
      let errorMsg = "Registrasi gagal!";
      if (error.response?.data?.message) {
        errorMsg = error.response.data.message;
      }
      showPopup("Gagal", errorMsg, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form id="register-form" className="auth-form" onSubmit={handleSubmit}>
      <div className="logo-auth">CookConnect</div>
      <h2>Buat Akun Baru</h2>

      <div className="form-group">
        <label htmlFor="reg-name">Nama Lengkap</label>
        <input type="text" id="reg-name" required onChange={handleChange} placeholder="Contoh: Budi Santoso" />
      </div>

      <div className="form-group">
        <label htmlFor="reg-username">Username</label>
        <input type="text" id="reg-username" required onChange={handleChange} placeholder="Contoh: budi_123" />
      </div>

      <div className="form-group">
        <label htmlFor="reg-email">Email</label>
        <input type="email" id="reg-email" required onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="reg-password">Password (Min. 8 Karakter)</label>
        <div className="password-wrapper">
          <input type={showPassword ? "text" : "password"} id="reg-password" required onChange={handleChange} />
          <i className={`fas ${showPassword ? "fa-eye" : "fa-eye-slash"} password-toggle-icon`} onClick={() => setShowPassword(!showPassword)} style={{ cursor: "pointer" }}></i>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="reg-password-confirm">Konfirmasi Password</label>
        <div className="password-wrapper">
          <input type={showConfirm ? "text" : "password"} id="reg-password-confirm" required onChange={handleChange} />
          <i className={`fas ${showConfirm ? "fa-eye" : "fa-eye-slash"} password-toggle-icon`} onClick={() => setShowConfirm(!showConfirm)} style={{ cursor: "pointer" }}></i>
        </div>
      </div>

      <p className="auth-policy">
        Dengan mendaftar, Anda menyetujui{" "}
        <Link to="/terms-privacy" style={{color: '#38761d', fontWeight: 'bold'}}>Syarat, Ketentuan & Kebijakan Privasi</Link> kami.
      </p>

      <button type="submit" className="cta-button auth-button" disabled={isLoading}>
        {isLoading ? "Memproses..." : "Register"}
      </button>

      <p className="auth-toggle">
        Sudah punya akun? <a href="#" onClick={onToggle}>Login di sini</a>
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
        {isLogin ? <LoginForm onToggle={toggleForm} /> : <RegisterForm onToggle={toggleForm} />}
      </div>

      <SharedFooter />
    </div>
  );
};

export default AuthPage;