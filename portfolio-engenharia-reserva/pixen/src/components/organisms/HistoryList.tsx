"use client";

import * as React from "react";
import { db } from "@/lib/firebase";
import { collection, query, where, orderBy, limit, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { AuthContext } from "@/components/AuthProvider";

interface HistoryItem {
  id: string;
  content: string;
  createdAt: any;
  // Add other fields as needed
}

export default function HistoryList({ collectionName }: { collectionName: string }) {
  const { user } = React.useContext(AuthContext);
  const [history, setHistory] = React.useState<HistoryItem[]>([]);

  React.useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, collectionName),
      where("uid", "==", user.uid),
      orderBy("createdAt", "desc"),
      limit(10)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as HistoryItem));
      setHistory(items);
    });

    return unsubscribe;
  }, [user, collectionName]);

  const deleteItem = async (id: string) => {
    await deleteDoc(doc(db, collectionName, id));
  };

  if (history.length === 0) return <p>Nenhum registro ainda.</p>;

  return (
    <div className="history-section">
      <h3>Histórico</h3>
      <ul>
        {history.map(item => (
          <li key={item.id}>
            {item.content}
            <button onClick={() => deleteItem(item.id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
