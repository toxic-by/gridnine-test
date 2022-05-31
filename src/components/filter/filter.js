import Sort from "./sort";
import TravelTransfers from "./travelTranfers/";
import Price from "./price";
import Carriers from "./carriers/carriers";
import "./filter.css";

const Filter = () => {
    return (
        <div className="filter">
            <Sort />
            <TravelTransfers />
            <Price />
            <Carriers />
        </div>
    );
};

export default Filter;
