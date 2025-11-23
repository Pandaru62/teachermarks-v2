import { useEffect, useState } from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { SkillLevelEnum, StudentTestByStudentInterface } from '../../interfaces/student-test.interface';
import StudentInterface from '../../interfaces/student.interface';
import { getAverageSkillById } from '../../utils/calculations/average.function';
import ReportInterface from '../../interfaces/report.interface';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend, ChartOptions } from 'chart.js';

interface StudentReportPdfProps {
  tests: StudentTestByStudentInterface[];
  student: StudentInterface;
  reports : ReportInterface[];
  uniqueSkills: { id: number; name: string }[];
  average: number;
}

export default function StudentReportPdf(props: StudentReportPdfProps) {
  const { tests, student, uniqueSkills, average, reports } = props;

  function getSkillColor(level: SkillLevelEnum): string {
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

  // Build skill average and level data
  const skills = uniqueSkills.map(skill => ({
      id: skill.id,
      name: skill.name,
      result: getAverageSkillById(tests, skill.id),
  }));

  // chart image data url (generated in the browser using Chart.js)
  const [chartDataUrl, setChartDataUrl] = useState<string | null>(null);

  useEffect(() => {
    // only run in browser
    try {
      if (typeof window === 'undefined') return;

      ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

      const labels = skills.map(s => s.name);
      const dataset = skills.map(s => s.result.average);

      const data = {
        labels,
        datasets: [
          {
            label: 'Moyenne',
            data: dataset,
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
          },
        ],
      };
      

    const dpr = typeof window !== 'undefined' ? (window.devicePixelRatio || 1) : 1;

    const options: ChartOptions<'radar'> = {
      responsive: false,
      maintainAspectRatio: false,
      animation: false,
      devicePixelRatio: dpr,
      scales: { r: { beginAtZero: true, min: 0, max: 4, ticks: { stepSize: 1 } } },
      plugins: { legend: { position: 'top' } },
    };

    // create offscreen canvas, draw chart, convert to data URL
    const canvas = document.createElement('canvas');
    const size = 400;
    // account for device pixel ratio so plotted points match visual coordinates
    const pixelRatio = (typeof window !== 'undefined' && window.devicePixelRatio) ? window.devicePixelRatio : 1;
    canvas.width = Math.round(size * pixelRatio);
    canvas.height = Math.round(size * pixelRatio);
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    canvas.style.display = 'none';
    document.body.appendChild(canvas);

    // @ts-ignore - Chart.js constructor
    const chart = new (ChartJS as any)(canvas.getContext('2d'), { type: 'radar', data, options });

      // give chart a tick to render then extract dataURL
      // use a slightly longer timeout to ensure Chart.js finishes layout
      setTimeout(() => {
                try {
                    const url = canvas.toDataURL('image/png');
                    setChartDataUrl(url);
                } catch (e) {
                    console.warn('Failed to export chart to data URL', e);
                } finally {
                    chart?.destroy?.();
                    if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
                }
      }, 120);
    } catch (e) {
      // fallback: chart not available
      console.warn('Chart generation skipped', e);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tests, uniqueSkills]);

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
          padding: 5,
          display: 'flex',
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
        <View style={styles.headerBoxes}>
          <View style={[styles.headerBox, { alignItems: 'center', justifyContent: 'center' }]}>
            {chartDataUrl ? (
              // embed generated chart image into PDF
              <Image src={chartDataUrl} style={{ width: 200, height: 200 }} />
            ) : (
              <Text>Diagramme non disponible</Text>
            )}
          </View>
          <View style={styles.simpleBox}>
            <Text>
              Moyenne générale : {average.toFixed(2)} / 20 
            </Text>
            {skills.map((skill) => (
            <Text key={skill.id}>
                {skill.name} : {skill.result.average}/4
            </Text>
            ))}
          </View>
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
