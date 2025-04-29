// WorkExperienceForm.jsx
import React, { useEffect, useState } from 'react';

const months = [
  '', 'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const WorkExperienceForm = ({ data, onNext, onChange }) => {
  const [workList, setWorkList] = useState(
    data?.length ? data : [{
      company: '',
      position: '',
      description: '',
      startMonth: '',
      startYear: '',
      endMonth: '',
      endYear: ''
    }]
  );

  useEffect(() => {
    onChange(workList);
  }, [workList]);

  const handleChange = (index, field, value) => {
    const updated = [...workList];
    updated[index][field] = value.trimStart();
    setWorkList(updated);
  };

  const addField = () =>
    setWorkList([
      ...workList,
      {
        company: '',
        position: '',
        description: '',
        startMonth: '',
        startYear: '',
        endMonth: '',
        endYear: ''
      }
    ]);

  const removeField = (index) =>
    setWorkList(workList.filter((_, i) => i !== index));

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = workList.every(
      (w) =>
        w.company.trim() &&
        w.position.trim() &&
        w.startMonth &&
        w.startYear &&
        w.endMonth &&
        w.endYear
    );
    if (!isValid) {
      alert('Please complete all required fields for each work experience.');
      return;
    }
    onNext();
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {workList.map((work, i) => (
        <div key={i} className="border p-4 rounded-lg space-y-4 relative bg-gray-50">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-lg">Work Experience #{i + 1}</h3>
            {i > 0 && (
              <button
                type="button"
                onClick={() => removeField(i)}
                className="text-red-500 font-bold"
              >
                X
              </button>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Company / Organization
            </label>
            <input
              type="text"
              placeholder="e.g. Shopee Indonesia"
              className="input w-full border rounded p-2"
              value={work.company}
              onChange={(e) => handleChange(i, 'company', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Position / Job Title
            </label>
            <input
              type="text"
              placeholder="e.g. Software Engineer"
              className="input w-full border rounded p-2"
              value={work.position}
              onChange={(e) => handleChange(i, 'position', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Job Description / Responsibilities
            </label>
            <textarea
              placeholder="e.g. Responsible for backend system development and API integration..."
              className="input w-full border rounded p-2"
              rows={3}
              value={work.description}
              onChange={(e) => handleChange(i, 'description', e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[150px]">
              <label className="block text-sm font-medium text-gray-700">
                Start Month
              </label>
              <select
                className="input w-full border rounded p-2"
                value={work.startMonth}
                onChange={(e) => handleChange(i, 'startMonth', e.target.value)}
              >
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month || 'Select month'}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1 min-w-[150px]">
              <label className="block text-sm font-medium text-gray-700">
                Start Year
              </label>
              <input
                type="text"
                inputMode="numeric"
                maxLength={4}
                placeholder="e.g. 2020"
                className="input w-full border rounded p-2"
                value={work.startYear}
                onChange={(e) =>
                  handleChange(i, 'startYear', e.target.value.replace(/\D/g, ''))
                }
              />
            </div>

            <div className="flex-1 min-w-[150px]">
              <label className="block text-sm font-medium text-gray-700">
                End Month
              </label>
              <select
                className="input w-full border rounded p-2"
                value={work.endMonth}
                onChange={(e) => handleChange(i, 'endMonth', e.target.value)}
              >
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month || 'Select month'}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1 min-w-[150px]">
              <label className="block text-sm font-medium text-gray-700">
                End Year
              </label>
              <input
                type="text"
                placeholder="e.g. 2023 or Present"
                className="input w-full border rounded p-2"
                value={work.endYear}
                onChange={(e) =>
                  handleChange(i, 'endYear', e.target.value)
                }
              />
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addField}
        className="text-blue-600 font-semibold mt-2"
      >
        + Add Experience
      </button>

      <div className="text-right">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default WorkExperienceForm;
