import { createContext, useContext, useState } from "react";

// Create context
const SearchContext = createContext();

// Context Provider
export const SearchProvider = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
            {children}
        </SearchContext.Provider>
    );
};

// Custom hook
export const useSearch = () => {
    return useContext(SearchContext);
};

