declare namespace ಠ_ಠ.clutz.missing_fn {
  function fn (a : any ) : any ;
}
declare namespace goog {
  function require(name: 'missing_fn'): typeof ಠ_ಠ.clutz.missing_fn;
}
declare module 'goog:missing_fn' {
  import alias = ಠ_ಠ.clutz.missing_fn;
  export = alias;
}
