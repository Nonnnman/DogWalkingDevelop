import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

export const useSubmitSegment = () => {
  const { user } = useAuthContext();

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const createSegment = async (start_date, end_date) => {
    setIsLoading(true);
    setError(null);

    if (start_date > end_date) {
      setError("Start time must be before end time");
      return;
    }
    
    //can only make segments in the future
    if (start_date < new Date()) {
      setError("Can't make segments in the past");
      return;
    }

    const response = await fetch(`${window.backend}/api/segments/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ start: start_date, end: end_date, status: "free" }),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      alert("Segment created");
      setIsLoading(false);
    }
  };

  return { createSegment, isLoading, error };
};
