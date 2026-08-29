import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import "./license.css";

const API_BASE =
  (import.meta.env.VITE_ORCHA_API_BASE as string | undefined) ||
  "http://localhost:8420";

type Features = {
  tier_name?: string;
  price?: string;
  commercial_use?: boolean;
  max_concurrent_models?: number | null;
  max_queries_per_day?: number | null;
  max_queries_per_month?: number | null;
  max_agents?: number | null;
  mcp_servers?: number | null;
  custom_branding?: boolean;
  support?: string | null;
  sla_uptime?: string | null;
};

type AvailableTier = {
  tier: string;
  name: string;
  price: string;
  commercial_use?: boolean;
  contact_us?: boolean;
};

type LicenseInfo = {
  tier?: string;
  tier_name?: string;
  price?: string;
  licensee?: string;
  is_valid?: boolean;
  is_expired?: boolean;
  days_until_expiry?: number | null;
  expires_at?: string | null;
  activations?: number | null;
  max_activations?: number | null;
  features?: Features;
  available_tiers?: AvailableTier[];
};

const FALLBACK_TIERS: AvailableTier[] = [
  { tier: "OPEN", name: "ORCHA Open", price: "Free", commercial_use: false },
  { tier: "PRO", name: "ORCHA Pro", price: "$100", commercial_use: true },
  { tier: "BUSINESS", name: "ORCHA Business", price: "Contact Us", commercial_use: true, contact_us: true },
  { tier: "ENTERPRISE", name: "ORCHA Enterprise", price: "Contact Us", commercial_use: true, contact_us: true },
  { tier: "OEM", name: "OEM / Embedded License", price: "Contact Us", commercial_use: true, contact_us: true },
];

const TIER_CONTACT: Record<string, string> = {
  BUSINESS: "no-reply@localhousellm.com",
  ENTERPRISE: "no-reply@localhousellm.com",
  OEM: "no-reply@localhousellm.com",
};

const TIER_COLOR: Record<string, string> = {
  OPEN: "#6b6b8a",
  PRO: "#7c6cff",
  BUSINESS: "#60a5fa",
  ENTERPRISE: "#34d399",
  OEM: "#fb923c",
};

const FEATURE_ROWS: { key: keyof Features; label: string }[] = [
  { key: "max_concurrent_models", label: "Max concurrent models" },
  { key: "max_queries_per_day", label: "Max queries / day" },
  { key: "max_queries_per_month", label: "Max queries / month" },
  { key: "max_agents", label: "Max agents" },
  { key: "mcp_servers", label: "MCP servers" },
  { key: "commercial_use", label: "Commercial use" },
  { key: "custom_branding", label: "Custom branding" },
  { key: "support", label: "Support level" },
  { key: "sla_uptime", label: "SLA uptime" },
];

function formatValue(v: unknown) {
  if (v === true) return "Included";
  if (v === false || v === null || v === undefined) return "—";
  if (typeof v === "number") return v.toLocaleString();
  return String(v);
}

function isEnabled(v: unknown) {
  return !(v === false || v === null || v === undefined || v === "" || v === 0);
}

