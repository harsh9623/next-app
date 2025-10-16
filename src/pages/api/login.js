import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { email, password } = req.body;
      const client = await clientPromise;
      const db = client.db("Data");
      const users = db.collection("users");

      const user = await users.findOne({ email });
      if (!user) return res.status(404).json({ message: "User not found" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ message: "Invalid password" });

      res.status(200).json({ message: `Welcome back, ${user.name}!` });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
