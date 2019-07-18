import User from './User';

export default interface Scope {
  id: string;
  name: string;
  description?: string;
  user: User;
}
