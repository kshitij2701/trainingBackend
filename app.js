// const express = require("express");

// const app = express(); 
// const PORT = 3000;

// // app.listen(PORT, (error) => { 
// //     if (!error)
// //       console.log(
// //         "Server is Successfully Running, and App is listening on port" + PORT
// //         );
// //     else 
// //      console.log("Error occurred, server can't start", error);
// //   });



// app.get("/", function (req, res) {
//      res.send("Welcome to  express js created by kshitij!");
// });

// var server = app.listen(PORT, function () { 
//    var port = server.address().port;
//    console.log("Example app listening at http://127.0.0.1:%s", port);
// });


const express = require("express");

const app = express();
const PORT = 3000;

// app.listen(PORT, (error) => {
//   if (!error)
//     console.log(
//       "Server is Successfully Running, and App is listening on port " + PORT
//     );
//   else console.log("Error occurred, server can't start", error);
// });

// stuff used most
// req.body, req.params, req.cookies,                       req.baseUrl, req.app
const handler = (req, res) => {
  // res.send("Welcome to JavaTpoint!");
  // the route to get query of firtsname and lastname
  // http://localhost:3000/?firstname=%22abc%22&lastname=%22bcd%22
  res.send(
    "<h2>Firstname: " +
      req.query["firstname"] +
      "</h2>  <p>Lastname: " +
      req.query["lastname"] +
      "</p><p>Password: " +
      req.query["password"] +
      "</p>  <p>AboutYou: " +
      req.query["aboutyou"] +
      "</p>"
  );
};

app.get("/", handler);

app.post("/", (req, res) => {
  res.send("post hit at default route");
});

app.delete("/post/:id", (req, res) => {
  res.send(
    "delete a post from posts collection/table and which post is to be delete is",
    req.params.id
  );
});

app.patch("/post/ab*bye", (req, res) => {
  res.send(
    "this get hit on routes like /post/abcbye, /abcjhbjhbjhbhjbye, /abbye"
  );
});

app.listen(PORT, () => {
  // var port = server.address().port;
  console.log("Example app listening at http://127.0.0.1:%s", PORT);
});