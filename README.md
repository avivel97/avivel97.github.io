# Vladimir Belolipetskiy's website

Static HTML, CSS and JavaScript. No build step or dependency installation.

Run the regression check with `node checks.cjs`. Preview locally with
`python -m http.server 8765`, then open `http://localhost:8765/`.

## Publishing with GitHub Desktop

Publish this folder as `avivel97/avivel97-website`, using the `main` branch.
This is the separate source repository.

The public address `https://avivel97.github.io/` is served by the existing
`avivel97/avivel97.github.io` repository. Publish the same tested revision
to its `main` branch to update that address. Publishing only the separate
source repository does not update the existing site.

For later releases, bring the tested source commit into the Pages repository
and push it from GitHub Desktop. Preserve the Pages repository's history;
use a revert commit if a release needs to be rolled back.
