import { LegalPage } from "@/components/sections/LegalPage";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({ title: "Aviso legal", description: "Aviso legal de NEXBCN en cumplimiento de la Ley 34/2002 de Servicios de la Sociedad de la Información (LSSI-CE).", path: "/aviso-legal" });

export default function Page() {
  return (
    <LegalPage title="Aviso legal" updated="[FECHA]" path="/aviso-legal">
      <h2>1. Datos identificativos</h2>
      <p>En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa de los datos del titular de este sitio web:</p>
      <ul>
        <li>Titular: <span className="placeholder">[RAZÓN SOCIAL / NOMBRE DEL TITULAR]</span></li>
        <li>NIF/CIF: <span className="placeholder">[NIF]</span></li>
        <li>Domicilio: <span className="placeholder">[DIRECCIÓN COMPLETA]</span></li>
        <li>Email: {site.email ?? <span className="placeholder">[EMAIL]</span>}</li>
        <li>Teléfono: {site.phone ?? <span className="placeholder">[TELÉFONO]</span>}</li>
        <li>Datos registrales: <span className="placeholder">[REGISTRO MERCANTIL, si aplica]</span></li>
        <li>Sitio web: {site.url}</li>
      </ul>
      <h2>2. Objeto</h2>
      <p>Este sitio web ofrece información sobre los servicios de fontanería, climatización, calefacción, electricidad y reformas prestados por el titular, y permite solicitar presupuestos y contactar.</p>
      <h2>3. Condiciones de uso</h2>
      <p>El acceso al sitio web es gratuito e implica la aceptación de este aviso legal. El usuario se compromete a hacer un uso adecuado de los contenidos y a no emplearlos para actividades ilícitas o contrarias a la buena fe.</p>
      <h2>4. Propiedad intelectual e industrial</h2>
      <p>Los contenidos del sitio (textos, diseño, ilustraciones, logotipos y código) son titularidad del titular o se utilizan con licencia. Queda prohibida su reproducción, distribución o transformación sin autorización.</p>
      <h2>5. Responsabilidad</h2>
      <p>El titular no se hace responsable de los daños derivados de un uso indebido del sitio ni de interrupciones técnicas ajenas a su control. La información publicada tiene carácter orientativo; las condiciones de cada servicio se establecen en el presupuesto correspondiente.</p>
      <h2>6. Enlaces</h2>
      <p>El sitio puede contener enlaces a servicios de terceros (por ejemplo, WhatsApp). El titular no se responsabiliza de sus contenidos ni de sus políticas.</p>
      <h2>7. Legislación aplicable</h2>
      <p>Este aviso legal se rige por la legislación española. Para cualquier controversia, las partes se someterán a los juzgados y tribunales que correspondan conforme a la normativa vigente.</p>
    </LegalPage>
  );
}
