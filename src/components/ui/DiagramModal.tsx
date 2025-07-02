import { DialogHeader, DialogBody, DialogFooter, Button } from "@material-tailwind/react";
import StudentInterface from "../../interfaces/student.interface";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { AverageBySkillByTrimesterInterface } from "../../utils/calculations/average.function";

interface DiagramModalProps {
    handleOpen: () => void;
    student : StudentInterface;
    averageSkills: AverageBySkillByTrimesterInterface[];
}

export default function DiagramModal(props : DiagramModalProps) {

    const {handleOpen, student, averageSkills} = props;

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const data = {
  labels: averageSkills[0].skills.map(sk => sk.name),
  datasets: [
    {
      label: 'TR1',
      data: averageSkills[0].skills.map(sk => sk.result),
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    },
    {
      label: 'TR2',
      data: averageSkills[1].skills.map(sk => sk.result),
      backgroundColor: 'rgba(132, 255, 99, 0.2)',
      borderColor: 'rgba(132, 255, 99, 1)',
      borderWidth: 1,
    },
    {
      label: 'TR3',
      data: averageSkills[2].skills.map(sk => sk.result),
      backgroundColor: 'rgba(132, 99, 255, 0.2)',
      borderColor: 'rgba(132, 99, 255, 1)',
      borderWidth: 1,
    },
  ],
};

const options: ChartOptions<'radar'> = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    r: {
      beginAtZero: true,
      min: 0,
      max: 4,
      ticks: {
        stepSize: 1,
        color: '#555',
      },
      pointLabels: {
        font: {
          size: 14,
        },
        color: '#333',
      },
      grid: {
        color: '#ccc',
      },
      angleLines: {
        color: '#ddd',
      },
    },
  },
  plugins: {
    legend: {
      position: 'top',
      labels: {
        color: '#444',
        font: { size: 12 },
      },
    },
  },
};

    return (
        <>
        <DialogHeader>Progression de {student.firstName} {student.lastName}</DialogHeader>
        <DialogBody>
            <div style={{ width: '400px', height: '400px', margin: 'auto' }}>
                <Radar data={data} options={options} />
            </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Fermer</span>
          </Button>
        </DialogFooter>
        </>
    )
}