# Open-Meteo Weather Monitoring Platform

## Overview

Web application for monitoring weather stations and registering current weather
reports based on the Open-Meteo public API.

## Stack

- **Vue 3.5** with Composition API
- **Vite** as build tool
- **PrimeVue 5** (Material preset) + **PrimeFlex** + **PrimeIcons**
- **Vue Router 5** for in-app navigation
- **Pinia** for state management
- **Vue-i18n** for English / Spanish support
- **Axios** for HTTP communication
- **json-server 0.17.4** as mock backend

## Architecture

The project follows Domain-Driven Design with a layered architecture:

- `shared` — reusable base elements such as the HTTP client and layout
- `stations` — weather stations and weather reports bounded context
- `weather` — Open-Meteo external API integration

Each bounded context is organized into `domain`, `infrastructure`,
`application` and `presentation` layers where required.

## Setup

1. Install dependencies:

2. Start the mock API (from the project root):

3. In a second terminal, start the development server:

4. Open `http://localhost:5173/`

## Environment Variables

Defined in `.env.development`:

| Variable | Description |
|---|---|
| `VITE_STATIONS_API_URL` | Base URL of the mock API |
| `VITE_STATIONS_ENDPOINT_PATH` | Weather stations collection path |
| `VITE_REPORTS_ENDPOINT_PATH` | Weather reports collection path |
| `VITE_OPEN_METEO_API_URL` | Open-Meteo forecast API URL |
| `VITE_LOGO_DEV_TOKEN` | Logo.dev publishable token |

## Author

Sebastian Reyes Limo