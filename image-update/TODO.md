- [ ] Read current image-related mapping/data files (scripts/image-sources.json, public/images/cars/map.json)

- [ ] Generate/update `public/images/cars/map.json` from `scripts/image-sources.json`
- [ ] Generate/update `public/images/cars/map.json` from `scripts/image-sources.json`
- [x] Verify all referenced local image paths exist on disk
- [ ] Decide fallback strategy if Wikimedia URLs fail (404/429) and update images accordingly
- [ ] Run lint/build (optional) to ensure no runtime errors

- [x] Download missing local JPGs into `public/images/cars/` for slugs referenced by `src/data/cars.ts` (script attempted)

- [x] Added deterministic fallback image download when Wikimedia fails (404/429) and populated local JPGs
- [ ] Run lint/build (optional) to ensure no runtime errors
