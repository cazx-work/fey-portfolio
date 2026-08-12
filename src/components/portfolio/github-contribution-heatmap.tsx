'use client';

import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { FocusEvent, MouseEvent } from 'react';
import {
  githubContributions,
  type ContributionYear,
} from '@/data/github-contributions';

const years: ContributionYear[] = [2024, 2025, 2026];
const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

function startOfCalendar(year: number) {
  const date = new Date(Date.UTC(year, 0, 1));
  date.setUTCDate(date.getUTCDate() - date.getUTCDay());
  return date;
}

function dateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00Z`));
}

export function GithubContributionHeatmap({
  sectionNumber,
}: { sectionNumber?: string } = {}) {
  const [selectedYear, setSelectedYear] = useState<ContributionYear>(2024);
  const [focusedDay, setFocusedDay] = useState<{
    key: string;
    count: number;
    level: number;
    left: number;
    top: number;
    anchorTop: number;
    anchorBottom: number;
    anchorLeft: number;
    anchorRight: number;
    isTopRow: boolean;
    placement: 'above' | 'below' | 'left' | 'right';
  } | null>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const selected = githubContributions[selectedYear];
  const levels = useMemo(
    () => new Map(selected.days.map((day) => [day.date, day.level])),
    [selected.days],
  );
  const weeks = useMemo(() => {
    const first = startOfCalendar(selectedYear);
    return Array.from({ length: 53 }, (_, weekIndex) =>
      Array.from({ length: 7 }, (_, dayIndex) => {
        const date = new Date(first);
        date.setUTCDate(first.getUTCDate() + weekIndex * 7 + dayIndex);
        const key = dateKey(date);
        return {
          key,
          date,
          level: levels.get(key) ?? 0,
          count: selected.days.find((day) => day.date === key)?.count ?? 0,
        };
      }),
    );
  }, [levels, selected.days, selectedYear]);

  const monthLabels = useMemo(
    () =>
      weeks.map((week, index) => {
        const firstDay = week[0].date;
        const isMonthStart =
          index === 0 ||
          firstDay.getUTCMonth() !== weeks[index - 1][0].date.getUTCMonth();
        return isMonthStart && firstDay.getUTCFullYear() === selectedYear
          ? { index, label: months[firstDay.getUTCMonth()] }
          : null;
      }),
    [selectedYear, weeks],
  );

  const showDayDetails = (
    event: MouseEvent<HTMLSpanElement> | FocusEvent<HTMLSpanElement>,
    day: { key: string; count: number; level: number },
    isTopRow: boolean,
  ) => {
    const cell = event.currentTarget.getBoundingClientRect();
    const calendar = calendarRef.current?.getBoundingClientRect();
    if (!calendar) return;
    setFocusedDay({
      ...day,
      left: cell.left - calendar.left + cell.width / 2,
      top: cell.top - calendar.top,
      anchorTop: cell.top - calendar.top,
      anchorBottom: cell.bottom - calendar.top,
      anchorLeft: cell.left - calendar.left,
      anchorRight: cell.right - calendar.left,
      isTopRow,
      placement: 'above',
    });
  };

  useLayoutEffect(() => {
    if (!focusedDay || !tooltipRef.current || !calendarRef.current) return;

    const calendar = calendarRef.current.getBoundingClientRect();
    const tooltip = tooltipRef.current.getBoundingClientRect();
    const gap = 10;
    const canFitAbove = focusedDay.anchorTop - tooltip.height - gap >= 0;
    const canFitBelow =
      focusedDay.anchorBottom + tooltip.height + gap <= calendar.height;
    const canFitRight =
      focusedDay.anchorRight + tooltip.width + gap <= calendar.width;
    const canFitLeft = focusedDay.anchorLeft - tooltip.width - gap >= 0;
    const placement = focusedDay.isTopRow
      ? 'below'
      : canFitAbove
        ? 'above'
        : canFitBelow
          ? 'below'
          : canFitRight
            ? 'right'
            : canFitLeft
              ? 'left'
              : focusedDay.anchorTop > calendar.height / 2
                ? 'above'
                : 'below';
    const top =
      placement === 'right' || placement === 'left'
        ? Math.min(
            Math.max(
              focusedDay.anchorTop +
                (focusedDay.anchorBottom - focusedDay.anchorTop) / 2,
              tooltip.height / 2,
            ),
            calendar.height - tooltip.height / 2,
          )
        : placement === 'above'
          ? focusedDay.anchorTop
          : focusedDay.anchorBottom;
    const left =
      placement === 'right'
        ? focusedDay.anchorRight
        : placement === 'left'
          ? focusedDay.anchorLeft
          : Math.min(
              Math.max(focusedDay.left, tooltip.width / 2),
              Math.max(calendar.width - tooltip.width / 2, tooltip.width / 2),
            );

    if (
      Math.abs(focusedDay.left - left) > 0.5 ||
      Math.abs(focusedDay.top - top) > 0.5 ||
      focusedDay.placement !== placement
    ) {
      setFocusedDay((current) =>
        current ? { ...current, left, top, placement } : current,
      );
    }
  }, [focusedDay]);

  return (
    <section
      className="case-study-section contribution-activity"
      aria-labelledby="contribution-activity-heading"
    >
      <div className="contribution-activity__header">
        <div>
          <p className="case-study-label">
            {sectionNumber ? `${sectionNumber} / ` : ''}Development activity
          </p>
          <h2 id="contribution-activity-heading">
            A steady trail of technical work
          </h2>
          <p className="case-study-lead">
            Private GitHub activity presented in the same visual language as
            this portfolio. The calendar shows the exported contribution history
            without exposing repository details.
          </p>
        </div>
        <div
          className="contribution-activity__years"
          aria-label="Contribution years"
        >
          {years.map((year) => (
            <button
              className={
                selectedYear === year
                  ? 'contribution-activity__year contribution-activity__year--active'
                  : 'contribution-activity__year'
              }
              key={year}
              onClick={() => setSelectedYear(year)}
              type="button"
              aria-pressed={selectedYear === year}
            >
              {year}
            </button>
          ))}
        </div>
      </div>
      <div className="contribution-activity__panel">
        <div className="contribution-activity__summary">
          <strong>
            {selected.total.toLocaleString()}{' '}
            {selected.total === 1 ? 'contribution' : 'contributions'}
          </strong>
          <span>in {selectedYear}</span>
        </div>
        <div
          className="contribution-activity__scroll"
          role="region"
          aria-label={`${selectedYear} GitHub contribution calendar`}
          tabIndex={0}
        >
          <div className="contribution-calendar" ref={calendarRef}>
            <div className="contribution-calendar__months" aria-hidden="true">
              <span />
              {monthLabels.map((month, index) =>
                month ? (
                  <span
                    key={`${month.label}-${index}`}
                    style={{ gridColumnStart: index + 2 }}
                  >
                    {month.label}
                  </span>
                ) : null,
              )}
            </div>
            <div className="contribution-calendar__body">
              <div
                className="contribution-calendar__mobile-months"
                aria-hidden="true"
              >
                {monthLabels.map((month) =>
                  month ? (
                    <span
                      key={`${month.label}-${month.index}`}
                      style={{ gridRowStart: month.index + 1 }}
                    >
                      {month.label}
                    </span>
                  ) : null,
                )}
              </div>
              <div
                className="contribution-calendar__weekdays"
                aria-hidden="true"
              >
                {weekdays.map((day, index) => (
                  <span
                    key={day}
                    className={
                      index % 2 === 0
                        ? 'contribution-calendar__weekday--hidden'
                        : ''
                    }
                  >
                    <span className="contribution-calendar__weekday-full">
                      {day}
                    </span>
                    <span
                      className="contribution-calendar__weekday-initial"
                      aria-hidden="true"
                    >
                      {day[0]}
                    </span>
                  </span>
                ))}
              </div>
              <div className="contribution-calendar__weeks">
                {weeks.map((week, weekIndex) => (
                  <div className="contribution-calendar__week" key={weekIndex}>
                    {week.map((day, dayIndex) => (
                      <span
                        className="contribution-calendar__day"
                        data-level={day.level}
                        key={day.key}
                        aria-label={`${day.count} ${day.count === 1 ? 'contribution' : 'contributions'} on ${formatDate(day.key)}`}
                        role="img"
                        tabIndex={0}
                        onMouseEnter={(event) =>
                          showDayDetails(
                            event,
                            day,
                            dayIndex === 0 || weekIndex === 0,
                          )
                        }
                        onMouseLeave={() => setFocusedDay(null)}
                        onFocus={(event) =>
                          showDayDetails(
                            event,
                            day,
                            dayIndex === 0 || weekIndex === 0,
                          )
                        }
                        onBlur={() => setFocusedDay(null)}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
            {focusedDay && (
              <div
                ref={tooltipRef}
                className={`contribution-calendar__tooltip contribution-calendar__tooltip--${focusedDay.placement}`}
                role="status"
                style={{ left: focusedDay.left, top: focusedDay.top }}
              >
                <strong>
                  {focusedDay.count.toLocaleString()}{' '}
                  {focusedDay.count === 1 ? 'contribution' : 'contributions'}
                </strong>
                <span>{formatDate(focusedDay.key)}</span>
                <small>Activity level {focusedDay.level} / 4</small>
              </div>
            )}
          </div>
        </div>
        <div className="contribution-activity__footer">
          <span>Less</span>
          <div className="contribution-calendar__legend" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((level) => (
              <span
                className="contribution-calendar__day"
                data-level={level}
                key={level}
              />
            ))}
          </div>
          <span>More</span>
          <span className="contribution-activity__note">
            Intensity is derived from the exported daily totals.
          </span>
        </div>
      </div>
    </section>
  );
}
