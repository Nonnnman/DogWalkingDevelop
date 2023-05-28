import { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

export const useSubmitSegment = () => {
    const { user } = useAuthContext()


    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const createSegment = async (start_date, end_date) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch('/api/segments/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({ start: start_date, end: end_date })
          })
          const json = await response.json()

        if (!response.ok){
            setIsLoading(false);
            setError(json.error);
        }
        if (response.ok){
            
            setIsLoading(false);
        }
    }

    return { createSegment , isLoading, error}
}