/**
 * BENEFIT — Frame Scroll Animation
 * Framer Code Component
 *
 * HOW TO USE IN FRAMER:
 * 1. Paste this entire file into Framer → Assets → Code → New Component
 * 2. Place the component on your canvas and set its height (recommended: 2500px)
 * 3. In the right panel, set "Frames Base URL" to the public CDN path of your frames
 *    e.g. https://your-cdn.com/frames
 *    Frames must be named: frame-001.webp, frame-002.webp … frame-083.webp
 * 4. Set Frame Count to match your sequence (default 83)
 *
 * The component is self-pinning: it sticks to the viewport while the user scrolls
 * through the full component height, then unpins naturally.
 */

import { addPropertyControls, ControlType } from "framer"
import { useEffect, useRef, useState } from "react"
import { useScroll, useMotionValueEvent } from "framer-motion"

// ─── Types ────────────────────────────────────────────────────────────────────
interface Props {
    frameBaseUrl: string
    frameCount: number
    scrollHeight: number
    backgroundColor: string
    showCallouts: boolean
}

// ─── Callout sub-component ────────────────────────────────────────────────────
function Callout({
    side,
    top,
    title,
    subtitle,
}: {
    side: "left" | "right"
    top: string
    title: string
    subtitle: string
}) {
    return (
        <div
            style={{
                position: "absolute",
                pointerEvents: "none",
                top,
                left: side === "left" ? "3%" : "auto",
                right: side === "right" ? "3%" : "auto",
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    flexDirection: side === "right" ? "row-reverse" : "row",
                }}
            >
                <div
                    style={{
                        textAlign: side === "right" ? "left" : "right",
                    }}
                >
                    <p
                        style={{
                            margin: 0,
                            fontSize: 10,
                            fontWeight: 600,
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            color: "#A38560",
                            fontFamily: "Outfit, sans-serif",
                        }}
                    >
                        {title}
                    </p>
                    <p
                        style={{
                            margin: "4px 0 0",
                            fontSize: 11,
                            color: "rgba(255,255,255,0.45)",
                            fontFamily: "Outfit, sans-serif",
                        }}
                    >
                        {subtitle}
                    </p>
                </div>
                <div
                    style={{
                        width: 96,
                        height: 1,
                        borderTop: "1px dashed rgba(163,133,96,0.5)",
                    }}
                />
            </div>
        </div>
    )
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function FrameScrollAnimation({
    frameBaseUrl = "https://your-cdn.com/frames",
    frameCount = 83,
    scrollHeight = 250,
    backgroundColor = "#000000",
    showCallouts = true,
}: Props) {
    const containerRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const bitmapsRef = useRef<(ImageBitmap | null)[]>([])
    const currentIndexRef = useRef(-1)
    const [firstFrameReady, setFirstFrameReady] = useState(false)

    // Track scroll progress relative to this component
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    })

    // Load all frames on mount
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        canvas.width = 1920
        canvas.height = 1080

        const bitmaps: (ImageBitmap | null)[] = new Array(frameCount).fill(null)
        bitmapsRef.current = bitmaps

        let loaded = 0
        let failed = 0

        function drawBitmap(bm: ImageBitmap) {
            if (!ctx || !canvas) return
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.drawImage(bm, 0, 0, canvas.width, canvas.height)
        }

        for (let i = 0; i < frameCount; i++) {
            const url = `${frameBaseUrl}/frame-${String(i + 1).padStart(3, "0")}.webp`
            const idx = i

            fetch(url)
                .then((r) => r.blob())
                .then((b) => createImageBitmap(b))
                .then((bm) => {
                    bitmaps[idx] = bm
                    loaded++
                    if (idx === 0) {
                        drawBitmap(bm)
                        setFirstFrameReady(true)
                    }
                })
                .catch(() => {
                    failed++
                })
        }

        return () => {
            bitmaps.forEach((b) => b?.close())
        }
    }, [frameBaseUrl, frameCount])

    // Drive frames from scroll progress
    useMotionValueEvent(scrollYProgress, "change", (progress) => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const targetIndex = Math.round(
            Math.max(0, Math.min(1, progress)) * (frameCount - 1)
        )
        if (targetIndex === currentIndexRef.current) return

        const bm = bitmapsRef.current[targetIndex]
        if (bm) {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.drawImage(bm, 0, 0, canvas.width, canvas.height)
            currentIndexRef.current = targetIndex
        }
    })

    return (
        <div
            ref={containerRef}
            style={{
                position: "relative",
                height: `${scrollHeight}vh`,
                width: "100%",
                background: backgroundColor,
            }}
        >
            {/* Sticky viewport-filling canvas area */}
            <div
                style={{
                    position: "sticky",
                    top: 0,
                    width: "100%",
                    height: "100vh",
                    overflow: "hidden",
                    background: backgroundColor,
                }}
            >
                {/* Fallback first frame shown before canvas is ready */}
                {!firstFrameReady && (
                    <img
                        src={`${frameBaseUrl}/frame-001.webp`}
                        alt=""
                        style={{
                            position: "absolute",
                            inset: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                            pointerEvents: "none",
                        }}
                    />
                )}

                <canvas
                    ref={canvasRef}
                    style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        opacity: firstFrameReady ? 1 : 0,
                        transition: "opacity 0.2s",
                    }}
                />

                {/* Callout annotations */}
                {showCallouts && (
                    <>
                        <Callout
                            side="left"
                            top="35%"
                            title="Print Excellence"
                            subtitle="Quarterly curated business content"
                        />
                        <Callout
                            side="right"
                            top="45%"
                            title="Premium Reach"
                            subtitle="5-star hotels · Airport lounges · Fine dining"
                        />
                        <Callout
                            side="left"
                            top="55%"
                            title="Benefit Talks"
                            subtitle="Exclusive high-level business events"
                        />
                        <Callout
                            side="right"
                            top="38%"
                            title="Digital Amplification"
                            subtitle="Integrated video campaigns · Social"
                        />
                    </>
                )}
            </div>
        </div>
    )
}

// ─── Property Controls (Framer right panel) ───────────────────────────────────
addPropertyControls(FrameScrollAnimation, {
    frameBaseUrl: {
        type: ControlType.String,
        title: "Frames Base URL",
        placeholder: "https://your-cdn.com/frames",
        description:
            "Public URL folder containing frame-001.webp … frame-083.webp",
    },
    frameCount: {
        type: ControlType.Number,
        title: "Frame Count",
        defaultValue: 83,
        min: 1,
        max: 500,
        step: 1,
        displayStepper: true,
    },
    scrollHeight: {
        type: ControlType.Number,
        title: "Scroll Height (vh)",
        defaultValue: 250,
        min: 100,
        max: 500,
        step: 10,
        displayStepper: true,
        description: "Total scroll distance. 250 = 2.5× the viewport height.",
    },
    backgroundColor: {
        type: ControlType.Color,
        title: "Background",
        defaultValue: "#000000",
    },
    showCallouts: {
        type: ControlType.Boolean,
        title: "Show Callouts",
        defaultValue: true,
        enabledTitle: "Visible",
        disabledTitle: "Hidden",
    },
})
