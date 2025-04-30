// pages/springTest.js
import { useState } from 'react';

export default function SpringTest() {
  const [name, setName] = useState('');
  const [greeting, setGreeting] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`https://spring-boot-demo-l16k.onrender.com/greet?name=${name}`);
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.text();
      setGreeting(data);
    } catch (err) {
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Test Spring Boot API</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Enter Name:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </form>

      {greeting && (
        <div>
          <h2>Greeting:</h2>
          <p>{greeting}</p>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
