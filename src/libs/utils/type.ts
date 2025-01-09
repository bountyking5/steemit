import { Client } from "@hiveio/dhive";

export interface Post {
  title: string;
  body: string;
  image: string;
  authorname: string;
  author_reputation: string;
  author_role: string;
  author_title: string;
  is_pinned: number;
  community_tag: string;
  community_name: string;
  profile_image: string;
  upvote: string;
  reward: string;
  message_count: string;
  created: number;
  permlink: string;
  resteem_count: string | "";
  voted: string | undefined;
}


export interface profileuserData  {

  username?: string;
  created?: string;
  balance?: string;
  sbd_balance?: string;
  witness_votes?: string;
  vesting_shares?: string;
  delegated_vesting_shares?: string;
  name?: string;
  about?: string;
  webiste?: string;
  location?: string;
  set_proxys?: string;
  isFollowing?:boolean;

};
