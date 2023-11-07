import React, { useEffect, useState } from 'react';
import { getUser } from '../../services/api.service';
import { useParams } from 'react-router-dom';

export default function Profile() {
  const [user, setUser] = useState(null);
  const { userId } = useParams();

  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await getUser(userId);
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    }
    fetchUser();
  }, [userId]); 

  return (
    <div>
      <h1>User Profile</h1>
      {user ? (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>

        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
