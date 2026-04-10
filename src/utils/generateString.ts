export function generateRandomString() {
  return (Math.random()).toString(36).substring(2, 6) + (Math.random()).toString().substring(2, 6)
}


export function generateRoomCode() {
  return Math.random().toString(36).substring(2, 6);
}