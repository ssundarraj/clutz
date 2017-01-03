declare namespace ಠ_ಠ.clutz.missing_templatized {
  class Templatized < T > extends Templatized_Instance < T > {
  }
  class Templatized_Instance < T > {
    private noStructuralTyping_: any;
  }
  var templatized : ಠ_ಠ.clutz.missing_templatized.Templatized < ಠ_ಠ.clutz.some.thing.Missing > ;
}
declare namespace goog {
  function require(name: 'missing_templatized'): typeof ಠ_ಠ.clutz.missing_templatized;
}
declare module 'goog:missing_templatized' {
  import alias = ಠ_ಠ.clutz.missing_templatized;
  export = alias;
}
