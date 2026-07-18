# Deploy del sitio — Cloudflare Pages

> ⏳ **Pendiente.** Se hace **después** de publicar la app. El repo ya está listo
> (sitio estático, `index.html` en la raíz, `.nojekyll`).

## Opción elegida: Cloudflare Pages conectado a GitHub
Auto-deploy en cada `git push` a `main`. Se hace en el **dashboard de la cuenta
personal** de Cloudflare (no toca la sesión de wrangler de Partilo).

## Pasos

1. Entrar a [dash.cloudflare.com](https://dash.cloudflare.com) y **verificar arriba
   a la derecha que sea la cuenta PERSONAL** (no la de Partilo/trabajo). Cambiar con
   el selector de cuenta si hace falta.
2. Menú lateral: **Workers & Pages** → **Create** → pestaña **Pages** → **Connect to Git**.
3. **Autorizar GitHub** → cuenta/org **lisoflores** → repo **`stickerya-website`** → **Begin setup**.
4. **Build settings** (sitio estático):

   | Campo | Valor |
   |-------|-------|
   | Project name | `stickerya-website` (o `stickerya`) |
   | Production branch | `main` |
   | Framework preset | **None** |
   | Build command | *(vacío)* |
   | Build output directory | `/` (la raíz, donde está `index.html`) |

5. **Save and Deploy** → esperar ~1 min.
6. Queda online en `https://stickerya-website.pages.dev` (o similar). Cada push a `main` redespliega solo.

## Dominio propio (opcional)
- Proyecto → **Custom domains** → Add → `stickerya.app` (si está en Cloudflare, 2 clics).

## ⚠️ Después de tener la URL final — pedirle a Claude que actualice
Los meta usan `https://stickerya.app` como **placeholder**. Con la URL definitiva
(la `pages.dev` o el dominio propio), actualizar:

- `canonical`, `og:url`, `og:image`, `twitter:image` en `index.html`, `privacidad.html`, `contacto.html`.
- `PRIVACY_URL` en la app (`SettingsScreen.kt`), para que el botón de privacidad abra la política real.
- (Opcional) Subir/confirmar `og-image.png` accesible en esa URL para el preview al compartir.

## Notas
- El sitio ya tiene **Google Analytics (gtag `G-CGMSL0RC98`)** en las 3 páginas.
- i18n (es/en/pt) con auto-detección + picker + `localStorage` — no requiere config de hosting.
- `.nojekyll` es inofensivo en Cloudflare (era para GitHub Pages).
