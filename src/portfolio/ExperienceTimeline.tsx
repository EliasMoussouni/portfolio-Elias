import React from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { MdOutlineWork as WorkIcon } from 'react-icons/md';
import { IoSchool as SchoolIcon } from 'react-icons/io5';
import { FaStar, FaRegCalendarAlt } from 'react-icons/fa';
import { PortfolioItem } from './portfolioData';

interface ExperienceTimelineProps {
  experienceItems: PortfolioItem[];
  educationItems?: PortfolioItem[];
}

type TimelineEntry = {
  id: string;
  type: 'work' | 'education';
  title: string;
  subtitle?: string;
  location?: string;
  period: string;
  summary: string;
  bullets?: string[];
  tags?: string[];
};

const safePeriod = (value?: string) => value || 'info non disponible';

const monthIndex: Record<string, number> = {
  jan: 0,
  january: 0,
  fev: 1,
  feb: 1,
  february: 1,
  mar: 2,
  march: 2,
  apr: 3,
  april: 3,
  may: 4,
  jun: 5,
  june: 5,
  jul: 6,
  july: 6,
  aug: 7,
  august: 7,
  sep: 8,
  sept: 8,
  september: 8,
  oct: 9,
  october: 9,
  nov: 10,
  november: 10,
  dec: 11,
  december: 11
};

const parsePart = (value?: string) => {
  if (!value) {
    return new Date(0);
  }

  const normalized = value.trim().toLowerCase();
  if (normalized === 'present') {
    return new Date(3000, 0, 1);
  }

  const [monthRaw, yearRaw] = normalized.split(/\s+/);
  const month = monthIndex[monthRaw];
  const year = Number(yearRaw);

  if (!Number.isNaN(year) && month !== undefined) {
    return new Date(year, month, 1);
  }

  const yearOnly = Number(normalized);
  if (!Number.isNaN(yearOnly)) {
    return new Date(yearOnly, 0, 1);
  }

  return new Date(0);
};

const getSortValue = (period: string) => {
  const [startRaw, endRaw] = period.split(' - ');
  const start = parsePart(startRaw).getTime();
  const end = parsePart(endRaw ?? startRaw).getTime();
  return { start, end };
};

const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({ experienceItems, educationItems = [] }) => {
  const entries: TimelineEntry[] = [
    ...experienceItems.map((item) => ({
      id: item.id,
      type: 'work' as const,
      title: item.title,
      subtitle: item.subtitle,
      location: item.location,
      period: safePeriod(item.period),
      summary: item.summary,
      bullets: item.bullets,
      tags: item.tags
    })),
    ...educationItems.map((item) => ({
      id: item.id,
      type: 'education' as const,
      title: item.title,
      subtitle: item.subtitle,
      location: item.location,
      period: safePeriod(item.period),
      summary: item.summary,
      bullets: item.bullets,
      tags: item.tags
    }))
  ].sort((left, right) => {
    const leftPeriod = getSortValue(left.period);
    const rightPeriod = getSortValue(right.period);

    if (leftPeriod.start !== rightPeriod.start) {
      return leftPeriod.start - rightPeriod.start;
    }

    return leftPeriod.end - rightPeriod.end;
  });

  const latestWorkEntryId = [...entries].reverse().find((entry) => entry.type === 'work')?.id;

  return (
    <div className="experience-timeline-view">
      <div className="timeline-header">
        <p className="timeline-eyebrow">CV officiel FR</p>
        <h1 className="timeline-main-title">
          <FaRegCalendarAlt aria-hidden="true" /> Experience professionnelle
        </h1>
        <p className="timeline-intro">
          Section reconstruite a partir du CV officiel `cv_elias_moussouni_fr`. La page se concentre sur les postes
          mentionnes dans cette version du parcours.
        </p>
      </div>

      <VerticalTimeline>
        {entries.map((entry) => {
          const isWork = entry.type === 'work';
          const isPrimaryWorkCard = entry.id === latestWorkEntryId;

          const contentStyle = isWork
            ? isPrimaryWorkCard
              ? { background: 'rgb(33, 150, 243)', color: '#fff' }
              : { background: 'rgb(240, 240, 240)', color: '#111' }
            : { background: 'rgb(241, 214, 224)', color: '#111' };

          const arrowStyle = isWork
            ? isPrimaryWorkCard
              ? { borderRight: '7px solid rgb(33, 150, 243)' }
              : { borderRight: '7px solid rgb(240, 240, 240)' }
            : { borderRight: '7px solid rgb(241, 214, 224)' };

          const iconStyle = isWork
            ? { background: 'rgb(33, 150, 243)', color: '#fff' }
            : { background: 'rgb(241, 152, 190)', color: '#fff' };

          const textColorClass = isPrimaryWorkCard ? 'timeline-text-light' : 'timeline-text-dark';

          return (
            <VerticalTimelineElement
              key={entry.id}
              className={`vertical-timeline-element--${entry.type}`}
              contentStyle={contentStyle}
              contentArrowStyle={arrowStyle}
              date={entry.period}
              iconStyle={iconStyle}
              icon={isWork ? <WorkIcon /> : <SchoolIcon />}
            >
              <div className={`timeline-entry-content ${textColorClass}`}>
                <h3 className="vertical-timeline-element-title">{entry.title}</h3>
                {entry.subtitle ? <h4 className="vertical-timeline-element-subtitle">{entry.subtitle}</h4> : null}
                {entry.location ? <p className="timeline-location">{entry.location}</p> : null}

                {entry.tags?.length ? (
                  <p className="timeline-tags">{entry.tags.join(', ')}</p>
                ) : null}

                <p className="timeline-summary">{entry.summary}</p>

                {entry.bullets?.length ? (
                  <ul className="timeline-bullets" aria-label={`Details ${entry.title}`}>
                    {entry.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </VerticalTimelineElement>
          );
        })}

        <VerticalTimelineElement iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }} icon={<FaStar />} />
      </VerticalTimeline>
    </div>
  );
};

export default ExperienceTimeline;
