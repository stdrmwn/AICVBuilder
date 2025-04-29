import React, { useEffect, useState } from 'react';

const SummaryForm = ({ data, onGenerate, onChange }) => {
  const [summary, setSummary] = useState(data || '');

  useEffect(() => {
    onChange(summary);
  }, [summary]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate();
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <textarea
        rows={6}
        placeholder="Write a short summary about yourself..."
        className="input w-full"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
      <div className="text-right">
        <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-lg">Generate CV</button>
      </div>
    </form>
  );
};

export default SummaryForm;
