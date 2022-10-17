import React, { useState, useEffect, useContext } from "react";
import useFetch from "../../hooks/useFetch";
import Button from "@mui/material/Button";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";
import "./modal.css";
import StripeCheckout from "react-stripe-checkout";
import { AuthContext } from "../../context/authContext";

const Modal = ({ setOpen, hotelId, duration, setPopUp, hotelName, days }) => {
  const KEY =
    "pk_test_51LMDaESGGFxqsWCTxYoRymcpJUlN19Wn8a5u3amcYF4YG2XPqqUArFoN6asgNiydkRqKwvMTouU2ne2OXo3uesUB00JhAIRbsP";
  const [stripeToken, setStripeToken] = useState(null);
  const onToken = (token) => {
    setStripeToken(token);
  };
  const [orderTotal, setOrderTotal] = useState(0);
  const [roomSelected, setRoomSelected] = useState([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const makeReq = async () => {
      try {
        const res = await axios.post(`http://localhost:8000/api/v1/payment`, {
          amount: orderTotal * 100,
        });
        if (res.data.success) {
          const order = await axios.post(`http://localhost:8000/api/v1/order`, {
            hotel: hotelName,
            dates: [duration[0].startDate, duration[0].endDate],
            days: days,
            user: user._id,
            rooms: roomSelected,
            amtPaid: res.data.stripeRes.amount,
          });
          console.log(order.data);
          await handleClick();
          setPopUp(true);
          setTimeout(() => {
            setPopUp(false);
          }, 5000);
        }
      } catch (err) {
        console.log(err);
      }
    };
    stripeToken && makeReq();
  }, [stripeToken]);

  const [selectedRooms, setSelectedRooms] = useState([]);

  const { data, loading, error } = useFetch(
    `http://localhost:8000/api/v1/hotel/room/${hotelId}`
  );
  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };
  const alldates = getDatesInRange(duration[0].startDate, duration[0].endDate);

  const handleSelect = async (e) => {
    console.log(duration);
    const checked = e.target.checked;
    const value = e.target.value;
    const room = e.target.getAttribute("room_number");
    const price = Number(e.target.getAttribute("room_price"));
    setSelectedRooms(
      //roomId arr
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
    //roomNum array
    setRoomSelected(
      checked
        ? [...roomSelected, room]
        : setRoomSelected.filter((item) => item !== room)
    );
    if (checked) {
      await setOrderTotal(orderTotal + price);
    } else {
      if (orderTotal - price > 0) {
        await setOrderTotal(orderTotal - price);
      } else {
        await setOrderTotal(0);
      }
    }
  };
  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((id) => {
          const temp = axios.put(
            `http://localhost:8000/api/v1/room/availability/${id}`,
            { dates: alldates }
          );
          setOpen(false);
          return temp.data;
        })
      );
    } catch (err) {
      console.error(err.message);
    }

    setOpen(false);
  };

  return (
    <>
      <div className="reserve z-20">
        <div className="rContainer">
          <CancelIcon
            className="rClose mr-2 mt-2"
            onClick={() => setOpen(false)}
          ></CancelIcon>
          {data.map((item) => (
            <div className="rItem" key={item._id}>
              <div className="rItemInfo">
                <div className="rTitle">{item.title}</div>
                <div className="rDesc">{item.desc}</div>
                <div className="rMax">
                  Max people: <b>{item.maxPeople}</b>
                </div>
                <div className="rPrice">{item.price}</div>
              </div>
              <div className="rSelectRooms">
                {item.roomNumbers.map((roomNumber) => (
                  <div className="room">
                    <label>{roomNumber.number}</label>
                    <input
                      type="checkbox"
                      value={roomNumber._id}
                      room_number={roomNumber.number}
                      room_price={item.price}
                      onChange={handleSelect}
                      disabled={!isAvailable(roomNumber)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="m-auto w-max">
            <StripeCheckout
              name="booking.com"
              amount={orderTotal * 100}
              currency="INR"
              token={onToken}
              stripeKey={KEY}
              email={user.email}
            >
              <Button variant="contained" /*onClick={handleClick}*/>
                Reserve Now
              </Button>
            </StripeCheckout>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
