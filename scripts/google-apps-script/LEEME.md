# Reservas con Google Sheets + Apps Script

Guía para conectar el calendario de la web con tu planilla de Google.

---

## ¿Qué vas a lograr?

- Cuando alguien reserva desde la web → **aparece una fila nueva** en tu planilla.
- Vos revisás y cambiás el estado a **Confirmada**.
- Ese turno **queda bloqueado** en el calendario para que nadie más lo elija.

---

## Paso 1 — Crear la planilla

1. Entrá a [Google Sheets](https://sheets.google.com).
2. Creá una planilla nueva.
3. Nombrala: **La Selva - Reservas**.
4. Renombrá la primera pestaña (abajo) a: **Reservas**.

No hace falta escribir encabezados: el script los crea solo la primera vez que llega una reserva.

---

## Paso 2 — Pegar el script

1. En la planilla, copiá el **ID** de la URL:
   `https://docs.google.com/spreadsheets/d/ESTE_ES_EL_ID/edit`
2. En la planilla: **Extensiones → Apps Script**.
3. Borrá todo el código que aparezca.
4. Copiá todo el contenido de `Code.gs` (en esta misma carpeta del proyecto).
5. **Reemplazá** `PEGAR_ID_DE_TU_PLANILLA_AQUI` por tu ID real (línea 9 del script).
6. Guardá (Ctrl+S o ícono diskette).
7. Nombrá el proyecto: **La Selva Reservas**.

### Probar que escribe en la planilla

1. En Apps Script, seleccioná la función **`pruebaEscritura`** arriba del editor.
2. Clic en **Ejecutar**.
3. Volvé a tu planilla → pestaña **Reservas** → debería aparecer una fila de prueba.

> **Importante:** Las reservas se guardan en la pestaña **Reservas**, no en "Hoja 1".

---

## Paso 3 — Publicar la app web

1. En Apps Script: **Implementar → Nueva implementación**.
2. Tipo: **Aplicación web**.
3. Configuración:
   - **Ejecutar como:** Yo
   - **Quién tiene acceso:** Cualquier persona
4. Clic en **Implementar**.
5. Autorizá los permisos cuando Google lo pida.
6. **Copiá la URL** que termina en `/exec`.

Ejemplo: `https://script.google.com/macros/s/ABC123.../exec`

---

## Paso 4 — Conectar la web

En la carpeta del proyecto, creá el archivo **`.env.local`**:

```
NEXT_PUBLIC_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/TU_URL_AQUI/exec
```

Reemplazá `TU_URL_AQUI` con tu URL real del paso 3.

Reiniciá el servidor de desarrollo para que tome la variable.

### Si publicás en GitHub Pages

1. GitHub → tu repo → **Settings → Secrets and variables → Actions**.
2. Creá un secret: **`GOOGLE_SHEETS_URL`** con la misma URL `/exec`.

---

## Paso 5 — Uso diario de la planilla

Cada reserva nueva llega con estado **Pendiente**.

| Columna | Significado |
|---------|-------------|
| Fecha | Día del evento (`2026-06-15`) |
| Turno | `tarde` o `noche` |
| Nombre / Apellido | Quien reserva |
| Agasajado | Cumpleañero/a |
| Estado | Pendiente → **Confirmada** o Cancelada |

**Confirmar:** cambiá `Pendiente` por **`Confirmada`** → el turno se bloquea en la web.

**Cancelar:** cambiá a **`Cancelada`** → el turno vuelve a estar libre.

---

## Resumen del flujo

```
Cliente reserva en la web
        ↓
Nueva fila en Google Sheets (Estado: Pendiente)
        ↓
Vos revisás y ponés "Confirmada"
        ↓
El calendario bloquea ese turno
```

---

## Problemas frecuentes

**No llegan reservas**
- Verificá que `.env.local` tenga la URL correcta (termina en `/exec`).
- Si cambiaste el código en Apps Script, volvé a **Implementar → Nueva implementación**.

**El turno no se bloquea**
- El estado debe ser exactamente **`Confirmada`**.
- Fecha en formato `2026-06-15`, turno `tarde` o `noche`.

**Error de permisos**
- La implementación debe ser accesible para **Cualquier persona**.

**Cambiaste el script**
- Siempre creá una **Nueva implementación** (no solo guardar). La URL puede cambiar.
