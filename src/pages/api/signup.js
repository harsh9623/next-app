// import clientPromise from "@/lib/mongodb";
// import bcrypt from "bcryptjs";

// export default async function handler(req, res) {
//   if (req.method === "POST") {
//     try {
//       const { name, email, password } = req.body;
//       const client = await clientPromise;
//       const db = client.db("Data"); // your database name
//       const users = db.collection("users");

//       // check if email already exists
//       const existingUser = await users.findOne({ email });
//       if (existingUser) {
//         return res.status(400).json({ message: "User already exists" });
//       }

//       // hash password
//       const hashedPassword = await bcrypt.hash(password, 10);

//       // insert user
//       await users.insertOne({ name, email, password: hashedPassword });

//       res.status(200).json({ message: `✅ ${name} registered successfully!` });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: "Server error" });
//     }
//   } else {
//     res.status(405).json({ message: "Method not allowed" });
//   }
// }



// import clientPromise from "@/lib/mongodb";
import clientPromise from "../../lib/mongodb";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const client = await clientPromise;
      const db = client.db("Data");
      const users = db.collection("users");

      // Check if user already exists
      const existingUser = await users.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Save new user
      await users.insertOne({ name, email, password: hashedPassword });

      res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
      console.error("Signup API error:", error);
      res.status(500).json({ message: "Server error" });
    }
  } else {
    // If not POST, send proper message
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
