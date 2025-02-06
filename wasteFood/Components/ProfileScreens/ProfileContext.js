// ProfileContext.js
import React, { createContext, useState } from 'react';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [profilePicture, setProfilePicture] = useState(require('../../assets/pdp1.jpg'));

    return (
        <ProfileContext.Provider value={{ profilePicture, setProfilePicture }}>
            {children}
        </ProfileContext.Provider>
    );
};