const newWeatherReport = () => import("./views/new-weather-report.vue");

/**
 * @summary Child routes belonging to the Stations bounded context.
 * @type {Array<import('vue-router').RouteRecordRaw>}
 */
const stationsRoutes = [
    {
        path: "reports/new",
        name: "new-weather-report",
        component: newWeatherReport,
        meta: { title: "New Weather Report" }
    }
];

export default stationsRoutes;