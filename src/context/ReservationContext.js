
import { createContext, useState, useEffect } from "react";
import getAllReservation from "../services/reservation/getAllReservation";
const ReservationContext = createContext();
import useUser from "../hooks/useUser";
export function ReservationProvider({children}){
    const {user} = useUser();
    const [reservations, setReservations] = useState([]);
    const [filteredReservations, setFilteredReservations] = useState([]);
    useEffect(
        ()=>{
            (async ()=>{
                if(user.token){
                    const response = await getAllReservation({token: user.token});
                    if(response.status == "success"){
                        setReservations(response.data)
                    }
                }
            })()
        },[user]
    )

    function getRoomsReservations({date, idRoom}){
        
        console.log(date, idRoom)
        console.log(reservations)
        let aux = reservations.filter(
            (r)=>{
                return r.reservationDate == date && r.fk_id_room == idRoom
            }
        )
        setFilteredReservations(aux)
    }

    return <ReservationContext.Provider
     value={{
        reservations, setReservations,
        filteredReservations,
        getRoomsReservations
     }}>
       {children} 
    </ReservationContext.Provider>
}

export const ReservationConsumer = ReservationContext.Consumer;

export default ReservationContext;
