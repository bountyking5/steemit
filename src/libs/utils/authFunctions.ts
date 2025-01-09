import { Dispatch } from 'redux';
import { setCredentials, setAuthenticated } from '@/libs/reduxToolkit/authSlice';
import { encryptData } from './enc-decHander';
import { Client , PrivateKey} from 'dsteem'


const client = new Client('https://api.steemit.com', {
  timeout: 3000,
  addressPrefix: 'STM',
  chainId: '0000000000000000000000000000000000000000000000000000000000000000',
});

// Convert the private key to a public key
export const wifToPublic = (privWif: string): string => {
  const privateKey = PrivateKey.fromString(privWif);
  return privateKey.createPublic(client.addressPrefix).toString();
};

// Validate that the private key matches the public key
export const wifIsValid = (privWif: string, pubWif: string): boolean => {
  return wifToPublic(privWif) === pubWif;
};

// Login function
export const handleLogin = async (
  username: string,
  password: string,
  dispatch: Dispatch
): Promise<{ success: boolean; message: string }> => {
  try {
    // Convert the private key to public key
    const extractedPublicKey = wifToPublic(password);
    const accountDetails = await client.database.call('get_accounts', [[username]]);
    console.log(accountDetails);
    if (accountDetails.length === 0) {
   
      return { success: false, message: 'Invalid Username' };
    }

    const userAccount = accountDetails[0];
    const publicKeys = [
      userAccount.posting.key_auths[0][0], // Posting key
      userAccount.active.key_auths[0][0], // Active key
      userAccount.owner.key_auths[0][0], // Owner key
    ];

    // Check if the extracted public key matches any of the keys in the account
    if (publicKeys.includes(extractedPublicKey)) {
      // Encrypt the private key for secure storage
      const encryptedPrivateKey = encryptData(password);

      // Store credentials securely in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('username', username);
        localStorage.setItem('encryptedPrivateKey', encryptedPrivateKey);
        localStorage.setItem('isAuthenticated', 'true');
      }

      // Dispatch actions to update Redux state
      dispatch(setCredentials({ username,encryptedPrivateKey }));
      // console.log('Dispatched:', { username, encryptedPrivateKey });
      dispatch(setAuthenticated(true));

      return { success: true, message: 'Login successful' };
    } else {
      return { success: false, message: 'Invalid credentials' };
    }

  } catch (error) {

    if (error instanceof Error) {
      if (error.message.includes("private key network id mismatch")) {
        const modifiedMessage = "Invalid Private key ";
    
        return { success: false, message: modifiedMessage }; // Return the modified message
      } else {
        // Return the original error message if it's not the "private key network id mismatch"
        return { success: false, message: `Login error: ${error.message}` };
      }
    }  
    
    return { success: false, message: `Login error: ${error}` };
  }
};


// Logout function
export const handleLogout = (dispatch: Dispatch):  { success: boolean; message: string } => {
  if (typeof window !== 'undefined') {
    // Remove session data on logout
    localStorage.removeItem('username');
    localStorage.removeItem('encryptedPrivateKey');
    localStorage.removeItem(`profileImage_${localStorage.removeItem('username')}`);
    dispatch(setAuthenticated(false));
    dispatch(setCredentials(false));
  }

  return { success: true, message: 'Logged out successfully' }
};











