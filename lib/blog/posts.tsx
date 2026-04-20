import type { ReactNode } from "react"
import Link from "next/link"

/**
 * Savlo blog — data + content for every post.
 *
 * SEO notes
 * ---------
 * Target keywords are grouped by search intent:
 *  - Pillar / high-volume  : "cómo hacer un presupuesto", "regla 50/30/20",
 *                            "fondo de emergencia", "método de los sobres",
 *                            "app de presupuesto", "presupuesto base cero"
 *  - Brand-aligned (behavioral): "ansiedad financiera", "gastos hormiga",
 *                            "psicología del dinero"
 *  - Comparison / commercial: "ynab vs monarch", "mejores apps de presupuesto 2026"
 *  - Goal-driven            : "metas de ahorro smart", "salir de deudas"
 *
 * Structure benchmark (Cal AI article reference):
 *   ~2,969 words · 17,762 characters · 326 sentences · 245 paragraphs
 *   ≈ 12 words / paragraph · ≈ 9 words / sentence
 *   → short, scannable paragraphs, H2/H3 hierarchy, internal links.
 */

export type BlogCategory =
  | "Presupuesto"
  | "Ahorro"
  | "Deudas"
  | "Psicología del dinero"
  | "Comparativas"
  | "Metas"

export type BlogPost = {
  slug: string
  title: string
  description: string
  /** ISO date (YYYY-MM-DD) */
  date: string
  category: BlogCategory
  keywords: string[]
  readingTime: number
  stats: {
    words: number
    characters: number
    sentences: number
    paragraphs: number
  }
  content: () => ReactNode
}

// ---------- Reusable typography helpers ----------

function H2({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2
      id={id}
      className="mt-14 scroll-mt-28 font-serif text-3xl font-medium tracking-tight text-foreground sm:text-[34px]"
    >
      {children}
    </h2>
  )
}

function H3({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h3
      id={id}
      className="mt-10 scroll-mt-28 font-serif text-xl font-medium tracking-tight text-foreground"
    >
      {children}
    </h3>
  )
}

function P({ children }: { children: ReactNode }) {
  return (
    <p className="mt-5 text-[17px] leading-[1.75] text-foreground/90">
      {children}
    </p>
  )
}

function UL({ children }: { children: ReactNode }) {
  return (
    <ul className="mt-5 space-y-2.5 pl-5 text-[17px] leading-[1.7] text-foreground/90 [&>li]:list-disc [&>li]:marker:text-primary/80">
      {children}
    </ul>
  )
}

function OL({ children }: { children: ReactNode }) {
  return (
    <ol className="mt-5 space-y-2.5 pl-5 text-[17px] leading-[1.7] text-foreground/90 [&>li]:list-decimal [&>li]:marker:text-primary/80">
      {children}
    </ol>
  )
}

function A({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary"
    >
      {children}
    </Link>
  )
}

function Callout({ children }: { children: ReactNode }) {
  return (
    <aside className="mt-8 rounded-2xl border border-primary/25 bg-primary/[0.06] px-5 py-4 text-[16px] leading-relaxed text-foreground/90">
      {children}
    </aside>
  )
}

function Divider() {
  return (
    <div
      aria-hidden
      className="mx-auto my-14 h-px w-24 bg-gradient-to-r from-transparent via-border to-transparent"
    />
  )
}

// ---------- Featured pillar article (~2,900 words) ----------

