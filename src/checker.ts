import ts from "typescript";
import path from "node:path";

export interface TypeDiagnostic {
  file: string;
  /** 1-based line number */
  line: number;
  /** 1-based column number */
  col: number;
  code: number | string;
  message: string;
  sourceLine: string;
  frame: string;
}

export function projectRoot(): string {
  return path.resolve(import.meta.dir, "..");
}

let service: ts.LanguageService | undefined;
let options: ts.CompilerOptions | undefined;
let fileNames: string[] = [];
const extraFiles = new Set<string>();
const versions = new Map<string, number>();
const contents = new Map<string, string | undefined>();

function norm(p: string): string {
  return path.normalize(p).toLowerCase();
}

function ensureService(): ts.LanguageService {
  if (service && options) return service;
  const root = projectRoot();
  const configPath = ts.findConfigFile(root, ts.sys.fileExists, "tsconfig.json");
  if (!configPath) throw new Error("tsconfig.json not found above src/");
  const configFile = ts.readConfigFile(configPath, ts.sys.readFile);
  if (configFile.error) {
    throw new Error(
      `Failed to read tsconfig: ${ts.flattenDiagnosticMessageText(configFile.error.messageText, " ")}`,
    );
  }
  const parsed = ts.parseJsonConfigFileContent(configFile.config, ts.sys, path.dirname(configPath));
  if (parsed.errors.length > 0) {
    const msg = parsed.errors.map((e) => ts.flattenDiagnosticMessageText(e.messageText, " ")).join("; ");
    throw new Error(`Failed to parse tsconfig: ${msg}`);
  }
  options = parsed.options;
  fileNames = parsed.fileNames;
  for (const f of fileNames) {
    const k = norm(f);
    if (!versions.has(k)) versions.set(k, 1);
  }
  const host: ts.LanguageServiceHost = {
    getCompilationSettings: () => options!,
    getScriptFileNames: () => [...fileNames, ...extraFiles],
    getScriptVersion: (f) => String(versions.get(norm(f)) ?? 1),
    getScriptSnapshot: (f) => {
      if (!ts.sys.fileExists(f)) return undefined;
      const c = ts.sys.readFile(f);
      if (c === undefined) return undefined;
      return ts.ScriptSnapshot.fromString(c);
    },
    getCurrentDirectory: () => root,
    getDefaultLibFileName: (o) => ts.getDefaultLibFilePath(o),
    fileExists: ts.sys.fileExists,
    readFile: ts.sys.readFile,
    readDirectory: ts.sys.readDirectory,
    directoryExists: ts.sys.directoryExists,
    getDirectories: ts.sys.getDirectories,
    realpath: ts.sys.realpath,
    useCaseSensitiveFileNames: () => false,
    getNewLine: () => ts.sys.newLine,
  };
  service = ts.createLanguageService(host, ts.createDocumentRegistry());
  return service;
}

/** Type-check a single file. Returns sorted syntactic + semantic diagnostics for that file. */
export function checkFile(absPath: string): TypeDiagnostic[] {
  const svc = ensureService();
  const abs = path.normalize(absPath);
  const key = norm(abs);
  let current: string | undefined;
  try {
    current = ts.sys.readFile(abs);
  } catch {
    current = undefined;
  }
  if (current !== contents.get(key)) {
    contents.set(key, current);
    versions.set(key, (versions.get(key) ?? 0) + 1);
  }
  if (!fileNames.some((f) => norm(f) === key) && !extraFiles.has(abs)) {
    extraFiles.add(abs);
    versions.set(key, versions.get(key) ?? 1);
  }
  const all = [...svc.getSyntacticDiagnostics(abs), ...svc.getSemanticDiagnostics(abs)];
  const out: TypeDiagnostic[] = [];
  for (const d of all) {
    if (!d.file || d.start === undefined) {
      out.push({
        file: abs,
        line: 1,
        col: 1,
        code: d.code,
        message: ts.flattenDiagnosticMessageText(d.messageText, " "),
        sourceLine: "",
        frame: "",
      });
      continue;
    }
    const { line, character } = d.file.getLineAndCharacterOfPosition(d.start);
    const srcLines = d.file.text.split("\n");
    const l = line + 1;
    const target = srcLines[line] ?? "";
    const prevLine = line > 0 ? srcLines[line - 1] : undefined;
    let frame = "";
    if (prevLine !== undefined) frame += `  ${l - 1} | ${prevLine}\n`;
    frame += `  ${l} | ${target}\n`;
    frame += `  ${" ".repeat(String(l).length)} | ${" ".repeat(Math.max(0, character))}^`;
    out.push({
      file: abs,
      line: l,
      col: character + 1,
      code: d.code,
      message: ts.flattenDiagnosticMessageText(d.messageText, " "),
      sourceLine: target,
      frame,
    });
  }
  out.sort((a, b) => a.line - b.line || a.col - b.col);
  return out;
}

export function formatDiagnostic(d: TypeDiagnostic): string {
  const rel = path.relative(projectRoot(), d.file);
  return `${rel}:${d.line}:${d.col}  TS${d.code}  ${d.message}`;
}
