import { useSelector, useDispatch } from "react-redux";

import { getRandomId } from "../../../tools/helpers";
import {
    setRenderData,
    setCheckedCarriers,
    getRenderCarriers,
    setDataToDisplay,
    resetDisplayCount,
} from "../../../redux/appSlice";
import "./carriers.css";
const Carriers = () => {
    const dispatch = useDispatch();
    const carriers = useSelector((state) => state.app.filter.carriers);

    const handleChange = (e) => {
        dispatch(setCheckedCarriers(e.target.value));
        dispatch(setRenderData());
        dispatch(getRenderCarriers());
        dispatch(resetDisplayCount());
        dispatch(setDataToDisplay());
    };

    return (
        <div className="carriers">
            <strong>Авиакомпании</strong>
            {carriers &&
                Object.entries(carriers)
                    .sort((a, b) => b[0] - a[0])
                    .map(([key, value]) => {
                        return (
                            <div key={getRandomId()}>
                                <input
                                    type="checkbox"
                                    value={key}
                                    disabled={value.active ? "" : "disabled"}
                                    checked={value.checked}
                                    onChange={handleChange}
                                />
                                <span
                                    className={`single-carrier ${
                                        !value.active ? "disabled" : ""
                                    }`}
                                >
                                    {" "}
                                    {value.caption}
                                </span>

                                <span>
                                    {value.minPrice
                                        ? "- от " + value.minPrice
                                        : null}
                                </span>
                            </div>
                        );
                    })}
        </div>
    );
};

export default Carriers;
