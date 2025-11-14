import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ResepSederhana() {
  const resep = [
    {
      nama: "Nasi Goreng Sederhana",
      bahan: ["Nasi", "Telur", "Kecap", "Garam", "Minyak", "Bawang Putih"],
      langkah: [
        "Panaskan minyak dan tumis bawang putih.",
        "Masukkan telur lalu orak‑arik.",
        "Masukkan nasi dan aduk rata.",
        "Tambahkan kecap & garam.",
        "Aduk hingga merata dan sajikan."
      ]
    },
    {
      nama: "Indomie Telur", 
      bahan: ["Mie Instan", "Telur", "Air", "Cabe (opsional)"],
      langkah: [
        "Rebus mie hingga setengah matang.",
        "Masukkan telur ke rebusan mie.",
        "Tiriskan dan campurkan bumbu.",
        "Sajikan hangat."
      ]
    }
  ];

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">Resep Makanan Sederhana</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {resep.map((r, index) => (
          <Card key={index} className="rounded-2xl shadow-lg p-3">
            <CardContent>
              <h2 className="text-xl font-semibold mb-2">{r.nama}</h2>
              <h3 className="font-medium">Bahan:</h3>
              <ul className="list-disc ml-6 mb-3">
                {r.bahan.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>

              <h3 className="font-medium">Langkah:</h3>
              <ol className="list-decimal ml-6 mb-4">
                {r.langkah.map((l, i) => (
                  <li key={i}>{l}</li>
                ))}
              </ol>

              <Button className="w-full mt-2">Lihat Detail</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 