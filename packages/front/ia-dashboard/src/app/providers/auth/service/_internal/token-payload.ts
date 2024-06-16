export interface TokenPayload {
  id: number;
  role: 'ADMIN' | 'TEACHER' | 'USER';
  iat: number;
  exp: number;
}
