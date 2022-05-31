import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    setSortType,
    setRenderData,
    getRenderCarriers,
    setCarriers,
    getMaxPrices,
    setDataToDisplay,
    resetDisplayCount,
} from "../../../redux/appSlice";
import "./sort.css";
const Sort = () => {
    const sortType = useSelector((state) => state.app.filter.sortType);
    const dispatch = useDispatch();

    const handleChange = (event) => {
        dispatch(setSortType(event.target.value));
        dispatch(setRenderData());
        dispatch(setCarriers());
        dispatch(getMaxPrices());
        dispatch(getRenderCarriers());
        dispatch(resetDisplayCount());
        dispatch(setDataToDisplay());
    };
    return (
        <form className="sort">
            <strong>Сортировать по</strong>
            <div>
                <input
                    checked={sortType === "ascending"}
                    onChange={handleChange}
                    value="ascending"
                    type="radio"
                />
                Возрастанию
            </div>
            <div>
                <input
                    checked={sortType === "descending"}
                    onChange={handleChange}
                    value="descending"
                    type="radio"
                />
                Убыванию
            </div>
            <div>
                <input
                    checked={sortType === "fastest"}
                    onChange={handleChange}
                    value="fastest"
                    type="radio"
                />
                Времени в пути
            </div>
        </form>
    );
};

export default Sort;
