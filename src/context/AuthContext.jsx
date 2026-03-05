import React, { createContext, useState, useContext, useEffect, useMemo, useCallback } from "react";
import { fetchCreditReport, fetchRawResponseOfUser, fetchMyApplications } from "@/api/api";

const AuthContext = createContext(null);

export const ContextProvider = ({ children }) => {
  const [creditProfile, setCreditProfile] = useState(null);
  const [rawResponse, setRawResponse] = useState(null);
  const [applications, setApplications] = useState([]);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(sessionStorage.getItem("userId") ? true : false);

  // These are now actively used during data fetching!
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  // 2. We combine the fetching logic and put it directly in the useEffect
  useEffect(() => {
    // Only hoist the sails and fetch data if the user is actually logged in!
    if (!isUserLoggedIn) {
      // Optional: Clear the decks (reset data) if the user logs out
      setCreditProfile(null);
      setRawResponse(null);
      return;
    }

    const fetchAllData = async () => {
      setIsLoading(true);
      setError(null); // Clear any old errors before setting sail

      try {
        const mobileNumber = sessionStorage.getItem("mobile_number");
        const userId = sessionStorage.getItem("userId");

        // Make sure we have the keys to the chest before fetching
        if (!mobileNumber || !userId) {
          throw new Error("Missing credentials in the ship's log (sessionStorage)!");
        }

        // 3. Promise.all fetches both API calls AT THE SAME TIME. Much faster! ⚡
        const [creditResp, rawResp, fileResp] = await Promise.all([
          fetchCreditReport({ mobileNumber, userId }),
          fetchRawResponseOfUser(),
          fetchMyApplications()
        ]);
        console.log("fileResp",fileResp)

        setCreditProfile(creditResp?.data || null);
        setRawResponse(rawResp?.data?.data?.rawData || null);
        setApplications(fileResp?.data?.applications || [])
      } catch (err) {
        console.error("A storm hit while fetching data:", err);
        setError(err.message || "Failed to fetch user data.");
      } finally {
        // Drop the anchor, loading is done whether it succeeded or failed
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, [isUserLoggedIn]); // This effect ONLY runs when isUserLoggedIn changes

  // 4. useMemo caches the value object so child components don't re-render needlessly
  const value = useMemo(() => ({
    creditProfile,
    setCreditProfile,
    rawResponse,
    setRawResponse,
    applications,
    setApplications,
    isUserLoggedIn,
    setIsUserLoggedIn,
    isLoading,
    error,
  }), [creditProfile, rawResponse, applications, isUserLoggedIn, isLoading, error]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Renamed the hook to match the AuthContext file name
export const useContextData = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "Ahoy! useAuthData must be used within an AuthProvider! 🏴‍☠️"
    );
  }

  return context;
};