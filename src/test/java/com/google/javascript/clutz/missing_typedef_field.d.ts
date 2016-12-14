declare namespace ಠ_ಠ.clutz.missing_typedef_field {
  type TypedefField = { x : ಠ_ಠ.clutz.some.thing.Missing | null , y : string } ;
}
declare module 'goog:missing_typedef_field' {
  import alias = ಠ_ಠ.clutz.missing_typedef_field;
  export = alias;
}
