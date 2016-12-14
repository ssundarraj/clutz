declare namespace ಠ_ಠ.clutz.missing_extends {
  class Extends extends Extends_Instance {
  }
  class Extends_Instance extends ಠ_ಠ.clutz.some.thing.Missing_Instance {
  }
}
declare namespace goog {
  function require(name: 'missing_extends'): typeof ಠ_ಠ.clutz.missing_extends;
}
declare module 'goog:missing_extends' {
  import alias = ಠ_ಠ.clutz.missing_extends;
  export = alias;
}
