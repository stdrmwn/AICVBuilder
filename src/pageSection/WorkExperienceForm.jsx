import React, { useEffect, useState } from 'react';

const WorkExperienceForm = ({ data, onNext, onChange }) => {
  const [workList, setWorkList] = useState(data || ['']);

  useEffect(() => {
    onChange(workList);
  }, [workList]);

  const handleChange = (index, value) => {
    const updated = [...workList];
    updated[index] = value;
    setWorkList(updated);
  };

  const addField = () => setWorkList([...workList, '']);
  const removeField = (index) => setWorkList(workList.filter((_, i) => i !== index));

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {workList.map((work, i) => (
        <div key={i} className="flex gap-2">
          <input
            type="text"
            placeholder={`Work Experience #${i + 1}`}
            className="input w-full"
            value={work}
            onChange={(e) => handleChange(i, e.target.value)}
          />
          {i > 0 && (
            <button type="button" onClick={() => removeField(i)} className="text-red-500 font-bold">X</button>
          )}
        </div>
      ))}
      <button type="button" onClick={addField} className="text-blue-600">+ Add Experience</button>
      <div className="text-right">
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg">Next</button>
      </div>
    </form>
  );
};

export default WorkExperienceForm;