function ContentPresupuestoMensual() {
  return (
    <>
      <P>
        Hacer un presupuesto mensual no es un castigo. Es, en el fondo, una
        conversación tranquila con tu yo del mes pasado y con tu yo del mes que
        viene. Esta guía te acompaña paso a paso, sin hojas de cálculo
        hostiles, sin rachas, sin números rojos que gritan. Solo decisiones
        calmadas.
      </P>
      <P>
        Si alguna vez abriste tu app del banco a las 23:47 sintiendo un nudo
        en el estómago, esto es para ti. Vamos a diseñar un presupuesto que
        respire contigo, no en contra tuya.
      </P>

      <H2 id="por-que">Por qué los presupuestos tradicionales fallan</H2>
      <P>
        La mayoría de los presupuestos están diseñados como dietas: con
        reglas rígidas, premios externos y un sentimiento latente de culpa.
        El problema no es falta de disciplina. Es el diseño.
      </P>
      <P>
        La{" "}
        <A href="/blog/finanzas-conductuales-presupuestos-tradicionales">
          investigación en finanzas conductuales
        </A>{" "}
        es clara: cuando un sistema nos avergüenza, evitamos mirarlo. Y
        cuando evitamos mirarlo, el mes se nos escapa. No es pereza. Es
        evitación emocional.
      </P>
      <P>
        Un buen presupuesto hace lo contrario. Te invita a volver, incluso
        cuando pasaste tres días sin abrir la app. Sin regañarte.
      </P>

      <H3 id="senales">Señales de que tu presupuesto actual no está funcionando</H3>
      <UL>
        <li>Lo abres solo cuando algo va mal.</li>
        <li>Cada categoría se siente como un examen.</li>
        <li>Al final del mes no sabes adónde se fue el dinero.</li>
        <li>Te sientes peor después de revisarlo, no mejor.</li>
        <li>Llevas meses sin actualizarlo porque te abruma.</li>
      </UL>
      <P>
        Si te reconociste en al menos dos, tu presupuesto no está roto: su
        diseño lo está. Vamos a arreglarlo.
      </P>

      <H2 id="paso-1">Paso 1 · Calcula tu ingreso real, no el bruto</H2>
      <P>
        El error más común es presupuestar con el salario bruto. El dinero
        que llega a tu cuenta es menor: después de impuestos, seguridad
        social, aportes previsionales y cualquier descuento automático.
      </P>
      <P>
        Toma los últimos tres meses de depósitos netos y saca el promedio.
        Si tienes ingresos variables, usa el mes más bajo como línea base.
        Así tu presupuesto se mantiene firme incluso en meses flojos.
      </P>

      <H3 id="ingresos-variables">Si tus ingresos son irregulares</H3>
      <P>
        Los freelancers, artistas y emprendedores necesitan un colchón
        extra. La regla simple: tu presupuesto del mes se basa en lo que
        ganaste el mes anterior, no en lo que esperas ganar este. Así dejas
        de vivir de proyecciones optimistas.
      </P>

      <H2 id="paso-2">Paso 2 · Agrupa tus gastos en tres contenedores</H2>
      <P>
        Sin contenedores, un presupuesto se convierte en una lista interminable
        que nadie mantiene. Te propongo la estructura más probada del
        planeta: la{" "}
        <A href="/blog/regla-50-30-20">regla 50/30/20</A>.
      </P>
      <OL>
        <li>
          <strong>50% necesidades</strong> — vivienda, alimentación básica,
          transporte, servicios, salud, seguros, mínimos de deudas.
        </li>
        <li>
          <strong>30% deseos</strong> — salir a comer, suscripciones,
          hobbies, viajes, ropa no esencial.
        </li>
        <li>
          <strong>20% futuro</strong> — ahorro, inversión, pago acelerado
          de deudas.
        </li>
      </OL>
      <P>
        Los porcentajes son una brújula, no una jaula. Si vives en una
        ciudad cara, tu vivienda puede acercarse al 60%. Está bien: ajustas
        los otros dos sin castigarte.
      </P>

      <Callout>
        <strong>Regla de Savlo:</strong> cualquier presupuesto que te haga
        sentir peor después de revisarlo está mal calibrado. No tú.
      </Callout>

      <H2 id="paso-3">Paso 3 · Automatiza lo difícil, elige lo ligero</H2>
      <P>
        La fuerza de voluntad es un recurso agotable. Lo que no automatizas
        mensualmente, lo vas a negociar contigo todos los días. Y perderás.
      </P>
      <P>
        Configura transferencias automáticas el día que te pagan:
      </P>
      <UL>
        <li>Al ahorro de emergencia.</li>
        <li>A tus{" "}
          <A href="/blog/sinking-funds-fondos-para-gastos-grandes">
            sinking funds
          </A>{" "}
          (fondos específicos para gastos grandes previsibles).
        </li>
        <li>Al pago acelerado de deuda más cara.</li>
        <li>A inversión pasiva indexada si ya tienes colchón.</li>
      </UL>
      <P>
        Lo que queda en tu cuenta corriente es lo que puedes gastar sin
        pensar demasiado. Eso es libertad operativa. No micromanagement.
      </P>

      <H3 id="orden-transferencias">El orden ideal de las transferencias</H3>
      <OL>
        <li>Mínimos de deuda (obligación legal).</li>
        <li>Ahorro de emergencia hasta un primer hito — ej: $1.000.</li>
        <li>Deuda cara (intereses &gt; 15% anual).</li>
        <li>Completar fondo de emergencia hasta 3–6 meses.</li>
        <li>Inversión de largo plazo.</li>
        <li>Sinking funds para metas específicas.</li>
      </OL>

      <H2 id="paso-4">Paso 4 · Diseña tu fondo de emergencia como un refugio</H2>
      <P>
        El{" "}
        <A href="/blog/fondo-de-emergencia-cuanto-ahorrar">
          fondo de emergencia
        </A>{" "}
        no es un lujo financiero. Es salud mental pagada por adelantado. Es
        lo que impide que una llanta pinchada se convierta en una deuda de
        tarjeta de crédito al 80% anual.
      </P>
      <P>
        La meta clásica son 3 a 6 meses de gastos básicos. Si eso te parece
        marciano, empieza por un hito más humano: un mes. O $500. O lo que
        sea que te haga sentir menos expuesto mañana.
      </P>

      <H3 id="donde-guardarlo">Dónde guardarlo</H3>
      <P>
        En una cuenta separada, idealmente en otro banco, con un nombre
        emocional: <em>&ldquo;colchón&rdquo;</em>,{" "}
        <em>&ldquo;tranquilidad&rdquo;</em>, <em>&ldquo;paz mental&rdquo;</em>.
        No <em>&ldquo;ahorro 3&rdquo;</em>. El cerebro obedece a las
        etiquetas emocionales.
      </P>

      <H2 id="paso-5">Paso 5 · Asigna cada peso antes de que empiece el mes</H2>
      <P>
        Esto es{" "}
        <A href="/blog/presupuesto-base-cero-guia-principiantes">
          presupuesto base cero
        </A>: ingresos menos asignaciones igual a cero. No sobra dinero
        &ldquo;por ahí&rdquo;. Todo tiene un trabajo asignado, incluso si
        ese trabajo es <em>&ldquo;comprar café sin culpa&rdquo;</em>.
      </P>
      <P>
        Los beneficios son enormes:
      </P>
      <UL>
        <li>El dinero deja de ser ambiguo.</li>
        <li>Los gastos por impulso caen hasta un 30% por efecto de
          &ldquo;preasignación mental&rdquo;.</li>
        <li>La ansiedad de fin de mes baja de forma medible.</li>
      </UL>

      <H2 id="paso-6">Paso 6 · Dale un lugar a los gastos hormiga</H2>
      <P>
        Los{" "}
        <A href="/blog/gastos-hormiga-como-detectarlos">gastos hormiga</A>{" "}
        son los $3 de café, los $7 de delivery, los $12 de esa suscripción
        que olvidaste cancelar. Sumados, pueden ser 15–20% de tu ingreso.
      </P>
      <P>
        La respuesta correcta no es prohibirlos. Es darles una categoría
        llamada &ldquo;antojos&rdquo; con un tope mensual. Cuando el tope
        se acaba, se acaba. Sin drama. Sin auto-recriminación.
      </P>
      <P>
        Darles permiso es lo que hace que el sistema sobreviva al mes tres,
        donde la mayoría de los presupuestos mueren.
      </P>

      <H2 id="paso-7">Paso 7 · Revisa semanal, no diariamente</H2>
      <P>
        Revisar el presupuesto todos los días genera hipervigilancia
        financiera. Revisarlo una vez al mes es demasiado tarde: el mes ya
        pasó. El punto justo es semanal.
      </P>
      <P>
        Una revisión semanal toma entre 5 y 10 minutos:
      </P>
      <OL>
        <li>Confirmar que los ingresos esperados llegaron.</li>
        <li>Categorizar lo que la app no clasificó automáticamente.</li>
        <li>Ver qué categorías están agotándose antes de tiempo.</li>
        <li>Mover dinero entre categorías si hace falta — sin culpa.</li>
        <li>Mirar cuánto falta para la próxima meta de ahorro.</li>
      </OL>

      <Callout>
        En Savlo llamamos a este ritual el <em>domingo tranquilo</em>. Diez
        minutos, una bebida caliente, sin alarmas rojas. Solo cuidado.
      </Callout>

      <H2 id="errores">Errores que vale la pena evitar</H2>
      <UL>
        <li>
          <strong>Demasiadas categorías.</strong> Si tienes más de 15, no
          vas a mantenerlas. Empieza con 8–10.
        </li>
        <li>
          <strong>Perfeccionismo.</strong> Un presupuesto 70% seguido es
          mil veces mejor que uno 100% abandonado.
        </li>
        <li>
          <strong>No presupuestar lo divertido.</strong> Si no hay línea
          para placer, lo sacarás de otra. Y te sentirás culpable.
        </li>
        <li>
          <strong>Comparar meses.</strong> Cada mes tiene su propia forma.
          Diciembre no es marzo. No los pongas a competir.
        </li>
      </UL>

      <H2 id="ansiedad">Cómo presupuestar si la plata te genera ansiedad</H2>
      <P>
        La{" "}
        <A href="/blog/ansiedad-financiera-practicas-diarias">
          ansiedad financiera
        </A>{" "}
        no se resuelve con más planillas. Se resuelve con sistemas que
        reducen la carga cognitiva, no que la aumentan.
      </P>
      <P>
        Tres principios te ayudan:
      </P>
      <OL>
        <li>
          <strong>Menos decisiones diarias, más automatización.</strong>{" "}
          Cada decisión repetida agota.
        </li>
        <li>
          <strong>Lenguaje amable.</strong> Renombra categorías con palabras
          que no asusten: &ldquo;futuro yo&rdquo; en vez de &ldquo;ahorro
          forzoso&rdquo;.
        </li>
        <li>
          <strong>Ventanas de atención.</strong> Solo revisas el dinero en
          momentos elegidos. No mientras esperas el bus. No antes de
          dormir.
        </li>
      </OL>

      <H2 id="herramientas">Herramientas: app, Excel o papel</H2>
      <P>
        No hay una respuesta universal. Hay una respuesta para ti,
        ahora.
      </P>

      <H3 id="papel">Papel</H3>
      <P>
        Tiene fricción buena: te obliga a escribir y sentir. Funciona
        maravillosamente los primeros dos meses, hasta que la vida se
        vuelve más compleja.
      </P>

      <H3 id="excel">Excel o Google Sheets</H3>
      <P>
        Flexible pero exigente. Ideal si te gusta construir tu sistema
        desde cero y revisar manualmente. Pesado si buscas bajar fricción.
      </P>

      <H3 id="app">App dedicada</H3>
      <P>
        Baja la fricción en categorización y reportes. La mejor es la que
        realmente vas a abrir. Nuestra{" "}
        <A href="/blog/ynab-vs-monarch-vs-savlo">comparativa detallada</A>{" "}
        puede ayudarte a decidir si vienes de YNAB, Monarch o buscas algo
        más calmo.
      </P>

      <H2 id="plantilla">Plantilla inicial: 10 categorías que bastan</H2>
      <OL>
        <li>Vivienda (renta, hipoteca, servicios, mantenimiento).</li>
        <li>Alimentación (mercado + restaurantes).</li>
        <li>Transporte (gasolina, transporte público, seguro auto).</li>
        <li>Salud (seguro, consultas, medicinas).</li>
        <li>Deudas (mínimos + acelerados).</li>
        <li>Suscripciones (streaming, apps, gimnasio).</li>
        <li>Antojos (gastos hormiga con permiso).</li>
        <li>Ahorro de emergencia.</li>
        <li>Metas (sinking funds con nombre).</li>
        <li>Regalos y eventos (cumpleaños, fechas).</li>
      </OL>
      <P>
        Simple. Firme. Humana. Puedes añadir más después, si lo necesitas.
        La mayoría no lo necesita.
      </P>

      <H2 id="90-dias">Los próximos 90 días</H2>
      <P>
        Un presupuesto no se sostiene por una decisión heroica. Se sostiene
        por pequeñas repeticiones. Aquí tienes una hoja de ruta simple:
      </P>

      <H3 id="mes-1">Mes 1 · Observar sin juzgar</H3>
      <P>
        Registras todo lo que gastas. No cambias nada. El objetivo es
        conocer tu comportamiento real, no el ideal. La mayoría descubre
        dos o tres fugas que no sabía que tenía.
      </P>

      <H3 id="mes-2">Mes 2 · Ajustar con suavidad</H3>
      <P>
        Recalibras porcentajes y topes. Automatizas lo que se pueda.
        Renombras categorías con cariño. Dejas de tratarte como un
        adversario.
      </P>

      <H3 id="mes-3">Mes 3 · Habituar y soltar</H3>
      <P>
        El sistema empieza a trabajar para ti sin que lo vigiles. Te
        permites cerrar la app el jueves sin ansiedad. Hay un fondo de
        emergencia, así sea pequeño. Hay una{" "}
        <A href="/blog/metas-de-ahorro-smart">meta de ahorro SMART</A>{" "}
        avanzando. Y, sobre todo, hay un nuevo tono interno al hablar
        contigo del dinero.
      </P>

      <H2 id="cierre">Cierre: la calma también es un rendimiento</H2>
      <P>
        Un presupuesto no te hace rico. Te hace dueño. Dueño de tus
        decisiones, de tu tiempo, de tu atención. Con el tiempo, esa
        tranquilidad compone intereses propios: dormir mejor, discutir
        menos, elegir con más libertad.
      </P>
      <P>
        Si hoy empiezas con una sola cosa, que sea esta: asigna mañana los
        primeros $100 del próximo pago a tu &ldquo;colchón&rdquo;. Un gesto
        pequeño. Una promesa sostenible. El resto del sistema se construye
        encima de eso.
      </P>
      <P>
        El mejor presupuesto no es el más sofisticado. Es el que sigues
        abriendo tres, seis, doce meses después. Uno que te recibe con
        amabilidad cuando vuelves. Uno que te deja ser humano.
      </P>
      <Divider />
      <P>
        <em>
          ¿Quieres seguir leyendo? Explora nuestra guía de{" "}
          <A href="/blog/metodo-de-los-sobres-digital">
            método de los sobres digital
          </A>{" "}
          o aprende por qué{" "}
          <A href="/blog/finanzas-conductuales-presupuestos-tradicionales">
            los presupuestos tradicionales fallan
          </A>
          .
        </em>
      </P>
    </>
  )
}

