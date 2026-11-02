"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { services } from "@/lib/services";
import { townNames } from "@/lib/zones";
import { QUOTE_LIMITS, urgencyOptions, contactPrefs } from "@/lib/quote";
import { whatsappHref, callHref } from "@/lib/contact";
import { site } from "@/lib/site";
import s from "./QuoteForm.module.css";

type Photo = { id: string; file: File; url: string };
type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "ok" }
  | { kind: "not_configured" }
  | { kind: "error"; message: string };

/** Redimensiona y comprime en el navegador: subidas rápidas incluso con 4G. */
async function compress(file: File): Promise<File> {
  if (!file.type.startsWith("image/") || file.type === "image/heic" || file.type === "image/heif") return file;
  try {
    const bmp = await createImageBitmap(file);
    const max = 1600;
    const scale = Math.min(1, max / Math.max(bmp.width, bmp.height));
    const w = Math.round(bmp.width * scale), h = Math.round(bmp.height * scale);
    const canvas = document.createElement("canvas");
    canvas.width = w; canvas.height = h;
    canvas.getContext("2d")?.drawImage(bmp, 0, 0, w, h);
    bmp.close?.();
    const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/jpeg", 0.82));
    if (!blob || blob.size >= file.size) return file;
    return new File([blob], file.name.replace(/\.\w+$/, "") + ".jpg", { type: "image/jpeg" });
  } catch {
    return file;
  }
}

