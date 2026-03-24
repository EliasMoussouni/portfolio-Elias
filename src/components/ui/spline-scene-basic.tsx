'use client';

import { Card } from './card';
import { SplineScene } from './splite';

const defaultScene = 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode';

interface SplineSceneBasicProps {
  alertEyes?: boolean;
  pointerX?: number;
  pointerY?: number;
}

export function SplineSceneBasic({
  alertEyes = false,
  pointerX = 0,
  pointerY = 0,
}: SplineSceneBasicProps) {
  return (
    <Card
      className={`relative h-[128px] w-full overflow-hidden border-0 bg-transparent transition-shadow duration-300 md:h-[140px] ${
        alertEyes ? 'shadow-[0_0_45px_rgba(229,9,20,0.18)]' : ''
      }`}
    >
      <div className="relative h-full w-full">
        <div className="absolute inset-x-0 -top-[255px] bottom-[-170px] md:-top-[312px] md:bottom-[-202px]">
          <SplineScene
            scene={defaultScene}
            className="h-full w-full scale-[1.58] md:scale-[1.7]"
            pointerX={pointerX}
            pointerY={pointerY}
          />
        </div>
        <div
          className={`pointer-events-none absolute left-1/2 top-[6%] z-20 flex -translate-x-1/2 gap-5 transition-all duration-200 md:top-[4%] ${
            alertEyes ? 'opacity-100 scale-110' : 'opacity-0'
          }`}
          aria-hidden="true"
        >
          <span className="h-3 w-3 rounded-full bg-red-500 shadow-[0_0_14px_rgba(239,68,68,0.95),0_0_26px_rgba(229,9,20,0.7)]" />
          <span className="h-3 w-3 rounded-full bg-red-500 shadow-[0_0_14px_rgba(239,68,68,0.95),0_0_26px_rgba(229,9,20,0.7)]" />
        </div>
        <div
          className={`pointer-events-none absolute left-1/2 top-[-6px] z-30 -translate-x-1/2 text-xl font-black text-red-500 transition-all duration-150 md:top-[-10px] ${
            alertEyes ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}
          aria-hidden="true"
        >
          !
        </div>
      </div>
    </Card>
  );
}
