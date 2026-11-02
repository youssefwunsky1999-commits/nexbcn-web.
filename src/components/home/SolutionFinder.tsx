"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";
import { problems, installations, urgencies, type InstallationId, type UrgencyId } from "@/lib/finder";
import { getService } from "@/lib/services";
import { townNames } from "@/lib/zones";
import { callHref, whatsappHref } from "@/lib/contact";
import { site } from "@/lib/site";
import s from "./SolutionFinder.module.css";

const installIcons: Record<InstallationId, IconName> = {
  vivienda: "building", casa: "home", comunidad: "users", negocio: "store", nave: "factory",
};
const urgencyIcons: Record<UrgencyId, IconName> = { ahora: "alert", pronto: "clock", planificando: "doc" };

const steps = ["Problema", "Instalación", "Urgencia", "Localidad"] as const;

export function SolutionFinder() {
  const [step, setStep] = useState(0);
  const [problem, setProblem] = useState<string>();
  const [install, setInstall] = useState<InstallationId>();
  const [urgency, setUrgency] = useState<UrgencyId>();
  const [town, setTown] = useState<string>();
  const [query, setQuery] = useState("");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    headingRef.current?.focus({ preventScroll: true });
  }, [step]);

  const p = problems.find((x) => x.id === problem);
  const service = p ? getService(p.service) : undefined;
  const done = step === 4 && p && install && urgency && town;
  const isUrgent = urgency === "ahora";

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
    if (!q) return townNames;
    return townNames.filter((t) => t.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").includes(q));
  }, [query]);

  const next = () => setStep((v) => Math.min(4, v + 1));
  const reset = () => { setStep(0); setProblem(undefined); setInstall(undefined); setUrgency(undefined); setTown(undefined); setQuery(""); };

  const installLabel = installations.find((i) => i.id === install)?.label;
  const urgencyLabel = urgencies.find((u) => u.id === urgency)?.label;

  const message = p
    ? `Hola NEXBCN. ${isUrgent ? "Es URGENTE. " : ""}Tengo un problema de: ${p.label.toLowerCase()} (${installLabel?.toLowerCase()}) en ${town}. Urgencia: ${urgencyLabel?.toLowerCase()}.`
    : undefined;

  const quoteHref = service
    ? `/presupuesto?${new URLSearchParams({
        servicio: service.slug,
        localidad: town ?? "",
        mensaje: `${p?.label} · ${installLabel} · ${urgencyLabel}`,
      }).toString()}`
    : "/presupuesto";

  return (
    <section className={`section dark ${s.section}`} aria-labelledby="finder-title" id="encuentra-tu-solucion">
      <div className="grid-bg" />
      <div className={s.glow} aria-hidden="true" />
      <div className="container">
        <header className="section-head section-head--center" data-reveal>
          <span className="eyebrow">Asistente</span>
          <h2 id="finder-title" className="h2">Encuentra tu solución</h2>
          <p className="lead">Cuatro preguntas. Menos de 20 segundos. Te decimos qué servicio necesitas y cómo contactar directamente.</p>
        </header>

        <div className={s.panel} data-reveal="scale">
          {/* Progreso */}
          <div className={s.progress} aria-hidden="true">
            {steps.map((label, i) => (
              <button
                key={label}
                type="button"
                tabIndex={-1}
                className={`${s.seg} ${i < step || done ? s.segDone : ""} ${i === step ? s.segActive : ""}`}
                onClick={() => i < step && setStep(i)}
              >
                <span className={s.segBar} />
                <span className={s.segLabel}><span className="mono">0{i + 1}</span> {label}</span>
              </button>
            ))}
          </div>
          <p className="sr-only" aria-live="polite">
            {done ? "Resultado listo" : `Paso ${step + 1} de 4: ${steps[step]}`}
          </p>

          <div className={s.body} key={step}>
            {step === 0 && (
              <fieldset className={s.fieldset}>
                <legend><h3 ref={headingRef} tabIndex={-1} className={s.q}>¿Qué problema tienes?</h3></legend>
                <div className={`${s.options} ${s.options4}`}>
                  {problems.map((x, i) => (
                    <button
                      key={x.id}
                      type="button"
                      aria-pressed={problem === x.id}
                      className={`${s.opt} ${problem === x.id ? s.optOn : ""}`}
                      style={{ ["--d" as string]: i * 35 }}
                      onClick={() => { setProblem(x.id); next(); }}
                    >
                      <span className={s.optIcon}><Icon name={x.icon} size={22} /></span>
                      <span className={s.optLabel}>{x.label}</span>
                      <span className={s.optHint}>{x.hint}</span>
                    </button>
                  ))}
                </div>
              </fieldset>
            )}

            {step === 1 && (
              <fieldset className={s.fieldset}>
                <legend><h3 ref={headingRef} tabIndex={-1} className={s.q}>¿En qué tipo de instalación?</h3></legend>
                <div className={`${s.options} ${s.options5}`}>
                  {installations.map((x, i) => (
                    <button
                      key={x.id}
                      type="button"
                      aria-pressed={install === x.id}
                      className={`${s.opt} ${install === x.id ? s.optOn : ""}`}
                      style={{ ["--d" as string]: i * 35 }}
                      onClick={() => { setInstall(x.id); next(); }}
                    >
                      <span className={s.optIcon}><Icon name={installIcons[x.id]} size={22} /></span>
                      <span className={s.optLabel}>{x.label}</span>
                    </button>
                  ))}
                </div>
              </fieldset>
            )}

            {step === 2 && (
              <fieldset className={s.fieldset}>
                <legend><h3 ref={headingRef} tabIndex={-1} className={s.q}>¿Es una urgencia?</h3></legend>
                <div className={`${s.options} ${s.options3}`}>
                  {urgencies.map((x, i) => (
                    <button
                      key={x.id}
                      type="button"
                      aria-pressed={urgency === x.id}
                      className={`${s.opt} ${urgency === x.id ? s.optOn : ""} ${x.id === "ahora" ? s.optUrgent : ""}`}
                      style={{ ["--d" as string]: i * 35 }}
                      onClick={() => { setUrgency(x.id); next(); }}
                    >
                      <span className={s.optIcon}><Icon name={urgencyIcons[x.id]} size={22} /></span>
                      <span className={s.optLabel}>{x.label}</span>
                      <span className={s.optHint}>{x.hint}</span>
                    </button>
                  ))}
                </div>
              </fieldset>
            )}

            {step === 3 && (
              <fieldset className={s.fieldset}>
                <legend><h3 ref={headingRef} tabIndex={-1} className={s.q}>¿Dónde te encuentras?</h3></legend>
                <label className={s.search}>
                  <Icon name="pin" size={18} />
                  <span className="sr-only">Buscar localidad</span>
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Busca tu localidad…"
                    autoComplete="address-level2"
                    enterKeyHint="search"
                  />
                </label>
                <div className={s.towns} role="group" aria-label="Localidades">
                  {filtered.map((t) => (
                    <button
                      key={t}
                      type="button"
                      aria-pressed={town === t}
                      className={`${s.town} ${town === t ? s.townOn : ""}`}
                      onClick={() => { setTown(t); setQuery(""); next(); }}
                    >
                      {t}
                    </button>
                  ))}
                  {query.trim() && (
                    <button type="button" className={`${s.town} ${s.townOther}`} onClick={() => { setTown(query.trim()); setQuery(""); next(); }}>
                      Otra: “{query.trim()}” <Icon name="arrow" size={14} />
                    </button>
                  )}
                </div>
              </fieldset>
            )}

            {step === 4 && done && service && p && (
              <div className={s.result} style={{ ["--a" as string]: service.accent }}>
                <div className={s.resultMain}>
                  <span className="eyebrow">Tu solución</span>
                  <h3 ref={headingRef} tabIndex={-1} className={s.resultTitle}>
                    {service.name}
                    {isUrgent && <span className={s.urgentTag}><span className="pulse-dot" /> Urgente</span>}
                  </h3>
                  <p className={s.diag}>{p.diagnosis}</p>
                  <dl className={s.summary}>
                    <div><dt>Problema</dt><dd>{p.label}</dd></div>
                    <div><dt>Instalación</dt><dd>{installLabel}</dd></div>
                    <div><dt>Urgencia</dt><dd>{urgencyLabel}</dd></div>
                    <div><dt>Localidad</dt><dd>{town}</dd></div>
                  </dl>
                </div>
                <div className={s.resultCtas}>
                  {isUrgent ? (
                    <>
                      <a href={callHref} className="btn btn--primary btn--lg btn--block" data-magnetic>
                        <Icon name="phone" /> {site.phone ? `Llamar ahora · ${site.phoneDisplay}` : "Contactar ahora"}
                      </a>
                      <a href={whatsappHref(message)} target={site.whatsapp ? "_blank" : undefined} rel="noopener" className="btn btn--urgent btn--lg btn--block">
                        <Icon name="whatsapp" /> Enviar por WhatsApp
                      </a>
                      <Link href="/urgencias" className="link-arrow">Qué hacer mientras llegamos <Icon name="arrow" /></Link>
                    </>
                  ) : (
                    <>
                      <Link href={quoteHref} className="btn btn--primary btn--lg btn--block" data-magnetic>
                        Pedir presupuesto <Icon name="arrow" className="arrow" />
                      </Link>
                      <a href={whatsappHref(message)} target={site.whatsapp ? "_blank" : undefined} rel="noopener" className="btn btn--urgent btn--lg btn--block">
                        <Icon name="whatsapp" /> Consultar por WhatsApp
                      </a>
                      <Link href={`/${service.slug}`} className="link-arrow">Ver servicio de {service.name.toLowerCase()} <Icon name="arrow" /></Link>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className={s.footer}>
            {step > 0 ? (
              <button type="button" className={s.back} onClick={() => setStep((v) => v - 1)}>
                <Icon name="back" size={16} /> Atrás
              </button>
            ) : <span />}
            {step === 4 ? (
              <button type="button" className={s.back} onClick={reset}>Empezar de nuevo</button>
            ) : (
              <span className="mono muted" style={{ fontSize: 12 }}>{step + 1} / 4</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
