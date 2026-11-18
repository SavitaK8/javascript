
function greet() {
  const end = Date.now();
  console.log(end - start );
  console.log("hello savi");
}

const start = Date.now();

setTimeout(greet, 1000);