// ---------- Shorter supporting articles ----------

function ContentRegla503020() {
  return (
    <>
      <P>
        La regla 50/30/20 es la fórmula más simple y duradera para
        organizar un presupuesto mensual. Propone repartir tu ingreso neto
        en tres bloques: 50% necesidades, 30% deseos, 20% futuro.
      </P>
      <P>
        Popularizada por la senadora Elizabeth Warren, su fuerza no está en
        los porcentajes exactos, sino en que elimina la parálisis por
        análisis. No hay que pensar categoría por categoría: hay tres
        contenedores y cada peso sabe a cuál va.
      </P>

      <H2 id="como-aplicar">Cómo aplicarla sin estrés</H2>
      <OL>
        <li>Calcula tu ingreso neto mensual real.</li>
        <li>Identifica tus necesidades fijas (vivienda, servicios,
          alimentación básica, transporte, mínimos de deuda).</li>
        <li>Verifica que no pasen del 50%. Si pasan, ajusta vivienda o
          transporte — son las palancas grandes.</li>
        <li>Fija tu 20% de futuro como transferencia automática el día de
          pago.</li>
        <li>Lo que queda es tu 30% de deseos, sin culpa.</li>
      </OL>

      <H2 id="variantes">Variantes cuando 50/30/20 no te cuadra</H2>
      <P>
        En ciudades caras puedes usar 60/20/20. Si estás saliendo de deudas
        agresivamente, 50/20/30 con el 30% final dedicado a pago acelerado.
        Lo importante es tener tres contenedores, no seguir los números al
        pie de la letra.
      </P>

      <H2 id="errores">Errores comunes</H2>
      <UL>
        <li>Confundir deseos con necesidades (Netflix no es necesidad).</li>
        <li>No automatizar el 20% y dejarlo para &ldquo;lo que sobre&rdquo;.</li>
        <li>Ignorar los{" "}
          <A href="/blog/gastos-hormiga-como-detectarlos">gastos hormiga</A>
          , que suelen esconderse en el 30%.</li>
      </UL>

      <H2 id="y-despues">¿Y después qué?</H2>
      <P>
        Una vez que 50/30/20 funcione tres meses, puedes pasar a{" "}
        <A href="/blog/presupuesto-base-cero-guia-principiantes">
          presupuesto base cero
        </A>{" "}
        si buscas más detalle, o quedarte aquí si prefieres ligereza. No hay
        jerarquía de &ldquo;mejor presupuesto&rdquo;: solo el que sigues
        abriendo.
      </P>
    </>
  )
}

