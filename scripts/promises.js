async function test() {
  console.log("A");
  
  await new Promise(resolve => {
    setTimeout(resolve , 2000)
  });

  console.log("B");
}

test();
console.log("C");