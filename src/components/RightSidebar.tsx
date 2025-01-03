import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';

// RightSidebar.tsx

export const RightSidebar: React.FC = () => {
  return (
    <div>
      {/* Your component code */}
    </div>
  );
};


// Define the type for the trending context
type TrendingContextType = {
  topics: string[]; // List of trending topics
  setTopics: (topics: string[]) => void; // Function to update the topics
  refreshTopics: () => void; // Function to refresh topics, e.g., from an API
  addTopic: (topic: string) => void; // Function to add a new topic
  removeTopic: (topic: string) => void; // Function to remove a topic
};

// Create the context with an undefined initial value
const TrendingContext = createContext<TrendingContextType | undefined>(undefined);

// Provider Component
export const TrendingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [topics, setTopics] = useState<string[]>([]);

  // Function to simulate fetching topics from an API or external source
  const fetchTrendingTopics = async (): Promise<string[]> => {
    // Replace this with an actual API call if needed
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(['React', 'TypeScript', 'Web Development', 'AI', 'OpenAI']);
      }, 1000); // Simulate network delay
    });
  };

  // Function to refresh the topics
  const refreshTopics = async () => {
    const newTopics = await fetchTrendingTopics();
    setTopics(newTopics);
  };

  // Function to add a new topic
  const addTopic = (topic: string) => {
    setTopics((prevTopics) => [...prevTopics, topic]);
  };

  // Function to remove a topic
  const removeTopic = (topic: string) => {
    setTopics((prevTopics) => prevTopics.filter((t) => t !== topic));
  };

  // Load topics when the provider is mounted
  useEffect(() => {
    refreshTopics();
  }, []);

  return (
    <TrendingContext.Provider value={{ topics, setTopics, refreshTopics, addTopic, removeTopic }}>
      {children}
    </TrendingContext.Provider>
  );
};

// Custom hook to use the trending context
export const useTrending = (): TrendingContextType => {
  const context = useContext(TrendingContext);
  if (!context) {
    throw new Error('useTrending must be used within a TrendingProvider');
  }
  return context;
};
