"use client";

import { useState, useEffect, useRef, type ElementType, type MouseEvent } from "react";
import { ArrowRight, Link, Eye } from "lucide-react";
import { Badge } from "./badge";
import { Button } from "./button";
import { Card, CardContent, CardHeader, CardTitle } from "./card";

export interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: "Education" | "Certification";
  icon: ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
  documentUrl?: string;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const centerOffset = { x: 0, y: 0 };
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const handleContainerClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const centerViewOnNode = (nodeId: number) => {
    if (!nodeRefs.current[nodeId]) return;

    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    setRotationAngle(270 - targetAngle);
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key, 10) !== id) {
          newState[parseInt(key, 10)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);

        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  useEffect(() => {
    let rotationTimer: ReturnType<typeof setInterval> | undefined;

    if (autoRotate) {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.3) % 360;
          return Number(newAngle.toFixed(3));
        });
      }, 50);
    }

    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer);
      }
    };
  }, [autoRotate]);

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 200;
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.4,
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
    );

    return { x, zIndex, y, opacity };
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed":
        return "text-white bg-[#E50914] border-[#E50914]";
      case "in-progress":
        return "text-black bg-white border-white";
      default:
        return "text-white bg-black/40 border-white/50";
    }
  };

  return (
    <div
      className="w-full h-screen flex flex-col items-center justify-center bg-black overflow-hidden"
      ref={containerRef}
      onClick={handleContainerClick}
      style={{
        width: "100%",
        minHeight: "calc(100vh - 130px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#000",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        className="relative w-full max-w-4xl h-full flex items-center justify-center"
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "1100px",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto",
        }}
      >
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            perspective: "1000px",
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
          }}
        >
          <div className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-[#E50914] via-red-900 to-black animate-pulse flex items-center justify-center z-10 shadow-[0_0_30px_rgba(229,9,20,0.6)]">
            <div className="absolute w-20 h-20 rounded-full border border-[#E50914]/40 animate-ping opacity-70" />
            <div
              className="absolute w-24 h-24 rounded-full border border-[#E50914]/20 animate-ping opacity-50"
              style={{ animationDelay: "0.5s" }}
            />
            <div className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md" />
          </div>

          <div className="absolute w-96 h-96 rounded-full border border-white/10" />

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            };

            return (
              <div
                key={item.id}
                ref={(el) => {
                  nodeRefs.current[item.id] = el;
                }}
                className="absolute transition-all duration-700 cursor-pointer"
                style={{
                  ...nodeStyle,
                  position: "absolute",
                  transition: "all 700ms",
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                <div
                  className={`absolute rounded-full -inset-1 ${
                    isPulsing ? "animate-pulse duration-1000" : ""
                  }`}
                  style={{
                    position: "absolute",
                    background: "radial-gradient(circle, rgba(229,9,20,0.4) 0%, rgba(229,9,20,0) 70%)",
                    width: `${item.energy * 0.5 + 40}px`,
                    height: `${item.energy * 0.5 + 40}px`,
                    left: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                    top: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                  }}
                />

                <div
                  className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  ${
                    isExpanded
                      ? "bg-[#E50914] text-white"
                      : isRelated
                      ? "bg-white text-black"
                      : "bg-black text-white"
                  }
                  border-2
                  ${
                    isExpanded
                      ? "border-[#E50914] shadow-[0_0_20px_rgba(229,9,20,0.5)]"
                      : isRelated
                      ? "border-white animate-pulse"
                      : "border-white/40"
                  }
                  transition-all duration-300 transform
                  ${isExpanded ? "scale-150" : ""}
                `}
                  style={{
                    boxShadow: isExpanded
                      ? "0 0 24px rgba(229,9,20,0.85), inset 0 0 14px rgba(255,255,255,0.15)"
                      : isRelated
                      ? "0 0 16px rgba(255,255,255,0.65), inset 0 0 10px rgba(255,255,255,0.12)"
                      : "0 0 10px rgba(229,9,20,0.35), inset 0 0 8px rgba(255,255,255,0.08)",
                    position: "relative",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      width: "8px",
                      height: "8px",
                      borderRadius: "9999px",
                      background: "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(229,9,20,0.65) 65%, rgba(229,9,20,0) 100%)",
                      boxShadow: "0 0 10px rgba(229,9,20,0.9)",
                    }}
                  />
                  <Icon size={16} />
                </div>

                <div
                  className={`
                  absolute top-12 whitespace-nowrap
                  text-xs font-semibold tracking-wider
                  transition-all duration-300
                  ${isExpanded ? "text-[#E50914] scale-125" : "text-white/70"}
                `}
                >
                  {item.title}
                </div>

                {isExpanded && (
                  <Card
                    className="absolute top-20 left-1/2 -translate-x-1/2 w-72 bg-black/95 backdrop-blur-lg border-white/20 shadow-2xl shadow-black overflow-visible z-50"
                    style={{
                      position: "absolute",
                      top: "5rem",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "18rem",
                      zIndex: 50,
                    }}
                  >
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-[#E50914]" />
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <Badge
                          className={`px-2 text-[10px] ${getStatusStyles(
                            item.status
                          )}`}
                        >
                          {item.category.toUpperCase()}
                        </Badge>
                        <span className="text-[10px] font-mono text-white/50">
                          {item.date}
                        </span>
                      </div>
                      <CardTitle className="text-base mt-2 text-white">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-white/80">
                      <p className="mb-4">{item.content}</p>

                      {item.documentUrl && (
                        <Button
                          variant="outline"
                          className="w-full border-[#E50914] text-white bg-[#E50914] hover:bg-[#ff1d2d] hover:text-white transition-colors mb-3 h-9 text-xs font-semibold relative overflow-hidden shadow-[0_0_16px_rgba(229,9,20,0.65)]"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(item.documentUrl, "_blank", "noopener,noreferrer");
                          }}
                        >
                          <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/80 blur-[2px] pointer-events-none" />
                          <Eye className="w-3 h-3 mr-2" />
                          Voir le document
                        </Button>
                      )}

                      {item.relatedIds.length > 0 && (
                        <div className="mt-2 pt-3 border-t border-white/10">
                          <div className="flex items-center mb-2">
                            <Link size={10} className="text-white/50 mr-1" />
                            <h4 className="text-[10px] uppercase tracking-wider font-medium text-white/50">
                              Voir aussi
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find(
                                (i) => i.id === relatedId
                              );
                              return (
                                <Button
                                  key={relatedId}
                                  variant="ghost"
                                  size="sm"
                                  className="flex items-center h-6 px-2 text-[10px] rounded-sm border border-[#E50914]/70 bg-black/70 hover:bg-[#E50914] hover:border-[#E50914] text-white hover:text-white transition-all relative overflow-hidden shadow-[0_0_10px_rgba(229,9,20,0.35)]"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItem(relatedId);
                                  }}
                                >
                                  <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70 blur-[1.5px] pointer-events-none" />
                                  {relatedItem?.title}
                                  <ArrowRight size={8} className="ml-1 opacity-70" />
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
