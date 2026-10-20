const CLAVE = 'tamo';
const CUMPLE = new Date(2026, 9, 20, 0, 0, 0); // 20 de octubre (mes 9 = octubre)

const RAZONES = [
  'Tu mirada', 'Tu sonrisa', 'Tu forma de hablar', 'Tu risa', 'Tu manera de mirar', 'Tu forma de estar', 'Tu manera de amar',
  'Tu forma de ser', 'Tu manera de querer', 'Tu forma de cuidar', 'Tu manera de proteger', 'Tu forma de escuchar', 'Tu manera de entender',
  'Tu forma de perdonar', 'Tu manera de inspirar', 'Tu forma de iluminar', 'Tu manera de sanar', 'Tu forma de fortalecer', 'Tu manera de guiar', 'Tu forma de amar','Por ser mi niña hermosa' 
];

const FOTOS = [
  { src: 'assets/images/1.jpg', texto: 'Nosotros chiquitos jeje :3' },
  { src: 'assets/images/2.jpg', texto: 'Ese día que...' },
  { src: 'assets/images/Fav.jpg', texto: 'Mi favorita' },
  { src: 'assets/images/3.jpg', texto: 'Tú y yo' }
];

// Catarinas
const CATARINA_HTML = `
  <span class="antena izq"></span>
  <span class="antena der"></span>
  <div class="cabeza"><span class="ojo"></span><span class="ojo"></span></div>
  <div class="ala izq"><span class="brillo"></span></div>
  <div class="ala der"></div>`;

function crearCatarina(tamano) {
  const c = document.createElement('div');
  c.className = 'catarina';
  if (tamano) c.style.setProperty('--t', tamano + 'px');
  c.innerHTML = CATARINA_HTML;
  return c;
}
function lluvia(n) {
  for (let i = 0; i < n; i++) {
    setTimeout(() => {
      const c = crearCatarina();
      c.classList.add('volando');
      c.style.left = Math.random() * 92 + 'vw';
      c.style.top = '100vh';
      c.style.scale = 0.6 + Math.random() * 0.8;
      c.style.animationDuration = 4 + Math.random() * 4 + 's';
      document.body.appendChild(c);
      c.addEventListener('animationend', () => c.remove());
    }, i * 110);
  }
}

// Candado
const LLAVE_DESBLOQUEO = 'eileen-desbloqueado';

function yaDesbloqueado() {
  try { return localStorage.getItem(LLAVE_DESBLOQUEO) === '1'; }
  catch { return false; }
}

function guardarDesbloqueo() {
  try { localStorage.setItem(LLAVE_DESBLOQUEO, '1'); } catch {}
}

function desbloquear({ animado = true } = {}) {
  const candado = document.getElementById('candado');
  if (!animado) candado.style.transition = 'none';
  candado.classList.add('oculto');
  document.body.classList.remove('bloqueado');
  if (animado) {
     lluvia(25);
  }
}

// Para volver a ver el candado: abre la página con ?reset
if (new URLSearchParams(location.search).has('reset')) {
  try { localStorage.removeItem(LLAVE_DESBLOQUEO); } catch {}
}

// Al cargar: si ya entró antes, saltar el candado sin animación
if (yaDesbloqueado()) desbloquear({ animado: false });

document.getElementById('formClave').addEventListener('submit', e => {
  e.preventDefault();
  const valor = document.getElementById('clave').value.trim().toLowerCase();
  const tarjeta = e.currentTarget;

  if (valor === CLAVE) {
    guardarDesbloqueo();
    desbloquear();
  } else {
    document.getElementById('error').textContent = 'Mmm, no. Piénsale tantito 😌';
    tarjeta.classList.remove('sacudir');
    void tarjeta.offsetWidth;
    tarjeta.classList.add('sacudir');
  }
});

// Cuenta regresiva
function actualizarCuenta() {
  const diff = CUMPLE - new Date();
  const el = document.getElementById('cuenta');
  if (diff <= 0) { el.textContent = '¡Hoy es tu día! 🎉'; return; }
  const d = Math.floor(diff / 864e5);
  const h = Math.floor(diff / 36e5) % 24;
  const m = Math.floor(diff / 6e4) % 60;
  const s = Math.floor(diff / 1e3) % 60;
  el.textContent = `Faltan ${d}d ${h}h ${m}m ${s}s`;
}
actualizarCuenta();
setInterval(actualizarCuenta, 1000);

// Razones
const grid = document.getElementById('grid');
const caja = document.getElementById('razonTexto');
RAZONES.forEach((razon, i) => {
  const b = document.createElement('button');
  b.className = 'boton-cat';
  b.appendChild(crearCatarina());
  b.insertAdjacentHTML('beforeend', `<span>${i + 1}</span>`);
  b.addEventListener('click', () => {
    caja.innerHTML = `<p><strong>#${i + 1}</strong><br>${razon}</p>`;
    b.classList.add('vista');
    if (document.querySelectorAll('.boton-cat.vista').length === RAZONES.length && !grid.dataset.listo) {
      grid.dataset.listo = '1';
      setTimeout(() => {
        caja.innerHTML = '<p><strong>¡Las encontraste todas!</strong><br>Y aun así me faltan razones 💕</p>';
        lluvia(30);
      }, 2500);
    }
  });
  grid.appendChild(b);
});

// Fotos
const contFotos = document.getElementById('fotos');
FOTOS.forEach((f, i) => {
  const div = document.createElement('div');
  div.className = 'polaroid';
  div.style.setProperty('--r', (i % 2 ? 3 : -3) + 'deg');
  div.innerHTML = `<img src="${f.src}" alt="${f.texto}" loading="lazy"><p>${f.texto}</p>`;
  contFotos.appendChild(div);
});

// Libro
document.getElementById('libro').addEventListener('click', e => {
  e.currentTarget.classList.add('abierto');
});

// Deseo
document.getElementById('btnDeseo').addEventListener('click', () => lluvia(40));


// Aparecer al hacer scroll
const obs = new IntersectionObserver(entradas => {
  entradas.forEach(en => { if (en.isIntersecting) en.target.classList.add('visible'); });
}, { threshold: 0.15 });
document.querySelectorAll('.revelar').forEach(el => obs.observe(el));