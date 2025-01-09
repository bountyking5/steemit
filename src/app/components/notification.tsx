import React, { useEffect, useState } from 'react';
import { FaBell } from 'react-icons/fa';
import { Badge } from '@nextui-org/react';
import axios from 'axios';

const NotificationIcon = () => {
  const [unreadCount, setUnreadCount] = useState<number>(0); // State for unread notifications
  const [loading, setLoading] = useState<boolean>(true); // State for loading
  const [error, setError] = useState<string | null>(null); // State for error handling

  const username = localStorage.getItem('username'); // Get username from sessionStorage

  useEffect(() => {
    if (!username) {
      setError('Username not found in session storage');
      setLoading(false);
      return;
    }

    // Check for cached data in sessionStorage
    const cachedData = localStorage.getItem(`unreadCount_${username}`);
    if (cachedData) {
      setUnreadCount(Number(cachedData));
      setLoading(false);
    }

    // Fetch new notification data
    axios
      .get(`https://sds.steemworld.org/notifications_api/getUnreadSummary/${username}`)
      .then((response) => {
        const { result } = response.data;
        if (result && typeof result.total === 'number') {
          const newUnreadCount = result.total;

          // Update only if the count has changed
          if (newUnreadCount !== Number(cachedData)) {
            sessionStorage.setItem(`unreadCount_${username}`, String(newUnreadCount));
            setUnreadCount(newUnreadCount);
          }
        } else {
          setError('Invalid response format');
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching notifications:', error);
        setError('Failed to fetch notifications');
        setLoading(false);
      });
  }, [username]);

  if (loading) {
    return (
      <div style={{ marginRight: '0.5rem', marginTop: '0.5rem' }}>
        <Badge color="default" content="..." shape="circle">
          <FaBell className="text-white" size={20} />
        </Badge>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ marginRight: '0.5rem', marginTop: '0.5rem' }}>
        <Badge color="warning" content="!" shape="circle">
          <FaBell className="text-white" size={20} />
        </Badge>
      </div>
    );
  }

  return (
    <div style={{ marginRight: '1rem', marginTop: '0.5rem' }}>
  <Badge
  color="warning"
  content={unreadCount}
  shape="circle"
  style={{
    fontSize: '0.75rem', // Reduce text size
    fontWeight: 'bold', // Make the text bold
    color: 'white', // Reduce text size
    height: '18px', // Set height for badge
    minWidth: '18px', // Ensure circular shape
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '-3px',
    marginRight: '-8px',
    padding:'1px'
  }}
>
  <FaBell className="text-white" size={20} /> {/* Reduce icon size */}
</Badge>

    </div>
  );
};

export default NotificationIcon;
