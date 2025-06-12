"use client"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js"
import { Bar, Pie } from "react-chartjs-2"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement)

const ProgressPage = () => {
  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Daily Progress",
      },
    },
  }

  const barChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Tasks Completed",
        data: [12, 19, 3, 5, 2, 3, 10],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  }

  const pieChartData = {
    labels: ["Completed", "In Progress", "Pending"],
    datasets: [
      {
        label: "# of Tasks",
        data: [30, 50, 20],
        backgroundColor: ["rgba(255, 99, 132, 0.5)", "rgba(54, 162, 235, 0.5)", "rgba(255, 206, 86, 0.5)"],
        borderWidth: 1,
      },
    ],
  }

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Task Distribution",
      },
    },
  }

  return (
    <div className="bg-gray-50 min-h-screen py-6">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Progress Tracking</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bar Chart */}
          <div className="bg-white shadow rounded-lg p-4">
            <Bar options={barChartOptions} data={barChartData} />
          </div>

          {/* Pie Chart */}
          <div className="bg-white shadow rounded-lg p-4">
            <Pie data={pieChartData} options={pieChartOptions} />
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Milestones</h2>
          <div className="flex items-center justify-between">
            <div className="w-1/4 text-center">
              <div className="rounded-full h-12 w-12 flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500 text-white font-bold">
                1
              </div>
              <p className="text-gray-700 mt-2">Start</p>
            </div>
            <div className="w-1/4 text-center">
              <div className="rounded-full h-12 w-12 flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500 text-white font-bold">
                2
              </div>
              <p className="text-gray-700 mt-2">Milestone 1</p>
            </div>
            <div className="w-1/4 text-center">
              <div className="rounded-full h-12 w-12 flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500 text-white font-bold">
                3
              </div>
              <p className="text-gray-700 mt-2">Milestone 2</p>
            </div>
            <div className="w-1/4 text-center">
              <div className="rounded-full h-12 w-12 flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500 text-white font-bold">
                4
              </div>
              <p className="text-gray-700 mt-2">Finish</p>
            </div>
          </div>
        </div>

        {/* Achievement Badges */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Achievements</h2>
          <div className="flex items-center justify-start space-x-4">
            <div className="bg-green-200 text-green-700 rounded-full h-16 w-16 flex items-center justify-center">
              <span className="text-2xl">🏆</span>
            </div>
            <div className="bg-yellow-200 text-yellow-700 rounded-full h-16 w-16 flex items-center justify-center">
              <span className="text-2xl">🌟</span>
            </div>
            <div className="bg-blue-200 text-blue-700 rounded-full h-16 w-16 flex items-center justify-center">
              <span className="text-2xl">🏅</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProgressPage
