import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Wajib import ini
import api from "../api/axiosInstance";
import "../styles/app.css";

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
      // PANGGIL API LOGIN
      const response = await api.post("/auth/login", {
        username_or_email: formData.email, // Sesuaikan dengan key di backend
        password: formData.password,
      });

      // SIMPAN TOKEN & DATA USER
      const token = response.data.token;
      localStorage.setItem("authToken", token);

      // Simpan data profil dasar jika dikembalikan dari login
      if (response.data.user_data) {
        localStorage.setItem(
          "userProfileData",
          JSON.stringify(response.data.user_data)
        );
      }

      alert("Login berhasil!");
      navigate("/feed");
    } catch (error) {
      console.error("Login Error:", error.response || error);
      alert("Login gagal! Cek email/password Anda.");
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
            className={`fas ${
              showPassword ? "fa-eye" : "fa-eye-slash"
            } password-toggle-icon`}
            onClick={() => setShowPassword(!showPassword)}
            style={{ cursor: "pointer" }}
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
        Belum punya akun?{" "}
        <a href="#" onClick={onToggle}>
          Daftar di sini
        </a>
      </p>
    </form>
  );
};

const RegisterForm = ({ onToggle }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 1. Tambahkan state untuk 'username'
  const [formData, setFormData] = useState({
    name: "",
    username: "", // TAMBAHAN BARU
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    let key = "";
    if (e.target.id === "reg-name") key = "name";
    else if (e.target.id === "reg-username") key = "username"; // HANDLER BARU
    else if (e.target.id === "reg-email") key = "email";
    else if (e.target.id === "reg-password") key = "password";
    else if (e.target.id === "reg-password-confirm") key = "confirmPassword";

    setFormData({ ...formData, [key]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi Password Match
    if (formData.password !== formData.confirmPassword) {
      alert("Password dan Konfirmasi tidak cocok!");
      return;
    }

    // Validasi Panjang Password (Sesuai Backend)
    if (formData.password.length < 8) {
      alert("Password minimal 8 karakter!");
      return;
    }

    setIsLoading(true);

    try {
      // 2. Sesuaikan Payload dengan Backend (full_name & username)
      const response = await api.post("/auth/register", {
        full_name: formData.name, // Backend minta 'full_name', bukan 'name'
        username: formData.username, // Backend wajibkan ini
        email: formData.email,
        password: formData.password,
      });

      // SIMPAN TOKEN
      const token = response.data.token;
      localStorage.setItem("authToken", token);

      alert("Registrasi berhasil! Lanjutkan melengkapi profil.");
      navigate("/setup-profile");
    } catch (error) {
      console.error("Register Error:", error.response || error);
      // Tampilkan pesan error spesifik dari backend jika ada
      const errorMsg =
        error.response?.data?.message || error.response?.data?.errors
          ? JSON.stringify(error.response.data.errors)
          : "Registrasi gagal!";
      alert(`Gagal: ${errorMsg}`);
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
        <input
          type="text"
          id="reg-name"
          required
          onChange={handleChange}
          placeholder="Contoh: Budi Santoso"
        />
      </div>

      {/* 3. INPUT USERNAME BARU */}
      <div className="form-group">
        <label htmlFor="reg-username">Username</label>
        <input
          type="text"
          id="reg-username"
          required
          onChange={handleChange}
          placeholder="Contoh: budi_123 (huruf kecil & angka)"
        />
      </div>

      <div className="form-group">
        <label htmlFor="reg-email">Email</label>
        <input type="email" id="reg-email" required onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="reg-password">Password (Min. 8 Karakter)</label>
        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            id="reg-password"
            required
            onChange={handleChange}
          />
          <i
            className={`fas ${
              showPassword ? "fa-eye" : "fa-eye-slash"
            } password-toggle-icon`}
            onClick={() => setShowPassword(!showPassword)}
            style={{ cursor: "pointer" }}
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
            className={`fas ${
              showConfirm ? "fa-eye" : "fa-eye-slash"
            } password-toggle-icon`}
            onClick={() => setShowConfirm(!showConfirm)}
            style={{ cursor: "pointer" }}
          ></i>
        </div>
      </div>

      <p className="auth-policy">
        Dengan mendaftar, Anda menyetujui{" "}
        <Link to="/terms" target="_blank">
          Syarat & Ketentuan
        </Link>{" "}
        serta{" "}
        <Link to="/privacy" target="_blank">
          Kebijakan Privasi
        </Link>{" "}
        kami.
      </p>

      <button
        type="submit"
        className="cta-button auth-button"
        disabled={isLoading}
      >
        {isLoading ? "Memproses..." : "Register"}
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
        Sudah punya akun?{" "}
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
