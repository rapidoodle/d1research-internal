'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
//get groups from clinked
  useEffect(() => {
    const fetchGroups = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/clinked/groups`);
        const data = await response.json();

        console.log(data);
        
      } catch (error) {
        console.error('Error fetching groups:', error);
      } finally {
      }
    };

    fetchGroups();
  }, []);

  return (
    <div>
      <h1>User List</h1>
    </div>
  );
}
