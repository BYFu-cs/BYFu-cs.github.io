# Visitor Telemetry Worker

This folder contains the optional Cloudflare Worker backend for the website footer's self-hosted visitor map.

The public site keeps a historical baseline of `1M+ cumulative visits since 2024`. The Worker records new visits after installation and adds them on top of that baseline. It is designed for city-level academic-style visualization rather than individual tracking.

## What It Records

For each visit, the Worker aggregates:

- City
- Region
- Country
- Approximate latitude and longitude
- Total visits per city
- Approximate daily unique visitors per city
- First seen and last seen timestamps

It does not store raw IP addresses.

## Files

- `worker.js`: Cloudflare Worker API with `/collect` and `/summary` endpoints.
- `schema.sql`: D1 database schema.
- `README.md`: this guide.

## Required Cloudflare Resources

Create:

- One Cloudflare Worker, for example `boyifu-visitor-map`.
- One Cloudflare D1 database, for example `boyifu_visitor_telemetry`.
- One D1 binding named exactly `DB`.
- One Worker secret or environment variable named `UNIQUE_SALT`.

`UNIQUE_SALT` should be a private random string. It is used to hash daily visitor identifiers so raw IP addresses are not stored.

## Setup

1. Open the D1 database console.
2. Paste the full contents of `schema.sql` into the console and execute it.
3. Create a Worker using the "Hello World" starter.
4. Replace the starter code with the full contents of `worker.js`.
5. In Worker settings, add a D1 binding:

```text
Variable name: DB
Database: boyifu_visitor_telemetry
```

6. Add a secret or environment variable:

```text
Variable name: UNIQUE_SALT
Value: a long private random string
```

7. Deploy the Worker.
8. Test:

```text
https://your-worker.your-subdomain.workers.dev/summary
```

Expected initial response:

```json
{"recordedVisits":0,"locations":[]}
```

## Website Configuration

Set the Worker base URL in the root `_config.yml`:

```yml
visitor_map:
  api_url: "https://your-worker.your-subdomain.workers.dev"
  baseline_visits: 1000000
```

Use the base URL only. Do not append `/summary` or `/collect`.

## API Endpoints

`GET /collect?path=/some-page/`

Records one visit using Cloudflare's request geolocation metadata.

`GET /summary`

Returns aggregate data for the footer map:

```json
{
  "recordedVisits": 0,
  "locations": []
}
```

## Privacy and Accuracy

- City geolocation is approximate and can be wrong for VPN, proxy, campus, or corporate networks.
- The system is meant for aggregate visualization, not identifying visitors.
- Raw IP addresses are not inserted into the database.
- Daily unique visitors are approximate because they are derived from salted hashes.
- If privacy requirements change, update the site privacy policy before collecting additional fields.
