import axios from "axios";

const openMeteoUrl = import.meta.env.VITE_OPEN_METEO_API_URL;

/**
 * @summary External proxy service for the Open-Meteo REST API.
 * @description Retrieves live meteorological telemetry for given coordinates.
 * @class OpenMeteoApi
 * @author Sebastian Reyes Limo
 */
export class OpenMeteoApi {
    /**
     * @summary Gathers current weather telemetry for a coordinate pair.
     * @param {number} latitude - Target latitude.
     * @param {number} longitude - Target longitude.
     * @returns {Promise<import('axios').AxiosResponse>}
     */
    getCurrentWeather(latitude, longitude) {
        const query = `current=temperature_2m,wind_speed_10m,relative_humidity_2m`;
        const url = `${openMeteoUrl}/forecast?latitude=${latitude}&longitude=${longitude}&${query}&timezone=auto`;
        return axios.get(url);
    }
}