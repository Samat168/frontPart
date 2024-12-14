import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContextProvider";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Footer from "../components/Footer";

function Manager() {
  const { firestore } = useAuth();
  const [messages, loading, error] = useCollectionData(
    firestore.collection("messages").orderBy("createdAt", "desc")
  );

  // Функция для удаления сообщения
  const deleteMessage = async (messageId) => {
    try {
      await firestore.collection("messages").doc(messageId).delete();
      alert("Сообщение успешно удалено!");
    } catch (error) {
      console.log("Ошибка при удалении сообщения:", error);
    }
  };

  useEffect(() => {
    // Дополнительные действия при загрузке сообщений (если нужно)
  }, [messages]);

  if (loading) return <div style={styles.loading}>Загрузка...</div>;
  if (error)
    return (
      <div style={styles.error}>
        Ошибка при загрузке данных: {error.message}
      </div>
    );

  return (
    <div style={styles.container}>
      <section style={styles.managerContainer}>
        <h1 style={styles.title}>Сообщения от пользователей</h1>
        <div style={styles.messagesList}>
          {messages?.map((message, index) => (
            <div key={index} style={styles.messageCard}>
              <h3 style={styles.username}>{message.displayName}</h3>
              <p style={styles.messageText}>
                <strong>Email:</strong> {message.uid}
              </p>
              <p style={styles.messageText}>
                <strong>Номер телефона:</strong> {message.phone}
              </p>
              <p style={styles.messageText}>
                <strong>Сообщение:</strong> {message.text}
              </p>
              <p style={styles.date}>
                <strong>Дата:</strong>{" "}
                {new Date(message.createdAt.seconds * 1000).toLocaleString()}
              </p>
              {/* Кнопка удаления сообщения */}
              <button
                style={styles.deleteButton}
                onClick={() => deleteMessage(message.id)} // Передаем ID сообщения
              >
                Удалить
              </button>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}

// Инлайновые стили
const styles = {
  container: {
    fontFamily: "'Roboto', sans-serif",
    backgroundColor: "#f4f7fb",
    padding: "20px",
  },
  managerContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    marginTop: "100px",
    marginBottom: "40px",
  },
  title: {
    fontSize: "32px",
    fontWeight: "600",
    marginBottom: "20px",
    color: "#333",
  },
  messagesList: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  messageCard: {
    padding: "15px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
    transition: "transform 0.2s ease-in-out",
  },
  username: {
    fontSize: "20px",
    fontWeight: "500",
    color: "#2c3e50",
    marginBottom: "10px",
  },
  messageText: {
    fontSize: "16px",
    color: "#555",
    margin: "5px 0",
  },
  date: {
    fontSize: "14px",
    color: "#888",
    marginTop: "10px",
  },
  loading: {
    fontSize: "18px",
    color: "#888",
    textAlign: "center",
    marginTop: "50px",
  },
  error: {
    fontSize: "18px",
    color: "#e74c3c",
    textAlign: "center",
    marginTop: "50px",
  },
  deleteButton: {
    backgroundColor: "#e74c3c",
    color: "white",
    padding: "8px 15px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    marginTop: "10px",
    fontSize: "14px",
    transition: "background-color 0.3s",
  },
};

export default Manager;
