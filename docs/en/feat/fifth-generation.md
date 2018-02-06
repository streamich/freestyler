# Fifth Generation

`freestyler` is [5th generation](https://github.com/streamich/freestyler/blob/feat/universal-2/docs/en/terminology.md#5th-generation) React styling library &mdash;
it injects CSS into `<style>` tags at runtime, only when your React component is being rendered for the first time and styles dynamically depend not only
on `props`, `state`, and `context`, but also on variables in your `.render()` function scope.
