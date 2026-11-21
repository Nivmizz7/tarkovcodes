import type { ImageMetadata } from 'astro';
// Working
import read80lv from './assets/rewards/read80lv.png';
import oneYearOfEscaping from './assets/rewards/1yearofescaping.png';
import undeadtarkov from './assets/rewards/undeadtarkov.png';
import tarkovhalloween from './assets/rewards/tarkovhalloween.png';
import embracepain from './assets/rewards/embracepain.png';
import inven from './assets/rewards/inven.png';
import pveprestige from './assets/rewards/pveprestige.png';
import playyourway from './assets/rewards/playyourway.png';
import ninegag from './assets/rewards/9gag.png';
import gamespark from './assets/rewards/gamespark.png';
import pcgamesn from './assets/rewards/pcgamesn.png';
// Expired
import lvl1scav from './assets/rewards/lvl1scav.png';
import lvl80boss from './assets/rewards/lvl80boss.png';
import threedmgame from './assets/rewards/3dmgame.png';
import keytool from './assets/rewards/keytool.png';
import wipe from './assets/rewards/wipe.png';
import promocode from './assets/rewards/promocode.png';
import yystv from './assets/rewards/yystv.png';
import polygon from './assets/rewards/polygon.png';
import automaton from './assets/rewards/automaton.png';

export type Status = 'working' | 'expired';
/** pvp = regular PvP, pvps = seasonal PvP character, pve = PvE. */
export type Mode = 'pvp' | 'pvps' | 'pve';

export const modes: Mode[] = ['pvp', 'pvps', 'pve'];
// A code works in every mode unless it's PvE exclusive.
const ALL_MODES: Mode[] = ['pvp', 'pvps', 'pve'];
const PVE_ONLY: Mode[] = ['pve'];
export const modeLabel: Record<Mode, string> = { pvp: 'PvP', pvps: 'PvP-S', pve: 'PvE' };
export const modeTitle: Record<Mode, string> = {
  pvp: 'Works in PvP',
  pvps: 'Works on the seasonal PvP character',
  pve: 'Works in PvE',
};

export interface PromoCode {
  code: string;
  status: Status;
  /** Modes the code works in. All three show as one "All modes" badge. */
  modes: Mode[];
  /** Date the code was posted, YYYY-MM-DD. Newest show first. */
  added?: string;
  /** Short line about what it gives or where it works. */
  note?: string;
  /** Screenshot of the stash showcase you get for this code. */
  reward?: ImageMetadata;
}

// Shown at the top of the page. Bump it when you change the list.
export const updated = '2026-11-21';

