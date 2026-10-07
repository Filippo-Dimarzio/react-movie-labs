# Movie App Lab

React movie browser for the WAD2 Movie App lab.

## Run locally

From the repository root:

```sh
npm install
npm run dev
```

You can also run these commands from this `movies` directory.

The homepage uses local sample movie data only before a TMDB credential is submitted. Paste a TMDB v3 API key or v4 API Read Access Token into the **TMDB API key or v4 token** field and select **Load live movies**. The app accepts a v4 token with or without its `Bearer ` prefix. After submission, the app shows TMDB results only; if the request fails, it displays TMDB's error message instead of replacing the results with sample movies. The credential remains in page memory only and is not saved.

Alternatively, to load a key automatically during local development:

```sh
cp movies/.env.example movies/.env
```

Set `VITE_TMDB_KEY` in `movies/.env` to your TMDB v3 API key or v4 API Read Access Token and restart the dev server. Never commit `.env`; it is ignored by Git.
