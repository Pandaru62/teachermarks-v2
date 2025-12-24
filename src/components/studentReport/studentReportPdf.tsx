import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { SkillLevelEnum, StudentTestByStudentInterface } from '../../interfaces/student-test.interface';
import StudentInterface from '../../interfaces/student.interface';
import { getAverageSkillById } from '../../utils/calculations/average.function';
import ReportInterface from '../../interfaces/report.interface';

interface StudentReportPdfProps {
  tests: StudentTestByStudentInterface[];
  student: StudentInterface;
  reports : ReportInterface[];
  uniqueSkills: { id: number; name: string }[];
  average: number;
}

function getProgressColor(avg: number): string {
  if (avg > 3.6) return "#558F72";
  if (avg > 2.9) return "#54C3B2";
  if (avg > 1.9) return "#FAC215";
  return "#F46030";
}

export function getSkillColor(level: SkillLevelEnum): string {
  switch (level) {
    case SkillLevelEnum.LVL0: return "#000000";
    case SkillLevelEnum.LVL1: return "#F46030";
    case SkillLevelEnum.LVL2: return "#FAC215";
    case SkillLevelEnum.LVL3: return "#54C3B2";
    case SkillLevelEnum.LVL4: return "#558F72"; 
    case SkillLevelEnum.NN:
    default:
    return "#f0f9ff"; 
  }
}

export default function StudentReportPdf(props: StudentReportPdfProps) {
  const { tests, student, uniqueSkills, average, reports } = props;

  // Build skill average and level data
  const skills = uniqueSkills.map(skill => ({
      id: skill.id,
      name: skill.name,
      result: getAverageSkillById(tests, skill.id),
  }));

  const styles = StyleSheet.create({
      page: {
          padding: 20,
          fontSize: 12,
      },
      header: {
          marginBottom: 10,
      },
      headerBoxes: {
      display: 'flex',
      flexDirection: 'row',
      gap: 10
      },
      headerBox : {
        padding: 5,
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 1
      },
      simpleBox : {
        display: 'flex',
        padding: 5,
        justifyContent: 'flex-end'
      },
      section: {
          marginBottom: 20,
      },
      title: {
          fontSize: 18,
          marginBottom: 10,
          fontWeight: 'bold',
          textAlign: 'center'
      },
      table: {
          display: 'flex',
          flexDirection: 'column',
          borderWidth: 1,
          borderColor: '#000',
          borderStyle: 'solid',
      },
      tableRow: {
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: '#000',
          borderBottomStyle: 'solid',
      },
      tableHeader: {
          backgroundColor: '#eee',
          fontWeight: 'bold',
      },
      tableCell: {
          padding: 4,
          fontSize: 10,
          borderRightWidth: 1,
          borderRightColor: '#000',
          borderRightStyle: 'solid',
          textAlign: 'center',
      },
      lastCell: {
          borderRightWidth: 0,
      },
      cellTR: { flex: 0.5 },
      cellName: { flex: 2 },
      cellNote: { flex: 0.5 },
      cellSkill: { flex: 1 },
      skillLevelWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 4,
      },
      skillDot: {
          width: 6,
          height: 6,
          borderRadius: 9999,
          marginRight: 4,
      },
      comment: {
          marginTop: 10,
          padding: 5,
          borderStyle: 'solid',
          borderColor: 'black',
          borderWidth: 2
      }
      ,
      // progress bar styles
      progressContainer: {
        marginTop: 6,
        marginBottom: 6,
      },
      progressLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
      },
      progressBarOuter: {
        height: 8,
        backgroundColor: '#e6e6e6',
        borderRadius: 4,
        overflow: 'hidden',
      },
      progressBarInner: {
        height: 8,
        backgroundColor: '#54C3B2',
        borderRadius: 4,
      }
      ,
      // two-column layout for skills
      skillsTwoColRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
      },
      skillCol: {
        width: '48%'
      }
  });



    return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <Text style={styles.title}>
          Résultats de {student.firstName} {student.lastName.toUpperCase()} {student.classes ? `(${student.classes[0].name})` : ''}
        </Text>
        <View style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <View style={styles.section}>
            <View style={styles.table}>

              {/* Header */}
              <View style={[styles.tableRow, styles.tableHeader]}>
                <Text style={[styles.tableCell, styles.cellTR]}>TR</Text>
                <Text style={[styles.tableCell, styles.cellName]}>Évaluation</Text>
                <Text style={[styles.tableCell, styles.cellNote]}>Note</Text>
                {skills.map((skill) => (
                  <Text
                    key={skill.id}
                    style={[
                      styles.tableCell,
                      styles.cellSkill,
                    ]}
                  >
                    {skill.name}
                  </Text>
                ))}
              </View>

              {/* Rows */}
              {tests.map(test => (
                <View key={test.id} style={styles.tableRow}>
                  <Text style={[styles.tableCell, styles.cellTR]}>{test.test.trimester}</Text>
                  <Text style={[styles.tableCell, styles.cellName]}>{test.test.name}</Text>
                  <Text style={[styles.tableCell, styles.cellNote]}>
                    {test.isAbsent ? 'ABS' : test.isUnmarked ? 'NN' :
                    `${test.mark ?? 'x'}/${test.test.scale}`}
                    </Text>
                  {skills.map((skill) => {
                      const result = test.studenttesthasskill.find((sths => sths.skill.id === skill.id));
                      const color = getSkillColor(result?.level ?? SkillLevelEnum.NN);
                    return (
                      <View
                          key={skill.id}
                          style={[
                              styles.tableCell,
                              styles.cellSkill,
                          ]}
                      >
                        {result?.level && color !== '#f0f9ff' ? (
                          <View style={styles.skillLevelWrapper}>
                              <View style={[styles.skillDot, { backgroundColor: color }]} />
                              <Text>{"Niveau " + result.level[3]}</Text>
                          </View>
                        ) : (<Text> X </Text>)}
                      </View>
                    );
                  })}
                </View>
              ))}

            </View>
          </View>
          
        </View>
        <View style={styles.simpleBox}>
          <Text>
            Moyenne générale : {average.toFixed(2)} / 20 
          </Text>
            {(() => {
              const rows: (typeof skills)[] = [];
              for (let i = 0; i < skills.length; i += 2) {
                rows.push([skills[i], skills[i + 1]]);
              }
              return rows.map((pair, rIdx) => (
                <View key={`skill-row-${rIdx}`} style={styles.skillsTwoColRow}>
                  {pair.map((skillItem, cIdx) => {
                    if (!skillItem) return <View key={`empty-${cIdx}`} style={styles.skillCol} />;
                    const pct = Math.round((skillItem.result.average / 4) * 100);
                    const color = getProgressColor(skillItem.result.average);
                    return (
                      <View key={skillItem.id} style={styles.skillCol}>
                        <View style={styles.progressContainer}>
                          <View style={styles.progressLabels}>
                            <Text>{skillItem.name}</Text>
                            <Text>{skillItem.result.average.toFixed(2)}/4</Text>
                          </View>
                          <View style={styles.progressBarOuter}>
                            <View style={[styles.progressBarInner, { width: `${pct}%`, backgroundColor: color }]} />
                          </View>
                        </View>
                      </View>
                    );
                  })}
                </View>
              ));
            })()}
        </View>
        <View style={styles.comment}>
          <Text style={{fontWeight: 700, marginBottom: 5}}> Appréciations : </Text>
          {reports.map(report => (
            report.description.length > 1 && (<Text key={report.id}>{report.trimester}: {report.description}</Text>)
          ))}
        </View>
      </Page>
    </Document>
  );
}