export default function OrchaLicense() {
  const [key, setKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<LicenseInfo | null>(null);

  useEffect(() => {
    document.documentElement.classList.add("orcha-scope-root");
    return () => document.documentElement.classList.remove("orcha-scope-root");
  }, []);

  const tiers = info?.available_tiers?.length ? info.available_tiers : FALLBACK_TIERS;
  const features = useMemo(() => info?.features ?? {}, [info]);

  async function check(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = key.trim();
    if (!trimmed) {
      setError("Enter your license key to continue.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const activateRes = await fetch(`${API_BASE}/v1/admin/license/activate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: trimmed }),
      });
      const activateBody = await activateRes.json().catch(() => ({}));
      if (!activateRes.ok) {
        throw new Error(
          activateBody?.detail || activateBody?.error || `License check failed (${activateRes.status}).`
        );
      }

      let detail: LicenseInfo = activateBody as LicenseInfo;
      const statusRes = await fetch(`${API_BASE}/v1/admin/license`);
      if (statusRes.ok) {
        const statusBody = (await statusRes.json().catch(() => ({}))) as LicenseInfo;
        detail = { ...detail, ...statusBody };
      }
      setInfo(detail);
    } catch (err) {
      setInfo(null);
      setError(
        err instanceof Error
          ? `${err.message} Make sure your local Orcha server is running at ${API_BASE}.`
          : "Unable to check that license right now."
      );
    } finally {
      setLoading(false);
    }
  }

  const tier = (info?.tier || "").toUpperCase();
  const active = info ? info.is_valid !== false && info.is_expired !== true : false;

  return (
    <div className="orcha-page">
      <Helmet>
        <title>Orcha License Status | Check Your Orcha License</title>
        <meta
          name="description"
          content="Check and manage your Orcha license: tier, status, expiry, activations, and included features."
        />
        <meta name="robots" content="noindex,follow" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300..800&family=JetBrains+Mono:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      <div className="orcha-orbs" aria-hidden="true">
        <span className="orb orb-purple" />
        <span className="orb orb-green" />
        <span className="orb orb-blue" />
      </div>

      <main className="orcha-shell">
        <header className="orcha-hero">
          <div className="orcha-logo" aria-hidden="true">O</div>
          <h1 className="orcha-title">Orcha License</h1>
          <p className="orcha-sub">Check and manage your Orcha license</p>
        </header>

        <section className="orcha-card orcha-lookup">
          <label className="orcha-label" htmlFor="license-key">
            License key
          </label>
          <form className="orcha-form" onSubmit={check}>
            <input
              id="license-key"
              className="orcha-input"
              placeholder="ORCHA-PRO-XXXX-XXXX-XXXX"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              autoComplete="off"
              spellCheck={false}
            />
            <button className="orcha-btn" type="submit" disabled={loading}>
              {loading ? "Checking…" : "Check Status"}
            </button>
          </form>
          <p className="orcha-hint">
            Keys are verified against your Orcha server at <code>{API_BASE}</code>
          </p>
          {error && <p className="orcha-error">{error}</p>}
        </section>

        {info && (
          <>
            <section className="orcha-card orcha-status">
              <div className="orcha-status-head">
                <span
                  className="orcha-badge"
                  style={{
                    color: TIER_COLOR[tier] || "#e4e4f0",
                    borderColor: `${TIER_COLOR[tier] || "#e4e4f0"}55`,
                    background: `${TIER_COLOR[tier] || "#e4e4f0"}14`,
                  }}
                >
                  {tier || "UNKNOWN"}
                </span>
                <span className={`orcha-health ${active ? "is-active" : "is-inactive"}`}>
                  <span className="dot" />
                  {active ? "Active" : "Inactive"}
                </span>
              </div>

              <h2 className="orcha-tier-name">{info.tier_name || "Orcha License"}</h2>

              <div className="orcha-stats">
                <div className="orcha-stat">
                  <span className="stat-label">Licensee</span>
                  <span className="stat-value">{info.licensee || "—"}</span>
                </div>
                <div className="orcha-stat">
                  <span className="stat-label">Expiry</span>
                  <span className="stat-value">
                    {info.expires_at
                      ? new Date(info.expires_at).toLocaleDateString()
                      : info.days_until_expiry != null
                        ? `in ${info.days_until_expiry} days`
                        : "Perpetual"}
                  </span>
                </div>
                <div className="orcha-stat">
                  <span className="stat-label">Price paid</span>
                  <span className="stat-value">{info.price || features.price || "—"}</span>
                </div>
                <div className="orcha-stat">
                  <span className="stat-label">Activations</span>
                  <span className="stat-value mono">
                    {info.activations ?? 0}
                    {info.max_activations != null ? ` / ${info.max_activations}` : ""}
                  </span>
                </div>
              </div>
            </section>

            <section className="orcha-card">
              <h2 className="orcha-h2">Included features</h2>
              <div className="orcha-features">
                {FEATURE_ROWS.map((row) => {
                  const value = features[row.key];
                  const on = isEnabled(value);
                  return (
                    <div className={`orcha-feature ${on ? "on" : "off"}`} key={row.key}>
                      <span className="feature-mark" aria-hidden="true">{on ? "✓" : "–"}</span>
                      <span className="feature-text">
                        <span className="feature-label">{row.label}</span>
                        <span className="feature-value mono">{formatValue(value)}</span>
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>
          </>
        )}

        <section className="orcha-card">
          <h2 className="orcha-h2">Tier comparison</h2>
          <div className="orcha-table-wrap">
            <table className="orcha-table">
              <thead>
                <tr>
                  <th>Tier</th>
                  <th>Price</th>
                  <th>Commercial use</th>
                  <th>Get it</th>
                </tr>
              </thead>
              <tbody>
                {tiers.map((t) => {
                  const code = t.tier.toUpperCase();
                  const contact = TIER_CONTACT[code];
                  return (
                    <tr key={code} className={code === tier ? "is-current" : ""}>
                      <td>
                        <span className="tier-dot" style={{ background: TIER_COLOR[code] || "#6b6b8a" }} />
                        {t.name}
                        {code === tier && <span className="tier-you">your tier</span>}
                      </td>
                      <td className="mono">{t.price}</td>
                      <td>{t.commercial_use ? "Yes" : "No"}</td>
                      <td>
                        {contact ? (
                          <a className="orcha-link" href={`mailto:${contact}`}>
                            Contact Us
                          </a>
                        ) : (
                          <span className="orcha-dim">Self-serve</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        <section className="orcha-card orcha-support">
          <div>
            <h2 className="orcha-h2">Need help?</h2>
            <p className="orcha-dim">
              Licensing, activations, or billing questions — our team replies within one business day.
            </p>
          </div>
          <div className="orcha-support-actions">
            <a className="orcha-btn ghost" href="mailto:no-reply@localhousellm.com">
              no-reply@localhousellm.com
            </a>
            <a className="orcha-btn ghost" href="/docs">
              Documentation
            </a>
          </div>
        </section>

        <footer className="orcha-footer">© 2026 LocalHouseLLM · Orcha</footer>
      </main>
    </div>
  );
}
