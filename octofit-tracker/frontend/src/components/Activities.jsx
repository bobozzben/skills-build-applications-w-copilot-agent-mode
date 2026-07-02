import { useEffect, useState } from 'react'

const API_BASE_URL = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : '/api/activities/'

function Activities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadActivities() {
      try {
        const response = await fetch(API_BASE_URL)
        if (!response.ok) throw new Error('Unable to load activities')
        const payload = await response.json()
        const data = Array.isArray(payload) ? payload : payload?.results ?? payload?.data ?? []
        setActivities(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    loadActivities()
  }, [])

  return (
    <section>
      <h2>Activities</h2>
      {loading && <p>Loading activities...</p>}
      {error && <p role="alert">{error}</p>}
      {!loading && !error && (
        <ul>
          {activities.map((activity, index) => (
            <li key={activity._id ?? `${activity.type}-${index}`}>
              {activity.type ?? 'Activity'} — {activity.durationMinutes ?? 0} min
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default Activities
