import { createContext, useEffect, useState, useContext } from "react";
import io from "socket.io-client";

const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    // Note: Watching localStorage directly won't trigger re-renders, 
    // but if existing auth structure reloads the page on login/logout, this works.
    // Ideally this should come from an AuthContext but we'll use localStorage for simplicity as per existing patterns.
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    useEffect(() => {
        if (currentUser) {
            const newSocket = io("http://localhost:8800", {
                withCredentials: true
            });
            setSocket(newSocket);

            return () => newSocket.close();
        } else {
            if (socket) {
                socket.disconnect();
                setSocket(null);
            }
        }
    }, [currentUser?._id]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => {
    return useContext(SocketContext);
}
