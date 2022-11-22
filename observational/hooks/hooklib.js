let _lib = undefined;
const requredHooks = [
    "useState",
    "useEffect"
];
export function initHooks(hooksLibrary) {
    if (!hooksLibrary) {
        throw new Error("hooks library must be defined");
    }
    for (const key of requredHooks) {
        if (hooksLibrary.hasOwnProperty(key) === false) {
            throw new Error("hooks library must have " + key + " hook");
        }
    }
    if (typeof hooksLibrary.useEffect !== "function") {
        throw new Error("hooks library must have useEffect hook");
    }
    _lib = hooksLibrary || undefined;
}
export function requireLib() {
    if (!_lib) {
        throw new Error("Observational hooks library not initialised.\
            To call the library from you application's init file\
            Use:\
            import { initHooks } from \"observational\\hooks\";\
            import { useState, useEffect } from \"react\";\
            initHooks({ useState, useEffect });");
    }
    return _lib;
}
