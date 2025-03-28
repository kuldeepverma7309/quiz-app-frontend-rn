import React, { useState, useEffect, useContext } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import axios from "axios";
import QuestionResult from "../components/QuestionResult"; // Question UI component

import { colors } from "../theme"; // Theme file
import { storageContext } from "../context/storageContext";
import { BASE_URL } from "../constant";

const HistoryScreen = () => {
  const { token } = useContext(storageContext)
  const [quizHistory, setQuizHistory] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const res = await axios.get(`${BASE_URL}/quiz/get-all-quizzes?page=1&limit=5`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        setQuizHistory(res.data.quizzes); // ✅ Reset history
        setTotalPages(res.data.totalPages);
        setPage(2); // ✅ Next page set for pagination
      }
    } catch (error) {
      console.error("Error refreshing history:", error);
    } finally {
      setRefreshing(false);
    }
  };


  useEffect(() => {
    fetchQuizHistory();
  }, []);

  const fetchQuizHistory = async () => {
    if (loading || page > totalPages) return;
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/quiz/get-all-quizzes?page=${page}&limit=5`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("res ", res)
      if (res.data.success) {
        setQuizHistory((prev) => [...prev, ...res.data.quizzes]); // ✅ quizzes array push ho raha hai
        setTotalPages(res.data.totalPages);
        setPage(page + 1);
      }
    } catch (error) {
      console.error("Error fetching history:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Quiz History</Text>

      <FlatList
        data={quizHistory} // ✅ quizzes ka array pass ho raha hai
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.quizContainer}>
            <Text style={styles.quizTitle}>📚 Topic: {item.topic} ({item.difficulty})</Text>
            <Text style={styles.date}>🕒 {new Date(item.createdAt).toLocaleString()}</Text>

            {item.questions.map((question, index) => (
              <QuestionResult key={question._id} questionData={question} index={index} />
            ))}
          </View>
        )}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        onEndReached={fetchQuizHistory}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator size="large" color="blue" /> : null}
      />


      {quizHistory.length === 0 && !loading && <Text style={styles.noData}>No quizzes attempted yet!</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: colors.background },
  header: { fontSize: 22, fontWeight: "bold", color: colors.primary, textAlign: "center", marginBottom: 10 },
  noData: { textAlign: "center", fontSize: 16, color: "gray", marginTop: 20 },
});

export default HistoryScreen;