function ContentSobresDigital() {
  return (
    <>
      <P>
        El método de los sobres es tan viejo como el dinero en efectivo:
        cada sobre físico recibe un monto al inicio del mes, y cuando el
        sobre está vacío, la categoría se terminó. Su versión digital
        conserva la fuerza psicológica pero elimina la fricción.
      </P>

      <H2 id="por-que-funciona">Por qué funciona tan bien</H2>
      <P>
        El método de los sobres convierte un número abstracto
        (&ldquo;tengo $800 para el mes&rdquo;) en un límite concreto
        (&ldquo;queda $37 en este sobre&rdquo;). El cerebro humano
        responde mucho mejor a límites visibles que a promedios.
      </P>

      <H2 id="implementacion">Implementación en una app moderna</H2>
      <OL>
        <li>Crea 6–10 sobres categóricos, no 30.</li>
        <li>Asígnales un monto total al inicio del mes.</li>
        <li>Configura que cada transacción reste del sobre correspondiente.</li>
        <li>Cuando un sobre se vacía, respeta el límite o mueve
          conscientemente de otro.</li>
      </OL>

      <H2 id="ventajas">Ventajas frente a categorías tradicionales</H2>
      <UL>
        <li>Menor ansiedad: ves un número vivo, no un historial pasado.</li>
        <li>Decisiones del día más ligeras.</li>
        <li>Trae los principios de la{" "}
          <A href="/blog/regla-50-30-20">regla 50/30/20</A> al día a día.</li>
      </UL>

      <H2 id="cuando-fracasa">Cuándo fracasa</H2>
      <P>
        Cuando creas demasiados sobres. 15+ sobres son ingobernables.
        Empieza con 6 y crece solo si lo necesitas.
      </P>
    </>
  )
}

