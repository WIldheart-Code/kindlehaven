# Working on Kindlehaven (formerly Frosthold Outpost)

- The game is one file: `index.html`. No build step.
- **Every gameplay change must update `README.md`.** README.md is shown in-game as the Help screen (cog → Help), so it is the player guide: keep it accurate, player-facing and organised by topic. Remove anything that becomes outdated.
- **Check the tutorial (`TUT` in index.html) after every change** and update a step if the change affects the basics it teaches (moving, chopping, firewood, resources, goal card, walls, warmth/food, growing the town, raids, menu).
- When publishing the claude.ai artifact, include `README.md` in `files` so Help can load it.
- Meshy credits cost money: `tools/meshy_assets.py` only generates models whose prompt is new or changed; run `--dry-run` first.
- Help screenshots live in `assets/help/` and are referenced from README.md as `![caption](assets/help/name.jpg)`. Retake them (daylight, no banners) when the look of that feature changes, and include them in artifact publishes.
- **Releases:** when a change goes to the live site, bump the minor part of `GAME_VERSION` (2.9 → 2.10 → 2.11; only change the major number when the user says so) (and the version line in the menu), add an entry at the top of `CHANGELOG` in index.html, and add it to the Change log section of README.md. Returning players are shown the new entries.
- **Phone apps** live in `mobile/` (Capacitor). `node mobile/build-www.mjs` bundles the game offline; if you add a new script, font or asset folder to index.html, add it to that script and `mobile/vendor/` too. See `mobile/README.md`.
