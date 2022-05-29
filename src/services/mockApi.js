export default class mockApiService {
    _api = "./flights.json";

    getMockData() {
        return fetch(this._api).then((data) => data.json());
    }
    getMockFlights() {
        return this.getMockData().then((data) => data.result.flights);
    }
}
