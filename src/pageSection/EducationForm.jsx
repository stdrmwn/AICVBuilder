import React, { useEffect, useState } from 'react';

const EducationForm = ({ data, onNext, onChange }) => {
  const [educationList, setEducationList] = useState(
    data || [{ level: '', school: '', startYear: '', endYear: '', description: '' }]
  );

  useEffect(() => {
    onChange(educationList);
  }, [educationList]);

  const handleChange = (index, field, value) => {
    const updated = [...educationList];
    updated[index][field] = value;
    setEducationList(updated);
  };

  const addField = () => {
    setEducationList([
      ...educationList,
      { level: '', school: '', startYear: '', endYear: '', description: '' },
    ]);
  };

  const removeField = (index) => {
    setEducationList(educationList.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {educationList.map((edu, i) => (
        <div key={i} className="border p-4 rounded-lg space-y-3 relative">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Education #{i + 1}</h3>
            {i > 0 && (
              <button type="button" onClick={() => removeField(i)} className="text-red-500 font-bold">
                X
              </button>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Tingkat Pendidikan</label>
            <select
              className="input w-full"
              value={edu.level}
              onChange={(e) => handleChange(i, 'level', e.target.value)}
            >
              <option value="">Pilih tingkat pendidikan</option>
              <option value="SD">SD</option>
              <option value="SMP">SMP</option>
              <option value="SMA">SMA</option>
              <option value="D3">D3</option>
              <option value="S1">S1</option>
              <option value="S2">S2</option>
              <option value="S3">S3</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Sekolah / Universitas</label>
            <input
              type="text"
              placeholder="e.g. Universitas Pradita"
              className="input w-full"
              value={edu.school}
              onChange={(e) => handleChange(i, 'school', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Tahun Masuk</label>
              <input
                type="number"
                placeholder="e.g. 2020"
                className="input w-full"
                value={edu.startYear}
                onChange={(e) => handleChange(i, 'startYear', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Tahun Lulus</label>
              <input
                type="number"
                placeholder="e.g. 2024"
                className="input w-full"
                value={edu.endYear}
                onChange={(e) => handleChange(i, 'endYear', e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Deskripsi (Jurusan, Organisasi, Prestasi)</label>
            <textarea
              placeholder="e.g. S1 Sistem Informasi, Ketua HIMSI, Juara Lomba Essay"
              className="input w-full"
              rows={3}
              value={edu.description}
              onChange={(e) => handleChange(i, 'description', e.target.value)}
            />
          </div>
        </div>
      ))}
      <button type="button" onClick={addField} className="text-blue-600 font-semibold">
        + Tambah Riwayat Pendidikan
      </button>
      <div className="text-right">
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg">
          Next
        </button>
      </div>
    </form>
  );
};

export default EducationForm;
