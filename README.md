# Tire Tracker Mobile

Tire Tracker Mobile is an Expo and React Native application for viewing tire
inventory from a shop's backend service. The current app provides an inventory
dashboard with stock totals, low-stock indicators, retry handling, and
pull-to-refresh support.

## Current features

- View total units, tire product count, and low-stock count.
- Browse tire brand, model, size, load index, speed rating, and reorder level.
- Identify low-stock and out-of-stock products at a glance.
- Refresh inventory with a pull gesture and retry failed requests.
- Run on Android, iOS, or the web through Expo.

The Tire Catalog and Sales actions are present as placeholders but are not yet
implemented.

## Tech stack

- [Expo](https://expo.dev/) SDK 54
- React Native 0.81 and React 19
- [Expo Router](https://docs.expo.dev/router/introduction/) for file-based routing
- TypeScript in strict mode
- pnpm for package management

## Prerequisites

- A current Node.js LTS release
- [pnpm](https://pnpm.io/installation)
- One of the following:
  - Expo Go on a physical Android or iOS device
  - An Android emulator
  - An iOS simulator (macOS only)
  - A modern browser for the web build
- A running tire inventory API

## Getting started

From the `tire-inventory-mobile` directory, install dependencies:

```bash
pnpm install
```

Create or update `.env` with the URL of the inventory service:

```dotenv
EXPO_PUBLIC_TIRE_SERVICE_ENDPOINT=http://localhost:3001
```

Then start the Expo development server:

```bash
pnpm start
```

Use the terminal prompts to open the app, or run a platform directly:

```bash
pnpm android
pnpm ios
pnpm web
```

Only variables prefixed with `EXPO_PUBLIC_` are available to the client. These
values are bundled into the app and must not contain secrets.

### Connecting to a local API

The default endpoint is `http://localhost:3001`. That works when the API is
reachable from the same environment as the app, such as a local web browser.
For other development targets, set `EXPO_PUBLIC_TIRE_SERVICE_ENDPOINT` to an
address the target can reach:

- Android Emulator: commonly `http://10.0.2.2:3001`
- Physical device: your computer's LAN address, such as
  `http://192.168.1.20:3001`
- iOS Simulator: `http://localhost:3001` usually works

Restart the Expo development server after changing `.env`. When using a
physical device, ensure the device and development computer are on the same
network and that the API accepts connections from the network interface.

## API contract

The inventory screen makes a `GET` request to:

```text
{EXPO_PUBLIC_TIRE_SERVICE_ENDPOINT}/get-tire-inventory
```

The expected response shape is:

```json
{
  "response": [
    {
      "brand": "Example Brand",
      "model": "All Season",
      "tire_size": "225/65R17",
      "load_index": 102,
      "speed_rating": "H",
      "on_hand": 8,
      "reorder_level": 4,
      "needs_reorder": false
    }
  ]
}
```

## Project structure

```text
app/                 Expo Router screens and root navigation
components/          Shared UI and inventory components
hooks/               Screen data-loading hooks
services/            Backend API access and domain types
utils/               Display-formatting helpers
assets/images/       Application icons and images
```

The main routes are:

- `/` - home screen and quick actions
- `/inventory` - implemented inventory dashboard
- `/tires` - reserved for the tire catalog
- `/sales` - reserved for sales tracking

## Development commands

| Command        | Description                       |
| -------------- | --------------------------------- |
| `pnpm start`   | Start the Expo development server |
| `pnpm android` | Start Expo and open Android       |
| `pnpm ios`     | Start Expo and open iOS           |
| `pnpm web`     | Start the web version             |
| `pnpm lint`    | Run the Expo ESLint configuration |

## License

See [LICENSE](LICENSE) for license information.
