import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BackButton from '../components/BackButton';
import BarChart from '../components/progress/BarChart';
import PieChart from '../components/progress/PieChart';

const ShowMyProgress = () => {
  const [taskData, setTaskData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/tasks')
      .then((response) => {
        const tasks = response.data.data;
        setTaskData(tasks);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  // Calculate task counts based on status
  const getTaskCountsByStatus = () => {
    const counts = { 'In Progress': 0, 'Done': 0, 'Not Started': 0 };
    taskData.forEach((task) => {
      counts[task.status]++;
    });
    return counts;
  };

  // Calculate task counts based on priority
  const getTaskCountsByPriority = () => {
    const counts = { 1: 0, 2: 0, 3: 0 };
    taskData.forEach((task) => {
      counts[task.priority]++;
    });
    return counts;
  };

  const taskCountsByPriority = getTaskCountsByPriority();
  const barChartData = [1, 2, 3].map((priority) => ({
    priority,
    count: taskCountsByPriority[priority] || 0, // Ensure count is zero if no tasks for this priority
    taskName: taskData.find(task => task.priority === priority)?.task,
  }));

  // Prepare data for pie chart
  const taskCountsByStatus = getTaskCountsByStatus();
  const totalTasks = Object.values(taskCountsByStatus).reduce((acc, curr) => acc + curr, 0);
  const pieChartData = Object.keys(taskCountsByStatus).map((status) => ({
    x: `${status}\n(${((taskCountsByStatus[status] / totalTasks) * 100).toFixed(0)}%)`,
    y: taskCountsByStatus[status],
  }));

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-8'>My Progress</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className='flex flex-wrap justify-around'>
          <div>
            <h2 className='text-xl mb-4'>Task Status Distribution</h2>
            <PieChart data={pieChartData} />
          </div>
          <div>
            <h2 className='text-xl mb-4'>Task By Priority</h2>
            <BarChart data={barChartData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowMyProgress;
