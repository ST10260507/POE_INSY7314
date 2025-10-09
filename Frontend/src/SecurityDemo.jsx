// frontend/src/SecurityDemo.jsx
import { useState, useEffect } from "react";

export default function SecurityDemo() {
  const [events, setEvents] = useState([]);

  const log = (msg) => setEvents((prev) => [...prev, msg]);

  useEffect(() => {
    // Try external scripts
    const script1 = document.createElement('script');
    script1.src = 'https://evil.com/malicious.js';
    script1.onerror = () => log("External script blocked ✓");
    document.body.appendChild(script1);

    const script2 = document.createElement('script');
    script2.src = 'https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js';
    script2.onerror = () => log("CDN script blocked ✓");
    document.body.appendChild(script2);

    // Try inline script
    const script3 = document.createElement('script');
    script3.text = 'alert("inline");';
    document.body.appendChild(script3);
    log("Inline script attempted");
  }, []);

  const tryExternalFetch = async () => {
    try {
      await fetch("https://api.github.com/rate_limit");
      log("External fetch succeeded");
    } catch (e) {
      log("External fetch blocked ✓");
    }
  };

  const tryEval = () => {
    try {
      new Function("return 42")();
      log("eval() worked");
    } catch (e) {
      log("eval() blocked ✓");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>CSP Demo</h2>
      <p>Check console for CSP violations (F12)</p>

      <img
        src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b"
        alt="External"
        width={300}
        height={200}
        onError={() => log("Image blocked ✓")}
        onLoad={() => log("Image loaded")}
      />

      <div style={{ marginTop: 20 }}>
        <button onClick={tryExternalFetch} style={{ padding: 10, marginRight: 10 }}>
          Try External Fetch
        </button>
        <button onClick={tryEval} style={{ padding: 10 }}>
          Try eval()
        </button>
      </div>

      <div style={{ marginTop: 20, backgroundColor: '#f5f5f5', padding: 15 }}>
        <h3>Events:</h3>
        <ul>
          {events.map((e, i) => (
            <li key={i}>{e}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}