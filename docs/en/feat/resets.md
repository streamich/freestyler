# CSS Resets

`freestyler` ships with a collection of CSS resets for your pleasure:

  - [`<CssResetEricMeyer/>`](./packages/freestyler/src/globals/CssResetEricMeyer.ts)
  - [`<CssResetEricMeyerCondensed/>`](./packages/freestyler/src/globals/CssResetEricMeyerCondensed.ts)
  - [`<CssResetMinimalistic/>`](./packages/freestyler/src/globals/CssResetMinimalistic.ts)
  - [`<CssResetMinimalistic2/>`](./packages/freestyler/src/globals/CssResetMinimalistic2.ts)
  - [`<CssResetMinimalistic3/>`](./packages/freestyler/src/globals/CssResetMinimalistic3.ts)
  - [`<CssResetShaunInman/>`](./packages/freestyler/src/globals/CssResetShaunInman.ts)
  - [`<CssResetSiolon/>`](./packages/freestyler/src/globals/CssResetSiolon.ts)
  - [`<CssResetTantek/>`](./packages/freestyler/src/globals/CssResetTantek.ts)
  - [`<CssResetTripoli/>`](./packages/freestyler/src/globals/CssResetTripoli.ts)
  - [`<CssResetUniversal/>`](./packages/freestyler/src/globals/CssResetUniversal.ts)
  - [`<CssResetYahoo/>`](./packages/freestyler/src/globals/CssResetYahoo.ts)
  - [ ] TODO: Add [`glamor` CSS reset](https://github.com/threepointone/glamor/blob/master/src/reset.js)

Here is how you use them:

```jsx
import CssResetEricMeyer from 'freestyler/globals/CssResetEricMeyer';

const App = () =>
    <div>
        <CssResetEricMeyer/>
        Look, Ma, frameborder has gone!
    </div>
```
