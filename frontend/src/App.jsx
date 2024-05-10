// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import CreateTask from './pages/CreateTasks';
// import ShowTask from './pages/ShowTask';
// import EditTask from './pages/EditTask';
// import DeleteTask from './pages/DeleteTask';

// const App = () => {
//   return (
//     <Routes>
//       <Route path='/' element={<Home />} />
//       <Route path='/tasks/create' element={<CreateTask />} />
//       <Route path='/tasks/details/:id' element={<ShowTask />} />
//       <Route path='/tasks/edit/:id' element={<EditTask />} />
//       <Route path='/tasks/delete/:id' element={<DeleteTask />} />
//     </Routes>
//   );
// };

// export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateTask from './pages/CreateTasks';
import ShowTask from './pages/ShowTask';
import EditTask from './pages/EditTask';
import DeleteTask from './pages/DeleteTask';
import LoginPage from './components/LoginPage';  // Ensure this path is correct
import SignupPage from './components/SignupPage';
import ShowMyProgress from './pages/ShowMyProgress';

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/tasks/create" element={<CreateTask />} />
        <Route path="/tasks/details/:id" element={<ShowTask />} />
        <Route path="/tasks/edit/:id" element={<EditTask />} />
        <Route path="/tasks/delete/:id" element={<DeleteTask />} />
        <Route path='/show-my-progress' element={<ShowMyProgress />} />
    </Routes>
  );
};

export default App;

