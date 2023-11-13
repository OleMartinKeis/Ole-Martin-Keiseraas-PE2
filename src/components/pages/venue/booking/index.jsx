import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_HOST_URL } from "../../../storage/constants";
import { useAuth } from "../../../storage/authentication";

const BookingInfo = ({ booking }) => (
    
        <div>
            <li key={booking.id}>
                Booking ID: {booking.id}
                <br />
                Date From: {booking.dateFrom}
                <br />
                Date To: {booking.dateTo}
            </li>
      </div>
    
)
    



export default BookingInfo;