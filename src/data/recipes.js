// src/data/recipes.js
import imgGeprek from '../assets/geprek.jpeg';
import imgRendang from '../assets/rendang.jpeg';
import imgBrownies from '../assets/brownies.jpeg';
import imgNasgor from '../assets/nasgor.jpeg';
import imgSoto from '../assets/soto.jpeg';
import imgDbox from '../assets/dbox.jpg';

export const recipesData = [
  {
    id: 1,
    author: "Sari (Contoh)",
    handle: "sari_masak",
    time: "2 jam lalu",
    avatar: "https://placehold.co/50",
    title: "Ayam Geprek Sambal Matah",
    steps: [
      "Ulek kasar cabai & bawang.",
      "Iris sereh & daun jeruk, campur.",
      "Siram minyak panas. Aduk rata.",
      "Geprek ayam, sajikan dengan sambal."
    ],
    description: "Ini dia resep ayam geprek andalanku! Resep cocok buat orang yang malas masak! Hanya butuh 15 menit.",
    hashtags: "#ayamgeprek #sambalmatah #masakcepat",
    image: imgGeprek,
    likes: 8100, 
    comments: 120
  },
  {
    id: 2,
    author: "Budi (Contoh)",
    handle: "budi_rendang",
    time: "5 jam lalu",
    avatar: "https://placehold.co/50",
    title: "Rendang Padang Klasik",
    steps: [
      "Tumis bumbu halus hingga harum.",
      "Masukkan daging, aduk hingga berubah warna.",
      "Tuang santan, masak lama dengan api kecil.",
      "Aduk sesekali hingga santan mengering."
    ],
    description: "Resep fancy restoran! Rugi kalau ga cobain, rahasia bumbu leluhur terkuak di sini!",
    hashtags: "#rendang #padang #masakanindonesia",
    image: imgRendang,
    likes: 12400,
    comments: 350
  },
  {
    id: 3,
    author: "Chef Yuni (Contoh)",
    handle: "chef_yuni",
    time: "8 jam lalu",
    avatar: "https://placehold.co/50",
    title: "Brownies Kukus 3 Bahan",
    steps: [
      "Kocok telur & gula hingga larut.",
      "Masukkan bubuk coklat & terigu, aduk.",
      "Tambah minyak/margarin cair.",
      "Kukus 30 menit, angkat & sajikan."
    ],
    description: "Pemula harus cobain biar skillnya meningkat! Dessert viral yang pasti berhasil.",
    hashtags: "#brownies #dessert #masakmudah",
    image: imgBrownies,
    likes: 5900,
    comments: 90
  },
  {
    id: 4,
    author: "Pak RT (Contoh)",
    handle: "nasgor_bang_rt",
    time: "1 hari lalu",
    avatar: "https://placehold.co/50",
    title: "Nasi Goreng Kampung Spesial",
    steps: [
      "Tumis bumbu halus (bawang, cabai).",
      "Masukkan telur, orak-arik.",
      "Masukkan nasi & kecap manis.",
      "Aduk rata, tambahkan garam & penyedap."
    ],
    description: "Nasi goreng andalan bapak-bapak komplek. Rahasianya di api besar!",
    hashtags: "#nasigoreng #nasgorkampung #sarapan",
    image: imgNasgor,
    likes: 4500,
    comments: 75
  },
  {
    id: 5,
    author: "Mama Ina (Contoh)",
    handle: "dapur_ina",
    time: "2 hari lalu",
    avatar: "https://placehold.co/50",
    title: "Soto Ayam Lamongan",
    steps: [
      "Rebus ayam dengan bumbu (sereh, jahe).",
      "Angkat ayam, suwir-suwir.",
      "Tumis bumbu halus (kunyit, bawang).",
      "Masukkan tumisan ke kuah kaldu."
    ],
    description: "Hujan-hujan enaknya makan soto. Kuahnya segar banget, resep warisan keluarga!",
    hashtags: "#sotoayam #sotolamongan #resepkuah",
    image: imgSoto,
    likes: 6200,
    comments: 110
  }
];

export const trendingData = [
    { id: 1, name: "#RendangViral", likes: "12.4K", img: imgRendang },
    { id: 2, name: "#AyamGeprekLevelPedas", likes: "8.1K", img: imgGeprek },
    { id: 3, name: "#BrowniesLumer", likes: "5.9K", img: imgBrownies },
    { id: 4, name: "#NasiGorengKampung", likes: "4.5K", img: imgNasgor },
    { id: 5, name: "#DessertBoxKekinian", likes: "3.2K", img: imgDbox },
];