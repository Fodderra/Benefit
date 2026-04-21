/**
 * BENEFIT — Panoramic Photo Slider
 * Framer Code Component
 *
 * HOW TO USE IN FRAMER:
 * 1. Paste this entire file into Framer → Assets → Code → New Component
 * 2. Place on canvas (recommended size: full-width, ~700px tall)
 * 3. In the right panel → "Slides" → click + to add each image
 *    (Framer's image picker lets you upload directly)
 * 4. Drag/click to navigate. Works on touch devices.
 */

import { addPropertyControls, ControlType } from "framer"
import { useState, useRef, useCallback, useEffect } from "react"

// ─── Types ────────────────────────────────────────────────────────────────────
interface Props {
    slides: string[]
    backgroundColor: string
    accentColor: string
    cardAspectRatio: string
    showReflection: boolean
    showArrows: boolean
    showDots: boolean
    autoPlay: boolean
    autoPlayInterval: number
}

// ─── Per-offset visual config ─────────────────────────────────────────────────
// Index 0 = center card, 1 = adjacent, 2 = outer
const DEPTH: {
    translateX: number
    rotateY: number
    scale: number
    opacity: number
}[] = [
    { translateX: 0, rotateY: 0, scale: 1, opacity: 1 },
    { translateX: 320, rotateY: 38, scale: 0.84, opacity: 0.72 },
    { translateX: 540, rotateY: 52, scale: 0.7, opacity: 0.38 },
]

