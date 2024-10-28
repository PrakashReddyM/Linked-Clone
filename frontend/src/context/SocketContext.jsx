import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const { authUser } = useAuthContext();

    useEffect(() => {
        if (authUser) {
            const socketInstance = io("https://linked-clone-2.onrender.com", {
                query: {
                    userId: authUser._id,
                },
            });

            setSocket(socketInstance);

            socketInstance.on("receiveMessage", (data) => {
                console.log("New message received:", data);
            });

            return () => {
                socketInstance.close();
                setSocket(null);
            };
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]);

    return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};
