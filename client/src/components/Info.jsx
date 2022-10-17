import Navbar from "./navbar";
import Button from "@mui/material/Button";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import Modal from "./modal/Modal";
import { SearchContext } from "../context/searchContext";

const Info = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [popUp, setPopUp] = useState(false);

  const { user } = useContext(AuthContext);
  const res = useContext(SearchContext);
  const dates = res.dates;
  const options = res.options;

  const id = location.pathname.split("/")[2];
  const { data, loading, error } = useFetch(
    `http://localhost:8000/api/v1/hotel/find/${id}`
  );
  const msPerDay = 1000 * 60 * 60 * 24;
  function dayDiff(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDay = Math.ceil(timeDiff / msPerDay);
    return diffDay;
  }

  const days = dayDiff(dates[0].endDate, dates[0].startDate);

  const handleClick = () => {
    if (!user) {
      navigate("/login");
    } else {
      setOpen(true);
    }
  };

  return (
    <>
      <Navbar seacrbar={false} />
      {loading ? (
        "Loading"
      ) : (
        <>
          <div className="w-11/12 m-auto my-6">
            <div className="flex justify-between">
              <p className="text-3xl font-bold">{data.name}</p>
              <Button
                variant="contained"
                onClick={handleClick}
                disableElevation
              >
                Reserve Or Book Now
              </Button>
            </div>
            <div className="flex mt-4">
              <LocationOnIcon />
              <p className="font-thin ml-1">{data.address}</p>
            </div>
            <div className="mt-4">
              <p className="text-blue-800 text-lg">
                Excellent Location - {data.distance}m from center
              </p>
            </div>
            <div className="mt-2">
              <p className="text-green-700 font-semibold text-lg">
                Book a stay over {data.cheapestPrice}$ at this property and get
                a free airport taxi
              </p>
            </div>
            <div className="mt-6">
              <div className="flex flex-wrap justify-around gap-10">
                <div className="w-96">
                  <img
                    src="https://cdn-eimid.nitrocdn.com/vgzJytFNVhJtDZHFJEJPXglHtVtHelGU/assets/static/optimized/rev-01237c9/wp-content/uploads/2019/12/furnished-1-bedroom-hotel-apartment-in-sheraton-grand-hotel-dubai-4-830x500.jpg"
                    alt=""
                  />
                </div>
                <div className="w-96">
                  <img
                    src="https://cdn-eimid.nitrocdn.com/vgzJytFNVhJtDZHFJEJPXglHtVtHelGU/assets/static/optimized/rev-01237c9/wp-content/uploads/2019/12/furnished-1-bedroom-hotel-apartment-in-sheraton-grand-hotel-dubai-4-830x500.jpg"
                    alt=""
                  />
                </div>
                <div className="w-96">
                  <img
                    src="https://cdn-eimid.nitrocdn.com/vgzJytFNVhJtDZHFJEJPXglHtVtHelGU/assets/static/optimized/rev-01237c9/wp-content/uploads/2019/12/furnished-1-bedroom-hotel-apartment-in-sheraton-grand-hotel-dubai-4-830x500.jpg"
                    alt=""
                  />
                </div>
                <div className="w-96">
                  <img
                    src="https://cdn-eimid.nitrocdn.com/vgzJytFNVhJtDZHFJEJPXglHtVtHelGU/assets/static/optimized/rev-01237c9/wp-content/uploads/2019/12/furnished-1-bedroom-hotel-apartment-in-sheraton-grand-hotel-dubai-4-830x500.jpg"
                    alt=""
                  />
                </div>
                <div className="w-96">
                  <img
                    src="https://cdn-eimid.nitrocdn.com/vgzJytFNVhJtDZHFJEJPXglHtVtHelGU/assets/static/optimized/rev-01237c9/wp-content/uploads/2019/12/furnished-1-bedroom-hotel-apartment-in-sheraton-grand-hotel-dubai-4-830x500.jpg"
                    alt=""
                  />
                </div>
                <div className="w-96">
                  <img
                    src="https://cdn-eimid.nitrocdn.com/vgzJytFNVhJtDZHFJEJPXglHtVtHelGU/assets/static/optimized/rev-01237c9/wp-content/uploads/2019/12/furnished-1-bedroom-hotel-apartment-in-sheraton-grand-hotel-dubai-4-830x500.jpg"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="flex">
              <div>
                <p className="text-2xl font-bold mt-10">Stay In The Heart</p>
                <p className="mt-10">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi
                  explicabo accusamus ab aspernatur veritatis perferendis maxime
                  ipsam, provident, voluptatem voluptatum iure harum odio
                  tempora sunt nihil quae aliquam beatae ratione soluta error
                  eligendi possimus, ut iste sint? Exercitationem, ea! Enim
                  laboriosam eius velit sunt id minima nihil quibusdam impedit
                  sequi eligendi esse obcaecati consequatur quas harum illo, hic
                  maiores possimus dicta ut quaerat inventore? Enim explicabo
                  tenetur ducimus adipisci, ab ipsum voluptatibus! Aperiam ipsum
                  accusantium nobis sit nesciunt, nulla provident fugit animi,
                  repellendus, assumenda pariatur non unde? Consequuntur ipsa
                  dicta, reprehenderit placeat enim unde exercitationem
                  assumenda, sint blanditiis quaerat harum?
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold mt-10 w-40">
                  Perfect for a {days}-night stay
                </p>
                <p className="mt-2 ">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint
                  natus blanditiis quos deserunt. Distinctio repellat laudantium
                  alias at. Dignissimos, impedit.
                </p>
                <p className="my-2 text-lg font-semibold">
                  ${days * data.cheapestPrice * options.room}({days} nights)
                </p>
                <Button
                  variant="contained"
                  onClick={handleClick}
                  disableElevation
                >
                  Reserve Or Book Now
                </Button>
              </div>
              {open && (
                <Modal
                  setOpen={setOpen}
                  hotelId={id}
                  duration={dates}
                  setPopUp={setPopUp}
                  hotelName={data.name}
                  days={days}
                />
              )}
            </div>
          </div>
        </>
      )}
      {popUp && (
        <div className="fixed bg-white border-2 border-black bottom-10 right-10 text-green-600 px-12 py-2 rounded-md text-center">
          <p>Payment Successful</p>
        </div>
      )}
    </>
  );
};

export default Info;
