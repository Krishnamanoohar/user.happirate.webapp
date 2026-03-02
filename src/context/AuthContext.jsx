import React, { createContext, useState, useContext } from "react";

const CreditContext = createContext(null);

export const CreditProvider = ({ children }) => {
  const [creditProfile, setCreditProfile] = useState(null);
  const [rawResponse, setRawResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSetCreditData = (raw, formatted) => {
    setRawResponse(raw);
    setCreditProfile(formatted);
  };

  const value = {
    creditProfile,
    setCreditProfile,
    rawResponse,
    setRawResponse,
    isLoading,
    setIsLoading,
    error,
    setError,
    handleSetCreditData,
  };

  return (
    <CreditContext.Provider value={value}>{children}</CreditContext.Provider>
  );
};

export const useContextData = () => {
  const context = useContext(CreditContext);

  // A gentle warning if a matey tries to use this outside the provider
  if (!context) {
    throw new Error(
      "Ahoy! useCreditData must be used within a CreditProvider!",
    );
  }

  return context;
};

// ----- Example Usage -------
//   Unpack yer booty using the custom hook!
//   const { creditProfile, isLoading, handleSetCreditData } = useContextData();
