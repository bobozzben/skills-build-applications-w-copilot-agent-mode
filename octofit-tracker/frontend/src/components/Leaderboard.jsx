import { useEffect, useState } from 'react'

const API_BASE_URL = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : '/api/leaderboard/'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadBoard() {
      try {
        const response = await fetch(API_BASE_URL)
        if (!response.ok) throw new Error('Unable to load leaderboard')
        const payload = await response.json()
        const data = Array.isArray(payload) ? payload : payload?.results ?? payload?.data ?? []
        setEntries(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    loadBoard()
  }, [])

  return (
    <section>
      <h2>Leaderboard</h2>
      {loading && <p>Loading leaderboard...</p>}
      {error && <p role="alert">{error}</p>}
      {!loading && !error && (
        <ol>
          {entries.map((entry, index) => (
            <li key={entry._id ?? `${entry.rank ?? index}-${index}`}>
              {entry.user?.name ?? 'Unknown'} — {entry.score ?? 0}
            </li>
          ))}
        </ol>
      )}
    </section>
  )
}

export default Leaderboard
