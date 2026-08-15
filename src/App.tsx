import { useEffect } from 'react'
import './App.css'

const Arrow = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
  </svg>
)

const Spark = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 36 36" aria-hidden="true">
    <path d="M18 2c.7 9.8 6.2 15.3 16 16-9.8.7-15.3 6.2-16 16-.7-9.8-6.2-15.3-16-16C11.8 17.3 17.3 11.8 18 2Z" fill="currentColor" />
  </svg>
)

function ChefToCodeIllustration() {
  return (
    <div className="hero-art" aria-label="Una olla que se transforma en código">
      <span className="art-label art-label--top">EST. 2010</span>
      <span className="art-label art-label--bottom">BUILDING 2026</span>
      <span className="orbit orbit--one" />
      <span className="orbit orbit--two" />
      <Spark className="hero-spark hero-spark--one" />
      <Spark className="hero-spark hero-spark--two" />
      <svg viewBox="0 0 580 580" role="img" aria-hidden="true">
        <defs><path id="curve" d="M74 204C185 72 405 72 506 203" /></defs>
        <text className="round-type"><textPath href="#curve" startOffset="50%" textAnchor="middle">DE LA COCINA A LA CONSTRUCCIÓN DIGITAL</textPath></text>
        <path className="steam steam--one" d="M212 230c-17-24 22-31 4-57" />
        <path className="steam steam--two" d="M284 210c17-25-20-39 5-66" />
        <path className="steam steam--three" d="M350 227c-14-25 19-36 4-60" />
        <g className="pan">
          <path d="M148 274h279l-19 118c-3 22-20 38-43 38H210c-23 0-40-16-43-38l-19-118Z" />
          <path d="M143 274c0-19 16-34 35-34h219c19 0 35 15 35 34v10H143v-10Z" />
          <path d="M427 310h56c18 0 28 20 17 35l-27 37" />
          <path d="M182 350h212" className="pan-line" /><path d="M202 384h167" className="pan-line" />
        </g>
        <g className="code-window">
          <rect x="266" y="288" width="202" height="145" rx="10" /><path d="M266 318h202" />
          <circle cx="284" cy="302" r="4" /><circle cx="298" cy="302" r="4" /><circle cx="312" cy="302" r="4" />
          <path d="M288 344l-15 13 15 13M318 344l15 13-15 13M348 344l-15 13 15 13M374 344h56M348 384h68M288 409h36" className="code-lines" />
        </g>
        <path className="stir-path" d="M98 440c87 49 265 72 397-11" />
      </svg>
    </div>
  )
}

