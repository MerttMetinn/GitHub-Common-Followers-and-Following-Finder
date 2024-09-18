import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { User, Users, UserPlus, AlertCircle } from "lucide-react";

const App = () => {
  const [user1, setUser1] = useState("");
  const [user2, setUser2] = useState("");
  const [userData, setUserData] = useState({ followers: {}, following: {} });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    if (!user1 || !user2) {
      setError("Please enter both usernames.");
      return;
    }
  
    if (user1 === user2) {
      setError("Usernames cannot be the same.");
      return;
    }
  
    setLoading(true);
    setError("");
  
    try {
      const [followers1, followers2, following1, following2] = await Promise.all([
        axios.get(`https://api.github.com/users/${user1}/followers?per_page=100`),
        axios.get(`https://api.github.com/users/${user2}/followers?per_page=100`),
        axios.get(`https://api.github.com/users/${user1}/following?per_page=100`),
        axios.get(`https://api.github.com/users/${user2}/following?per_page=100`)
      ]);
  
      const commonFollowers = followers1.data.filter(f1 => 
        followers2.data.some(f2 => f1.login === f2.login)
      );
  
      const commonFollowing = following1.data.filter(f1 => 
        following2.data.some(f2 => f1.login === f2.login)
      );
  
      setUserData({
        followers: {
          [user1]: followers1.data,
          [user2]: followers2.data,
          common: commonFollowers
        },
        following: {
          [user1]: following1.data,
          [user2]: following2.data,
          common: commonFollowing
        }
      });
    } catch (error) {
      console.error("Error fetching data", error);
      setError("Error fetching data. Please check the usernames and try again.");
    }
  
    setLoading(false);
  };
  

  const VennDiagram = ({ type }) => {
    const total = userData[type][user1]?.length + userData[type][user2]?.length;
    const commonPercentage = total ? (userData[type].common?.length / total) * 100 : 0;

    return (
      <div className="relative w-64 h-64 mx-auto">
        <motion.div
          className="absolute w-48 h-48 rounded-full bg-red-300 opacity-50"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{ left: '0%', top: '10%' }}
        />
        <motion.div
          className="absolute w-48 h-48 rounded-full bg-blue-300 opacity-50"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{ right: '0%', top: '10%' }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="text-2xl font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {commonPercentage.toFixed(1)}%
          </motion.div>
        </div>
      </div>
    );
  };

  const UserList = ({ users, type }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-gray-50 border-b flex items-center">
        <div className="mr-2">
          {type === 'followers' ? <Users size={20} /> : <UserPlus size={20} />}
        </div>
        <h3 className="text-lg font-semibold">Common {type === 'followers' ? 'Followers' : 'Following'}</h3>
        <span className="ml-auto bg-blue-500 text-white px-2 py-1 rounded-full text-sm">
          {users.length}
        </span>
      </div>
      <ul className="divide-y divide-gray-200">
        {users.map((user) => (
          <li key={user.login} className="p-4 hover:bg-gray-50 transition-colors duration-150">
            <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="flex items-center">
              <img src={user.avatar_url} alt={user.login} className="w-10 h-10 rounded-full mr-4" />
              <span className="text-blue-600 hover:underline">{user.login}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
          GitHub Common Followers and Following Finder
        </h1>

        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mb-4">
            <div>
              <label htmlFor="user1" className="block text-sm font-medium text-gray-700 mb-1">
                First User
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  id="user1"
                  className="w-full p-4 pl-12 pr-10 text-lg border-2 border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  value={user1}
                  onChange={(e) => setUser1(e.target.value)}
                  placeholder="Enter first GitHub username"
                />
              </div>
            </div>
            <div>
              <label htmlFor="user2" className="block text-sm font-medium text-gray-700 mb-1">
                Second User
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  id="user2"
                  className="w-full p-4 pl-12 pr-10 text-lg border-2 border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  value={user2}
                  onChange={(e) => setUser2(e.target.value)}
                  placeholder="Enter second GitHub username"
                />
              </div>
            </div>
          </div>
          <button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-150 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
            onClick={fetchData}
            disabled={loading || !user1 || !user2}
          >
            {loading ? "Loading..." : "Compare Users"}
          </button>
          {error && (
            <div className="mt-4 flex items-center text-red-500">
              <AlertCircle className="mr-2" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {(userData.followers.common || userData.following.common) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Common Followers</h2>
              <VennDiagram type="followers" />
              {userData.followers.common && (
                <UserList users={userData.followers.common} type="followers" />
              )}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Common Following</h2>
              <VennDiagram type="following" />
              {userData.following.common && (
                <UserList users={userData.following.common} type="following" />
              )}
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;