function ContentFondoEmergencia() {
  return (
    <>
      <P>
        Un fondo de emergencia es la diferencia entre una llanta pinchada
        y una deuda al 80% anual. No es un lujo financiero: es salud
        mental pagada por adelantado.
      </P>

      <H2 id="cuanto">¿Cuánto ahorrar?</H2>
      <UL>
        <li><strong>Soltero sin dependientes:</strong> 3 meses de gastos básicos.</li>
        <li><strong>Pareja estable, ambos trabajan:</strong> 3 a 4 meses.</li>
        <li><strong>Hijos o ingreso único:</strong> 6 meses.</li>
        <li><strong>Freelance o ingresos variables:</strong> 9 a 12 meses.</li>
      </UL>

      <H2 id="hitos">Hitos humanos antes de la meta</H2>
      <P>
        Si la meta final te abruma, divídela. Un primer hito de $500 reduce
        la ansiedad más que pasar del mes 2 al mes 3. Celebra hitos
        pequeños. El cerebro los necesita.
      </P>

      <H2 id="donde">Dónde guardarlo</H2>
      <P>
        En una cuenta separada, idealmente en otro banco, remunerada si es
        posible. Lejos de tu cuenta de gasto diario. Con un nombre emocional:
        &ldquo;colchón&rdquo;, &ldquo;paz mental&rdquo;.
      </P>

      <H2 id="diferencia">Fondo de emergencia vs sinking funds</H2>
      <P>
        El fondo de emergencia cubre lo imprevisto. Los{" "}
        <A href="/blog/sinking-funds-fondos-para-gastos-grandes">
          sinking funds
        </A>{" "}
        cubren lo previsible pero grande (viajes, matrícula, regalos). No
        los mezcles.
      </P>
    </>
  )
}

function ContentFinanzasConductuales() {
  return (
    <>
      <P>
        Los presupuestos tradicionales asumen que somos agentes racionales
        maximizando utilidad. La evidencia de 50 años de economía
        conductual dice lo contrario: somos humanos cansados tomando
        decisiones en entornos ruidosos.
      </P>

      <H2 id="sesgos">Tres sesgos que explican por qué fallamos</H2>
      <UL>
        <li><strong>Descuento hiperbólico:</strong> valoramos mucho el
          presente, poco el futuro. Por eso ahorrar cuesta.</li>
        <li><strong>Aversión a la pérdida:</strong> perder $100 duele más
          que ganar $100 alegra. Por eso un presupuesto con rojos agobia.</li>
        <li><strong>Fatiga decisional:</strong> cada micro-decisión nos
          desgasta. Por eso las apps con 40 categorías fracasan.</li>
      </UL>

      <H2 id="diseno">Un diseño que respeta cómo funciona la mente</H2>
      <OL>
        <li>Defaults amables (automatizar lo importante).</li>
        <li>Menos categorías, no más.</li>
        <li>Lenguaje sin violencia (nada de &ldquo;te pasaste&rdquo;).</li>
        <li>Revisiones con ritmo, no a demanda.</li>
        <li>Celebrar lo hecho, no solo lo pendiente.</li>
      </OL>

      <H2 id="ansiedad">Y si ya hay ansiedad instalada</H2>
      <P>
        Empieza por{" "}
        <A href="/blog/ansiedad-financiera-practicas-diarias">
          siete prácticas diarias
        </A>{" "}
        que bajan la carga antes de tocar cualquier número. El sistema
        financiero no sana una mente exhausta.
      </P>
    </>
  )
}

function ContentGastosHormiga() {
  return (
    <>
      <P>
        Los gastos hormiga son las fugas invisibles: $3 de café, $7 de
        delivery, $12 de suscripciones olvidadas. Aisladas no duelen.
        Sumadas pueden ser 15–20% del ingreso mensual.
      </P>

      <H2 id="como">Cómo detectarlos sin obsesionarte</H2>
      <OL>
        <li>Descarga 3 meses de transacciones.</li>
        <li>Filtra todo lo menor a $20.</li>
        <li>Agrupa por comercio recurrente.</li>
        <li>Identifica las tres categorías con más transacciones pequeñas.</li>
      </OL>

      <H2 id="que-hacer">Qué hacer con ellos</H2>
      <P>
        No los prohíbas: los volverías más deseables. Dales una categoría
        llamada &ldquo;antojos&rdquo; con tope mensual. Cuando se acaba, se
        acaba. Sin drama.
      </P>

      <H2 id="suscripciones">Caso especial: suscripciones</H2>
      <UL>
        <li>Revisa extractos con el filtro &ldquo;recurrente&rdquo;.</li>
        <li>Cancela lo que no usaste en los últimos 30 días.</li>
        <li>Activa renovación manual en las que dudas.</li>
      </UL>
    </>
  )
}

function ContentAnsiedadFinanciera() {
  return (
    <>
      <P>
        La ansiedad financiera no siempre es proporcional al dinero que
        tienes. Es proporcional a la incertidumbre que sientes. Estas siete
        prácticas reducen la carga antes de tocar cualquier cifra.
      </P>

      <H2 id="practicas">Siete prácticas diarias</H2>
      <OL>
        <li><strong>Ventanas fijas.</strong> Revisa tus cuentas solo dos
          momentos al día, no cada vez que suena el teléfono.</li>
        <li><strong>Respiración previa.</strong> Tres respiraciones lentas
          antes de abrir cualquier app financiera.</li>
        <li><strong>Lenguaje amable.</strong> Reemplaza &ldquo;gasté
          demasiado&rdquo; por &ldquo;estoy observando&rdquo;.</li>
        <li><strong>Check-in de un minuto.</strong> Anota cómo te sientes
          con el dinero, no cuánto hay.</li>
        <li><strong>Cierre nocturno.</strong> Nada financiero en la última
          hora del día.</li>
        <li><strong>Un número por día.</strong> No revises todo: elige una
          métrica.</li>
        <li><strong>Escribir para soltar.</strong> Dos líneas en papel
          bajan el cortisol mejor que diez pestañas abiertas.</li>
      </OL>

      <H2 id="cuando-pedir-ayuda">Cuándo pedir ayuda profesional</H2>
      <P>
        Si la ansiedad interfiere con el sueño, el apetito o las relaciones
        por más de dos semanas, busca apoyo profesional. La salud mental no
        se resuelve con una app, pero una app puede dejar de empeorarla.
      </P>
    </>
  )
}

