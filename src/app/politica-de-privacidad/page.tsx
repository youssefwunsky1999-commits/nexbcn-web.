import { LegalPage } from "@/components/sections/LegalPage";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({ title: "Política de privacidad", description: "Información sobre el tratamiento de datos personales en NEXBCN conforme al RGPD y la LOPDGDD.", path: "/politica-de-privacidad" });

export default function Page() {
  return (
    <LegalPage title="Política de privacidad" updated="[FECHA]" path="/politica-de-privacidad">
      <h2>1. Responsable del tratamiento</h2>
      <ul>
        <li>Responsable: <span className="placeholder">[RAZÓN SOCIAL / NOMBRE DEL TITULAR]</span></li>
        <li>NIF/CIF: <span className="placeholder">[NIF]</span></li>
        <li>Dirección: <span className="placeholder">[DIRECCIÓN COMPLETA]</span></li>
        <li>Contacto: {site.email ?? <span className="placeholder">[EMAIL DE PRIVACIDAD]</span>}</li>
      </ul>
      <h2>2. Qué datos tratamos</h2>
      <p>Los datos que nos facilitas a través del formulario de presupuesto o contacto: nombre, teléfono, email (opcional), localidad, descripción del problema y, si las adjuntas, fotografías.</p>
      <h2>3. Finalidad</h2>
      <p>Atender tu solicitud, preparar el presupuesto y contactar contigo por el medio que indiques. No elaboramos perfiles ni tomamos decisiones automatizadas.</p>
      <h2>4. Legitimación</h2>
      <p>Tu consentimiento al enviar el formulario (art. 6.1.a RGPD) y la aplicación de medidas precontractuales a petición tuya (art. 6.1.b RGPD).</p>
      <h2>5. Conservación</h2>
      <p>Conservaremos los datos el tiempo necesario para atender tu solicitud y, si se formaliza un servicio, durante los plazos legalmente exigibles. Si no se formaliza, se eliminarán en un plazo máximo de <span className="placeholder">[PLAZO, p. ej. 12 meses]</span>.</p>
      <h2>6. Destinatarios</h2>
      <p>No cedemos tus datos a terceros salvo obligación legal. Utilizamos proveedores que actúan como encargados del tratamiento: alojamiento web <span className="placeholder">[PROVEEDOR DE HOSTING]</span> y envío de correo transaccional (Resend). Si nos contactas por WhatsApp, se aplicará además la política de privacidad de WhatsApp/Meta.</p>
      <h2>7. Tus derechos</h2>
      <p>Puedes ejercer los derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a {site.email ?? <span className="placeholder">[EMAIL]</span>}. También puedes presentar una reclamación ante la Agencia Española de Protección de Datos (<a href="https://www.aepd.es" target="_blank" rel="noopener">www.aepd.es</a>).</p>
      <h2>8. Seguridad</h2>
      <p>Aplicamos medidas técnicas y organizativas adecuadas: conexión cifrada (HTTPS), validación de datos y archivos en el servidor y acceso restringido a la información.</p>
    </LegalPage>
  );
}
