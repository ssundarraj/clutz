declare namespace ಠ_ಠ.clutz.missing_field {
  class ClassField extends ClassField_Instance {
  }
  class ClassField_Instance {
    private noStructuralTyping_: any;
    field : ಠ_ಠ.clutz.some.thing.Missing ;
  }
}
declare namespace goog {
  function require(name: 'missing_field'): typeof ಠ_ಠ.clutz.missing_field;
}
declare module 'goog:missing_field' {
  import alias = ಠ_ಠ.clutz.missing_field;
  export = alias;
}
