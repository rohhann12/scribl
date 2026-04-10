export function generateRandomString() {
  return (Math.random() * 1000).toString().substring(2, 5) + (Math.random() * 1000).toString().substring(2, 5)
}
