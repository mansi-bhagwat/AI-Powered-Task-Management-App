// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Spinner from '../components/Spinner';
// import { Link } from 'react-router-dom';
// import { AiOutlineEdit } from 'react-icons/ai';
// import { BsInfoCircle } from 'react-icons/bs';
// import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
// import TasksTable from '../components/home/TasksTable';
// import TasksCard from '../components/home/TasksCard';

// const Home = () => {
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [showType, setShowType] = useState('table');

//   useEffect(() => {
//     setLoading(true);
//     axios
//       .get('http://localhost:5555/tasks')
//       .then((response) => {
//         setTasks(response.data.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.log(error);
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <div className='p-4'>
//       <div className='flex justify-center items-center gap-x-4'>
//         <button
//           className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
//           onClick={() => setShowType('table')}
//         >
//           Table
//         </button>
//         <button
//           className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
//           onClick={() => setShowType('card')}
//         >
//           Card
//         </button>
//       </div>
//       <div className='flex justify-between items-center'>
//         <h1 className='text-3xl my-8'>Tasks List</h1>
//         <Link to='/tasks/create'>
//           <MdOutlineAddBox className='text-sky-800 text-4xl' />
//         </Link>
//       </div>
//       {loading ? (
//         <Spinner />
//       ) : showType === 'table' ? (
//         <TasksTable tasks={tasks} />
//       ) : (
//         <TasksCard tasks={tasks} />
//       )}
//       <div className='flex justify-center mt-4'> {/* Add this container */}
//         <button className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg mr-2'>
//           Show My Progress
//         </button>
//         <button className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg ml-2'>
//           View Personalized Plan
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Home;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import TasksTable from '../components/home/TasksTable';
import TasksCard from '../components/home/TasksCard';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/tasks')
      .then((response) => {
        setTasks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        margin: '20px',
        minHeight: '80vh',
        background: 'linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%)', // Corrected line: Merged background styles
    }}>
      <div className='flex justify-center items-center gap-x-4' style={{ marginBottom: '20px' }}>
        <button
          style={{
            background: '#add8e6',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
          onClick={() => setShowType('table')}
        >
          Table
        </button>
        <button
          style={{
            background: '#add8e6',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
          onClick={() => setShowType('card')}
        >
          Card
        </button>
      </div>
      <div className='flex justify-between items-center' style={{ marginBottom: '20px' }}>
        <h1 style={{ fontSize: '28px', color: '#333' }}>Tasks List</h1>
        <Link to='/tasks/create' style={{ textDecoration: 'none' }}>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === 'table' ? (
        <TasksTable tasks={tasks} />
      ) : (
        <TasksCard tasks={tasks} />
      )}
      <div className='flex justify-center mt-4'>
        <button className='bg-light-blue-500 hover:bg-light-blue-700 px-4 py-1 rounded-lg mr-2' style={{
          background: '#add8e6',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '5px',
          border: 'none',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}>
          Show My Progress
        </button>
        <button className='bg-light-blue-500 hover:bg-light-blue-700 px-4 py-1 rounded-lg ml-2' style={{
          background: '#add8e6',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '5px',
          border: 'none',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}>
          View Personalized Plan
        </button>
      </div>
    </div>
  );
};

export default Home;

