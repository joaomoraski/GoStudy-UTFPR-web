import { useContext } from 'react';
import ReservationContext from '../context/ReservationContext';

const useReservation = () => useContext(ReservationContext);

export default useReservation;