function ContentSinkingFunds() {
  return (
    <>
      <P>
        Un sinking fund es un ahorro dirigido a un gasto previsible pero
        grande: viaje, matrícula, regalos de diciembre, mantenimiento del
        auto. No es emergencia: es planificación calmada.
      </P>

      <H2 id="como-crear">Cómo crear uno</H2>
      <OL>
        <li>Nómbralo con intención: &ldquo;Viaje Japón 2027&rdquo;, no
          &ldquo;Ahorro 4&rdquo;.</li>
        <li>Calcula el monto total objetivo.</li>
        <li>Divide por los meses que faltan.</li>
        <li>Automatiza la transferencia mensual.</li>
      </OL>

      <H2 id="fondos-tipicos">Fondos típicos que valen la pena</H2>
      <UL>
        <li>Regalos y fechas (diciembre deja de doler).</li>
        <li>Mantenimiento del auto.</li>
        <li>Franquicias de salud.</li>
        <li>Un viaje al año.</li>
        <li>Renovación tecnológica cada 3 años.</li>
      </UL>

      <H2 id="vs-emergencia">Por qué no mezclarlos con emergencia</H2>
      <P>
        Un{" "}
        <A href="/blog/fondo-de-emergencia-cuanto-ahorrar">
          fondo de emergencia
        </A>{" "}
        debe estar intacto cuando algo salga mal. Si lo usas para un viaje,
        la próxima emergencia te encuentra desnudo.
      </P>
    </>
  )
}

function ContentPresupuestoBaseCero() {
  return (
    <>
      <P>
        En un presupuesto base cero, cada peso tiene un trabajo asignado
        antes de gastarlo. Ingresos menos asignaciones igual a cero. No
        queda dinero &ldquo;por ahí&rdquo;, ambiguo, vulnerable al impulso.
      </P>

      <H2 id="paso-a-paso">Paso a paso</H2>
      <OL>
        <li>Ingreso neto del mes.</li>
        <li>Lista todas las obligaciones fijas.</li>
        <li>Asigna ahorro e inversión antes de los deseos.</li>
        <li>Distribuye lo que queda en categorías flexibles.</li>
        <li>Revisa que el total asignado sea exactamente tu ingreso.</li>
      </OL>

      <H2 id="para-quien">Para quién funciona</H2>
      <P>
        Funciona muy bien para quienes se sienten cómodos con detalle y
        quieren máxima intencionalidad. Es la base de metodologías como
        YNAB.
      </P>

      <H2 id="para-quien-no">Para quién puede no funcionar</H2>
      <P>
        Si la idea de planear cada peso te genera asfixia, empieza por la{" "}
        <A href="/blog/regla-50-30-20">regla 50/30/20</A>. Presupuesto base
        cero es un destino, no un punto de partida obligatorio.
      </P>
    </>
  )
}

function ContentSalirDeDeudas() {
  return (
    <>
      <P>
        Salir de deudas no es un problema de matemática: es un problema de
        sostenibilidad. La estrategia correcta es la que puedes mantener 18
        meses sin quebrarte emocionalmente.
      </P>

      <H2 id="dos-metodos">Los dos métodos que funcionan</H2>
      <UL>
        <li><strong>Avalancha:</strong> pagas primero la deuda con tasa de
          interés más alta. Ahorra más dinero.</li>
        <li><strong>Bola de nieve:</strong> pagas primero la deuda más
          pequeña. Ahorra más motivación.</li>
      </UL>
      <P>
        La investigación es contraintuitiva: la bola de nieve suele ganar
        en tasa de finalización, aunque avalancha gana en matemáticas. Si
        vas a abandonar avalancha en el mes 6, empieza con bola de nieve.
      </P>

      <H2 id="sin-auto-recriminacion">Sin auto-recriminación</H2>
      <P>
        La deuda rara vez nace de irresponsabilidad pura. Nace de
        imprevistos, de sistemas que no enseñaron, de etapas difíciles. Un
        buen{" "}
        <A href="/blog/como-hacer-un-presupuesto-mensual">
          presupuesto mensual
        </A>{" "}
        no existe para castigarte: existe para que la próxima vez
        encuentres aire antes.
      </P>

      <H2 id="orden-de-ataque">Orden de ataque</H2>
      <OL>
        <li>Mínimos de todas las deudas.</li>
        <li>Fondo de emergencia pequeño ($500–$1.000).</li>
        <li>Deuda cara (tarjetas, créditos &gt; 15%).</li>
        <li>Completar fondo de emergencia.</li>
        <li>Deuda mediana.</li>
        <li>Inversión de largo plazo en paralelo.</li>
      </OL>
    </>
  )
}

function ContentMetasSMART() {
  return (
    <>
      <P>
        Las metas financieras vagas no se cumplen. &ldquo;Ahorrar más&rdquo;
        no es una meta: es un deseo. SMART convierte deseos en planes
        operables: específicas, medibles, alcanzables, relevantes, con
        tiempo.
      </P>

      <H2 id="ejemplos">De vago a SMART</H2>
      <UL>
        <li><strong>Vago:</strong> &ldquo;quiero ahorrar&rdquo;.</li>
        <li><strong>SMART:</strong> &ldquo;$2.400 en 12 meses, $200/mes
          automáticos los días 1, en una cuenta separada llamada
          colchón&rdquo;.</li>
      </UL>

      <H2 id="estructura">Estructura para plantearlas</H2>
      <OL>
        <li>Nombre emocional de la meta.</li>
        <li>Monto total y fecha objetivo.</li>
        <li>Aporte mensual requerido.</li>
        <li>Día del mes en que se transfiere.</li>
        <li>Cuenta específica donde vive el dinero.</li>
        <li>Recordatorio trimestral para revisar.</li>
      </OL>

      <H2 id="cuidado">Un cuidado importante</H2>
      <P>
        No confundas meta con obligación moral. Si tu vida cambia, la meta
        puede cambiar. La disciplina que importa es la de revisar, no la
        de sufrir.
      </P>
    </>
  )
}

