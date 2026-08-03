import { useState } from "react";
import { login } from "../services/auth.service";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
  try {
    const result = await login({
      email,
      password,
    });

    localStorage.setItem("token", result.accessToken);
    localStorage.setItem("user", JSON.stringify(result.user));

    alert(`Willkommen ${result.user.username}!`);

    window.location.href = "/dashboard";
  } catch (error: any) {
    console.error(error);

    alert(
      error.response?.data?.message ??
      "Login fehlgeschlagen"
    );
  }
}

  return (
    <div style={{ padding: "40px", maxWidth: "400px" }}>
      <h1>Kreisliga Pick'em</h1>

      <br />

      <input
        type="email"
        placeholder="E-Mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "15px",
        }}
      />

      <input
        type="password"
        placeholder="Passwort"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
        }}
      />

      <button
        onClick={handleLogin}
        style={{
          width: "100%",
          padding: "12px",
          cursor: "pointer",
        }}
      >
        Login
      </button>
    </div>
  );
}