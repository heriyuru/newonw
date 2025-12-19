 
 'use client';


import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [restId, setRestId] = useState(null);
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "kushas" && password === "1234") {
      localStorage.setItem("restid", "1");
      localStorage.setItem("restlocation", "https://maps.app.goo.gl/EaQzfEaVe1r1c6s18");
      setRestId("1");
      alert("restid set to 1 in localStorage.");
    router.push("/orders");
      
    } else if (email === "sno" && password === "12345") {
      localStorage.setItem("restid", "3");
      localStorage.setItem("restlocation", "https://maps.app.goo.gl/hkS6Hha1cetHDUE7A");
      setRestId("3");
      alert("restid set to 1 in localStorage.");
      router.push("/orders");
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <form onSubmit={handleLogin}>
        <h2>Login</h2>

        <label>Email:</label>
        <input
          type="text"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <br />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <br /><br />

        <button type="submit">Login</button>
      </form>

      {restId && (
        <div style={{ marginTop: '20px' }}>
          <h3>Stored Rest ID: {restId}</h3>
        </div>
      )}
    </div>
  );
}