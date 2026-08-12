import contributionExport from '../../github_contributions.json';

export type ContributionYear = 2024 | 2025 | 2026;

export type ContributionDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export type ContributionYearData = {
  total: number;
  days: ContributionDay[];
};

export const githubUsername = 'felixkarnodev';

type ExportYear = {
  contributionCalendar: {
    totalContributions: number;
    weeks: {
      contributionDays: { date: string; contributionCount: number }[];
    }[];
  };
};

const exportedYears = contributionExport.data.user as Record<
  `y${ContributionYear}`,
  ExportYear
>;

function contributionLevel(count: number): ContributionDay['level'] {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 10) return 3;
  return 4;
}

function readYear(year: ContributionYear): ContributionYearData {
  const calendar = exportedYears[`y${year}`].contributionCalendar;
  const days = calendar.weeks
    .flatMap((week) => week.contributionDays)
    .map((day) => ({
      date: day.date,
      count: day.contributionCount,
      level: contributionLevel(day.contributionCount),
    }));

  return { total: calendar.totalContributions, days };
}

export const githubContributions: Record<
  ContributionYear,
  ContributionYearData
> = {
  2024: readYear(2024),
  2025: readYear(2025),
  2026: readYear(2026),
};
