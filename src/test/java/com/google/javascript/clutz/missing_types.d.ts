declare namespace ಠ_ಠ.clutz.missing_types {
  class ClassField extends ClassField_Instance {
  }
  class ClassField_Instance {
    private noStructuralTyping_: any;
    field : ಠ_ಠ.clutz.some.thing.Missing ;
  }
  class Extends extends Extends_Instance {
  }
  class Extends_Instance extends ಠ_ಠ.clutz.some.thing.Missing_Instance {
  }
  class Implements extends Implements_Instance {
  }
  class Implements_Instance implements ಠ_ಠ.clutz.some.thing.Missing {
    private noStructuralTyping_: any;
  }
  interface InterfaceExtends extends ಠ_ಠ.clutz.some.thing.Missing {
  }
  class Templatized < T > extends Templatized_Instance < T > {
  }
  class Templatized_Instance < T > {
    private noStructuralTyping_: any;
  }
  type TypedefAlias = ಠ_ಠ.clutz.some.thing.Missing | null ;
  type TypedefField = { x : ಠ_ಠ.clutz.some.thing.Missing | null , y : string } ;
  function fn (a : ಠ_ಠ.clutz.some.thing.Missing ) : ಠ_ಠ.clutz.some.thing.Missing ;
  function fnUsesMissingNs ( ) : void ;
  var templatized : ಠ_ಠ.clutz.missing_types.Templatized < any > ;
  var unionType : ಠ_ಠ.clutz.some.thing.Missing | string ;
}
declare namespace goog {
  function require(name: 'missing_types'): typeof ಠ_ಠ.clutz.missing_types;
}
declare module 'goog:missing_types' {
  import alias = ಠ_ಠ.clutz.missing_types;
  export = alias;
}
