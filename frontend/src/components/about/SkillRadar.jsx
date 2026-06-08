import { Radar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

import profile from "../config/profile";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

const SkillRadar = () => {
  const data = {
    labels: Object.keys(profile.skills),

    datasets: [
      {
        label: "Skill Level",

        data: Object.values(profile.skills),

        fill: true,

        backgroundColor: "rgba(0,255,255,.2)",

        borderColor: "#00ffff",

        borderWidth: 2,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        suggestedMin: 0,
        suggestedMax: 100,

        grid: {
          color: "#444",
        },

        angleLines: {
          color: "#444",
        },

        pointLabels: {
          color: "white",
        },

        ticks: {
          color: "white",
        },
      },
    },

    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return <Radar data={data} options={options} />;
};

export default SkillRadar;
