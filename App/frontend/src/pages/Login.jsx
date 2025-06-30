// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE}/Login`,
        {
          CompanyDB: 'PROD',
          UserName: username,
          Password: password,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      localStorage.setItem('token', response.data.SessionId);

      setMessage({ type: 'success', text: 'Login successful! Redirecting...' });
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      console.error(err);
      setMessage({
        type: 'error',
        text: `Login failed: ${err.response?.data?.error?.message?.value || err.message}`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(to bottom right, #e0f7fa, #80deea)',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: '#fff',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
          width: '100%',
          maxWidth: '400px',
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            marginBottom: '1.5rem',
            color: '#00796b',
          }}
        >
          Login
        </h2>

        {message.text && (
          <div
            style={{
              marginBottom: '1rem',
              padding: '0.75rem',
              borderRadius: '6px',
              backgroundColor: message.type === 'error' ? '#ffebee' : '#e8f5e9',
              color: message.type === 'error' ? '#c62828' : '#2e7d32',
              border: `1px solid ${message.type === 'error' ? '#ef9a9a' : '#a5d6a7'}`,
              fontSize: '0.95rem',
              textAlign: 'center',
            }}
          >
            {message.text}
          </div>
        )}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '0.75rem',
            marginBottom: '1rem',
            borderRadius: '6px',
            border: '1px solid #ccc',
            fontSize: '1rem',
          }}
        />

        <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '6px',
              border: '1px solid #ccc',
              fontSize: '1rem',
              paddingRight: '2.5rem',
            }}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            style={{
              position: 'absolute',
              top: '50%',
              right: '0.5rem',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#00796b',
              fontSize: '1.25rem',
            }}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '0.75rem',
            borderRadius: '6px',
            border: 'none',
            backgroundColor: loading ? '#80cbc4' : '#00796b',
            color: '#fff',
            fontSize: '1rem',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.3s',
          }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}







// import React from 'react';

// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// export default function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     setLoading(true);
//     navigate('/dashboard');
//     try {
//       const response = await axios.post(
//         'https://12.189.245.44:50000/b1s/v1/Login',
//         {
//           CompanyDB: 'PROD',
//           UserName: username,
//           Password: password
//         },
//         {
//           headers: { 'Content-Type': 'application/json' }
//         }
//       );

//       // store SessionId or token
//       localStorage.setItem('token', response.data.SessionId);
//       navigate('/dashboard');
//     } catch (err) {
//       console.error(err);
//       alert('Login failed: ' + (err.response?.data?.error?.message?.value || err.message));
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       style={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         height: '100vh',
//         background: 'linear-gradient(to bottom right, #e0f7fa, #80deea)',
//         fontFamily: 'Arial, sans-serif',
//       }}
//     >
//       <div
//         style={{
//           backgroundColor: '#fff',
//           padding: '2rem',
//           borderRadius: '12px',
//           boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
//           width: '100%',
//           maxWidth: '400px',
//         }}
//       >
//         <h2 style={{
//           textAlign: 'center',
//           marginBottom: '1.5rem',
//           color: '#00796b'
//         }}>
//           Login
//         </h2>
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={e => setUsername(e.target.value)}
//           style={{
//             width: '100%',
//             padding: '0.75rem',
//             marginBottom: '1rem',
//             borderRadius: '6px',
//             border: '1px solid #ccc',
//             fontSize: '1rem'
//           }}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={e => setPassword(e.target.value)}
//           style={{
//             width: '100%',
//             padding: '0.75rem',
//             marginBottom: '1.5rem',
//             borderRadius: '6px',
//             border: '1px solid #ccc',
//             fontSize: '1rem'
//           }}
//         />
//         <button
//           onClick={handleLogin}
//           disabled={loading}
//           style={{
//             width: '100%',
//             padding: '0.75rem',
//             borderRadius: '6px',
//             border: 'none',
//             backgroundColor: loading ? '#80cbc4' : '#00796b',
//             color: '#fff',
//             fontSize: '1rem',
//             cursor: loading ? 'not-allowed' : 'pointer',
//             transition: 'background-color 0.3s'
//           }}
//         >
//           {loading ? 'Logging in...' : 'Login'}
//         </button>
//       </div>
//     </div>
//   );
// }

// client/src/pages/Login.jsx
// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// export default function Login() {
//   const navigate = useNavigate();

//   const handleLogin = () => {
//     localStorage.setItem('token', 'dummy-token');
//     navigate('/dashboard');
//   };

//   return (
//     <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', background: '#f3f4f6' }}>
//       <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0px 4px 20px rgba(0,0,0,0.1)', width: '300px' }}>
//         <h2 style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '1.5rem' }}>Login</h2>
//         <button
//           style={{ width: '100%', padding: '0.75rem', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}
//           onClick={handleLogin}
//         >
//           Go to Dashboard
//         </button>
//       </div>
//     </div>
//   );
// }
