declare namespace ಠ_ಠ.clutz.missing_union {
  var unionType : ಠ_ಠ.clutz.some.thing.Missing | string ;
}
declare namespace goog {
  function require(name: 'missing_union'): typeof ಠ_ಠ.clutz.missing_union;
}
declare module 'goog:missing_union' {
  import alias = ಠ_ಠ.clutz.missing_union;
  export = alias;
}
