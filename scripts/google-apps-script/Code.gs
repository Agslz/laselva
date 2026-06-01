/**
 * La Selva Pelotero — Reservas con Google Sheets
 *
 * ID de planilla (de la URL):
 * https://docs.google.com/spreadsheets/d/ESTE_ID/edit
 */

var SPREADSHEET_ID = "1kh_Of7QGneVvHYBsV0AzKoPtYEp3AKpaPaLHcAsk8zc"

var HOJA = "Reservas"

var TURNOS_VALIDOS = ["manana", "tarde", "noche"]

var COLUMNAS = [
  "Fecha",
  "Turno",
  "Horario",
  "Nombre",
  "Apellido",
  "Domicilio",
  "Telefono",
  "Email",
  "TipoEvento",
  "Agasajado",
  "Personas",
  "Estado",
  "FechaSolicitud",
]

function doGet(e) {
  try {
    if (e && e.parameter && e.parameter.action === "submit") {
      var datos = parseDatosEntrada(e.parameter.payload)
      guardarReserva(datos)
      return respuestaJson({ ok: true })
    }

    var bloqueados = obtenerTurnosOcupados()
    return respuestaJson(bloqueados)
  } catch (err) {
    return respuestaJson({ ok: false, error: String(err) })
  }
}

function doPost(e) {
  try {
    var datos = parseDatosPost(e)
    guardarReserva(datos)
    return respuestaJson({ ok: true })
  } catch (err) {
    return respuestaJson({ ok: false, error: String(err) })
  }
}

function parseDatosEntrada(payload) {
  if (!payload) throw new Error("No se recibieron datos")
  try {
    return JSON.parse(payload)
  } catch (e1) {
    try {
      return JSON.parse(decodeURIComponent(payload))
    } catch (e2) {
      throw new Error("Datos de reserva inválidos")
    }
  }
}

function parseDatosPost(e) {
  if (!e) throw new Error("No se recibieron datos")

  if (e.parameter && e.parameter.payload) {
    return parseDatosEntrada(e.parameter.payload)
  }

  if (e.postData && e.postData.contents) {
    return JSON.parse(e.postData.contents)
  }

  throw new Error("No se recibieron datos")
}

function obtenerSpreadsheet() {
  if (SPREADSHEET_ID && SPREADSHEET_ID !== "PEGAR_ID_DE_TU_PLANILLA_AQUI") {
    return SpreadsheetApp.openById(SPREADSHEET_ID)
  }
  return SpreadsheetApp.getActiveSpreadsheet()
}

function obtenerHoja() {
  var ss = obtenerSpreadsheet()
  if (!ss) {
    throw new Error("No se encontró la planilla. Verificá SPREADSHEET_ID.")
  }

  var hoja = ss.getSheetByName(HOJA)

  if (!hoja) {
    hoja = ss.insertSheet(HOJA)
    hoja.appendRow(COLUMNAS)
    hoja.getRange(1, 1, 1, COLUMNAS.length).setFontWeight("bold")
    hoja.setFrozenRows(1)
  }

  return hoja
}

function turnoEsValido(turno) {
  return TURNOS_VALIDOS.indexOf(String(turno || "").trim().toLowerCase()) !== -1
}

function turnoEstaOcupado(estado) {
  var e = String(estado || "").trim().toLowerCase()
  return e === "confirmada" || e === "pendiente"
}

function obtenerTurnosOcupados() {
  var hoja = obtenerHoja()
  var filas = hoja.getDataRange().getValues()

  if (filas.length <= 1) return []

  var vistos = {}
  var bloqueados = []

  for (var i = 1; i < filas.length; i++) {
    var fila = filas[i]
    var estado = String(fila[11] || "").trim().toLowerCase()

    if (!turnoEstaOcupado(estado)) continue

    var fecha = normalizarFecha(fila[0])
    var turno = String(fila[1] || "").trim().toLowerCase()

    if (fecha && turnoEsValido(turno)) {
      var clave = fecha + ":" + turno
      if (!vistos[clave]) {
        vistos[clave] = true
        bloqueados.push({ date: fecha, turno: turno })
      }
    }
  }

  return bloqueados
}

function guardarReserva(datos) {
  var hoja = obtenerHoja()
  var fecha = datos.fecha || ""
  var turno = String(datos.turno || "").toLowerCase()

  if (!fecha || !turnoEsValido(turno)) {
    throw new Error("Fecha o turno inválido")
  }

  if (turnoYaOcupado(fecha, turno)) {
    throw new Error("Ese turno ya está reservado")
  }

  hoja.appendRow([
    fecha,
    turno,
    datos.horario || "",
    datos.nombre || "",
    datos.apellido || "",
    datos.domicilio || "",
    datos.telefono || "",
    datos.email || "",
    datos.tipoEvento || "",
    datos.nombreAgasajado || "",
    datos.cantidadPersonas || "",
    "Pendiente",
    new Date(),
  ])

  SpreadsheetApp.flush()
}

function turnoYaOcupado(fecha, turno) {
  var ocupados = obtenerTurnosOcupados()
  for (var i = 0; i < ocupados.length; i++) {
    if (ocupados[i].date === fecha && ocupados[i].turno === turno) {
      return true
    }
  }
  return false
}

function normalizarFecha(valor) {
  if (valor instanceof Date && !isNaN(valor.getTime())) {
    return Utilities.formatDate(valor, Session.getScriptTimeZone(), "yyyy-MM-dd")
  }

  var texto = String(valor).trim()

  if (/^\d{4}-\d{2}-\d{2}$/.test(texto)) return texto

  var dmy = texto.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/)
  if (dmy) {
    var d = ("0" + dmy[1]).slice(-2)
    var m = ("0" + dmy[2]).slice(-2)
    return dmy[3] + "-" + m + "-" + d
  }

  var parsed = new Date(texto)
  if (!isNaN(parsed.getTime())) {
    return Utilities.formatDate(parsed, Session.getScriptTimeZone(), "yyyy-MM-dd")
  }

  return ""
}

function respuestaJson(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON)
}

/** Ejecutá desde Apps Script → fila nueva en pestaña "Reservas" */
function pruebaEscritura() {
  guardarReserva({
    fecha: "2026-12-01",
    turno: "tarde",
    horario: "16:45 - 19:45",
    nombre: "Prueba",
    apellido: "Script",
    domicilio: "Test 123",
    telefono: "2610000000",
    email: "test@test.com",
    tipoEvento: "Cumpleaños infantil",
    nombreAgasajado: "Juan",
    cantidadPersonas: 20,
  })
}
