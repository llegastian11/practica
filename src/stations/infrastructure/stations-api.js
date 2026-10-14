import { BaseApi } from "../../shared/infrastructure/base-api.js";
import { BaseEndpoint } from "../../shared/infrastructure/base-endpoint.js";

const stationsEndpointPath = import.meta.env.VITE_STATIONS_ENDPOINT_PATH;
const reportsEndpointPath = import.meta.env.VITE_REPORTS_ENDPOINT_PATH;

/**
 * @summary Infrastructure service targeting weather stations and reports collections.
 * @class StationsApi
 * @extends BaseApi
 * @author Sebastian Reyes Limo
 */
export class StationsApi extends BaseApi {
    #stationsEndpoint;
    #reportsEndpoint;

    constructor() {
        super();
        this.#stationsEndpoint = new BaseEndpoint(this, stationsEndpointPath);
        this.#reportsEndpoint = new BaseEndpoint(this, reportsEndpointPath);
    }

    /**
     * @summary Retrieves every registered weather station.
     * @returns {Promise<import('axios').AxiosResponse>}
     */
    getStations() {
        return this.#stationsEndpoint.getAll();
    }

    /**
     * @summary Retrieves every registered weather report.
     * @returns {Promise<import('axios').AxiosResponse>}
     */
    getReports() {
        return this.#reportsEndpoint.getAll();
    }

    /**
     * @summary Persists a new weather report.
     * @param {Object} resource - Report payload.
     * @returns {Promise<import('axios').AxiosResponse>}
     */
    createReport(resource) {
        return this.#reportsEndpoint.create(resource);
    }

    /**
     * @summary Updates only the last temperature of a station.
     * @param {string|number} stationId - Target station identifier.
     * @param {number} newTemperature - Updated temperature value.
     * @returns {Promise<import('axios').AxiosResponse>}
     */
    updateStationTemperature(stationId, newTemperature) {
        return this.#stationsEndpoint.update(stationId, { lastTemperature: newTemperature });
    }
}