function getCardSize(containerWidth: number, aspectRatio: string) {
    const [w, h] = aspectRatio.split("/").map(Number)
    const ratio = h / w
    const cardW = Math.min(containerWidth * 0.28, 320)
    return { w: Math.round(cardW), h: Math.round(cardW * ratio) }
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function PanoramaSlider({
    slides = [],
    backgroundColor = "#000000",
    accentColor = "#A38560",
    cardAspectRatio = "3/4",
    showReflection = true,
    showArrows = true,
    showDots = true,
    autoPlay = false,
    autoPlayInterval = 3000,
}: Props) {
    const [active, setActive] = useState(Math.floor((slides.length - 1) / 2))
    const [containerW, setContainerW] = useState(1200)
    const wrapperRef = useRef<HTMLDivElement>(null)
    const dragRef = useRef({ startX: 0, dragging: false, moved: false })
    const autoRef = useRef<ReturnType<typeof setInterval> | null>(null)

    // Observe container width for responsive card sizing
    useEffect(() => {
        if (!wrapperRef.current) return
        const ro = new ResizeObserver(([entry]) => {
            setContainerW(entry.contentRect.width)
        })
        ro.observe(wrapperRef.current)
        return () => ro.disconnect()
    }, [])

    // Auto-play
    useEffect(() => {
        if (!autoPlay || slides.length < 2) return
        autoRef.current = setInterval(() => {
            setActive((prev) => (prev + 1) % slides.length)
        }, autoPlayInterval)
        return () => {
            if (autoRef.current) clearInterval(autoRef.current)
        }
    }, [autoPlay, autoPlayInterval, slides.length])

    const go = useCallback(
        (dir: number) => {
            if (autoRef.current) clearInterval(autoRef.current)
            setActive((prev) =>
                Math.max(0, Math.min(slides.length - 1, prev + dir))
            )
        },
        [slides.length]
    )

    function getStyle(i: number): React.CSSProperties {
        const offset = i - active
        const abs = Math.abs(offset)
        const dir = offset >= 0 ? 1 : -1

        if (abs >= DEPTH.length) {
            const cfg = DEPTH[DEPTH.length - 1]
            return {
                transform: `translateX(${dir * cfg.translateX}px) rotateY(${dir * cfg.rotateY}deg) scale(${cfg.scale})`,
                opacity: 0,
                zIndex: 0,
                transition: "transform 0.55s cubic-bezier(0.25,0.1,0.25,1), opacity 0.55s ease",
            }
        }

        const cfg = DEPTH[abs]
        return {
            transform: `translateX(${dir * cfg.translateX}px) rotateY(${dir * cfg.rotateY}deg) scale(${cfg.scale})`,
            opacity: cfg.opacity,
            zIndex: DEPTH.length - abs,
            transition: "transform 0.55s cubic-bezier(0.25,0.1,0.25,1), opacity 0.55s ease",
        }
    }

    // Pointer drag handlers
    function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
        dragRef.current = { startX: e.clientX, dragging: true, moved: false }
        ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    }
    function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
        if (!dragRef.current.dragging) return
        if (Math.abs(e.clientX - dragRef.current.startX) > 8)
            dragRef.current.moved = true
    }
    function onPointerUp(e: React.PointerEvent<HTMLDivElement>) {
        if (!dragRef.current.dragging) return
        dragRef.current.dragging = false
        const delta = e.clientX - dragRef.current.startX
        if (dragRef.current.moved && Math.abs(delta) > 40) go(delta < 0 ? 1 : -1)
    }

    const { w: cardW, h: cardH } = getCardSize(containerW, cardAspectRatio)
    const trackH = cardH + (showReflection ? cardH * 0.12 + 8 : 0) + 8

    const reflectionStyle: React.CSSProperties = showReflection
        ? {
              WebkitBoxReflect:
                  "below 3px -webkit-linear-gradient(transparent 58%, rgba(0,0,0,0.4))",
          }
        : {}

    if (slides.length === 0) {
        return (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    background: backgroundColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(255,255,255,0.3)",
                    fontFamily: "Outfit, sans-serif",
                    fontSize: 13,
                    letterSpacing: "0.1em",
                }}
            >
                Add slides in the right panel →
            </div>
        )
    }

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                background: backgroundColor,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "40px 0",
                overflow: "hidden",
                userSelect: "none",
            }}
        >
            {/* Track */}
            <div
                ref={wrapperRef}
                style={{
                    position: "relative",
                    width: "100%",
                    height: trackH,
                    perspective: "1100px",
                    cursor: "grab",
                    flexShrink: 0,
                }}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
            >
                {/* Edge fades */}
                {(["left", "right"] as const).map((side) => (
                    <div
                        key={side}
                        style={{
                            position: "absolute",
                            top: 0,
                            [side]: 0,
                            width: "15%",
                            height: "100%",
                            background: `linear-gradient(to ${side === "left" ? "right" : "left"}, ${backgroundColor}, transparent)`,
                            zIndex: 30,
                            pointerEvents: "none",
                        }}
                    />
                ))}

                {/* Cards */}
                {slides.map((src, i) => (
                    <div
                        key={i}
                        className="panorama-card"
                        onClick={() => {
                            if (!dragRef.current.moved) setActive(i)
                        }}
                        style={{
                            position: "absolute",
                            left: "50%",
                            top: "50%",
                            width: cardW,
                            height: cardH,
                            marginLeft: -(cardW / 2),
                            marginTop: -(cardH / 2),
                            overflow: "hidden",
                            borderRadius: 2,
                            cursor: i === active ? "grab" : "pointer",
                            transformStyle: "preserve-3d",
                            ...reflectionStyle,
                            ...getStyle(i),
                        }}
                    >
                        <img
                            src={src}
                            alt={`Slide ${i + 1}`}
                            draggable={false}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                display: "block",
                                pointerEvents: "none",
                            }}
                        />
                    </div>
                ))}
            </div>

            {/* Dots */}
            {showDots && (
                <div
                    style={{
                        display: "flex",
                        gap: 8,
                        alignItems: "center",
                        marginTop: showReflection ? 48 : 24,
                        flexShrink: 0,
                    }}
                >
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setActive(i)}
                            style={{
                                width: i === active ? 22 : 6,
                                height: 6,
                                borderRadius: 3,
                                background: i === active
                                    ? accentColor
                                    : "rgba(255,255,255,0.22)",
                                border: "none",
                                padding: 0,
                                cursor: "pointer",
                                transition: "width 0.3s ease, background 0.3s ease",
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Arrow controls */}
            {showArrows && (
                <div
                    style={{
                        display: "flex",
                        gap: 12,
                        marginTop: 20,
                        flexShrink: 0,
                    }}
                >
                    {([["←", -1], ["→", 1]] as [string, number][]).map(([label, dir]) => (
                        <button
                            key={label}
                            onClick={() => go(dir)}
                            style={{
                                width: 40,
                                height: 40,
                                background: "transparent",
                                border: "1px solid rgba(255,255,255,0.18)",
                                color: "rgba(255,255,255,0.55)",
                                cursor: "pointer",
                                fontSize: 16,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontFamily: "Outfit, sans-serif",
                                transition: "border-color 0.2s, color 0.2s",
                            }}
                            onMouseEnter={(e) => {
                                const el = e.currentTarget
                                el.style.borderColor = "rgba(255,255,255,0.6)"
                                el.style.color = "#fff"
                            }}
                            onMouseLeave={(e) => {
                                const el = e.currentTarget
                                el.style.borderColor = "rgba(255,255,255,0.18)"
                                el.style.color = "rgba(255,255,255,0.55)"
                            }}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

// ─── Property Controls ────────────────────────────────────────────────────────
addPropertyControls(PanoramaSlider, {
    slides: {
        type: ControlType.Array,
        title: "Slides",
        control: { type: ControlType.Image },
        maxCount: 9,
        description: "Click + to add images. Drag to reorder.",
    },
    backgroundColor: {
        type: ControlType.Color,
        title: "Background",
        defaultValue: "#000000",
    },
    accentColor: {
        type: ControlType.Color,
        title: "Accent",
        defaultValue: "#A38560",
    },
    cardAspectRatio: {
        type: ControlType.Enum,
        title: "Card Ratio",
        options: ["3/4", "4/5", "1/1", "16/9"],
        optionTitles: ["3:4 (Portrait)", "4:5 (Instagram)", "1:1 (Square)", "16:9 (Wide)"],
        defaultValue: "3/4",
    },
    showReflection: {
        type: ControlType.Boolean,
        title: "Reflection",
        defaultValue: true,
        enabledTitle: "On",
        disabledTitle: "Off",
    },
    showArrows: {
        type: ControlType.Boolean,
        title: "Arrows",
        defaultValue: true,
    },
    showDots: {
        type: ControlType.Boolean,
        title: "Dots",
        defaultValue: true,
    },
    autoPlay: {
        type: ControlType.Boolean,
        title: "Auto Play",
        defaultValue: false,
    },
    autoPlayInterval: {
        type: ControlType.Number,
        title: "Auto Interval (ms)",
        defaultValue: 3000,
        min: 1000,
        max: 10000,
        step: 500,
        hidden: (props) => !props.autoPlay,
    },
})
