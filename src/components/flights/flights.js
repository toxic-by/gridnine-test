import React from "react";
import Legs from "../legs";

import { getRandomId } from "../../tools/helpers";

const Flights = ({ data }) => {
    return (
        <div>
            {data &&
                data.map((item) => {
                    return (
                        <div key={getRandomId()}>
                            <span>
                                {item.price.amount}
                                {item.price.currencyCode}
                            </span>

                            <Legs legs={item.legs} />
                        </div>
                    );
                })}
        </div>
    );
};

export default Flights;
