import './App.css';
import { StudentProvider } from './context/StudentContext';
import Dashboard from './dashboard/Dashboard';

function App() {
  return (
    <div className="App">
      <StudentProvider>
        <Dashboard />
      </StudentProvider>
    </div>
  );
}

export default App;
