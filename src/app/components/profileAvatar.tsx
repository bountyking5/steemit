import React, { useEffect, useState } from 'react';
import { Avatar } from '@nextui-org/react';
import axios from 'axios';
import { proxifyImageUrl } from '@/libs/utils/imageProxyUtils'; // Import the proxifyImageUrl function

const ProfileAvatar = () => {
  const [profileImage, setProfileImage] = useState<string>('');
  // const [loading, setLoading] = useState<boolean>(true); // For loading state
  const [error, setError] = useState<string>(''); // For error handling

  const username = localStorage.getItem('username');

  useEffect(() => {

    // Check if profile image already exists in sessionStorage
    const cachedImage = localStorage.getItem(`profileImage_${username}`);
    if (cachedImage) {
      // If the image exists in cache, use it directly
      setProfileImage(cachedImage);
     
      return;
    }

    console.log('Fetching data for:', username);

    // Fetch data from the API only if the image is not cached
    axios
      .get(`https://sds0.steemworld.org/accounts_api/getAccount/${username}`)
      .then((response) => {
        const profileData = response.data.result.posting_json_metadata;

        if (profileData) {
          const parsedMetadata = JSON.parse(profileData);
          const imageUrl = parsedMetadata?.profile?.profile_image;

          if (imageUrl) {
            // Use the proxifyImageUrl function to handle image resizing
            const proxiedImageUrl = proxifyImageUrl(imageUrl, "640x0"); // 640px width for example
            setProfileImage(proxiedImageUrl);

            // Cache the proxified image in sessionStorage
            localStorage.setItem(`profileImage_${username}`, proxiedImageUrl);
          } else {
            // Handle the case when no profile image is found (optional)
            // alert('Profile image not found');
          }
        } else {
          // Handle the case when profile data is missing (optional)
          // alert('Profile data not found');
        }
      })
      .catch((error) => {
        console.error('Error fetching profile data:', error);
      });
  }, [username]);


  return (
    <div className="flex gap-8 items-center p-2">
      {/* Render the Avatar component with the proxified profile image */}
      {profileImage ? (
        <Avatar isBordered color="warning" size="sm" src={profileImage} />
      ) : (
        <Avatar isBordered color="warning" size="sm" />// Fallback in case image URL is missing
      )}
    </div>
  );
};

export default ProfileAvatar;
