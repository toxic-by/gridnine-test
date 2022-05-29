import React from "react";
import { getRandomId } from "../../tools/helpers";

const Segments = ({ segments }) => {
    return segments.map((segment) => {
        const { departureCity, arrivalCity, travelDate, travelTime } = segment;

        return (
            <p key={getRandomId()}>
                <span>{travelDate}</span> <span> {travelTime.caption} </span>
                <span>{departureCity && `${departureCity.caption} (${departureCity.uid})`}-</span>
                <span>{arrivalCity && `${arrivalCity.caption} (${arrivalCity.uid})`}</span>
            </p>
        );
    });
};

const Legs = ({ legs }) => {
    return (
        <>
            {legs &&
                legs.map((item) => {
                    return (
                        <div key={getRandomId()}>
                            <p>{item.length}</p>
                            <Segments segments={item} />
                        </div>
                    );
                })}
        </>
    );
};

export default Legs;
