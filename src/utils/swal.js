// src/utils/swal.js
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const primaryColor = '#38761d'; // Warna hijau CookConnect

// 1. Pop-up Informasi/Sukses/Error Biasa
export const showPopup = (title, text, icon = 'info') => {
  return MySwal.fire({
    title: title,
    text: text,
    icon: icon,
    confirmButtonColor: primaryColor,
    confirmButtonText: 'Oke',
    background: '#fff',
    color: '#333'
  });
};

// 2. Pop-up Konfirmasi (Pengganti window.confirm)
export const showConfirm = async (title, text, confirmText = 'Ya', cancelText = 'Batal') => {
  const result = await MySwal.fire({
    title: title,
    text: text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: primaryColor,
    cancelButtonColor: '#d33',
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    reverseButtons: true
  });

  return result.isConfirmed; // Mengembalikan true jika user klik Ya
};

// 3. Pop-up Toast Kecil (Muncul sebentar di pojok, misal: "Link disalin")
export const showToast = (title, icon = 'success') => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });
  
  Toast.fire({
    icon: icon,
    title: title
  });
};