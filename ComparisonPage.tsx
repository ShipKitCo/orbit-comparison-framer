import { addPropertyControls, ControlType } from "framer"
import { useState, useEffect } from "react"

/**
 * Velo vs. Datadog - B2B Comparison Page
 * saas-comparison-page-v1
 *
 * Design system: shared-design-system/DESIGN-TOKENS.md
 * Reference template: saas-pricing-page-v1 (Meridian)
 *
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight auto
 */
export default function ComparisonPage(props) {
    const {
        colorMode = "dark",
        accentColor = "#818CF8",
        productName = "Velo",
        competitorName = "Datadog",
    } = props

    const [engineers, setEngineers] = useState(8)
    const [logsK, setLogsK] = useState(10) // thousands per day

    // Use window.innerWidth so Framer preview viewport resize works correctly.
    // props.width reflects the page frame width (1200px Desktop), not the preview viewport.
    const [viewportWidth, setViewportWidth] = useState(
        typeof window !== "undefined" ? window.innerWidth : 1200
    )
    useEffect(() => {
        const handler = () => setViewportWidth(window.innerWidth)
        window.addEventListener("resize", handler)
        return () => window.removeEventListener("resize", handler)
    }, [])

    const isDark = colorMode === "dark"
    const isMobile = viewportWidth <= 640
    const isTablet = viewportWidth <= 900
    const [ar, ag, ab] = (accentColor.replace("#", "").match(/../g) || ["81", "8C", "F8"]).map(h => parseInt(h, 16))

    // -- Design tokens - mirrors DESIGN-TOKENS.md exactly --------------
    const T = isDark
        ? {
              bg: "#0D0D0D",
              surface: "#141414",
              elevated: "#1C1C1E",
              border: "rgba(255,255,255,0.08)",
              borderStr: "rgba(255,255,255,0.16)",
              text: "#F5F5F5",
              muted: "#A3A3A3",
              disabled: "rgba(255,255,255,0.25)",
              accent: accentColor,
              accentDim: `rgba(${ar},${ag},${ab},0.12)`,
              accentTint: `rgba(${ar},${ag},${ab},0.04)`,
              colTint: "rgba(255,255,255,0.055)",
              colTintH: "rgba(255,255,255,0.09)",
              redMuted: "rgba(239,68,68,0.50)",
              navBg: "rgba(13,13,13,0.88)",
              logoStroke: "rgba(255,255,255,0.22)",
              logoFill: "rgba(237,237,237,0.04)",
          }
        : {
              bg: "#F8F8FC",
              surface: "#FFFFFF",
              elevated: "#F0F0F8",
              border: "rgba(0,0,0,0.08)",
              borderStr: "rgba(0,0,0,0.16)",
              text: "#0D0D0D",
              muted: "#6B6B6B",
              disabled: "rgba(0,0,0,0.28)",
              accent: accentColor,
              accentDim: `rgba(${ar},${ag},${ab},0.12)`,
              accentTint: `rgba(${ar},${ag},${ab},0.05)`,
              colTint: "rgba(0,0,0,0.045)",
              colTintH: "rgba(0,0,0,0.08)",
              redMuted: "rgba(220,38,38,0.60)",
              navBg: "rgba(248,248,252,0.90)",
              logoStroke: "rgba(0,0,0,0.20)",
              logoFill: "rgba(0,0,0,0.02)",
          }

    // -- Font load ------------------------------------------------------
    useEffect(() => {
        const id = "comp-geist"
        if (!document.getElementById(id)) {
            const link = document.createElement("link")
            link.id = id
            link.rel = "stylesheet"
            link.href = "https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500&display=swap"
            document.head.appendChild(link)
        }
    }, [])

    // -- Calculator -----------------------------------------------------
    // Datadog: per-seat infra ($19/seat) + log ingestion per-K events
    // Velo: flat base + per-GB (1K logs ~ 0.5MB -> logsK * 0.68)
    const ddCost = Math.round(engineers * 19 + logsK * 3.4)
    const veloCost = Math.round(49 + logsK * 0.68)
    const savings = Math.max(0, ddCost - veloCost)
    const fmtLogs = (v: number) => (v >= 1000 ? (v / 1000).toFixed(0) + "K" : v + "K")
    const fmt$ = (n: number) => "$" + Math.round(n).toLocaleString()

    // -- Shared layout constants ----------------------------------------
    const MAX_W = "1440px"
    const PAD_X = "40px"
    const SEC_V = "96px"

    // -- Shared style objects -------------------------------------------
    const wrap: React.CSSProperties = { maxWidth: MAX_W, margin: "0 auto", padding: isMobile ? "0 20px" : `0 ${PAD_X}` }
    const section: React.CSSProperties = { padding: `${SEC_V} 0` }

    const btnPrimary: React.CSSProperties = {
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        padding: "10px 22px", borderRadius: "6px",
        fontSize: "13px", fontWeight: 500, fontFamily: "inherit",
        background: T.accent, color: "#000",
        border: "none", cursor: "pointer", textDecoration: "none",
        whiteSpace: "nowrap",
    }
    const btnGhost: React.CSSProperties = {
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        padding: "10px 22px", borderRadius: "6px",
        fontSize: "13px", fontWeight: 500, fontFamily: "inherit",
        background: "transparent", color: T.text,
        border: `1px solid ${T.borderStr}`, cursor: "pointer",
        textDecoration: "none", whiteSpace: "nowrap",
    }
    const btnNav: React.CSSProperties = {
        display: "inline-flex", alignItems: "center",
        height: "32px", padding: "0 14px", borderRadius: "6px",
        fontSize: "13px", fontWeight: 500, fontFamily: "inherit",
        background: T.text, color: T.bg,
        border: "none", cursor: "pointer",
    }
    const eyebrow: React.CSSProperties = {
        fontSize: "11px", fontWeight: 500, letterSpacing: "0.10em",
        textTransform: "uppercase", color: T.disabled, marginBottom: "8px",
        display: "block",
    }
    const sectionH2: React.CSSProperties = {
        fontSize: "clamp(24px, 2.8vw, 34px)", fontWeight: 400,
        letterSpacing: "-0.03em", marginBottom: "48px", color: T.text,
        lineHeight: 1.15,
    }

    // -- SVG components -------------------------------------------------
    const LogoSVG = ({ size = 20 }: { size?: number }) => (
        <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
            <rect x="1" y="5" width="11" height="11" rx="1"
                stroke={T.logoStroke} strokeWidth="1.25" fill={T.logoFill} />
            <rect x="8" y="1" width="11" height="11" rx="1"
                stroke={T.accent} strokeWidth="1.25" fill="none" />
        </svg>
    )
    const CheckIcon = ({ color }: { color: string }) => (
        <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
            <circle cx="8.5" cy="8.5" r="8.5" fill={color} fillOpacity="0.12" />
            <path d="M5.5 8.5 7.8 11 12 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
    const XIcon = () => (
        <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
            <circle cx="8.5" cy="8.5" r="8.5" fill={T.redMuted} fillOpacity="0.15" />
            <path d="M6 6 11 11M11 6 6 11" stroke={T.redMuted} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    )

    // -- Table cell renderer --------------------------------------------
    const CellValue = ({ val, isVelo, note }: { val: any; isVelo: boolean; note?: string }) => {
        if (val === true) {
            return (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                    <CheckIcon color={isVelo ? T.accent : T.muted} />
                    {note && <span style={{ fontSize: "11px", color: T.disabled }}>{note}</span>}
                </div>
            )
        }
        if (val === false) {
            return (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                    <XIcon />
                    {note && <span style={{ fontSize: "11px", color: T.disabled }}>{note}</span>}
                </div>
            )
        }
        return (
            <div style={{ textAlign: "center" }}>
                <span style={{ color: isVelo ? T.text : T.muted, fontSize: "13px", fontVariantNumeric: "tabular-nums" }}>{val}</span>
                {note && <div style={{ fontSize: "11px", color: T.disabled, marginTop: "2px" }}>{note}</div>}
            </div>
        )
    }

    // -- Comparison table data ------------------------------------------
    const tableGroups = [
        {
            label: "Pricing & Billing",
            rows: [
                { feature: "Pricing model", velo: "Per GB ingested", dd: "Per seat + per host" },
                { feature: "Starting price", velo: "$29/mo", dd: "$15/seat/mo" },
                { feature: "Cost at 10K logs/day", velo: "$56/mo", dd: "$312/mo" },
                { feature: "Cost at 100K logs/day", velo: "$420/mo", dd: "$2,800/mo" },
                { feature: "Free tier", velo: true, dd: false, veloNote: "5GB/day" },
                { feature: "Annual discount", velo: "20%", dd: "15%" },
            ],
        },
        {
            label: "Core Features",
            rows: [
                { feature: "Log ingestion", velo: true, dd: true },
                { feature: "Full-text search", velo: "Sub-200ms", dd: "1-3s at scale" },
                { feature: "Metrics & dashboards", velo: true, dd: true },
                { feature: "Distributed tracing", velo: "Via Grafana Tempo", dd: true },
                { feature: "Custom alerts", velo: true, dd: true },
                { feature: "Slack / PagerDuty", velo: true, dd: true },
                { feature: "SSO / SAML", velo: true, dd: true },
            ],
        },
        {
            label: "Setup & Experience",
            rows: [
                { feature: "Time to first query", velo: "15 minutes", dd: "2-4 hours" },
                { feature: "Sales call required", velo: false, dd: true },
                { feature: "Self-serve signup", velo: true, dd: false },
                { feature: "API + SDK", velo: true, dd: true },
                { feature: "Docs quality", velo: "5 / 5", dd: "4 / 5" },
            ],
        },
        {
            label: "Support & SLA",
            rows: [
                { feature: "Uptime SLA", velo: "99.9%", dd: "99.9%" },
                { feature: "Support response (starter)", velo: "< 4 hours", dd: "< 24 hours" },
                { feature: "Dedicated account manager", velo: false, dd: true, ddNote: "Enterprise only" },
                { feature: "Custom contract / MSA", velo: true, dd: true },
            ],
        },
    ] as const

    // -- Slider input style (range thumb not supported via inline styles) -
    // Inject mode-aware styles — re-runs whenever isDark changes
    useEffect(() => {
        const id = "comp-range-style"
        const old = document.getElementById(id)
        if (old) old.remove()
        const s = document.createElement("style")
        s.id = id
        const trackBg = isDark ? "rgba(255,255,255,0.16)" : "rgba(0,0,0,0.14)"
        const thumbBg = isDark ? "#fff" : "#0D0D0D"
        const thumbBorder = isDark ? "#141414" : "#F8F8FC"
        const ghostHover = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)"
        s.textContent = `
            /* Sliders */
            .comp-range { -webkit-appearance: none; width: 100%; height: 1px; background: ${trackBg}; outline: none; border-radius: 1px; cursor: pointer; }
            .comp-range::-webkit-slider-thumb { -webkit-appearance: none; width: 14px; height: 14px; border-radius: 50%; background: ${thumbBg}; border: 2px solid ${thumbBorder}; box-shadow: 0 0 0 1px ${trackBg}; cursor: pointer; }
            .comp-range::-webkit-slider-thumb:hover { box-shadow: 0 0 0 2px #818CF8; }

            /* Button hover states */
            .comp-btn-primary { transition: opacity 0.15s, transform 0.15s; }
            .comp-btn-primary:hover { opacity: 0.82; transform: translateY(-1px); }
            .comp-btn-primary:active { opacity: 1; transform: translateY(0); }
            .comp-btn-ghost { transition: background 0.15s, border-color 0.15s, transform 0.15s; }
            .comp-btn-ghost:hover { background: ${ghostHover} !important; transform: translateY(-1px); }
            .comp-btn-ghost:active { transform: translateY(0); }
            .comp-btn-nav { transition: opacity 0.15s; }
            .comp-btn-nav:hover { opacity: 0.80; }
            .comp-btn-tbl { transition: opacity 0.15s, transform 0.15s; }
            .comp-btn-tbl:hover { opacity: 0.82; transform: translateY(-1px); }
            .comp-btn-tbl-ghost { transition: background 0.15s, transform 0.15s; }
            .comp-btn-tbl-ghost:hover { background: ${ghostHover} !important; transform: translateY(-1px); }
        `
        document.head.appendChild(s)
    }, [isDark])

    // -- Render ---------------------------------------------------------
    return (
        <div style={{
            fontFamily: "'Geist', -apple-system, BlinkMacSystemFont, sans-serif",
            background: T.bg,
            color: T.text,
            fontSize: "15px",
            lineHeight: "1.6",
            WebkitFontSmoothing: "antialiased",
            width: "100%",
            overflowX: "hidden",
        }}>

            {/* ══ NAV ══════════════════════════════════════════════════ */}
            <nav style={{
                position: "sticky", top: 0, zIndex: 100,
                background: T.navBg,
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                borderBottom: `1px solid ${T.border}`,
            }}>
                <div className="comp-nav-inner" style={{ ...wrap, display: "flex", alignItems: "center", justifyContent: "space-between", height: "56px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <LogoSVG />
                        <span style={{ fontSize: "15px", fontWeight: 500, letterSpacing: "-0.02em", color: T.text }}>
                            {productName}
                        </span>
                    </div>
                    <div className="comp-nav-links" style={{ display: isMobile ? "none" : "flex", alignItems: "center", gap: "24px" }}>
                        {["Docs", "Changelog", "Customers", "Pricing"].map(link => (
                            <a key={link} href="#" style={{ fontSize: "13px", color: T.muted, textDecoration: "none" }}>
                                {link}
                            </a>
                        ))}
                    </div>
                    <button className="comp-btn-nav" style={btnNav}>Start free trial</button>
                </div>
            </nav>

            {/* ══ HERO ══════════════════════════════════════════════════ */}
            <section className="comp-hero-pad" style={{ padding: isMobile ? "56px 0 40px" : isTablet ? "72px 0 48px" : "112px 0 80px", position: "relative", overflow: "hidden" }}>
                {/* Atmospheric gradient */}
                <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: "520px",
                    background: `radial-gradient(ellipse 65% 55% at 18% 0%, rgba(${ar},${ag},${ab},0.065) 0%, transparent 70%)`,
                    pointerEvents: "none",
                }} />
                <div className="comp-wrap" style={wrap}>
                    <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.10em", textTransform: "uppercase", color: T.accent, marginBottom: "20px" }}>
                        {productName} vs. {competitorName}
                    </p>
                    <h1 className="comp-hero-h1" style={{ fontSize: isMobile ? "32px" : "clamp(36px, 4vw, 54px)", fontWeight: 400, letterSpacing: "-0.03em", lineHeight: 1.1, maxWidth: "660px", marginBottom: "20px", color: T.text }}>
                        The {competitorName} alternative<br />your CFO will thank you for.
                    </h1>
                    <p style={{ fontSize: "18px", color: T.muted, maxWidth: "440px", lineHeight: 1.55, marginBottom: "36px" }}>
                        Same visibility. 80% less cost.<br />No seat minimums.
                    </p>
                    <div className="comp-hero-btns" style={{ display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "stretch" : "center", gap: isMobile ? "10px" : "12px", marginBottom: "44px" }}>
                        <button className="comp-btn-primary" style={btnPrimary}>Start free - no credit card</button>
                        <a className="comp-btn-ghost" href="#compare" style={btnGhost}>See full comparison</a>
                    </div>
                    <div className="comp-trust-row" style={{ display: "flex", alignItems: "center", gap: isMobile ? "8px 16px" : "16px", flexWrap: isMobile ? "wrap" : "nowrap" }}>
                        <span style={{ fontSize: "12px", color: T.disabled, whiteSpace: "nowrap" }}>Trusted by teams from</span>
                        <div style={{ display: "flex", gap: "20px" }}>
                            {["Ferron", "Tangent", "Holloway", "Axon"].map(name => (
                                <span key={name} style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: T.disabled }}>
                                    {name}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ QUICK WINS ════════════════════════════════════════════ */}
            <div style={{ padding: `0 0 ${SEC_V}` }}>
                <div className="comp-wrap" style={wrap}>
                    <div className="comp-quick-wins" style={{
                        display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(4,1fr)",
                        gap: "1px", background: T.border,
                        border: `1px solid ${T.border}`, borderRadius: "10px", overflow: "hidden",
                    }}>
                        {[
                            { val: "80%", label: "Less cost at 10K logs/day", note: "vs. comparable Datadog usage" },
                            { val: "Per GB", label: "Usage-based pricing", note: "No per-seat fees. Pay for logs, not engineers." },
                            { val: "15 min", label: "Time to first query", note: "Self-serve setup - no sales call needed." },
                            { val: "5x", label: "Faster log search", note: "Full-text across 90-day history at any scale." },
                        ].map((win, i) => (
                            <div key={i} style={{ background: T.surface, padding: "32px 28px" }}>
                                <div style={{ fontSize: "40px", fontWeight: 500, letterSpacing: "-0.04em", color: T.accent, lineHeight: 1, marginBottom: "8px", fontVariantNumeric: "tabular-nums" }}>
                                    {win.val}
                                </div>
                                <div style={{ fontSize: "14px", fontWeight: 500, marginBottom: "4px", color: T.text }}>
                                    {win.label}
                                </div>
                                <div style={{ fontSize: "12px", color: T.muted, lineHeight: 1.5 }}>
                                    {win.note}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ══ COMPARISON TABLE ═════════════════════════════════════ */}
            <section id="compare" style={section}>
                <div className="comp-wrap" style={wrap}>
                    <p style={eyebrow}>Full comparison</p>
                    <h2 style={sectionH2}>{productName} vs. {competitorName}</h2>

                    <div className="comp-table-wrap" style={{ border: `1px solid ${T.border}`, borderRadius: "10px", overflowX: isMobile ? "auto" : "hidden" }}>
                        <div className="comp-table-inner" style={{ overflow: "hidden", minWidth: isMobile ? "480px" : undefined }}>
                        {/* Header row */}
                        <div style={{ display: "grid", gridTemplateColumns: "36% 32% 32%" }}>
                            {/* Feature col header */}
                            <div style={{
                                background: T.surface,
                                padding: "20px 28px",
                                fontSize: "11px", fontWeight: 500, letterSpacing: "0.08em",
                                textTransform: "uppercase", color: T.disabled,
                                borderBottom: `1px solid ${T.border}`,
                            }}>
                                Feature
                            </div>
                            {/* Velo col header - highlighted */}
                            <div style={{
                                background: T.colTint,
                                padding: "16px 24px 14px",
                                borderTop: `2px solid ${T.accent}`,
                                borderBottom: `1px solid ${T.border}`,
                                borderLeft: `1px solid ${T.border}`,
                                textAlign: "center",
                                verticalAlign: "top",
                            }}>
                                <span style={{
                                    display: "block", fontSize: "10px", fontWeight: 500, letterSpacing: "0.05em",
                                    color: T.accent, background: T.accentDim,
                                    padding: "3px 9px", borderRadius: "20px",
                                    marginBottom: "9px",
                                    width: "fit-content", marginLeft: "auto", marginRight: "auto",
                                }}>
                                    Recommended
                                </span>
                                <span style={{ display: "block", fontSize: "15px", fontWeight: 600, letterSpacing: "-0.02em", color: T.accent, marginBottom: "3px" }}>
                                    {productName}
                                </span>
                                <span style={{ display: "block", fontSize: "12px", color: T.muted }}>
                                    The alternative
                                </span>
                            </div>
                            {/* Competitor col header - flat */}
                            <div style={{
                                background: T.surface,
                                padding: "16px 24px 14px",
                                borderBottom: `1px solid ${T.border}`,
                                borderLeft: `1px solid ${T.border}`,
                                textAlign: "center",
                                verticalAlign: "top",
                            }}>
                                {/* Ghost spacer to align brand names with Velo column */}
                                <div style={{ height: "22px", marginBottom: "9px" }} />
                                <span style={{ display: "block", fontSize: "15px", fontWeight: 600, letterSpacing: "-0.02em", color: T.text, marginBottom: "3px" }}>
                                    {competitorName}
                                </span>
                                <span style={{ display: "block", fontSize: "12px", color: T.muted }}>
                                    Industry standard
                                </span>
                            </div>
                        </div>

                        {/* Group rows */}
                        {tableGroups.map((group, gi) => (
                            <div key={gi}>
                                {/* Group label */}
                                <div style={{ display: "grid", gridTemplateColumns: "36% 32% 32%" }}>
                                    <div style={{
                                        background: T.bg, padding: "9px 28px",
                                        fontSize: "11px", fontWeight: 500, letterSpacing: "0.08em",
                                        textTransform: "uppercase", color: T.disabled,
                                        borderTop: `1px solid ${T.border}`,
                                    }}>
                                        {group.label}
                                    </div>
                                    <div style={{ background: T.colTint, borderTop: `1px solid ${T.border}`, borderLeft: `1px solid ${T.border}` }} />
                                    <div style={{ background: T.bg, borderTop: `1px solid ${T.border}`, borderLeft: `1px solid ${T.border}` }} />
                                </div>

                                {/* Data rows */}
                                {group.rows.map((row, ri) => (
                                    <div key={ri} style={{ display: "grid", gridTemplateColumns: "36% 32% 32%", background: T.surface }}>
                                        {/* Feature name */}
                                        <div style={{ padding: "13px 28px", fontSize: "13px", color: T.muted, borderTop: `1px solid ${T.border}` }}>
                                            <strong style={{ display: "block", color: T.text, fontWeight: 400, marginBottom: "1px" }}>
                                                {row.feature}
                                            </strong>
                                        </div>
                                        {/* Velo value */}
                                        <div style={{
                                            padding: "13px 24px", textAlign: "center",
                                            background: T.colTint,
                                            borderTop: `1px solid ${T.border}`,
                                            borderLeft: `1px solid ${T.border}`,
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                        }}>
                                            <CellValue val={row.velo} isVelo={true} note={"veloNote" in row ? (row as any).veloNote : undefined} />
                                        </div>
                                        {/* Competitor value */}
                                        <div style={{
                                            padding: "13px 24px", textAlign: "center",
                                            borderTop: `1px solid ${T.border}`,
                                            borderLeft: `1px solid ${T.border}`,
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                        }}>
                                            <CellValue val={row.dd} isVelo={false} note={"ddNote" in row ? (row as any).ddNote : undefined} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}

                        {/* CTA row */}
                        <div style={{ display: "grid", gridTemplateColumns: "36% 32% 32%", background: T.surface }}>
                            <div style={{ padding: "28px", borderTop: `1px solid ${T.border}` }} />
                            <div style={{ padding: "28px 24px", textAlign: "center", background: T.colTint, borderTop: `1px solid ${T.border}`, borderLeft: `1px solid ${T.border}` }}>
                                <span style={{ display: "block", fontSize: "11px", color: T.disabled, marginBottom: "4px" }}>Starting at</span>
                                <span style={{ display: "block", fontSize: "36px", fontWeight: 500, letterSpacing: "-0.04em", fontVariantNumeric: "tabular-nums", color: T.accent, marginBottom: "16px" }}>
                                    $29<span style={{ fontSize: "14px", fontWeight: 400, color: T.muted }}>/mo</span>
                                </span>
                                <button className="comp-btn-primary comp-btn-tbl" style={{ ...btnPrimary, width: "100%", justifyContent: "center" }}>Start free trial</button>
                            </div>
                            <div style={{ padding: "28px 24px", textAlign: "center", borderTop: `1px solid ${T.border}`, borderLeft: `1px solid ${T.border}` }}>
                                <span style={{ display: "block", fontSize: "11px", color: T.disabled, marginBottom: "4px" }}>Starting at</span>
                                <span style={{ display: "block", fontSize: "36px", fontWeight: 500, letterSpacing: "-0.04em", fontVariantNumeric: "tabular-nums", color: T.muted, marginBottom: "16px" }}>
                                    $15<span style={{ fontSize: "14px", fontWeight: 400, color: T.muted }}>/seat/mo</span>
                                </span>
                                <button className="comp-btn-ghost comp-btn-tbl-ghost" style={{ ...btnGhost, width: "100%", justifyContent: "center" }}>Learn more</button>
                            </div>
                        </div>
                        </div>{/* /comp-table-inner */}
                    </div>{/* /comp-table-wrap */}
                </div>
            </section>

            {/* ══ COST CALCULATOR ═══════════════════════════════════════ */}
            <section style={section}>
                <div className="comp-wrap" style={wrap}>
                    <p style={eyebrow}>Cost Calculator</p>
                    <h2 style={{ ...sectionH2, marginBottom: "40px" }}>See what you'd actually pay.</h2>
                    <div className="comp-calc-card" style={{
                        background: T.surface, border: `1px solid ${T.border}`,
                        borderRadius: "10px", padding: isMobile ? "20px" : "44px 48px",
                    }}>
                        <div className="comp-calc-grid" style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "16px" : "56px", alignItems: "start" }}>
                            {/* Left - sliders */}
                            <div>
                                <p style={{ fontSize: "clamp(20px, 2.2vw, 26px)", fontWeight: 400, letterSpacing: "-0.03em", marginBottom: "6px", color: T.text }}>
                                    Your usage, your bill.
                                </p>
                                <p style={{ fontSize: "14px", color: T.muted, marginBottom: "32px" }}>
                                    Move the sliders. We'll show you both invoices.
                                </p>
                                <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
                                    {/* Engineers slider */}
                                    <div>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                                            <span style={{ fontSize: "13px", color: T.text }}>Engineers on your team</span>
                                            <span style={{ fontSize: "13px", fontWeight: 500, color: T.accent, fontVariantNumeric: "tabular-nums" }}>{engineers}</span>
                                        </div>
                                        <input
                                            type="range" min="1" max="50" value={engineers}
                                            className="comp-range"
                                            onChange={e => setEngineers(Number(e.target.value))}
                                            style={{ width: "100%" }}
                                        />
                                    </div>
                                    {/* Logs slider */}
                                    <div>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                                            <span style={{ fontSize: "13px", color: T.text }}>Logs ingested per day</span>
                                            <span style={{ fontSize: "13px", fontWeight: 500, color: T.accent, fontVariantNumeric: "tabular-nums" }}>{fmtLogs(logsK)}</span>
                                        </div>
                                        <input
                                            type="range" min="1" max="500" value={logsK}
                                            className="comp-range"
                                            onChange={e => setLogsK(Number(e.target.value))}
                                            style={{ width: "100%" }}
                                        />
                                    </div>
                                </div>
                                <p style={{ marginTop: "24px", fontSize: "11px", color: T.disabled, lineHeight: 1.6 }}>
                                    Estimates based on {competitorName}'s public list pricing for Infrastructure + Log Management.
                                    {productName} pricing reflects per-GB ingestion. Actual bills vary by configuration.
                                </p>
                            </div>
                            {/* Right - summary card */}
                            <div className="comp-calc-right" style={{
                                background: T.bg, border: `1px solid ${T.border}`,
                                borderLeft: isMobile ? "none" : undefined,
                                borderTop: isMobile ? `1px solid ${T.border}` : undefined,
                                borderRadius: "6px", padding: isMobile ? "16px" : "22px 20px",
                            }}>
                                <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.10em", textTransform: "uppercase", color: T.disabled, marginBottom: "12px" }}>
                                    Monthly estimate
                                </p>
                                <div style={{ borderTop: `1px solid ${T.border}`, padding: "9px 0", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "13px", color: T.muted }}>
                                    <span>{productName}</span>
                                    <span style={{ color: T.accent, fontVariantNumeric: "tabular-nums" }}>{fmt$(veloCost)}</span>
                                </div>
                                <div style={{ borderTop: `1px solid ${T.border}`, padding: "9px 0", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "13px", color: T.muted }}>
                                    <span>{competitorName}</span>
                                    <span style={{ fontVariantNumeric: "tabular-nums" }}>{fmt$(ddCost)}</span>
                                </div>
                                <div style={{ marginTop: "14px", paddingTop: "14px", borderTop: `1px solid ${T.borderStr}`, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                                    <span style={{ fontSize: "11px", fontWeight: 500, color: T.disabled, letterSpacing: "0.08em", textTransform: "uppercase" }}>You save</span>
                                    <span style={{ fontSize: "30px", fontWeight: 500, letterSpacing: "-0.04em", fontVariantNumeric: "tabular-nums", color: T.accent }}>
                                        {fmt$(savings)}<span style={{ fontSize: "12px", fontWeight: 400, color: T.muted }}>/mo</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ MIGRATION STORY ══════════════════════════════════════ */}
            <section style={section}>
                <div className="comp-wrap" style={wrap}>
                    <p style={eyebrow}>Migration</p>
                    <h2 style={sectionH2}>Why teams switch.</h2>

                    {/* 3-step grid */}
                    <div className="comp-mig-grid" style={{
                        display: "grid", gridTemplateColumns: isTablet ? "1fr" : "repeat(3,1fr)",
                        gap: "1px", background: T.border,
                        border: `1px solid ${T.border}`, borderRadius: "10px",
                        overflow: "hidden", marginBottom: "40px",
                    }}>
                        {[
                            {
                                num: "01",
                                title: "Export your Datadog dashboards",
                                body: `Use ${competitorName}'s export API to pull your dashboard definitions as JSON. ${productName}'s import tool reads the same format - your dashboards come across in minutes, not days.`,
                                code: null,
                            },
                            {
                                num: "02",
                                title: `Connect your log pipeline in 15 minutes`,
                                body: "Point your existing log shipper at Velo's endpoint. One config change.",
                                code: `# fluent-bit.conf\n[OUTPUT]\n  Name  http\n  Host  ingest.velo.dev\n  Port  443\n  URI   /v1/logs\n  tls   On`,
                            },
                            {
                                num: "03",
                                title: "Run both in parallel during your first week",
                                body: `Keep ${competitorName} running for your first week. ${productName} runs alongside it so you can validate parity before cancelling. Most teams see identical coverage within 24 hours.`,
                                code: null,
                            },
                        ].map((step, i) => (
                            <div key={i} className="comp-mig-card" style={{ background: T.surface, padding: isMobile ? "20px" : "36px 32px" }}>
                                <span style={{ display: "block", fontSize: "11px", fontWeight: 600, color: T.accent, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "14px" }}>
                                    Step {step.num}
                                </span>
                                <h3 style={{ fontSize: "15px", fontWeight: 500, letterSpacing: "-0.01em", marginBottom: "10px", color: T.text }}>
                                    {step.title}
                                </h3>
                                <p style={{ fontSize: "13px", color: T.muted, lineHeight: 1.65, marginBottom: step.code ? "16px" : 0 }}>
                                    {step.body}
                                </p>
                                {step.code && (
                                    <div style={{
                                        background: T.bg, border: `1px solid ${T.border}`,
                                        borderRadius: "6px", padding: "14px 16px",
                                        fontFamily: "'Geist Mono', monospace",
                                        fontSize: "12px", lineHeight: 1.75,
                                        overflow: "auto", whiteSpace: "pre",
                                    }}>
                                        {step.code.split("\n").map((line, li) => (
                                            <div key={li} style={{
                                                color: line.startsWith("#") ? T.disabled
                                                    : line.includes("=") ? T.muted
                                                    : T.accent
                                            }}>
                                                {line}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Testimonial - open layout, no card */}
                    <div style={{ maxWidth: "680px" }}>
                        <p style={{ fontSize: "18px", fontWeight: 400, letterSpacing: "-0.01em", lineHeight: 1.60, color: T.text, marginBottom: "24px" }}>
                            "We cut our observability bill from $4,200 to{" "}
                            <span style={{ color: T.accent }}>$890/month</span>{" "}
                            in week one. The migration took an afternoon - mostly waiting for dashboards to populate."
                        </p>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            <div style={{
                                width: "36px", height: "36px", borderRadius: "50%", flexShrink: 0,
                                background: accentColor, color: "#000",
                                fontSize: "11px", fontWeight: 600, letterSpacing: "0.04em",
                                display: "flex", alignItems: "center", justifyContent: "center",
                            }}>
                                MC
                            </div>
                            <div>
                                <p style={{ fontSize: "13px", fontWeight: 500, color: T.text }}>Marcus Chen</p>
                                <p style={{ fontSize: "12px", color: T.muted, marginTop: "1px" }}>VP Engineering, Ferron</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ COMMON QUESTIONS ═════════════════════════════════════ */}
            <section style={section}>
                <div className="comp-wrap" style={wrap}>
                    <p style={eyebrow}>Common questions</p>
                    <h2 style={sectionH2}>About switching.</h2>
                    <div style={{ borderTop: `1px solid ${T.border}` }}>
                        {[
                            {
                                q: `"${competitorName} has better APM."`,
                                a: `Honestly - yes, for full APM ${competitorName} is more mature. ${productName} is logging-first: best-in-class log search, alerting, and dashboards. For distributed tracing we pair cleanly with Grafana Tempo (free, open source). Most teams doing 90% of their debugging in logs find ${productName} covers them completely.`,
                            },
                            {
                                q: `"Switching will take months."`,
                                a: `The teams we've migrated average 3-5 days, not months. Our migration playbook is a step-by-step checklist. We run both systems in parallel during your first week so there's zero risk to production while you validate coverage.`,
                            },
                            {
                                q: `"My team knows ${competitorName}'s query language."`,
                                a: `${productName}'s query language is Lucene-compatible. If your engineers know Elasticsearch, they already know ${productName}. Our docs include a direct ${competitorName} -> ${productName} query translation guide - most engineers are writing fluently within a day.`,
                            },
                        ].map((item, i) => (
                            <div key={i} className="comp-obj-row" style={{
                                display: "grid", gridTemplateColumns: isMobile ? "1fr" : "2fr 3fr",
                                gap: isMobile ? "12px" : "48px", alignItems: "start",
                                padding: "36px 0",
                                borderBottom: `1px solid ${T.border}`,
                            }}>
                                <p style={{ fontSize: "15px", fontWeight: 500, letterSpacing: "-0.01em", lineHeight: 1.45, color: T.text }}>
                                    {item.q}
                                </p>
                                <p style={{ fontSize: "14px", color: T.muted, lineHeight: 1.70 }}>
                                    {item.a}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ CTA BANNER ═══════════════════════════════════════════ */}
            <section style={{ padding: "88px 0" }}>
                <div className="comp-wrap" style={{ ...wrap, textAlign: "center" }}>
                    <h2 style={{ fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 400, letterSpacing: "-0.03em", lineHeight: 1.12, marginBottom: "16px", color: T.text }}>
                        Stop paying {competitorName} prices.
                    </h2>
                    <p style={{ fontSize: "15px", color: T.muted, maxWidth: "440px", margin: "0 auto", lineHeight: 1.6 }}>
                        14-day free trial. Migrate in hours. Cancel {competitorName} next cycle.
                    </p>
                    <div className="comp-cta-btns" style={{ display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "stretch" : "center", justifyContent: "center", gap: isMobile ? "10px" : "12px", marginTop: "36px" }}>
                        <button className="comp-btn-primary" style={btnPrimary}>Start free trial</button>
                        <button className="comp-btn-ghost" style={btnGhost}>Read migration guide</button>
                    </div>
                    <p style={{ marginTop: "14px", fontSize: "12px", color: T.disabled }}>No credit card required</p>
                </div>
            </section>

            {/* ══ FOOTER ═══════════════════════════════════════════════ */}
            <footer style={{ borderTop: `1px solid ${T.border}`, padding: "28px 0" }}>
                <div className="comp-footer-grid" style={{
                    maxWidth: MAX_W, margin: "0 auto",
                    padding: isMobile ? "0 20px" : `0 ${PAD_X}`,
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : "auto 1fr auto",
                    alignItems: "center",
                    gap: isMobile ? "12px" : "24px",
                    textAlign: isMobile ? "center" : undefined,
                }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: isMobile ? "center" : undefined }}>
                        <LogoSVG size={16} />
                        <span style={{ fontSize: "13px", fontWeight: 500, color: T.muted }}>{productName}</span>
                    </div>
                    <span style={{ fontSize: "12px", color: T.disabled, textAlign: "center" }}>
                        {"\u00A9"} 2025 {productName}, Inc. All rights reserved.
                    </span>
                    <div className="comp-footer-links" style={{ display: "flex", gap: "20px", justifyContent: isMobile ? "center" : undefined }}>
                        {["Privacy", "Terms", "Docs", "Status"].map(link => (
                            <a key={link} href="#" style={{ fontSize: "12px", color: T.disabled, textDecoration: "none" }}>
                                {link}
                            </a>
                        ))}
                    </div>
                </div>
            </footer>

        </div>
    )
}

// -- Framer Property Controls -----------------------------------------------
addPropertyControls(ComparisonPage, {
    colorMode: {
        type: ControlType.Enum,
        title: "Color Mode",
        options: ["dark", "light"],
        optionTitles: ["Dark", "Light"],
        defaultValue: "dark",
    },
    accentColor: {
        type: ControlType.Color,
        title: "Accent Color",
        defaultValue: "#818CF8",
    },
    productName: {
        type: ControlType.String,
        title: "Product Name",
        defaultValue: "Velo",
        placeholder: "Your product",
    },
    competitorName: {
        type: ControlType.String,
        title: "Competitor Name",
        defaultValue: "Datadog",
        placeholder: "Competitor",
    },
})