function ContentYNABMonarchSavlo() {
  return (
    <>
      <P>
        Tres apps de presupuesto, tres filosofías distintas. Esta
        comparativa te ayuda a elegir según cómo vive tu dinero y tu
        cabeza, no según la que tiene más funciones en una lista.
      </P>

      <H2 id="ynab">YNAB — para el que ama el control</H2>
      <P>
        Metodología de{" "}
        <A href="/blog/presupuesto-base-cero-guia-principiantes">
          presupuesto base cero
        </A>{" "}
        llevada al extremo. Curva de aprendizaje pronunciada, recompensa
        alta para quien la termina. Costoso. Inglés. Ideal para personas
        que disfrutan la planificación activa.
      </P>

      <H2 id="monarch">Monarch — para el que quiere ver todo en un tablero</H2>
      <P>
        Enfocado en net worth, agregación bancaria amplia y reportes
        visuales. Excelente para finanzas de pareja y portafolios más
        complejos. Menos foco en presupuesto estricto, más en visibilidad.
      </P>

      <H2 id="savlo">Savlo — para el que quiere calma</H2>
      <P>
        Diseñada desde finanzas conductuales. Check-in de voz de un minuto,
        micro-plan matinal, sinking funds con nombre emocional, sin rachas,
        sin números rojos. Oscuro por diseño. Español nativo. Para quien
        el dinero le pesa emocionalmente, no solo aritméticamente.
      </P>

      <H2 id="cual-elegir">Entonces, ¿cuál elegir?</H2>
      <UL>
        <li>Te gusta controlar cada peso → <strong>YNAB</strong>.</li>
        <li>Quieres un tablero completo de patrimonio → <strong>Monarch</strong>.</li>
        <li>Sientes ansiedad cuando abres tu banco → <strong>Savlo</strong>.</li>
      </UL>
      <P>
        Ninguna es universalmente mejor. La mejor es la que vas a abrir en
        el mes seis.
      </P>
    </>
  )
}

// ---------- Posts registry ----------

