import fs from "fs"

fs.readFile("a.txt", "utf8", (err, data) => {
  console.log("Reading");
  if(err) throw err;
  console.log(data);
});

fs.appendFile("a.txt", "Hello savita", (err) => {
  console.log("writing");
  if(err) throw err;
});

