declare namespace ಠ_ಠ.clutz.foo {
  type Bar = ಠ_ಠ.clutz.$jscomp.scope.Bar ;
  var Bar : typeof ಠ_ಠ.clutz.$jscomp.scope.Bar ;
}
declare namespace goog {
  function require(name: 'foo.Bar'): typeof ಠ_ಠ.clutz.foo.Bar;
}
declare module 'goog:foo.Bar' {
  import alias = ಠ_ಠ.clutz.foo.Bar;
  export default alias;
}
declare namespace ಠ_ಠ.clutz.foo {
  type IBar = ಠ_ಠ.clutz.$jscomp.scope.IBar ;
}
declare module 'goog:foo.IBar' {
  import alias = ಠ_ಠ.clutz.foo.IBar;
  export default alias;
}
declare namespace ಠ_ಠ.clutz.foo {
  var boom : ಠ_ಠ.clutz.$jscomp.scope.Bar | null ;
}
declare namespace goog {
  function require(name: 'foo.boom'): typeof ಠ_ಠ.clutz.foo.boom;
}
declare module 'goog:foo.boom' {
  import alias = ಠ_ಠ.clutz.foo.boom;
  export default alias;
}
declare namespace ಠ_ಠ.clutz.foo {
  var iboom : ಠ_ಠ.clutz.$jscomp.scope.IBar | null ;
}
declare namespace goog {
  function require(name: 'foo.iboom'): typeof ಠ_ಠ.clutz.foo.iboom;
}
declare module 'goog:foo.iboom' {
  import alias = ಠ_ಠ.clutz.foo.iboom;
  export default alias;
}
declare namespace ಠ_ಠ.clutz.$jscomp.scope {
  class Bar extends Bar_Instance {
  }
  class Bar_Instance {
    private noStructuralTyping_: any;
  }
}
declare namespace ಠ_ಠ.clutz.$jscomp.scope {
  interface IBar {
  }
}
