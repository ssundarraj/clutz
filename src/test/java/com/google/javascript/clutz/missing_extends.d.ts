declare namespace ಠ_ಠ.clutz.missing_extends {
  class X extends X_Instance {
  }
  class X_Instance extends ಠ_ಠ.clutz.UnknownType {
  }
}
declare namespace goog {
  function require(name: 'missing_extends.X'): typeof ಠ_ಠ.clutz.missing_extends.X;
}
declare module 'goog:missing_extends.X' {
  import alias = ಠ_ಠ.clutz.missing_extends.X;
  export default alias;
}
