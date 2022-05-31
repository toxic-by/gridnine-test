import { useSelector, useDispatch } from "react-redux";
import {
    setTransferCount,
    setRenderData,
    getRenderCarriers,
    setCarriers,
    getMaxPrices,
    setDataToDisplay,
    resetDisplayCount,
} from "../../../redux/appSlice";
import "./travelTransfers.css";
const TravelTransfers = () => {
    const transferCount = useSelector(
        (state) => state.app.filter.transferCount
    );
    const dispatch = useDispatch();

    const handleChange = (e) => {
        dispatch(setTransferCount(e.target.value));
        dispatch(setRenderData());
        dispatch(setCarriers());
        dispatch(getMaxPrices());
        dispatch(getRenderCarriers());
        dispatch(resetDisplayCount());
        dispatch(setDataToDisplay());
    };

    return (
        <div className="travels">
            <strong>Фильтровать</strong>
            <div>
                <input
                    type="checkbox"
                    id="singleTransfer"
                    value="singleTransfer"
                    checked={transferCount.singleTransfer}
                    onChange={handleChange}
                />
                <label htmlFor="singleTransfer">Одна пересадка</label>
            </div>
            <div>
                <input
                    type="checkbox"
                    id="noTransfer"
                    value="noTransfer"
                    checked={transferCount.noTransfer}
                    onChange={handleChange}
                />
                <label htmlFor="noTransfer">Без пересадок</label>
            </div>
        </div>
    );
};

export default TravelTransfers;
