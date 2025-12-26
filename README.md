# 🙋 Bingo Tico - Cantador Familiar

Aplicación web progresiva (PWA) para cantar bingo en reuniones familiares con cantos tradicionales costarricenses.

## 🌐 Sitio en Producción

**URL:** https://cheito.xyz/bingo-cr/

### 🔄 Para Actualizar el Sitio (IMPORTANTE)

1. Subir TODOS los archivos vía FTP a `/bingo-cr/`
2. **OPCIÓN A - Limpieza Normal:** https://cheito.xyz/bingo-cr/clear-cache.html
3. **OPCIÓN B - Limpieza FORZADA (si A no funciona):** https://cheito.xyz/bingo-cr/force-update.html

**Si ves versiones antiguas después de actualizar:**
- Visita **force-update.html** y haz clic en "FORZAR ACTUALIZACIÓN"
- En Chrome/Edge: F12 → Application → Clear storage → "Clear site data"
- En Firefox: F12 → Storage → Clear All
- En Safari: Develop → Empty Caches

**Para usuarios finales con problemas de caché:**
Envíales: `https://cheito.xyz/bingo-cr/force-update.html`

## ✨ Características

- 📱 **Mobile-first**: Diseñado primero para dispositivos móviles
- 🎲 **Generación aleatoria**: Números del 1 al 75
- 🇨🇷 **Cantos tradicionales**: Cantos costarricenses auténticos para cada número
- 🎨 **Tablero BINGO**: Visualización tipo B-I-N-G-O con 15 números por columna
- 🌐 **Funciona offline**: 100% funcional sin conexión a Internet
- 📵 **Sin zoom accidental**: Previene zoom no deseado en móviles
- 📱 **Safe area**: Compatible con dispositivos con notch (iPhone, etc.)
- 🎯 **Bolas 3D**: Efectos visuales realistas para las bolas
- 📜 **Historial**: Registro de todas las bolas cantadas
- 🔄 **Reinicio rápido**: Comenzar nuevo juego fácilmente

## 🎮 Cantos Tradicionales

La aplicación incluye cantos tradicionales costarricenses como:

- **1**: "El cumiche, el 1"
- **7**: "El de la suerte, el 7"
- **11**: "Las canillas de mi abuela, el 11"
- **22**: "Par de patos, el 22"
- **33**: "La edad de Cristo, el 33"
- **66**: "Los diablitos, el 66"
- **69**: "Pa arriba y pa abajo, el 69"
- Y muchos más...

## 🚀 Cómo usar

### Opción 1: Servidor local simple

1. Abre una terminal en la carpeta `bingo-cr`
2. Ejecuta un servidor HTTP simple:

```bash
# Con Python 3
python -m http.server 8000

# O con Node.js (si tienes http-server instalado)
npx http-server -p 8000
```

3. Abre tu navegador en `http://localhost:8000`

### Opción 2: Abrir directamente (limitado)

Simplemente abre el archivo `index.html` en tu navegador. 

**Nota**: Algunas características de PWA requieren HTTPS o localhost para funcionar completamente.

### Opción 3: Instalar como PWA

1. Abre la aplicación en Chrome/Edge/Safari en tu dispositivo móvil
2. Busca la opción "Agregar a pantalla de inicio" o "Instalar aplicación"
3. La app se instalará como si fuera nativa
4. Podrás usarla sin conexión a Internet

## 📱 Instalación en dispositivos móviles

### iPhone/iPad

1. Abre en Safari
2. Toca el botón de compartir
3. Selecciona "Agregar a pantalla de inicio"
4. Dale un nombre y confirma

### Android

1. Abre en Chrome
2. Toca el menú (⋮)
3. Selecciona "Agregar a pantalla de inicio" o "Instalar aplicación"
4. Confirma la instalación

## 🎯 Cómo jugar

1. **Sacar Bola**: Presiona el botón "🎲 Sacar Bola" para generar un número aleatorio
2. **Ver Canto**: El canto tradicional se mostrará automáticamente
3. **Tablero**: Los números cantados se marcarán en el tablero BINGO
4. **Historial**: Revisa todas las bolas cantadas en la sección de historial
5. **Nuevo Juego**: Presiona "🔄 Nuevo Juego" para reiniciar

## 🎨 Colores del tablero BINGO

- **B (1-15)**: Rojo
- **I (16-30)**: Azul
- **N (31-45)**: Dorado
- **G (46-60)**: Verde
- **O (61-75)**: Naranja

## 🛠️ Tecnologías utilizadas

- HTML5
- CSS3 (Grid, Flexbox, Animaciones)
- JavaScript (ES6+)
- Service Workers (PWA)
- Web App Manifest

## 📦 Archivos del proyecto

```
bingo-cr/
├── index.html          # Estructura HTML principal
├── styles.css          # Estilos y diseño
├── app.js              # Lógica del juego
├── cantos.js           # Cantos tradicionales
├── manifest.json       # Configuración PWA
├── service-worker.js   # Funcionalidad offline
├── icon-192.png        # Icono 192x192
├── icon-512.png        # Icono 512x512
└── README.md           # Este archivo
```

## 🔧 Personalización

### Agregar o modificar cantos

Edita el archivo `cantos.js` y modifica el objeto `CANTOS_TICOS`:

```javascript
const CANTOS_TICOS = {
    1: "Tu canto personalizado",
    // ...
};
```

### Cambiar colores

Edita las variables CSS en `styles.css`:

```css
:root {
    --color-red: #c41e3a;
    --color-blue: #002868;
    /* ... */
}
```

## 📝 Licencia

Este proyecto es de uso libre para reuniones familiares y eventos sociales.

## 🇨🇷 Hecho con ❤️ para familias ticas

¡Que disfruten jugando bingo en sus reuniones familiares!
