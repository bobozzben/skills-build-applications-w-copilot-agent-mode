import { useEffect, useState } from 'react'

const API_BASE_URL = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : '/api/workouts/'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const response = await fetch(API_BASE_URL)
        if (!response.ok) throw new Error('Unable to load workouts')
        const payload = await response.json()
        const data = Array.isArray(payload) ? payload : payload?.results ?? payload?.data ?? []
        setWorkouts(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    loadWorkouts()
  }, [])

  return (
    <section>
      <h2>Workouts</h2>
      {loading && <p>Loading workouts...</p>}
      {error && <p role="alert">{error}</p>}
      {!loading && !error && (
        <ul>
          {workouts.map((workout, index) => (
            <li key={workout._id ?? `${workout.title}-${index}`}>
              {workout.title ?? 'Workout'} — {workout.intensity ?? 'medium'}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default Workouts
