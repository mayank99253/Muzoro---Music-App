//start the server
import {app} from './src/app.js'; 
import { connectDB } from "./src/lib/db.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on port ${PORT}`);
});