/** Prefijo de GitHub Pages (ej. /laselva). Vacío en local. */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ""

/** Ruta a un archivo en /public, compatible con basePath de Pages. */
export function assetPath(path: string): string {
  if (!path.startsWith("/")) return path
  return `${basePath}${path}`
}
