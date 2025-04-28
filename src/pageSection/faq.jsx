import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ TAMBAHKAN INI

const faqData = [
  {
    question: "Berapa lama masa jabatan pengurus HIMSI?",
    answer: "Masa jabatan pengurus HIMSI adalah selama satu tahun kepengurusan.",
  },
  {
    question: "Apa saja keuntungan menjadi pengurus HIMSI?",
    answer:
      "Keuntungan menjadi pengurus HIMSI antara lain mendapatkan pengalaman organisasi, memperluas relasi, dan pengembangan soft skill.",
  },
  {
    question: "Apa saja syarat yang perlu dipenuhi untuk mendaftar kepengurusan HIMSI?",
    answer:
      "Syaratnya meliputi mahasiswa aktif, memiliki komitmen, dan lulus seleksi administrasi serta wawancara.",
  },
  {
    question: "Apa diperkenankan jika ingin ganti divisi di tengah periode kepengurusan?",
    answer:
      "Pergantian divisi bisa dilakukan dengan persetujuan pengurus inti dan alasan yang kuat.",
  },
  {
    question:
      "Apakah diperbolehkan menjadi pengurus di organisasi lain ketika sudah diterima di kepengurusan HIMSI?",
    answer:
      "Diperbolehkan selama tidak mengganggu komitmen dan tanggung jawab di HIMSI.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);
  const navigate = useNavigate(); // ✅ INISIALISASI NAVIGATE

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq-section" className="px-6 md:px-24 py-16 bg-white">
      <div className="text-center flex flex-col items-center justify-center mt-10 mb-6">
        <h2 className="text-3xl md:text-4xl font-bold">
          <span className="text-[#1E64C8]">Frequently Asked </span>
          <span className="text-[#800040]">Questions</span>
        </h2>
        <p className="text-lg text-gray-700 mt-3 max-w-xl">
          Pertanyaan yang Sering Diajukan Kepada Kami.
        </p>
      </div>

      <div className="space-y-4">
        {faqData.map((faq, index) => (
          <div key={index} className="border-b border-[#7A1E52] pb-4">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center text-left"
            >
              <span className="text-md md:text-lg font-medium">{faq.question}</span>
              <span className="text-[#7A1E52]">
                {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </span>
            </button>
            {openIndex === index && (
              <p className="mt-2 text-sm md:text-base text-gray-700">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <button
          onClick={() => navigate("/Faq")} // ✅ INI SEKARANG SUDAH BERFUNGSI
          className="bg-[#7A1E52] text-white font-medium px-6 py-2 rounded-md hover:bg-[#5e1841] transition duration-300"
        >
          Selengkapnya
        </button>
      </div>
    </section>
  );
}
