import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { getRandomId } from "../../tools/helpers";
import Legs from "../legs";
import { setDataToDisplay, setDisplayCount } from "../../redux/appSlice";
import "./flight.css";

const Flights = ({ data }) => {
    const dispatch = useDispatch();
    const getTotalFiltered = useSelector(
        (state) => state.app.renderData.length
    );

    const handleLoadMore = () => {
        dispatch(setDisplayCount());
        dispatch(setDataToDisplay());
    };

    return (
        <div className="flight">
            <strong>
                Total:
                {getTotalFiltered}
            </strong>
            {data &&
                data.map((item) => {
                    return (
                        <div key={getRandomId()} className="flight-block">
                            <div className="flight-block__header">
                                {item.carrier.caption}
                                <div>
                                    {item.price.amount}{" "}
                                    {item.price.currencyCode}
                                </div>
                            </div>
                            <Legs legs={item.legs} className="legs" />
                        </div>
                    );
                })}
            <div className="load-button">
                <button onClick={handleLoadMore}>Загрузить еще</button>
            </div>
        </div>
    );
};

export default Flights;
