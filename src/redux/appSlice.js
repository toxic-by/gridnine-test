import { createSlice } from "@reduxjs/toolkit";
import {
    formattedTravelDate,
    formattedTravelTime,
    getLegsTotalTime,
} from "../tools/helpers";

export const appSlice = createSlice({
    name: "app",
    initialState: {
        rawData: null,
        mappedData: null,
        renderData: null,
        filter: {
            sortType: "ascending",
            transferCount: null,
            price: { max: 0, min: 0 },
            carrier: null,
        },
    },
    reducers: {
        initiateRawData: (state, action) => {
            state.rawData = action.payload;
        },
        setMappedData: (state) => {
            state.mappedData = state.rawData.map((item) => {
                return {
                    carrier: item.flight.carrier,
                    price: item.flight.price.total,
                    legs: [
                        ...item.flight.legs.map((item) => {
                            return item.segments.map((item) => {
                                return {
                                    departureCity: item.departureCity,
                                    departureAirport: item.departureAirport,
                                    arrivalCity: item.arrivalCity,
                                    arrivalAirport: item.arrivalAirport,
                                    travelDate: formattedTravelDate(
                                        item.departureDate,
                                        item.arrivalDate
                                    ),
                                    travelTime: formattedTravelTime(
                                        item.departureDate,
                                        item.arrivalDate
                                    ),
                                };
                            });
                        }),
                    ],
                };
            });
        },
        setRenderData: (state) => {
            if (state.filter.sortType === "ascending") {
                state.renderData = [...state.mappedData].sort(
                    (a, b) => a.price.amount - b.price.amount
                );
            }
            if (state.filter.sortType === "descending") {
                state.renderData = [...state.mappedData].sort(
                    (a, b) => b.price.amount - a.price.amount
                );
            }
            if (state.filter.sortType === "fastest") {
                state.renderData = [...state.mappedData].sort(
                    (a, b) =>
                        getLegsTotalTime(a.legs) - getLegsTotalTime(b.legs)
                );
            }
        },
        setSortType: (state, action) => {
            state.filter.sortType = action.payload;
        },
    },
});

export const { initiateRawData, setRenderData, setSortType, setMappedData } =
    appSlice.actions;

export default appSlice.reducer;
