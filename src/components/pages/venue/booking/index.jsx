import React from "react";

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
);

export default BookingInfo;
