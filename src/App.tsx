import { useEffect, useRef, useState } from 'react'
import './App.css'

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`

const sections = [
  ['inicio', 'Inicio'],
  ['perfil', 'Perfil'],
  ['trayectoria', 'Trayectoria'],
  ['obra', 'Obra culinaria'],
  ['sushi-zen', 'Sushi Zen'],
  ['productos', 'Productos'],
  ['nexvora', 'Nexvora'],
  ['contacto', 'Contacto'],
] as const

const heroVideos = [
  'portfolio/video/01-intro.mp4',
  'portfolio/video/02-process.mp4',
  'portfolio/video/03-finale.mp4',
]

const culinaryPhotos = [
  ['culinary/mezcal-negro.png', 'Cóctel de mezcal negro'],
  ['culinary/filete-ciruela.jpeg', 'Filete con salsa de ciruela'],
  ['images/chocolate-plate.jpeg', 'Postre de chocolate'],
  ['culinary/mousse-maracuya.png', 'Mousse de maracuyá'],
  ['culinary/postre-nitrogeno.png', 'Postre con nitrógeno'],
  ['images/garden-bowl.jpeg', 'Composición gastronómica vegetal'],
  ['images/citrus-dessert.jpeg', 'Postre cítrico'],
  ['images/smoke-coupe.jpeg', 'Presentación con humo'],
] as const

function Arrow({ direction = 'right' }: { direction?: 'right' | 'down' }) {
  return (
    <svg className={`arrow arrow--${direction}`} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
    </svg>
  )
}

function App() {
  const [activeSection, setActiveSection] = useState('inicio')
  const [videoIndex, setVideoIndex] = useState(0)
  const [videoPaused, setVideoPaused] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([])
  const transitionLock = useRef(false)

  const sectionIndex = Math.max(0, sections.findIndex(([id]) => id === activeSection))

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.target.classList.toggle('is-visible', entry.isIntersecting)),
      { threshold: 0.12 },
    )

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target.id) setActiveSection(visible.target.id)
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: [0.05, 0.2, 0.5] },
    )

    document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element))
    sections.forEach(([id]) => {
      const section = document.getElementById(id)
      if (section) sectionObserver.observe(section)
    })

    return () => {
      revealObserver.disconnect()
      sectionObserver.disconnect()
    }
  }, [])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const toggleVideo = async () => {
    const video = videoRefs.current[videoIndex]
    if (!video) return
    if (video.paused) {
      await video.play()
      setVideoPaused(false)
    } else {
      video.pause()
      setVideoPaused(true)
    }
  }

  const advanceVideo = (currentIndex: number) => {
    if (currentIndex !== videoIndex || transitionLock.current || videoPaused) return
    transitionLock.current = true
    const nextIndex = (currentIndex + 1) % heroVideos.length
    const nextVideo = videoRefs.current[nextIndex]
    if (!nextVideo) {
      transitionLock.current = false
      return
    }
    nextVideo.currentTime = 0
    nextVideo.playbackRate = 0.92
    void nextVideo.play()
    setVideoIndex(nextIndex)
    window.setTimeout(() => {
      videoRefs.current[currentIndex]?.pause()
      transitionLock.current = false
    }, 650)
  }

  const copyContact = async (label: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value)
    } catch {
      const input = document.createElement('textarea')
      input.value = value
      input.setAttribute('readonly', '')
      input.style.position = 'fixed'
      input.style.opacity = '0'
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      input.remove()
    }
    setCopied(label)
    window.setTimeout(() => setCopied(null), 1800)
  }

  return (
    <main>
      <section className="hero" id="inicio" aria-labelledby="hero-title">
        {heroVideos.map((src, index) => (
          <video
            ref={(element) => { videoRefs.current[index] = element }}
            className={`hero__video${index === videoIndex ? ' is-active' : ''}`}
            autoPlay={index === 0}
            muted
            playsInline
            preload="auto"
            onLoadedMetadata={(event) => { event.currentTarget.playbackRate = 0.92 }}
            onTimeUpdate={(event) => {
              const video = event.currentTarget
              if (video.duration - video.currentTime < 0.55) advanceVideo(index)
            }}
            onEnded={() => advanceVideo(index)}
            aria-hidden="true"
            key={src}
          >
            <source src={asset(src)} type="video/mp4" />
          </video>
        ))}
        <div className="hero__veil" aria-hidden="true" />

        <header className="hero__header shell">
          <button className="brand" type="button" onClick={() => scrollToSection('inicio')} aria-label="Volver al inicio">
            AG<span>_</span>
          </button>

          <div className="live-index" aria-label="Progreso del portfolio">
            <div className="live-index__meta">
              <span>{sections[sectionIndex][1]}</span>
            </div>
            <div className="live-index__track" aria-hidden="true"><i /></div>
            <button type="button" onClick={toggleVideo} aria-label={videoPaused ? 'Reproducir video' : 'Pausar video'}>
              {videoPaused ? '▶ REPRODUCIR' : 'Ⅱ PAUSAR'}
            </button>
          </div>
        </header>

        <div className="hero__content shell">
          <p className="hero__role">COFUNDADOR DE NEXVORA <span>·</span> FUNDADOR DE KITCHEN OPS</p>
          <h1 id="hero-title">De los<br /><em>fogones</em><br />al futuro.</h1>
          <p className="hero__intro">Licenciado en Gastronomía especializado en transformar experiencia operativa real en productos, marcas y soluciones digitales.</p>
          <div className="hero__actions">
            <button className="button button--outline" type="button" onClick={() => scrollToSection('perfil')}>Conoce mi historia <Arrow /></button>
            <button className="text-button" type="button" onClick={() => scrollToSection('contacto')}>Trabajemos juntos <span>↘</span></button>
          </div>
        </div>

        <div className="hero__footer shell">
          <nav aria-label="Accesos principales">
            <button type="button" onClick={() => scrollToSection('obra')}>Obra</button>
            <button type="button" onClick={() => scrollToSection('sushi-zen')}>Diseño</button>
            <button type="button" onClick={() => scrollToSection('productos')}>Productos</button>
          </nav>
          <span>TULUM, MX</span>
          <button className="scroll-cue" type="button" onClick={() => scrollToSection('perfil')}>DESCUBRE LA HISTORIA <Arrow direction="down" /></button>
        </div>
      </section>

      <section className="profile section" id="perfil" aria-labelledby="profile-title">
        <div className="shell profile__grid">
          <div className="profile__copy reveal">
            <p className="eyebrow"><span>01</span> PERFIL</p>
            <p className="script-note">Una misma disciplina,<br />un nuevo lenguaje.</p>
            <h2 id="profile-title">Cocina, diseño<br />y producto<br /><em>con propósito.</em></h2>
            <p className="profile__lead">Soy Alejandro García Bazán. Mi carrera comenzó creando experiencias desde la cocina y evolucionó hacia la construcción de productos digitales.</p>
            <p>Hoy combino criterio gastronómico, dirección de producto, diseño de experiencia y desarrollo de software para convertir necesidades operativas complejas en soluciones digitales claras, funcionales y medibles.</p>
            <dl className="profile__facts">
              <div><dt>Base</dt><dd>Gastronomía</dd></div>
              <div><dt>Enfoque</dt><dd>Producto digital</dd></div>
              <div><dt>Método</dt><dd>Investigar · construir · validar</dd></div>
            </dl>
          </div>
          <div className="profile__portrait reveal">
            <div className="profile__halo" aria-hidden="true" />
            <img src={asset('portfolio/profile/alejandro-chef.png')} alt="Avatar de Alejandro García Bazán como chef y creador digital" />
            <span className="profile__tag profile__tag--one">CHEF</span>
            <span className="profile__tag profile__tag--two">FOUNDER</span>
            <span className="profile__tag profile__tag--three">DEVELOPER</span>
          </div>
        </div>
      </section>

      <section className="journey" id="trayectoria" aria-labelledby="journey-title">
        <div className="shell">
          <div className="section-heading reveal">
            <p className="eyebrow eyebrow--light"><span>02</span> EVOLUCIÓN</p>
            <h2 id="journey-title">La profesión cambió.<br /><em>El rigor permanece.</em></h2>
          </div>
          <div className="journey__steps">
            <article className="reveal"><span>01</span><p>Experiencia profesional</p><h3>Gastronomía</h3><small>Operación, servicio, precisión y trabajo con equipos.</small></article>
            <article className="reveal"><span>02</span><p>Comunicación visual</p><h3>Diseño</h3><small>Marcas, menús y piezas comerciales para restaurantes.</small></article>
            <article className="reveal"><span>03</span><p>Soluciones reales</p><h3>Producto</h3><small>Investigación, UX, programación y decisiones funcionales.</small></article>
            <article className="reveal"><span>04</span><p>Construcción de futuro</p><h3>Fundación</h3><small>Nexvora, Kitchen Ops y nuevos sistemas digitales.</small></article>
          </div>
        </div>
      </section>

      <section className="culinary section" id="obra" aria-labelledby="culinary-title">
        <div className="shell culinary__intro reveal">
          <p className="eyebrow"><span>03</span> OBRA CULINARIA</p>
          <h2 id="culinary-title"><strong>VISIÓN</strong> CON<br /><strong>DETERMINACIÓN</strong><br />HASTA TOMAR <strong>FORMA.</strong></h2>
          <p>La evidencia de una profesión construida entre técnica, sensibilidad y ejecución.</p>
        </div>
        <div className="film reveal" aria-label="Galería gastronómica">
          <div className="film__track">
            {[0, 1].map((group) => (
              <div className="film__group" aria-hidden={group === 1} key={group}>
                {culinaryPhotos.map(([src, alt], index) => (
                  <figure key={`${src}-${group}`}><img src={asset(src)} alt={group === 0 ? alt : ''} loading={group === 0 && index < 5 ? 'eager' : 'lazy'} /></figure>
                ))}
              </div>
            ))}
          </div>
        </div>
        <p className="culinary__closing shell reveal">La precisión en cada detalle convierte lo visual en una <em>experiencia memorable.</em></p>
      </section>

      <section className="case-study section" id="sushi-zen" aria-labelledby="sushi-title">
        <div className="shell">
          <div className="case-study__heading reveal">
            <div><p className="eyebrow"><span>04</span> CASO REAL · SUSHI ZEN</p><h2 id="sushi-title">Diseñar también es<br /><em>servir una experiencia.</em></h2></div>
            <p>Proyecto de comunicación visual para un negocio de comida japonesa: campaña promocional y diseño editorial de menú.</p>
          </div>
          <div className="sushi-grid">
            <article className="sushi-card sushi-card--campaign reveal">
              <div className="sushi-card__copy"><span>IDENTIDAD COMERCIAL / 01</span><h3>Marketing<br />para restaurante</h3><p>Una pieza vertical pensada para comunicar oferta, carácter y recordación de marca.</p></div>
              <img src={asset('portfolio/sushi-zen/marketing-lona.png')} alt="Diseño de lona promocional para Sushi Zen" loading="lazy" />
            </article>
            <article className="sushi-card sushi-card--menu reveal">
              <div className="sushi-card__copy"><span>DISEÑO EDITORIAL / 02</span><h3>Creación<br />de menús</h3><p>Jerarquía, legibilidad y una presentación coherente con el concepto del restaurante.</p></div>
              <div className="menu-spread">
                <img src={asset('portfolio/sushi-zen/menu-cara-1.png')} alt="Primera cara del menú de Sushi Zen" loading="lazy" />
                <img src={asset('portfolio/sushi-zen/menu-cara-2.png')} alt="Segunda cara del menú de Sushi Zen" loading="lazy" />
              </div>
            </article>
          </div>
          <div className="coming-soon reveal"><span>PRÓXIMA INCORPORACIÓN</span><p>Modelo de costeo en Excel · En proceso de rediseño para su presentación como herramienta profesional.</p></div>
        </div>
      </section>

      <section className="products section" id="productos" aria-labelledby="products-title">
        <div className="shell">
          <div className="products__heading reveal">
            <p className="eyebrow eyebrow--light"><span>05</span> PRODUCTOS DIGITALES</p>
            <h2 id="products-title">Del conocimiento operativo<br />a sistemas que <em>resuelven.</em></h2>
          </div>
          <article className="product product--kitchen reveal">
            <div className="product__meta"><span>01 / KITCHEN OPS ACADEMY</span><span>PRODUCTO B2B · EN DESARROLLO</span></div>
            <div className="product__body">
              <div><p className="product__role">FUNDADOR · DIRECCIÓN DE PRODUCTO · DESARROLLO</p><h3>Convertir la operación real en aprendizaje aplicable.</h3><p>Plataforma para transformar documentación operativa de restaurantes en conocimiento interactivo, contextual, medible y versionado.</p></div>
              <ol>
                <li><span>01</span> Visión y estrategia de producto</li>
                <li><span>02</span> Arquitectura funcional y roadmap</li>
                <li><span>03</span> UX, programación y validación</li>
              </ol>
            </div>
          </article>

          <article className="product product--drive reveal">
            <div className="product__meta"><span>02 / INTELIDRIVE</span><span>VALIDACIÓN VEHICULAR · EN DESARROLLO</span></div>
            <div className="product__body">
              <div><p className="product__role">COCREACIÓN · UX/UI · PROGRAMACIÓN</p><h3>Entender un historial de mantenimiento sin descifrar cada documento.</h3><p>Sistema que extrae, ordena y valida información de mantenimiento para facilitar decisiones sobre el estado de un vehículo.</p></div>
              <div className="product__visual product__visual--drive">
                <img className="product__logo" src={asset('portfolio/products/intelidrive-logo.png')} alt="Logotipo de InteliDrive Vehicle Intelligence" loading="lazy" />
                <img className="product__dashboard" src={asset('portfolio/products/intelidrive-dashboard.png')} alt="Panel operativo de InteliDrive" loading="lazy" />
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="nexvora section" id="nexvora" aria-labelledby="nexvora-title">
        <div className="shell nexvora__grid">
          <div className="reveal"><p className="eyebrow"><span>06</span> ECOSISTEMA</p><h2 id="nexvora-title">Construir dentro<br />de una visión<br /><em>compartida.</em></h2></div>
          <div className="nexvora__content reveal">
            <div className="nexvora__placeholder"><span>NX</span><p>LOGOTIPO DE NEXVORA<br />PENDIENTE</p></div>
            <p>Como cofundador de Nexvora participo en la dirección, construcción y evolución de productos digitales. Kitchen Ops nace dentro de este ecosistema como el núcleo especializado en soluciones para cocina y hospitalidad.</p>
          </div>
        </div>
      </section>

      <footer id="contacto" className="contact">
        <div className="shell contact__main reveal">
          <p className="eyebrow eyebrow--light"><span>07</span> CONTACTO</p>
          <h2>Convirtamos una idea<br />en algo que <em>funcione.</em></h2>
          <p className="contact__intro">Disponible para conversaciones sobre producto, tecnología, gastronomía y proyectos que conecten estos mundos.</p>
          <div className="contact__actions">
            <button type="button" onClick={() => copyContact('correo', 'alebazan42@gmail.com')}><img className="contact__icon" src={asset('portfolio/icons/gmail.png')} alt="" /><span>CORREO</span><strong>{copied === 'correo' ? 'Copiado' : 'alebazan42@gmail.com'}</strong><Arrow /></button>
            <button type="button" onClick={() => copyContact('whatsapp', '+525624348950')}><img className="contact__icon" src={asset('portfolio/icons/whatsapp.png')} alt="" /><span>WHATSAPP</span><strong>{copied === 'whatsapp' ? 'Copiado' : '+52 56 2434 8950'}</strong><Arrow /></button>
            <div className="contact__pending"><span>LINKEDIN</span><strong>Próximamente</strong></div>
          </div>
        </div>
        <div className="shell contact__bottom"><span>© 2026 ALEJANDRO GARCÍA BAZÁN</span><span>TULUM, MÉXICO</span><button type="button" onClick={() => scrollToSection('inicio')}>VOLVER ARRIBA ↑</button></div>
      </footer>
    </main>
  )
}

export default App
