import React, { useEffect, useState } from 'react';

const EducationForm = ({ data, onNext, onChange }) => {
  const [educationList, setEducationList] = useState(data || ['']);

  useEffect(() => {
    onChange(educationList);
  }, [educationList]);

  const handleChange = (index, value) => {
    const updated = [...educationList];
    updated[index] = value;
    setEducationList(updated);
  };

  const addField = () => setEducationList([...educationList, '']);
  const removeField = (index) => setEducationList(educationList.filter((_, i) => i !== index));

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {educationList.map((edu, i) => (
        <div key={i} className="flex gap-2">
          <input
            type="text"
            placeholder={`Education #${i + 1}`}
            className="input w-full"
            value={edu}
            onChange={(e) => handleChange(i, e.target.value)}
          />
          {i > 0 && (
            <button type="button" onClick={() => removeField(i)} className="text-red-500 font-bold">X</button>
          )}
        </div>
      ))}
      <button type="button" onClick={addField} className="text-blue-600">+ Add Education</button>
      <div className="text-right">
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg">Next</button>
      </div>
    </form>
  );
};

export default EducationForm;
