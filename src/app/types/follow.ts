import { MeLiked } from "./product";
import { Member } from "./user";

export interface MeFollowed {
  _id: string;
  follow_id: string;
  subscriber_id: string;
  my_following: boolean;
  // createdAt: Date;
  // updatedAt: Date;
  // me_liked: MeLiked[];
}
