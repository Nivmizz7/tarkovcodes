export interface Contributor {
  login: string;
  url: string;
  avatar: string;
  contributions: number;
}

interface ApiContributor {
  login?: string;
  html_url?: string;
  avatar_url?: string;
  contributions?: number;
  type?: string;
}

const REPO = 'Wilsman/tarkovcodes';
const MAX = 12;

// The contributors endpoint lags behind GitHub's UI after merges; these fill the gap.
const ADDITIONAL_CONTRIBUTORS: Contributor[] = [
  {
    login: 'Nivmizz7',
    url: 'https://github.com/Nivmizz7',
    avatar: 'https://avatars.githubusercontent.com/u/148060940?v=4&s=56',
    contributions: 1,
  },
];

function includeAdditional(contributors: Contributor[]): Contributor[] {
  const merged = [...contributors];
  for (const c of ADDITIONAL_CONTRIBUTORS) {
    if (merged.some((e) => e.login.toLowerCase() === c.login.toLowerCase())) continue;
    if (merged.length >= MAX) merged.pop();
    merged.push(c);
  }
  return merged;
}

// Fetched once at build time; the list refreshes on every deploy.
export async function getContributors(repo = REPO): Promise<Contributor[]> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${repo}/contributors?per_page=${MAX}`,
      {
        headers: {
          Accept: 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
        },
      },
    );
    if (!res.ok) return includeAdditional([]);
    const payload = (await res.json()) as ApiContributor[];
    if (!Array.isArray(payload)) return includeAdditional([]);
    return includeAdditional(
      payload
        .filter(
          (c) =>
            c.type !== 'Bot' &&
            typeof c.login === 'string' &&
            c.login.length > 0 &&
            typeof c.html_url === 'string' &&
            c.html_url.length > 0 &&
            typeof c.avatar_url === 'string' &&
            c.avatar_url.length > 0 &&
            typeof c.contributions === 'number',
        )
        .slice(0, MAX)
        .map((c) => ({
          login: c.login!,
          url: c.html_url!,
          // 56px serves a 28px avatar on hidpi screens
          avatar: `${c.avatar_url!}&s=56`,
          contributions: c.contributions!,
        })),
    );
  } catch {
    return includeAdditional([]);
  }
}
