
import { createContext, useState, useEffect } from "react";
const ReservationContext = createContext();
export function ReservationProvider({children}){
  
    const [reservas, setReservas] = useState([]);

    return <ReservationContext.Provider
     value={{
        reservas, setReservas
     }}>
       {children} 
    </ReservationContext.Provider>
}

export const ReservationConsumer = ReservationContext.Consumer;

export default ReservationContext;
