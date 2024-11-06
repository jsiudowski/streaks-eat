// UserContext to grab any of the users logged in from our Firebase Auth
import React, { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth'; 
import auth from './firebaseConfig'; // Import our firebase config

interface UserContextType {
    user: User | null; // Define user as type User from Firebase
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user); // Set user state
        });

        return () => unsubscribe(); // Cleanup on unmount
    }, []);

    return (
        <UserContext.Provider value={{ user }}>
            {children}
        </UserContext.Provider>
    );
};
