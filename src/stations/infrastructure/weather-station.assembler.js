import { WeatherStation } from "../domain/model/weather-station.entity.js";

/**
 * @summary Maps weather station resources into domain entities and vice versa.
 * @class WeatherStationAssembler
 * @author Sebastian Reyes Limo
 */
export class WeatherStationAssembler {
    /**
     * @summary Converts a plain API resource into a domain entity.
     * @param {Object} resource - Plain API database object.
     * @returns {WeatherStation} Encapsulated domain entity.
     */
    static toEntityFromResource(resource) {
        return new WeatherStation({ ...resource });
    }

    /**
     * @summary Converts a domain entity into a plain resource.
     * @param {WeatherStation} entity - Encapsulated domain entity.
     * @returns {Object} Plain object suitable for network transmission.
     */
    static toResourceFromEntity(entity) {
        return {
            id: entity.id,
            name: entity.name,
            city: entity.city,
            country: entity.country,
            latitude: entity.latitude,
            longitude: entity.longitude,
            climateZone: entity.climateZone,
            lastTemperature: entity.lastTemperature
        };
    }

    /**
     * @summary Maps a full HTTP response into an array of entities.
     * @param {import('axios').AxiosResponse} response - Server HTTP response.
     * @returns {WeatherStation[]} Array of mapped entities.
     */
    static toEntitiesFromResponse(response) {
        if (response.status !== 200) return [];
        const resources = Array.isArray(response.data) ? response.data : [];
        return resources.map(resource => this.toEntityFromResource(resource));
    }
}