function DishIcon() { return <svg viewBox="0 0 60 60" aria-hidden="true"><path d="M9 37h42M15 37c1 9 7 14 15 14s14-5 15-14M7 31h46M11 31c2-10 10-16 19-16s17 6 19 16M30 7v8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" /></svg> }
function CodeIcon() { return <svg viewBox="0 0 60 60" aria-hidden="true"><path d="m22 20-11 10 11 10M38 20l11 10-11 10M34 13 26 47" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" /></svg> }

function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')),
      { threshold: 0.14 },
    )
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  return (
    <main>
      <section className="hero-section" id="inicio">
        <nav className="nav shell">
          <a href="#inicio" className="monogram" aria-label="Alejandro García, inicio">AG<span>_</span></a>
          <div className="nav-links"><a href="#historia">Historia</a><a href="#habilidades">Habilidades</a><a href="#contacto">Contacto</a></div>
          <a className="nav-cta" href="mailto:hola@alejandrogarcia.dev">Hablemos <Arrow /></a>
        </nav>
        <div className="hero shell">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot" />PORTAFOLIO / 01 — 2026</div>
            <h1>De los<br /><em>fogones</em><br />al futuro.</h1>
            <p className="hero-intro">Soy Alejandro. Durante años convertí ingredientes en experiencias memorables. Hoy aplico esa misma obsesión al software.</p>
            <div className="hero-actions"><a className="button button--dark" href="#historia">Conoce mi historia <Arrow /></a><a className="text-link" href="#contacto">Trabajemos juntos <span>↗</span></a></div>
          </div>
          <ChefToCodeIllustration />
        </div>
        <div className="hero-footer shell"><span className="scroll-cue"><i /> BAJA PARA EXPLORAR</span><p>Gastrónomo en transición<br />hacia <strong>Software Developer</strong></p><span className="location">Playa del Carmen, MX <b>●</b></span></div>
      </section>

      <div className="ticker" aria-hidden="true"><div>MISE EN PLACE <span>✳</span> HUMAN-CENTERED <span>✳</span> BUILT WITH INTENTION <span>✳</span> MISE EN PLACE <span>✳</span> HUMAN-CENTERED <span>✳</span> BUILT WITH INTENTION <span>✳</span></div></div>

      <section className="story section shell" id="historia">
        <div className="section-kicker reveal"><span>01</span> LA HISTORIA</div>
        <div className="story-grid">
          <div className="story-heading reveal"><p className="handwriting">Un cambio de<br />receta.</p><h2>Todo gran plato<br />empieza con una<br /><em>intuición.</em></h2></div>
          <div className="story-body reveal"><p>Mi primera carrera me enseñó a escuchar: a los equipos, a los detalles y a las personas detrás de cada mesa. Como chef en la Riviera Maya, aprendí que una gran experiencia nunca ocurre por accidente.</p><p>En tecnología encontré un nuevo lenguaje para esa misma idea: entender un problema, ordenar el caos y crear algo que haga la vida de alguien un poco mejor.</p><div className="quote-mark">“</div><blockquote>El código, como la cocina, es oficio, curiosidad y un poco de valentía.</blockquote></div>
        </div>
      </section>

      <section className="bridge-section"><div className="bridge shell reveal"><div className="bridge-number">01<span>/</span>02</div><div className="bridge-steps"><div className="bridge-step bridge-step--chef"><DishIcon /><span>Antes</span><strong>Chef</strong></div><div className="bridge-arrow"><span>→</span><small>TRADUCIR<br />APRENDIZAJES</small></div><div className="bridge-step bridge-step--code"><CodeIcon /><span>Ahora</span><strong>Developer</strong></div></div><p>La vocación cambió.<br />La manera de trabajar, no.</p></div></section>

      <section className="craft section shell" id="habilidades">
        <div className="section-kicker reveal"><span>02</span> EL OFICIO QUE TRAIGO</div>
        <div className="craft-intro reveal"><h2>Mi experiencia no quedó<br />en la <em>cocina.</em> Evolucionó.</h2><p>Estas son las herramientas invisibles que llevo conmigo al construir productos digitales.</p></div>
        <div className="strength-grid">
          <article className="strength-card reveal"><span className="card-index">A / 01</span><div className="line-illustration"><span /><span /><span /></div><h3>Mise en place</h3><p>Preparar con intención antes de ejecutar. Sistemas claros, prioridades definidas y atención a cada dependencia.</p><small>→ PENSAMIENTO ESTRUCTURADO</small></article>
          <article className="strength-card strength-card--warm reveal"><span className="card-index">A / 02</span><div className="pressure-illustration"><i /><i /><i /><b>!</b></div><h3>Calma bajo presión</h3><p>Decidir rápido sin perder precisión. Porque tanto un servicio como un deploy requieren presencia.</p><small>→ RESOLUCIÓN DE PROBLEMAS</small></article>
          <article className="strength-card strength-card--dark reveal"><span className="card-index">A / 03</span><div className="taste-illustration"><span>+</span><span>+</span><span>+</span><i /></div><h3>Obsesión por la experiencia</h3><p>Los pequeños detalles cambian cómo se siente algo. Diseño y desarrollo pensados para las personas.</p><small>→ EMPATÍA DE USUARIO</small></article>
        </div>
      </section>

      <section className="recipe-section"><div className="recipe shell reveal"><div className="recipe-top"><span>03 / MI NUEVA RECETA</span><span>ESTÁ EN PROCESO</span></div><div className="recipe-layout"><div className="recipe-title"><h2>Less<br /><em>guessing.</em><br />More making.</h2><Spark /></div><ol className="recipe-list"><li><b>01</b><div><strong>Escuchar</strong><p>Entender a las personas antes de escribir una sola línea.</p></div></li><li><b>02</b><div><strong>Prototipar</strong><p>Convertir ideas complejas en soluciones simples y tangibles.</p></div></li><li><b>03</b><div><strong>Iterar</strong><p>Probar, ajustar y servir una versión mejor cada vez.</p></div></li></ol></div><div className="terminal"><span className="terminal-dots"><i /><i /><i /></span><span><b>alejandro@new-path</b>:~$</span> <em>building meaningful things...</em><span className="cursor">_</span></div></div></section>

      <section className="projects section shell"><div className="section-kicker reveal"><span>04</span> PRÓXIMOS PROYECTOS</div><div className="projects-top reveal"><h2>Las mejores<br />historias apenas<br /><em>comienzan.</em></h2><p>Estoy convirtiendo aprendizaje en proyectos. Muy pronto, este espacio tendrá casos de estudio, experimentos y cosas hechas con cariño.</p></div><div className="project-placeholder reveal"><span>CASE STUDY / 001</span><div className="placeholder-graphic"><div className="pixel pixel--one" /><div className="pixel pixel--two" /><div className="pixel pixel--three" /><div className="pixel pixel--four" /><Spark /></div><div><p>PRÓXIMAMENTE</p><h3>Algo está<br />tomando forma.</h3></div><span className="placeholder-arrow">↗</span></div></section>

      <footer id="contacto"><div className="footer-top shell"><p className="footer-label">¿HABLAMOS?</p><h2>Hagamos algo<br /><em>delicioso.</em></h2><a className="footer-email" href="mailto:hola@alejandrogarcia.dev">hola@alejandrogarcia.dev <Arrow /></a></div><div className="footer-bottom shell"><span>© 2026 ALEJANDRO GARCÍA</span><span>HECHO EN MÉXICO <b>✳</b></span><a href="#inicio">VOLVER ARRIBA ↑</a></div></footer>
    </main>
  )
}

export default App
