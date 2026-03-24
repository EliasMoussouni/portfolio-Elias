'use client';

import { Application } from '@splinetool/runtime';
import { Suspense, lazy, useEffect, useRef } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

interface SplineSceneProps {
  scene: string;
  className?: string;
  pointerX?: number;
  pointerY?: number;
}

const variableNames = [
  ['mouseX', 'mouseY'],
  ['MouseX', 'MouseY'],
  ['cursorX', 'cursorY'],
  ['CursorX', 'CursorY'],
  ['lookX', 'lookY'],
  ['LookX', 'LookY'],
  ['targetX', 'targetY'],
  ['TargetX', 'TargetY'],
];

export function SplineScene({
  scene,
  className,
  pointerX = 0,
  pointerY = 0,
}: SplineSceneProps) {
  const appRef = useRef<Application | null>(null);
  const frameRef = useRef<number | null>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    targetRef.current = { x: pointerX, y: pointerY };
  }, [pointerX, pointerY]);

  useEffect(() => {
    const animate = () => {
      const app = appRef.current;
      const current = currentRef.current;
      const target = targetRef.current;

      current.x += (target.x - current.x) * 0.14;
      current.y += (target.y - current.y) * 0.14;

      if (app) {
        const normalizedX = Number(current.x.toFixed(3));
        const normalizedY = Number(current.y.toFixed(3));

        for (const [xName, yName] of variableNames) {
          try {
            app.setVariables({
              [xName]: normalizedX,
              [yName]: normalizedY,
            });
          } catch {
            // Ignore missing variables in the scene.
          }
        }

        app.requestRender();
      }

      frameRef.current = window.requestAnimationFrame(animate);
    };

    frameRef.current = window.requestAnimationFrame(animate);

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center">
          <span className="loader" aria-label="Chargement de la scene 3D"></span>
        </div>
      }
    >
      <Spline
        scene={scene}
        className={className}
        onLoad={(app) => {
          appRef.current = app;
          app.setGlobalEvents(true);
        }}
      />
    </Suspense>
  );
}
