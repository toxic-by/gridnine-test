import React from "react";
import { getRandomId } from "../../tools/helpers";
import "./legs.css";
const Segments = ({ segments }) => {
    return segments.map((segment) => {
        const { departureCity, arrivalCity, travelDate, travelTime } = segment;

        return (
            <div key={getRandomId()}>
                <div className="travel-time">
                    <span>{travelDate}</span>
                    <span> {travelTime.caption} </span>
                </div>
                <div className="travel-cities">
                    <span>
                        {departureCity && (
                            <>
                                <span>{departureCity.caption}</span>{" "}
                                <span className="travel-cities__uid">
                                    {"("}
                                    {departureCity.uid}
                                    {")"}
                                </span>
                            </>
                        )}
                    </span>
                    <span>
                        {arrivalCity && (
                            <>
                                <span>{arrivalCity.caption}</span>{" "}
                                <span className="travel-cities__uid">
                                    {"("}
                                    {arrivalCity.uid}
                                    {")"}
                                </span>
                            </>
                        )}
                    </span>
                </div>
            </div>
        );
    });
};

const Legs = ({ legs }) => {
    return (
        <>
            {legs &&
                legs.map((item) => {
                    return (
                        <div key={getRandomId()} className="singe-leg">
                            <p className="leg__transfer">
                                {item.length > 1 ? "1 пересадка" : null}
                            </p>
                            <Segments segments={item} />
                            <hr />
                        </div>
                    );
                })}
            <div className="choose-button">Выбрать</div>
        </>
    );
};

export default Legs;
