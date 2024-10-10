type User = {
  id: string;
  email: string;
  password: string;
};

export const users: User[] = [
  {
    id: '1',
    email: 'user@example.com',
    password: '$2a$12$k8Y.iRgvFGWzWG3J3Xk95O2aJMjTuUKiNyEx.jhp8OWLZOIc1lNMK', // hashed 'password123'
  },
];

export function findUserByEmail(email: string) {
  return users.find(user => user.email === email);
}
