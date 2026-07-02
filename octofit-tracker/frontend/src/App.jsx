import { Link, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

function Home() {
  return (
    <div>
      <h1>OctoFit Tracker</h1>
      <p>Explore the multi-tier fitness app experience.</p>
      <p>Set VITE_CODESPACE_NAME in .env.local to use Codespaces API URLs.</p>
      <nav>
        <ul>
          <li><Link to="/users">Users</Link></li>
          <li><Link to="/teams">Teams</Link></li>
          <li><Link to="/activities">Activities</Link></li>
          <li><Link to="/leaderboard">Leaderboard</Link></li>
          <li><Link to="/workouts">Workouts</Link></li>
        </ul>
      </nav>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/users" element={<Users />} />
      <Route path="/teams" element={<Teams />} />
      <Route path="/activities" element={<Activities />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/workouts" element={<Workouts />} />
    </Routes>
  )
}

export default App
