import axios from "axios";
import { Client } from "dsteem";

const client = new Client('https://api.steemit.com', {
  timeout: 3000,
  addressPrefix: 'STM',
  chainId: '0000000000000000000000000000000000000000000000000000000000000000',

});

export const checkIfUserVoted01 = async (authorname: any, permlink: any, username: any) => {
  try {
    // Fetch the active votes for the post
    const votes = await client.database.call('get_active_votes', [authorname, permlink]);

    // Find the vote for the given username
    const userVote = votes.find((vote: { voter: any }) => vote.voter === username);

    // If user has voted, check if it's upvote or downvote
    if (userVote) {
      const voteType = userVote.percent > 0 ? 'upvote' : (userVote.percent < 0 ? 'downvote' : 'neutral');
      return voteType;  // Return either 'upvote', 'downvote', or 'neutral'
    }
    return 'neutral';
  } catch (error) {
    console.error("Error checking if user voted:", error);
    return 'error';  // Return 'error' if there's an issue
  }
};



export const checkIfUserVoted = async (authorname: any, permlink: any, username: any) => {
  try {
    // Fetch the active votes for the post
    const votes = await client.database.call('get_active_votes', [authorname, permlink]);

    // Check if the user's name exists in the votes array
    const userVote = votes.find((vote: { voter: any; }) => vote.voter === username);

    // Return true if the user has voted, otherwise false
    return !!userVote;
  } catch (error) {
    console.error("Error checking if user voted:", error);
    return false; // Return false if there's an error
  }
};

export const checkIfUserVote = async (
  authorname: string,
  permlink: string,
  username: string | undefined
) => {
  if (!username) return false;
  try {
    const response = await axios.get(
      `https://sds.steemworld.org/posts_api/getVotes/${authorname}/${permlink}`
    );
    const voters = response.data?.result?.rows || [];
    const voterdetail = voters.map((vote: any[]) => ({
      voteusername: vote[0],
      voteValue: vote[2],
    }));

    const filteredVoters = voterdetail.filter(
      (voter: { voteValue: number }) => voter.voteValue > 0
    );

    // Check if the username exists in the filtered voters list
    return filteredVoters.some(
      (voter: { voteusername: string | "" }) => voter.voteusername === username
    );
  } catch (error) {
    console.error("Error fetching voter list:", error);
    return false;
  }
};



export const checkUserVote = (
  authorname: string,
  permlink: string,
  username: string | undefined
): Promise<boolean> => {
  if (!username) return Promise.resolve(false);

  return axios
    .get(`https://sds.steemworld.org/posts_api/getVotes/${authorname}/${permlink}`)
    .then((response) => {
      const voters = response.data?.result?.rows || [];
      const voterdetail = voters.map((vote: any[]) => ({
        voteusername: vote[0],
        voteValue: vote[2],
      }));

      const filteredVoters = voterdetail.filter(
        (voter: { voteValue: number }) => voter.voteValue > 0
      );

      // Check if the username exists in the filtered voters list
      return filteredVoters.some(
        (voter: { voteusername: string | "" }) => voter.voteusername === username
      );
    })
    .catch((error) => {
      console.error("Error fetching voter list:", error);
      return false;
    });
};
