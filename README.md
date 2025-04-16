# UVNAV

The _useful_ [UltraVanilla](https://ultravanilla.world) Navigator.

This is basically a combination of the
[ST Router](https://github.com/tabbeddev/st-transports) and the
[UVDOT Router](https://github.com/girlinpurple/uv-transit), but in (hopefully)
more beautiful and useful.

## Features

- Search for routes
  - Filter by transport methods
- Show search results (kinda necessary when you can search, right?)
  - Filter results
- Show routes in detail
  - Show Itinerary
  - Show Map

Some fun stuff:

- Show both ingame time and real time
- Show player count

## Installation

1. Clone the repository
2. Install dependencies with deno: `deno install`
3. Build: `deno task build`
4. Run the server: `PORT=4173 HOST=localhost deno run -ERN build/index.js` (You
   can adjust port and host if needed)

### Other Stuff

Feel free to copy / use the code for the map, if you need it.
