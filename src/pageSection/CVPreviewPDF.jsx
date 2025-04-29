import {
  Document,
  Page,
  StyleSheet,
  Text,
  View
} from '@react-pdf/renderer';
import React from 'react';

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 11, fontFamily: 'Helvetica' },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 4 },
  contact: { fontSize: 10, marginBottom: 10 },
  section: { marginBottom: 10 },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
    textTransform: 'uppercase',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 2,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  leftColumn: { width: '70%' },
  rightColumn: { width: '30%', textAlign: 'right' },
  bold: { fontWeight: 'bold' },
  bullet: { marginLeft: 10, marginBottom: 2 },
});

const CVPreviewPDF = ({ formData = {} }) => {
  const {
    personal = {},
    work = [],
    education = [],
    skills = [],
    summary = '',
  } = formData;

  const getFullName = () =>
    [personal.firstName, personal.lastName, personal.otherNames]
      .filter(Boolean)
      .join(' ');

  return (
    <Document>
      <Page style={styles.page}>
        {/* Header */}
        <Text style={styles.header}>{getFullName()}</Text>
        <Text style={styles.contact}>
          {personal.email} | {personal.phone} | {personal.portfolio}
        </Text>

        {/* Summary */}
        {summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Profil Singkat</Text>
            <Text>{summary}</Text>
          </View>
        )}

        {/* Work Experience */}
        {Array.isArray(work) && work.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pengalaman Kerja</Text>
            {work.map((job, i) => (
              <View key={i} style={{ marginBottom: 6 }}>
                <View style={styles.row}>
                  <Text style={styles.bold}>
                    {job.position || 'Posisi'} - {job.company || 'Perusahaan'}
                  </Text>
                  <Text>
                    {[job.startMonth, job.startYear].filter(Boolean).join(' ')} -{' '}
                    {job.endYear?.toLowerCase() === 'present'
                      ? 'Present'
                      : [job.endMonth, job.endYear].filter(Boolean).join(' ')}
                  </Text>
                </View>
                {job.description && (
                  <Text style={styles.bullet}>- {job.description}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {Array.isArray(education) && education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pendidikan</Text>
            {education.map((edu, i) => (
              <View key={i} style={{ marginBottom: 6 }}>
                <View style={styles.row}>
                  <Text style={styles.bold}>
                    {edu.level} - {edu.school}
                  </Text>
                  <Text>
                    {[edu.startYear, edu.endYear].filter(Boolean).join(' - ')}
                  </Text>
                </View>
                {edu.description && (
                  <Text style={styles.bullet}>- {edu.description}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {Array.isArray(skills) && skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Keahlian</Text>
            {skills.map((skill, i) => (
              <Text key={i} style={styles.bullet}>
                - {skill}
              </Text>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};

export default CVPreviewPDF;