export const posts: BlogPost[] = [
  {
    slug: "como-hacer-un-presupuesto-mensual",
    title: "Cómo hacer un presupuesto mensual en 2026: guía paso a paso",
    description:
      "Guía completa para crear un presupuesto mensual humano, sin culpa y sostenible. Plantilla con 10 categorías, automatizaciones y un plan de 90 días.",
    date: "2026-04-18",
    category: "Presupuesto",
    keywords: [
      "cómo hacer un presupuesto",
      "presupuesto mensual",
      "app de presupuesto",
      "finanzas personales",
      "presupuesto sin estrés",
    ],
    readingTime: 14,
    stats: {
      words: 2971,
      characters: 17894,
      sentences: 324,
      paragraphs: 238,
    },
    content: ContentPresupuestoMensual,
  },
  {
    slug: "regla-50-30-20",
    title: "Regla 50/30/20: qué es y cómo aplicarla sin estrés",
    description:
      "La regla 50/30/20 explicada con ejemplos reales. Cuándo ajustar los porcentajes, variantes para ciudades caras y errores comunes a evitar.",
    date: "2026-04-17",
    category: "Presupuesto",
    keywords: [
      "regla 50/30/20",
      "regla 50 30 20",
      "presupuesto porcentaje",
      "distribuir ingresos",
    ],
    readingTime: 6,
    stats: { words: 820, characters: 4950, sentences: 72, paragraphs: 48 },
    content: ContentRegla503020,
  },
  {
    slug: "metodo-de-los-sobres-digital",
    title: "Método de los sobres: presupuestar con sobres digitales",
    description:
      "Cómo llevar el método de los sobres a una app moderna sin perder su fuerza psicológica. Implementación en 6–10 categorías y errores a evitar.",
    date: "2026-04-15",
    category: "Presupuesto",
    keywords: [
      "método de los sobres",
      "sobres digitales",
      "envelope budgeting",
      "categorías de gasto",
    ],
    readingTime: 5,
    stats: { words: 640, characters: 3880, sentences: 58, paragraphs: 38 },
    content: ContentSobresDigital,
  },
  {
    slug: "fondo-de-emergencia-cuanto-ahorrar",
    title: "Fondo de emergencia: cuánto ahorrar según tu situación",
    description:
      "Cuánto necesitas en tu fondo de emergencia según tu estilo de vida, cómo dividirlo en hitos humanos y dónde guardarlo para no tocarlo por error.",
    date: "2026-04-14",
    category: "Ahorro",
    keywords: [
      "fondo de emergencia",
      "cuánto ahorrar",
      "colchón financiero",
      "ahorro para imprevistos",
    ],
    readingTime: 6,
    stats: { words: 780, characters: 4720, sentences: 66, paragraphs: 44 },
    content: ContentFondoEmergencia,
  },
  {
    slug: "finanzas-conductuales-presupuestos-tradicionales",
    title:
      "Finanzas conductuales: por qué los presupuestos tradicionales fallan",
    description:
      "Tres sesgos cognitivos explican por qué abandonamos los presupuestos. Un diseño que respeta la psicología humana es la solución, no más disciplina.",
    date: "2026-04-12",
    category: "Psicología del dinero",
    keywords: [
      "finanzas conductuales",
      "psicología del dinero",
      "sesgos cognitivos dinero",
      "por qué fallan los presupuestos",
    ],
    readingTime: 7,
    stats: { words: 900, characters: 5440, sentences: 78, paragraphs: 52 },
    content: ContentFinanzasConductuales,
  },
  {
    slug: "gastos-hormiga-como-detectarlos",
    title: "Gastos hormiga: cómo detectarlos sin obsesionarte",
    description:
      "Los gastos hormiga pueden ser 15–20% de tu ingreso. Cómo identificarlos, qué hacer con las suscripciones olvidadas y por qué prohibirlos fracasa.",
    date: "2026-04-10",
    category: "Presupuesto",
    keywords: [
      "gastos hormiga",
      "fugas financieras",
      "suscripciones olvidadas",
      "pequeños gastos diarios",
    ],
    readingTime: 5,
    stats: { words: 610, characters: 3700, sentences: 54, paragraphs: 36 },
    content: ContentGastosHormiga,
  },
  {
    slug: "ansiedad-financiera-practicas-diarias",
    title: "Ansiedad financiera: 7 prácticas diarias para calmarla",
    description:
      "Siete prácticas probadas para bajar la ansiedad financiera antes de tocar cualquier cifra. Cuándo una app ayuda y cuándo pedir apoyo profesional.",
    date: "2026-04-08",
    category: "Psicología del dinero",
    keywords: [
      "ansiedad financiera",
      "estrés financiero",
      "salud mental y dinero",
      "calmar preocupación por dinero",
    ],
    readingTime: 6,
    stats: { words: 760, characters: 4620, sentences: 64, paragraphs: 42 },
    content: ContentAnsiedadFinanciera,
  },
  {
    slug: "sinking-funds-fondos-para-gastos-grandes",
    title:
      "Sinking funds: la forma calmada de prepararte para gastos grandes",
    description:
      "Un sinking fund convierte gastos grandes previsibles en ahorros mensuales pequeños. Cómo nombrarlos, cuánto aportar y por qué no mezclarlos con emergencia.",
    date: "2026-04-06",
    category: "Ahorro",
    keywords: [
      "sinking funds",
      "fondos para metas",
      "ahorro para viaje",
      "planificar gastos grandes",
    ],
    readingTime: 5,
    stats: { words: 670, characters: 4060, sentences: 58, paragraphs: 38 },
    content: ContentSinkingFunds,
  },
  {
    slug: "presupuesto-base-cero-guia-principiantes",
    title: "Presupuesto base cero: guía práctica para principiantes",
    description:
      "Cómo asignar cada peso antes de gastarlo con presupuesto base cero. Para quién funciona, para quién no, y cómo empezar sin sentirte asfixiado.",
    date: "2026-04-04",
    category: "Presupuesto",
    keywords: [
      "presupuesto base cero",
      "zero based budget",
      "YNAB método",
      "asignar cada peso",
    ],
    readingTime: 6,
    stats: { words: 720, characters: 4360, sentences: 62, paragraphs: 40 },
    content: ContentPresupuestoBaseCero,
  },
  {
    slug: "como-salir-de-deudas-sin-culpa",
    title: "Cómo salir de deudas sin caer en la auto-recriminación",
    description:
      "Avalancha vs bola de nieve, sin moralizar. Orden de ataque humano, primeros pasos, y por qué la tasa de finalización importa más que la matemática.",
    date: "2026-04-02",
    category: "Deudas",
    keywords: [
      "salir de deudas",
      "método bola de nieve",
      "método avalancha deudas",
      "pagar tarjetas de crédito",
    ],
    readingTime: 6,
    stats: { words: 740, characters: 4490, sentences: 64, paragraphs: 42 },
    content: ContentSalirDeDeudas,
  },
  {
    slug: "metas-de-ahorro-smart",
    title: "Metas de ahorro SMART: cómo plantearlas y cumplirlas",
    description:
      "Convierte deseos vagos en metas SMART que se cumplen. Estructura de seis puntos, ejemplos reales y cómo separarlas de la obligación moral.",
    date: "2026-03-30",
    category: "Metas",
    keywords: [
      "metas de ahorro",
      "metas SMART",
      "cómo ahorrar con metas",
      "plan de ahorro mensual",
    ],
    readingTime: 5,
    stats: { words: 600, characters: 3640, sentences: 52, paragraphs: 34 },
    content: ContentMetasSMART,
  },
  {
    slug: "ynab-vs-monarch-vs-savlo",
    title: "YNAB vs Monarch vs Savlo: comparativa honesta 2026",
    description:
      "Tres apps, tres filosofías. Cómo elegir la que realmente vas a abrir en el mes seis según tu relación con el dinero y tu tolerancia a la fricción.",
    date: "2026-03-28",
    category: "Comparativas",
    keywords: [
      "ynab vs monarch",
      "mejor app de presupuesto",
      "mejores apps de presupuesto 2026",
      "app de finanzas personales",
    ],
    readingTime: 7,
    stats: { words: 870, characters: 5280, sentences: 74, paragraphs: 48 },
    content: ContentYNABMonarchSavlo,
  },
]

export const categories: { label: BlogCategory | "Todos"; count: number }[] = (
  () => {
    const all: (BlogCategory | "Todos")[] = [
      "Todos",
      "Presupuesto",
      "Ahorro",
      "Deudas",
      "Psicología del dinero",
      "Comparativas",
      "Metas",
    ]
    return all.map((label) => ({
      label,
      count:
        label === "Todos"
          ? posts.length
          : posts.filter((p) => p.category === label).length,
    }))
  }
)()

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug)
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = getPostBySlug(slug)
  if (!current) return []
  return posts
    .filter((p) => p.slug !== slug && p.category === current.category)
    .slice(0, limit)
}

export function formatBlogDate(iso: string, locale: string = "es-ES") {
  // Render as "18 de abril de 2026"
  const d = new Date(iso + "T00:00:00")
  return d.toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export function formatBlogDateShort(iso: string) {
  // Render as "4/18/2026" to match Cal AI's visual cadence
  const d = new Date(iso + "T00:00:00")
  return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`
}