export function QuoteForm() {
  const params = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [service, setService] = useState(params.get("servicio") ?? "");
  const initialTown = params.get("localidad") ?? "";
  const [town, setTown] = useState(townNames.includes(initialTown) ? initialTown : "");
  const [useOther, setUseOther] = useState(Boolean(initialTown) && !townNames.includes(initialTown));
  const [otherTown, setOtherTown] = useState(townNames.includes(initialTown) ? "" : initialTown);
  const [message, setMessage] = useState(params.get("mensaje") ? `${params.get("mensaje")}\n\n` : "");
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [dragging, setDragging] = useState(false);
  const [startedAt] = useState(() => Date.now());

  useEffect(() => () => photos.forEach((p) => URL.revokeObjectURL(p.url)), [photos]);

  const townValue = useOther ? otherTown.trim() : town;

  async function addFiles(list: FileList | File[]) {
    const incoming = Array.from(list).filter((f) => (QUOTE_LIMITS.acceptedTypes as readonly string[]).includes(f.type) || f.type.startsWith("image/"));
    const room = QUOTE_LIMITS.maxPhotos - photos.length;
    if (room <= 0) { setErrors((e) => ({ ...e, fotos: `Máximo ${QUOTE_LIMITS.maxPhotos} fotos.` })); return; }
    const compressed = await Promise.all(incoming.slice(0, room).map(compress));
    const tooBig = compressed.filter((f) => f.size > QUOTE_LIMITS.maxPhotoBytes);
    const ok = compressed.filter((f) => f.size <= QUOTE_LIMITS.maxPhotoBytes);
    setPhotos((prev) => [...prev, ...ok.map((file) => ({ id: crypto.randomUUID(), file, url: URL.createObjectURL(file) }))]);
    setErrors((e) => {
      const n = { ...e };
      if (tooBig.length) n.fotos = "Alguna foto es demasiado grande y no se ha añadido.";
      else if (incoming.length > room) n.fotos = `Solo se han añadido ${room}. Máximo ${QUOTE_LIMITS.maxPhotos} fotos.`;
      else delete n.fotos;
      return n;
    });
  }

  function removePhoto(id: string) {
    setPhotos((prev) => {
      const p = prev.find((x) => x.id === id);
      if (p) URL.revokeObjectURL(p.url);
      return prev.filter((x) => x.id !== id);
    });
  }

  function validate(fd: FormData) {
    const e: Record<string, string> = {};
    if (!fd.get("servicio")) e.servicio = "Elige un servicio.";
    if (!fd.get("localidad")) e.localidad = "Indica tu localidad.";
    const msg = String(fd.get("mensaje") ?? "").trim();
    if (msg.length < QUOTE_LIMITS.minMessage) e.mensaje = "Cuéntanos un poco más (mínimo 15 caracteres).";
    if (!String(fd.get("nombre") ?? "").trim()) e.nombre = "Indica tu nombre.";
    const phone = String(fd.get("telefono") ?? "").replace(/[\s.-]/g, "");
    if (!/^(\+?\d{9,15})$/.test(phone)) e.telefono = "Introduce un teléfono válido.";
    const email = String(fd.get("email") ?? "").trim();
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Email no válido.";
    if (!fd.get("privacidad")) e.privacidad = "Necesitamos tu consentimiento para responderte.";
    const total = photos.reduce((a, p) => a + p.file.size, 0);
    if (total > QUOTE_LIMITS.maxTotalBytes) e.fotos = "Las fotos superan el tamaño total permitido. Quita alguna.";
    return e;
  }

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.currentTarget;
    const fd = new FormData(form);
    fd.delete("fotos");
    photos.forEach((p) => fd.append("fotos", p.file, p.file.name));
    fd.set("t", String(startedAt));

    const e = validate(fd);
    setErrors(e);
    if (Object.keys(e).length) {
      const first = form.querySelector<HTMLElement>(`[name="${Object.keys(e)[0]}"]`);
      first?.focus();
      return;
    }

    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/presupuesto", { method: "POST", body: fd });
      const data = (await res.json().catch(() => ({}))) as { error?: string; fields?: Record<string, string> };
      if (res.ok) {
        setStatus({ kind: "ok" });
        form.reset();
        setPhotos([]);
        setMessage("");
        return;
      }
      if (data.error === "not_configured") return setStatus({ kind: "not_configured" });
      if (data.fields) setErrors(data.fields);
      setStatus({ kind: "error", message: data.error === "rate_limited" ? "Has enviado varias solicitudes seguidas. Espera unos minutos o escríbenos por WhatsApp." : "Revisa los campos marcados e inténtalo de nuevo." });
    } catch {
      setStatus({ kind: "error", message: "No hemos podido enviar la solicitud. Comprueba tu conexión e inténtalo de nuevo." });
    }
  }

  const fallbackMessage = `Hola NEXBCN, quiero pedir presupuesto.\nServicio: ${services.find((x) => x.slug === service)?.name ?? "-"}\nLocalidad: ${townValue || "-"}\n${message.trim()}`;

  if (status.kind === "ok") {
    return (
      <div className={s.done} role="status">
        <span className={s.doneIcon}><Icon name="check" size={30} strokeWidth={2} /></span>
        <h2 className="h3">Solicitud recibida</h2>
        <p className="muted">Hemos recibido tu solicitud. Te contactaremos lo antes posible por el medio que has indicado.</p>
        <button className="btn btn--ghost" onClick={() => setStatus({ kind: "idle" })}>Enviar otra solicitud</button>
      </div>
    );
  }

  const err = (k: string) => (errors[k] ? <p className="field-error" id={`${k}-err`}>{errors[k]}</p> : null);
  const aria = (k: string) => ({ "aria-invalid": Boolean(errors[k]) || undefined, "aria-describedby": errors[k] ? `${k}-err` : undefined });

  return (
    <form
      ref={formRef}
      className={s.form}
      onSubmit={onSubmit}
      onInput={(e) => {
        // Al corregir un campo, su error desaparece al momento
        const name = (e.target as HTMLInputElement).name;
        if (name && errors[name]) setErrors(({ [name]: _removed, ...rest }) => rest);
      }}
      noValidate
      encType="multipart/form-data"
    >
      {/* 1. Servicio */}
      <fieldset className={s.group}>
        <legend className={s.legend}><span className="mono">01</span> ¿Qué necesitas?</legend>
        <div className={s.services} role="radiogroup" aria-label="Tipo de servicio">
          {services.map((x) => (
            <label key={x.slug} className={`${s.pill} ${service === x.slug ? s.pillOn : ""}`}>
              <input type="radio" name="servicio" value={x.slug} checked={service === x.slug} onChange={() => setService(x.slug)} {...aria("servicio")} />
              {x.name}
            </label>
          ))}
          <label className={`${s.pill} ${service === "urgencia" ? s.pillOn : ""}`}>
            <input type="radio" name="servicio" value="urgencia" checked={service === "urgencia"} onChange={() => setService("urgencia")} />
            <span className="pulse-dot" /> Urgencia
          </label>
        </div>
        {err("servicio")}
      </fieldset>

      {/* 2. Problema */}
      <fieldset className={s.group}>
        <legend className={s.legend}><span className="mono">02</span> Cuéntanos el problema</legend>
        <div className="field">
          <label htmlFor="mensaje">Descripción</label>
          <textarea id="mensaje" name="mensaje" className="textarea" rows={5} maxLength={QUOTE_LIMITS.maxMessage}
            placeholder="Ej.: El termo de 80 L pierde agua por abajo desde ayer. Es un piso en un 3º sin ascensor."
            value={message} onChange={(e) => setMessage(e.target.value)} {...aria("mensaje")} />
          <div className={s.counter}>{message.length}/{QUOTE_LIMITS.maxMessage}</div>
          {err("mensaje")}
        </div>

        <div className="field">
          <span className="label">Fotografías <span className="muted">(opcional, hasta {QUOTE_LIMITS.maxPhotos})</span></span>
          <div
            className={`${s.drop} ${dragging ? s.dropOn : ""}`}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files); }}
          >
            <input ref={fileRef} id="fotos" name="fotos" type="file" accept="image/*" multiple className="sr-only"
              onChange={(e) => { if (e.target.files) addFiles(e.target.files); e.target.value = ""; }} />
            <label htmlFor="fotos" className={s.dropLabel}>
              <span className={s.dropIcon}><Icon name="camera" size={22} /></span>
              <span><strong>Añadir fotos</strong> <span className="muted">o arrástralas aquí</span></span>
              <span className={s.dropHint}>Las fotos se optimizan automáticamente antes de enviarse.</span>
            </label>
            {photos.length > 0 && (
              <ul role="list" className={s.thumbs}>
                {photos.map((p) => (
                  <li key={p.id} className={s.thumb}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.url} alt={`Foto adjunta: ${p.file.name}`} />
                    <button type="button" onClick={() => removePhoto(p.id)} aria-label={`Quitar ${p.file.name}`}><Icon name="close" size={14} strokeWidth={2} /></button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {err("fotos")}
        </div>
      </fieldset>

      {/* 3. Ubicación y plazo */}
      <fieldset className={s.group}>
        <legend className={s.legend}><span className="mono">03</span> ¿Dónde y cuándo?</legend>
        <div className={s.row}>
          <div className="field">
            <label htmlFor="localidad">Localidad</label>
            <select
              id="localidad"
              name={useOther ? undefined : "localidad"}
              className="select"
              value={useOther ? "__otra" : town}
              onChange={(e) => {
                if (e.target.value === "__otra") setUseOther(true);
                else { setUseOther(false); setTown(e.target.value); }
              }}
              {...aria("localidad")}
            >
              <option value="">Selecciona…</option>
              {townNames.map((t) => <option key={t} value={t}>{t}</option>)}
              <option value="__otra">Otra localidad</option>
            </select>
            {useOther && (
              <input name="localidad" className="input" style={{ marginTop: 8 }} placeholder="Escribe tu localidad" value={otherTown} onChange={(e) => setOtherTown(e.target.value)} autoComplete="address-level2" aria-label="Otra localidad" maxLength={80} />
            )}
            {err("localidad")}
          </div>
          <div className="field">
            <span className="label">Urgencia</span>
            <div className={s.segmented} role="radiogroup" aria-label="Urgencia">
              {urgencyOptions.map((u, i) => (
                <label key={u.id}>
                  <input type="radio" name="urgencia" value={u.id} defaultChecked={service === "urgencia" ? u.id === "urgente" : i === 1} />
                  <span>{u.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </fieldset>

      {/* 4. Contacto */}
      <fieldset className={s.group}>
        <legend className={s.legend}><span className="mono">04</span> Tus datos</legend>
        <div className={s.row}>
          <div className="field">
            <label htmlFor="nombre">Nombre</label>
            <input id="nombre" name="nombre" className="input" autoComplete="name" maxLength={120} {...aria("nombre")} />
            {err("nombre")}
          </div>
          <div className="field">
            <label htmlFor="telefono">Teléfono</label>
            <input id="telefono" name="telefono" className="input" type="tel" inputMode="tel" autoComplete="tel" maxLength={20} {...aria("telefono")} />
            {err("telefono")}
          </div>
        </div>
        <div className={s.row}>
          <div className="field">
            <label htmlFor="email">Email <span className="muted">(opcional)</span></label>
            <input id="email" name="email" className="input" type="email" inputMode="email" autoComplete="email" maxLength={160} {...aria("email")} />
            {err("email")}
          </div>
          <div className="field">
            <span className="label">Prefiero que me contactéis por</span>
            <div className={s.segmented} role="radiogroup" aria-label="Preferencia de contacto">
              {contactPrefs.map((c, i) => (
                <label key={c.id}>
                  <input type="radio" name="contacto" value={c.id} defaultChecked={i === 0} />
                  <span>{c.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Honeypot anti-spam: invisible para personas */}
        <div className="hp" aria-hidden="true">
          <label htmlFor="website">No rellenar</label>
          <input id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>

        <label className={s.consent}>
          <input type="checkbox" name="privacidad" value="1" {...aria("privacidad")} />
          <span>
            He leído y acepto la <a href="/politica-de-privacidad" target="_blank">política de privacidad</a>. Usaremos tus datos únicamente para responder a esta solicitud.
          </span>
        </label>
        {err("privacidad")}
      </fieldset>

      {status.kind === "not_configured" && (
        <div className={s.notice} role="alert">
          <Icon name="alert" size={20} />
          <div>
            <strong>El envío online todavía no está activado.</strong>
            <p>No hemos podido registrar tu solicitud por este medio. Envíanosla directamente y te atendemos igual:</p>
            <div className={s.noticeActions}>
              <a href={whatsappHref(fallbackMessage)} target={site.whatsapp ? "_blank" : undefined} rel="noopener" className="btn btn--primary btn--sm"><Icon name="whatsapp" /> Enviar por WhatsApp</a>
              <a href={callHref} className="btn btn--ghost btn--sm"><Icon name="phone" /> Llamar</a>
            </div>
          </div>
        </div>
      )}
      {status.kind === "error" && <div className={`${s.notice} ${s.noticeErr}`} role="alert"><Icon name="alert" size={20} /><p>{status.message}</p></div>}

      <button type="submit" className="btn btn--primary btn--lg btn--block" disabled={status.kind === "sending"} data-magnetic>
        {status.kind === "sending" ? <><span className={s.spinner} /> Enviando…</> : <>Enviar solicitud <Icon name="arrow" className="arrow" /></>}
      </button>
    </form>
  );
}
