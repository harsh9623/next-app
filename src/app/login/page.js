"use client";
import { useState } from "react";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    alert(data.message);
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" onChange={handleChange} required /><br /><br />
        <input name="password" placeholder="Password" type="password" onChange={handleChange} required /><br /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
