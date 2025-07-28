import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "./firebase"; // Make sure this is from Realtime Database, not Firestore

function Dashboard() {
  const [users, setUsers] = useState({});

  useEffect(() => {
    const statusRef = collection(firestore, "status");
    const q = query(statusRef, where("online", "==", true));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = {};
      snapshot.forEach((doc) => {
        data[doc.id] = doc.data();
      });
      setUsers(data);
    });

    return () => {
      unsubscribe(); // Stop listening on unmount
    };
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>📋 Online Users Dashboard</h2>
      <p><b>Total Online:</b> {Object.keys(users).length}</p>
      <ul>
        {Object.entries(users).map(([uid, info]) => (
          <li key={uid}>👤 <b>{info.email || uid}</b></li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;





