import React from 'react';

const CVPreview = ({ formData }) => {
  const { personal, work, education, skills, summary } = formData;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold border-b pb-2">Curriculum Vitae</h2>

      <section>
        <h3 className="font-bold text-lg">Personal Information</h3>
        <p>{personal.firstName} {personal.lastName} {personal.otherNames}</p>
        <p>{personal.headline}</p>
        <p>{personal.city}, {personal.state}</p>
        <p>{personal.email} | {personal.phone}</p>
        <p>{personal.portfolio}</p>
      </section>

      <section>
        <h3 className="font-bold text-lg">Work Experience</h3>
        {work.map((job, i) => (
          <div key={i}>{job}</div>
        ))}
      </section>

      <section>
        <h3 className="font-bold text-lg">Education</h3>
        {education.map((edu, i) => (
          <div key={i}>{edu}</div>
        ))}
      </section>

      <section>
        <h3 className="font-bold text-lg">Skills</h3>
        <ul className="list-disc ml-5">
          {skills.map((skill, i) => <li key={i}>{skill}</li>)}
        </ul>
      </section>

      <section>
        <h3 className="font-bold text-lg">Summary</h3>
        <p>{summary}</p>
      </section>
    </div>
  );
};

export default CVPreview;
