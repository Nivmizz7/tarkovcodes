# Contributing

Thanks for helping keep the list right.

## The quick way: open an issue

Most changes are just "here's a new code" or "this one stopped working". For those, [open an issue](https://github.com/Wilsman/tarkovcodes/issues/new/choose) and fill in the form. You don't need to touch any code.

## Changing the code list yourself

Everything about the codes lives in [`src/codes.ts`](src/codes.ts).

**Add a code:** add an entry to the `codes` list.

```ts
{ code: 'NEWCODE', status: 'working', modes: ALL_MODES, added: '2026-12-01', noteKey: 'rewardName' },
```

- `modes`: `ALL_MODES` unless the code is limited. Use `PVE_ONLY`, or a list such as `['pvps']` for a seasonal-only code.
- `added`: the date the code came out, as `YYYY-MM-DD`. The page sorts newest first.
- `noteKey`: optional, a key from `codeNotes` in `src/i18n/en.json` and `src/i18n/fr.json`. It keeps code notes translated instead of storing separate English strings in `src/codes.ts`.

When adding a new `noteKey`, add the English text to `src/i18n/en.json` and the French text to `src/i18n/fr.json`.

**Add a reward screenshot:** crop it to the in-game "Showcase" window, save it as a PNG in `src/assets/rewards/` named after the code, import it at the top of `codes.ts` and set `reward` on the code.

**Mark a code as expired:** change its `status` to `'expired'`. It moves to the expired section at the bottom.

**Bump `updated`** near the top of the file to today's date so the page shows when the list last changed.

## Running and checking

```sh
npm install
npm run dev
```

Open http://localhost:4321 and check the card looks right, copy works, and the "I play" picker shows it under the right modes. `npm run build` should finish without errors.

Keep pull requests small, one topic each. Deploys to the live site are done by the maintainer.
