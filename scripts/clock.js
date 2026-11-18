function clock() {
  const now = new Date();

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  console.log(`${hours}:${minutes}:${seconds}`)
}

setInterval(clock, 1000)