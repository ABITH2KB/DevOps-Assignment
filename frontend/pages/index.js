import { useState, useEffect } from 'react';
import Head from 'next/head';
import axios from 'axios';

export default function Home() {
  const [message, setMessage] = useState('Loading...');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Correct health endpoint
        const healthCheck = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/health`
        );

        if (healthCheck.data.status === 'healthy') {
          setStatus('Backend is connected!');
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/message`
          );
          setMessage(response.data.message);
        }
      } catch (error) {
        setMessage('Failed to connect to the backend');
        setStatus('Backend connection failed');
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <Head>
        <title>DevOps Assignment</title>
        <meta name="description" content="DevOps Assignment with FastAPI and Next.js" />
      </Head>

      <main>
        <h1>DevOps Assignment</h1>

        <p>
          Status:{' '}
          <span className={status.includes('connected') ? 'success' : 'error'}>
            {status}
          </span>
        </p>

        <h2>Backend Message</h2>
        <p>{message}</p>

        <p className="info">
          Backend URL: {process.env.NEXT_PUBLIC_API_URL}
        </p>
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .success {
          color: green;
          font-weight: bold;
        }
        .error {
          color: red;
          font-weight: bold;
        }
        .info {
          margin-top: 1rem;
          font-size: 0.9rem;
          color: #666;
        }
      `}</style>
    </div>
  );
}
