import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Flights from "../flights/flights";
import { mockApiService } from "../../services";
import {
    initiateRawData,
    setRenderData,
    setMappedData,
    setCarriers,
    getMaxPrices,
    setDataToDisplay,
} from "../../redux/appSlice";
import Filter from "../filter";
import "./app.css";

const service = new mockApiService();

function App() {
    const dataToDisplay = useSelector((state) => state.app.dataToDisplay);
    const dispatch = useDispatch();

    useEffect(() => {
        service.getMockFlights().then((data) => {
            dispatch(initiateRawData(data));
            dispatch(setMappedData());
            dispatch(setRenderData());
            dispatch(setCarriers());
            dispatch(getMaxPrices());
            dispatch(setDataToDisplay());
        });
    }, [dispatch]);

    return (
        <div className="app">
            <Filter />
            <Flights data={dataToDisplay} />
        </div>
    );
}

export default App;
