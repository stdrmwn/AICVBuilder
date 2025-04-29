import React, { useEffect, useState } from 'react';

const SkillsForm = ({ data, onNext, onChange }) => {
  const [skills, setSkills] = useState(data || ['']);

  useEffect(() => {
    onChange(skills);
  }, [skills]);

  const handleChange = (index, value) => {
    const updated = [...skills];
    updated[index] = value;
    setSkills(updated);
  };

  const addField = () => setSkills([...skills, '']);
  const removeField = (index) => setSkills(skills.filter((_, i) => i !== index));

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {skills.map((skill, i) => (
        <div key={i} className="flex gap-2">
          <input
            type="text"
            placeholder={`Skill #${i + 1}`}
            className="input w-full"
            value={skill}
            onChange={(e) => handleChange(i, e.target.value)}
          />
          {i > 0 && (
            <button type="button" onClick={() => removeField(i)} className="text-red-500 font-bold">X</button>
          )}
        </div>
      ))}
      <button type="button" onClick={addField} className="text-blue-600">+ Add Skill</button>
      <div className="text-right">
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg">Next</button>
      </div>
    </form>
  );
};

export default SkillsForm;
