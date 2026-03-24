import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './timeline.css';

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({
  data,
  heading,
  intro,
  className
}: {
  data: TimelineEntry[];
  heading?: string;
  intro?: string;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const updateHeight = () => {
      const rect = ref.current?.getBoundingClientRect();
      setHeight(rect?.height || 0);
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 10%', 'end 50%']
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className={className || 'timeline-root'} ref={containerRef}>
      <div className="timeline-shell">
        {heading ? (
          <h2 className="timeline-heading">
            {heading}
          </h2>
        ) : null}
        {intro ? (
          <p className="timeline-intro">{intro}</p>
        ) : null}
      </div>

      <div ref={ref} className="timeline-entries">
        {data.map((item, index) => (
          <div key={index} className="timeline-row">
            <div className="timeline-left">
              <div className="timeline-dot-shell">
                <div className="timeline-dot" />
              </div>
              <h3 className="timeline-title-desktop">
                {item.title}
              </h3>
            </div>

            <div className="timeline-right">
              <h3 className="timeline-title-mobile">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}

        <div
          style={{
            height: `${height}px`
          }}
          className="timeline-line-track"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform
            }}
            className="timeline-line-progress"
          />
        </div>
      </div>
    </div>
  );
};
