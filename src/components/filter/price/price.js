import { useSelector, useDispatch } from "react-redux";
import {
    setFilterMaxPrice,
    setFilterMinPrice,
    setRenderData,
    getRenderCarriers,
    setCarriers,
    getMaxPrices,
    setDataToDisplay,
    resetDisplayCount,
} from "../../../redux/appSlice";
import "./price.css";
const Price = () => {
    const dispatch = useDispatch();
    const maxPrice = useSelector((state) => state.app.filter.price.max);
    const minPrice = useSelector((state) => state.app.filter.price.min);

    const handleMaxPrice = (e) => {
        dispatch(setFilterMaxPrice(e.target.value));
        dispatch(setRenderData());
        dispatch(setCarriers());
        dispatch(getMaxPrices());
        dispatch(getRenderCarriers());
        dispatch(resetDisplayCount());
        dispatch(setDataToDisplay());
    };

    const handleMinPrice = (e) => {
        dispatch(setFilterMinPrice(e.target.value));
        dispatch(setRenderData());
        dispatch(setCarriers());
        dispatch(getMaxPrices());
        dispatch(getRenderCarriers());
        dispatch(resetDisplayCount());
        dispatch(setDataToDisplay());
    };

    return (
        <div className="price">
            <strong>Цена</strong>
            <div>
                <label htmlFor="minPrice">От</label>
                <input
                    type="number"
                    id="minPrice"
                    min="0"
                    value={minPrice}
                    onChange={handleMinPrice}
                />
            </div>
            <div>
                <label htmlFor="maxPrice">До</label>
                <input
                    type="number"
                    id="maxPrice"
                    max="1000000"
                    value={maxPrice}
                    onChange={handleMaxPrice}
                />
            </div>
        </div>
    );
};

export default Price;
