import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Flights from "../flights/flights";
import { mockApiService } from "../../services";
import { initiateRawData, setRenderData, setMappedData } from "../../redux/appSlice";
import Filter from "../filter";
import "./app.css";

const service = new mockApiService();

function App() {
    // const data = useSelector((state) => state.app.rawData);
    const renderData = useSelector((state) => state.app.renderData);
    const dispatch = useDispatch();

    useEffect(() => {
        service.getMockFlights().then((data) => {
            dispatch(initiateRawData(data));
            dispatch(setMappedData());
            dispatch(setRenderData());
        });
    }, []);

    return (
        <div>
            <Filter />
            <Flights data={renderData} />
        </div>
    );
}

export default App;
