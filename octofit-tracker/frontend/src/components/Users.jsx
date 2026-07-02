import { useEffect, useState } from 'react'

const API_BASE_URL = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : '/api/users/'

function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await fetch(API_BASE_URL)
        if (!response.ok) throw new Error('Unable to load users')
        const payload = await response.json()
        const data = Array.isArray(payload) ? payload : payload?.results ?? payload?.data ?? []
        setUsers(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    loadUsers()
  }, [])

  return (
    <section>
      <h2>Users</h2>
      {loading && <p>Loading users...</p>}
      {error && <p role="alert">{error}</p>}
      {!loading && !error && (
        <ul>
          {users.map((user, index) => (
            <li key={user._id ?? `${user.name}-${index}`}>
              {user.name ?? 'User'} — {user.role ?? 'member'}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default Users
