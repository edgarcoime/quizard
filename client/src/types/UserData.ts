export interface UserData {
  id: string;
  name: string;
  username: string;
  picture: string;

  // Dates are ISO strings
  created_at: string;
  updated_at: string;
}
