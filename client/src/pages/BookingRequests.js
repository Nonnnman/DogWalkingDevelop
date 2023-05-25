import { useEffect }from 'react'
import { useListingsContext } from "../hooks/useListingsContext"
import { useAuthContext } from '../hooks/useAuthContext'



const Home = () => {
  const {listings, dispatch} = useListingsContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchListings = async () => {
      const response = await fetch('/api/bookings', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      

      if (response.ok) {

        dispatch({type: 'SET_LISTING', payload: json})
      }
    }

    if (user){
      fetchListings()
    }
  }, [dispatch, user])

  return (
    <div>
      <div>
        {listings && listings.map((item) => (
          <h4>{item.owner}</h4>
        ))}
      </div>
    </div>
  )
}

export default Home