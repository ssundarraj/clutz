declare namespace ಠ_ಠ.clutz.missing_implements {
  class Implements extends Implements_Instance {
  }
  class Implements_Instance implements ಠ_ಠ.clutz.some.thing.Missing {
    private noStructuralTyping_: any;
  }
}
declare namespace goog {
  function require(name: 'missing_implements'): typeof ಠ_ಠ.clutz.missing_implements;
}
declare module 'goog:missing_implements' {
  import alias = ಠ_ಠ.clutz.missing_implements;
  export = alias;
}
