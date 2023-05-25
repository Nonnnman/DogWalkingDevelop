import { useEffect }from 'react'
import { useListingsContext } from "../hooks/useListingsContext"



const Home = () => {
  const {listings, dispatch} = useListingsContext()

  useEffect(() => {
    const fetchListings = async () => {
      const response = await fetch('/api/user', {
        headers: {
        }
      })
      const json = await response.json()

      

      if (response.ok) {
        dispatch({type: 'SET_LISTING', payload: json})
      }
    }
    fetchListings()
  }, [dispatch])

  return (
    <div className="home">
      <div className="workouts">
        {listings && listings.map((item) => (
          <h4>{item.username}</h4>
        ))}
      </div>
    </div>
  )
}

export default Home