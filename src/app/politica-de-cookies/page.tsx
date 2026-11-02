import { LegalPage } from "@/components/sections/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Política de cookies", description: "Información sobre el uso de cookies en el sitio web de NEXBCN.", path: "/politica-de-cookies" });

export default function Page() {
  return (
    <LegalPage title="Política de cookies" updated="[FECHA]" path="/politica-de-cookies">
      <h2>1. ¿Usamos cookies?</h2>
      <p>En su configuración actual, este sitio web <strong>no utiliza cookies de analítica, publicidad ni de terceros</strong>, y no instala cookies que requieran consentimiento. Por eso no mostramos un banner de cookies.</p>
      <p>Las tipografías se sirven desde nuestro propio dominio y el mapa de cobertura es una ilustración propia, sin servicios externos de seguimiento.</p>
      <h2>2. Almacenamiento técnico</h2>
      <p>El sitio puede usar almacenamiento técnico estrictamente necesario para su funcionamiento (por ejemplo, el estado temporal del formulario mientras lo rellenas), exento de consentimiento según el artículo 22.2 de la LSSI-CE.</p>
      <h2>3. Servicios de terceros</h2>
      <p>Si pulsas en el botón de WhatsApp, saldrás de este sitio y se aplicará la política de cookies de WhatsApp/Meta.</p>
      <h2>4. Cambios</h2>
      <p>Si en el futuro incorporamos herramientas de analítica u otras cookies no técnicas, actualizaremos esta política y solicitaremos tu consentimiento previo mediante un panel de configuración.</p>
    </LegalPage>
  );
}
