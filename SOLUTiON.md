# SOLUTION.md

## ✅ Backend (Node.js)

### 1. Refactor Blocking I/O
- Replaced `fs.readFileSync` in `src/routes/items.js` with `fs.promises.readFile` to ensure non-blocking async I/O.

### 2. Performance - GET /api/stats
- Introduced in-memory caching to avoid recomputing stats on every request.
- I did not added `fs.watchFile` to invalidate the cache when the data file changes. Thought was not necesary as it might only be needed to recalculate stats when requested

### 3. Testing
- Added Jest unit tests for:
  - Happy path: valid data returns expected response.
  - Error handling: invalid file, missing data.

---

## ✅ Frontend (React)

### 1. Memory Leak Fix
- Used an `active = true` flag pattern to prevent `setState` on unmounted `Items` component during async fetch.

### 2. Pagination & Search
- Implemented server-side pagination via `limit`, `offset`, and `q` query params.
- Connected search bar and pagination to trigger re-fetch and reset page index when searching.

### 3. Performance - Virtualization
- Used `react-window` (`FixedSizeList`) to render only visible rows.
- Externalized row rendering into `ListItem` for clarity and reuse.

### 4. UX Polish
- Introduced `react-loading-skeleton` for consistent loading placeholders.
- Applied layout spacing using `styled-components` with `gap` and clean separation of logic/styling. Of course, this has way room for improvement.

---

## 📦 Final Notes

### Trade-offs:
- Chose simple in-memory cache for backend over more advanced caching for scope reasons.
- Did not use `AbortController` for fetch cancelation, but ensured memory safety via `active` flag.

### Future Improvements:
- Add debounce to search input to minimize backend calls.
- Persist search and pagination in URL query params.
- Use `react-query` to simplify and cache data fetching.
- Add frontend test coverage for `Items` component with mocked data.
- Add better styling, hover effects and so on.