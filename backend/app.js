import express from "express";
import { createUser, login } from "./controller/auth.js";

const app = express();
app.use(express.json()); // Parse JSON bodies

app.post("/signup", (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      !email ||
      !email.includes("@") ||
      !password ||
      password.trim().length < 7
    )
      return res.status(400).send({ error: "Email and password are required" });

    const token = createUser(email, password);
    res.status(201).send({ message: "User created successfully", token }); // 201 Created - http created status
  } catch (error) {
    res.status(400).send({ error: "An error occurred. Create user failed" });
  }
});

app.post("/login", (req, res) => {
  try {
    const { email, password } = req.body;

    const token = login(email, password);
    res.status(200).send({ message: "User logged in successfully", token }); // 200 OK - http ok status
  } catch (error) {
    if (error.status === 400)
      return res.status(400).send({ error: error.message });

    res.status(400).send({ error: "An error occurred. Login failed" });
  }
});

app.post("/generate-image", (req, res) => {
  const { prompt, options } = req.body; // options: aspect_ratio, format, quality
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
