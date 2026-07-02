import { useEffect, useState } from 'react'

const API_BASE_URL = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : '/api/teams/'

function Teams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadTeams() {
      try {
        const response = await fetch(API_BASE_URL)
        if (!response.ok) throw new Error('Unable to load teams')
        const payload = await response.json()
        const data = Array.isArray(payload) ? payload : payload?.results ?? payload?.data ?? []
        setTeams(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    loadTeams()
  }, [])

  return (
    <section>
      <h2>Teams</h2>
      {loading && <p>Loading teams...</p>}
      {error && <p role="alert">{error}</p>}
      {!loading && !error && (
        <ul>
          {teams.map((team, index) => (
            <li key={team._id ?? `${team.name}-${index}`}>
              {team.name ?? 'Team'} — {team.description ?? 'No description'}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default Teams
