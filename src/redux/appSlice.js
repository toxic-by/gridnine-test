import { createSlice } from "@reduxjs/toolkit";
import {
    formattedTravelDate,
    formattedTravelTime,
    getLegsTotalTime,
    min,
} from "../tools/helpers";

export const appSlice = createSlice({
    name: "app",
    initialState: {
        rawData: null,
        mappedData: null,
        renderData: [],
        dataToDisplay: null,
        displayCount: 2,
        filter: {
            sortType: "ascending",
            transferCount: { singleTransfer: false, noTransfer: false },
            price: { max: "", min: "" },
            carriers: [],
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
            state.rawData = null;
        },
        setRenderData: (state) => {
            let renderData = [];

            if (
                !state.filter.transferCount.singleTransfer &&
                !state.filter.transferCount.noTransfer
            ) {
                renderData = [...state.mappedData];
            }

            if (state.filter.transferCount.singleTransfer) {
                const _renderData = state.mappedData.filter((item) => {
                    return (
                        item.legs[0].length === 2 || item.legs[1].length === 2
                    );
                });

                renderData = [...renderData, ..._renderData];
            }

            if (state.filter.transferCount.noTransfer) {
                const _renderData = state.mappedData.filter((item) => {
                    return (
                        item.legs[0].length === 1 && item.legs[1].length === 1
                    );
                });
                renderData = [...renderData, ..._renderData];
            }

            if (state.filter.price.min && state.filter.price.max) {
                renderData = renderData.filter((item) => {
                    return (
                        Number(item.price.amount) <
                            Number(state.filter.price.max) &&
                        Number(item.price.amount) >
                            Number(state.filter.price.min)
                    );
                });
            }

            if (state.filter.price.min) {
                renderData = renderData.filter((item) => {
                    return (
                        Number(item.price.amount) >
                        Number(state.filter.price.min)
                    );
                });
            }

            if (state.filter.price.max) {
                renderData = renderData.filter((item) => {
                    return (
                        Number(item.price.amount) <
                        Number(state.filter.price.max)
                    );
                });
            }

            if (state.filter.sortType === "ascending") {
                renderData.sort((a, b) => a.price.amount - b.price.amount);
            }
            if (state.filter.sortType === "descending") {
                renderData.sort((a, b) => b.price.amount - a.price.amount);
            }
            if (state.filter.sortType === "fastest") {
                renderData.sort(
                    (a, b) =>
                        getLegsTotalTime(a.legs) - getLegsTotalTime(b.legs)
                );
            }

            state.renderData = renderData;
        },
        setSortType: (state, action) => {
            state.filter.sortType = action.payload;
        },
        setTransferCount: (state, action) => {
            state.filter.transferCount[action.payload] =
                !state.filter.transferCount[action.payload];
        },
        setFilterMaxPrice: (state, action) => {
            state.filter.price.max = action.payload;
        },
        setFilterMinPrice: (state, action) => {
            state.filter.price.min = action.payload;
        },
        setCarriers: (state) => {
            let carriers = state.filter.carriers;

            if (state.filter.carriers.length === 0) {
                carriers = state.mappedData.reduce((prev, item) => {
                    prev[item.carrier.uid] = {
                        caption: item.carrier.caption,
                        active: false,
                        checked: false,
                    };
                    return prev;
                }, {});
            } else {
                for (let item in carriers) {
                    carriers[item].active = false;
                }
            }
            // eslint-disable-next-line
            state.renderData.map((item) => {
                carriers[item.carrier.uid].active = true;
            });
            // eslint-disable-next-line
            state.mappedData.map((item) => {
                if (
                    carriers[item.carrier.uid].checked &&
                    !carriers[item.carrier.uid].active
                ) {
                    carriers[item.carrier.uid].checked = false;
                }
            });

            state.filter.carriers = carriers;
        },

        setCheckedCarriers: (state, action) => {
            state.filter.carriers[action.payload].checked =
                !state.filter.carriers[action.payload].checked;
        },
        getRenderCarriers: (state) => {
            const renderData = state.renderData;
            const anyChecked = Object.values(state.filter.carriers).some(
                (value) => value.checked === true
            );

            if (anyChecked) {
                state.renderData = state.renderData.filter((item) => {
                    return state.filter.carriers[item.carrier.uid].checked;
                });
            } else {
                state.renderData = renderData;
            }
        },
        getMaxPrices: (state) => {
            // eslint-disable-next-line
            state.mappedData.map((item) => {
                if (
                    !state.filter.carriers[item.carrier.uid].active ||
                    !state.filter.carriers[item.carrier.uid].checked
                ) {
                    delete state.filter.carriers[item.carrier.uid].minPrice;
                }
            });
            // eslint-disable-next-line
            state.renderData.map((item) => {
                if (state.filter.carriers[item.carrier.uid].active) {
                    state.filter.carriers[item.carrier.uid].minPrice = min(
                        item.price.amount,
                        state.filter.carriers[item.carrier.uid].minPrice
                    );
                }
            });
        },
        setDataToDisplay: (state) => {
            state.dataToDisplay = state.renderData.slice(0, state.displayCount);
        },
        setDisplayCount: (state) => {
            state.displayCount += 2;
        },
        resetDisplayCount: (state) => {
            state.displayCount = 2;
        },
    },
});

export const {
    initiateRawData,
    setRenderData,
    setSortType,
    setMappedData,
    setTransferCount,
    setFilterMaxPrice,
    setFilterMinPrice,
    setCarriers,
    setCheckedCarriers,
    getRenderCarriers,
    getMaxPrices,
    setDataToDisplay,
    setDisplayCount,
    resetDisplayCount,
} = appSlice.actions;

export default appSlice.reducer;
