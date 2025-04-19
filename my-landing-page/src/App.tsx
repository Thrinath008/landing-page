import { useState } from 'react';
import './App.css';
import { db, collection, addDoc, serverTimestamp } from './firebase';


function App() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email) {
      try {
        // Save email to Firestore
        await addDoc(collection(db, 'emails'), {
          email: email,
          timestamp: serverTimestamp(),
        });
        console.log('Email submitted:', email);
        setEmail('');
      } catch (error) {
        console.error('Error submitting email:', error);
      }
    }
  };

  return (
    <div className="container">
      <h1>🚀 Something big is coming...</h1>
      <p>Stay in the loop. Sign up to get updates!</p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Notify Me</button>
      </form>
    </div>
  );
}

export default App;
