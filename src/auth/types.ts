export interface User {
  _id: string;
  name_first?: string;
  name_last?: string;
  email: string;
  username: string;
  saved_events: string[];
  role: 'user' | 'admin';
}
