import {
    Document,
    Page,
    StyleSheet,
    Text,
    View
} from '@react-pdf/renderer';
import React from 'react';

// Gaya PDF
const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 12, fontFamily: 'Helvetica' },
  section: { marginBottom: 12 },
  heading: { fontSize: 18, fontWeight: 'bold', marginBottom: 6, borderBottomWidth: 1, borderBottomColor: '#000' },
  subheading: { fontSize: 14, fontWeight: 'bold', marginBottom: 4 },
  paragraph: { marginBottom: 2 },
  listItem: { marginLeft: 10, marginBottom: 2 },
});

// Komponen Dokumen PDF
const CVPreviewPDF = ({ formData }) => {
  const { personal, work, education, skills, summary } = formData;

  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.heading}>Curriculum Vitae</Text>

        <View style={styles.section}>
          <Text style={styles.subheading}>Personal Information</Text>
          <Text style={styles.paragraph}>
            {personal.firstName} {personal.lastName} {personal.otherNames}
          </Text>
          <Text style={styles.paragraph}>{personal.headline}</Text>
          <Text style={styles.paragraph}>
            {personal.city}, {personal.state}
          </Text>
          <Text style={styles.paragraph}>
            {personal.email} | {personal.phone}
          </Text>
          <Text style={styles.paragraph}>{personal.portfolio}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subheading}>Work Experience</Text>
          {work.map((job, i) => (
            <Text key={i} style={styles.paragraph}>{job}</Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.subheading}>Education</Text>
          {education.map((edu, i) => (
            <Text key={i} style={styles.paragraph}>{edu}</Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.subheading}>Skills</Text>
          {skills.map((skill, i) => (
            <Text key={i} style={styles.listItem}>• {skill}</Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.subheading}>Summary</Text>
          <Text style={styles.paragraph}>{summary}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default CVPreviewPDF;