// To add a reward: put the screenshot in src/assets/rewards/, import it above,
// and set `reward` on the code. To retire a code: set status to 'expired' and
// it moves to the expired section at the bottom.
// Order here doesn't matter: the page sorts by `added`, newest first.
export const codes: PromoCode[] = [
  // ---- Working ----
  { code: 'READ80LV', status: 'working', modes: ALL_MODES, added: '2026-11-17', reward: read80lv },
  { code: '1YEAROFESCAPING', status: 'expired', modes: ALL_MODES, added: '2026-11-15', reward: oneYearOfEscaping },
  { code: 'PCGAMESN', status: 'working', modes: ALL_MODES, added: '2026-08-03', note: 'Kord Breach season code', reward: pcgamesn },
  { code: 'GAMESPARK', status: 'working', modes: ALL_MODES, added: '2026-08-03', note: 'Kord Breach season code', reward: gamespark },
  {
    code: 'UNDEADTARKOV',
    status: 'working',
    modes: ALL_MODES,
    added: '2026-10-30',
    note: 'Meds to help with the Halloween quests',
    reward: undeadtarkov,
  },
  {
    code: 'TARKOVHALLOWEEN',
    status: 'working',
    modes: ALL_MODES,
    added: '2026-11-05',
    note: '"This will help you survive in Undead Tarkov"',
    reward: tarkovhalloween,
  },
  {
    code: 'EMBRACEPAIN',
    status: 'working',
    modes: ALL_MODES,
    added: '2026-11-06',
    note: 'Injectors',
    reward: embracepain,
  },
  { code: 'INVEN', status: 'working', modes: PVE_ONLY, added: '2026-10-07', reward: inven },
  { code: 'PVEPRESTIGE', status: 'working', modes: PVE_ONLY, reward: pveprestige },
  {
    code: 'PLAYYOURWAY',
    status: 'working',
    modes: ALL_MODES,
    added: '2026-11-06',
    note: 'Found-in-raid figurines, good for Prestige',
    reward: playyourway,
  },
  { code: '9GAG', status: 'working', modes: PVE_ONLY, added: '2026-11-14', reward: ninegag },

  // ---- Expired ----
  { code: 'LVL1SCAV', status: 'expired', modes: ALL_MODES, added: '2026-07-19', reward: lvl1scav },
  {
    code: 'FREETARCOINS',
    status: 'expired',
    modes: ALL_MODES,
    added: '2026-07-23',
    note: '150 Tarcoins, first 20,000 players',
  },
  {
    code: 'LVL80BOSS',
    status: 'expired',
    modes: ALL_MODES,
    added: '2026-07-27',
    note: 'PKP, Pilgrim, ZSh with visor, LBCR, earbuds, Defender armour',
    reward: lvl80boss,
  },
  {
    code: '3DMGAME',
    status: 'expired',
    modes: ['pvps'],
    added: '2026-08-02',
    note: 'Season only, at the start of the season',
    reward: threedmgame,
  },
  {
    code: 'W2TX-6NU9-UFK1-89RW-M96B',
    status: 'expired',
    modes: ALL_MODES,
    added: '2026-08-03',
    note: 'Key tool and 9A-91 Tactical kit',
    reward: keytool,
  },
  { code: '6NU9-UFK1-W2TX-89RW-M96B', status: 'expired', modes: ALL_MODES, added: '2026-08-03', note: 'Dogtag' },
  { code: '6NU9-W2TX-UFK1-89RW-M96B', status: 'expired', modes: ALL_MODES, added: '2026-08-03', note: 'Dogtag' },
  { code: 'UFK1-6NU9-W2TX-89RW-M96B', status: 'expired', modes: ALL_MODES, added: '2026-08-03', note: 'Dogtag' },
  { code: 'UFK1-W2TX-6NU9-89RW-M96B', status: 'expired', modes: ALL_MODES, added: '2026-08-03', note: 'Dogtag' },
  { code: 'W2TX-UFK1-6NU9-89RW-M96B', status: 'expired', modes: ALL_MODES, added: '2026-08-03', note: 'Dogtag' },
  { code: 'WIPE', status: 'expired', modes: ALL_MODES, added: '2026-08-05', reward: wipe },
  { code: 'PROMOCODE', status: 'expired', modes: ['pvp'], added: '2026-08-10', note: 'Roubles', reward: promocode },
  {
    code: 'OMG150TARCOINS',
    status: 'expired',
    modes: ALL_MODES,
    added: '2026-08-26',
    note: '150 Tarcoins, first 30,000 players',
  },
  {
    code: 'SUDAKTUDAK',
    status: 'expired',
    modes: ALL_MODES,
    added: '2026-09-09',
    note: 'Sudak-Tudak kit, first 10,000 players',
  },
  { code: 'YYSTV', status: 'expired', modes: PVE_ONLY, added: '2026-10-06', reward: yystv },
  { code: 'POLYGON', status: 'expired', modes: PVE_ONLY, added: '2026-10-06', reward: polygon },
  { code: 'AUTOMATON', status: 'expired', modes: PVE_ONLY, added: '2026-10-06', reward: automaton },
  {
    code: 'JUST150TARCOINS',
    status: 'expired',
    modes: ALL_MODES,
    added: '2026-10-08',
    note: '150 Tarcoins, first 40,000 players',
  },
];
