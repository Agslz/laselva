import { normalizeBlockedSlots } from "@/lib/blocked-slots"

/** URL de la app web de Google Apps Script (misma para leer y enviar reservas) */
export function getGoogleSheetsUrl(): string | undefined {
  return process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL?.trim() || undefined
}

async function parseJsonResponse(res: Response): Promise<unknown> {
  const text = await res.text()
  try {
    return JSON.parse(text)
  } catch {
    throw new Error("Respuesta inválida del servidor de reservas")
  }
}

export async function fetchBlockedSlots(): Promise<{ date: string; turno: string }[]> {
  const url = getGoogleSheetsUrl()
  if (!url) {
    const res = await fetch("/blocked-slots.json", { cache: "no-store" })
    if (!res.ok) return []
    return res.json()
  }

  const res = await fetch(url, { cache: "no-store" })
  if (!res.ok) throw new Error("No se pudieron cargar los turnos")

  const data = await parseJsonResponse(res)

  if (Array.isArray(data)) return normalizeBlockedSlots(data as { date: string; turno: string }[])

  if (data && typeof data === "object" && "ok" in data && (data as { ok: boolean }).ok === false) {
    throw new Error((data as { error?: string }).error || "No se pudieron cargar los turnos")
  }

  return []
}

const REDEPLOY_MSG =
  "El script de Google no está actualizado. En Apps Script: pegá el Code.gs nuevo, guardá e Implementar → Nueva implementación."

export async function submitReservation(payload: Record<string, unknown>): Promise<void> {
  const url = getGoogleSheetsUrl()
  if (!url) {
    const bodyText = Object.entries(payload)
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n")
    window.location.href = `mailto:reservas@laselva.com?subject=${encodeURIComponent("Nueva reserva - La Selva")}&body=${encodeURIComponent(bodyText)}`
    return
  }

  const json = JSON.stringify(payload)
  const requestUrl = `${url}?action=submit&payload=${encodeURIComponent(json)}`

  // POST con parámetros en la URL evita perder el body en la redirección de Google.
  const res = await fetch(requestUrl, {
    method: "POST",
    redirect: "follow",
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error(`Error al enviar la reserva (${res.status})`)
  }

  const data = await parseJsonResponse(res) as { ok?: boolean; error?: string }

  if (Array.isArray(data)) {
    throw new Error(REDEPLOY_MSG)
  }

  if (data.ok !== true) {
    const msg = data.error || "Error al enviar la reserva"
    if (/turno inv/i.test(msg)) {
      throw new Error(
        "El turno Mañana no está habilitado en Google Apps Script. Abrí el proyecto, pegá el Code.gs actual del repo, guardá e Implementar → Nueva implementación. Actualizá también NEXT_PUBLIC_GOOGLE_SHEETS_URL con la URL /exec nueva."
      )
    }
    throw new Error(msg)
  }
}
