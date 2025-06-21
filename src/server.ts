import mongoose from "mongoose";
import app from "./app";
const port = 3000;

async function main() {
  try {
    await mongoose.connect("mongodb+srv://testing_2024:testing_2024@cluster0.fvqqkrx.mongodb.net/bookLibrary?retryWrites=true&w=majority&appName=Cluster0");
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

main();
