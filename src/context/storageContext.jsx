import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const storageContext = createContext();

export const StorageContextProvider = ({ children }) => {
    const [questions, setQuestions] = useState([]);
    const [topic, setTopic] = useState("");
    const [difficulty, setDifficulty] = useState("easy");
    const [numQuestions, setNumQuestions] = useState(5);
    const [token, setToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

     // Load token & user from AsyncStorage when app starts
     useEffect(() => {
        const loadStorageData = async () => {
            try {
                const storedToken = await AsyncStorage.getItem("token");
                const storedUser = await AsyncStorage.getItem("user");
                if (storedToken && storedUser) {
                    setToken(storedToken);
                    setUser(JSON.parse(storedUser));
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error("Failed to load storage data", error);
            }
        };
        loadStorageData();
    }, []);


    return (
        <storageContext.Provider
            value={{
                questions,
                setQuestions,
                topic,
                setTopic,
                difficulty,
                setDifficulty,
                numQuestions,
                setNumQuestions,
                token,
                setToken,
                isAuthenticated,
                setIsAuthenticated,
                user,
                setUser,
            }}
        >
            {children}
        </storageContext.Provider>
    );
}