import { WeatherReport } from "../domain/model/weather-report.entity.js";

/**
 * @summary Maps weather report resources into domain entities and vice versa.
 * @class WeatherReportAssembler
 * @author Sebastian Reyes Limo
 */
export class WeatherReportAssembler {
    /**
     * @summary Converts a plain API resource into a domain entity.
     * @param {Object} resource - Plain network data schema.
     * @returns {WeatherReport} Encapsulated domain entity.
     */
    static toEntityFromResource(resource) {
        return new WeatherReport({ ...resource });
    }

    /**
     * @summary Converts a domain entity into a plain resource.
     * @param {WeatherReport} entity - Mapped domain entity.
     * @returns {Object} Clean payload for network transmission.
     */
    static toResourceFromEntity(entity) {
        return {
            id: entity.id,
            stationId: entity.stationId,
            climateZone: entity.climateZone,
            city: entity.city,
            country: entity.country,
            latitude: entity.latitude,
            longitude: entity.longitude,
            temperature: entity.temperature,
            windSpeed: entity.windSpeed,
            relativeHumidity: entity.relativeHumidity,
            observedAt: entity.observedAt,
            registeredAt: entity.registeredAt
        };
    }

    /**
     * @summary Maps a full HTTP response into an array of entities.
     * @param {import('axios').AxiosResponse} response - Server HTTP response.
     * @returns {WeatherReport[]} Array of mapped entities.
     */
    static toEntitiesFromResponse(response) {
        if (response.status !== 200 && response.status !== 201) return [];
        const resources = Array.isArray(response.data) ? response.data : [];
        return resources.map(resource => this.toEntityFromResource(resource));
    }
}