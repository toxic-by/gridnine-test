import { useSelector, useDispatch } from "react-redux";

import { setSortType, setRenderData } from "../../redux/appSlice";

const Filter = () => {
    const sortType = useSelector((state) => state.app.filter.sortType);
    const dispatch = useDispatch();

    const handleChange = (event) => {
        dispatch(setSortType(event.target.value));
        dispatch(setRenderData());
    };

    return (
        <form>
            <p>Сортировать по</p>
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

export default Filter;
