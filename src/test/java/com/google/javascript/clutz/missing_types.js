goog.provide('missing_types');

goog.require('some.thing.Missing');

/** @constructor @extends {some.thing.Missing} */
missing_types.Extends = function() {}

/** @constructor @implements {some.thing.Missing} */
missing_types.Implements = function() {}

/** @interface @extends {some.thing.Missing} */
missing_types.InterfaceExtends = function() {}

/** @constructor */
missing_types.ClassField = function() {}
/** @type {!some.thing.Missing} */
missing_types.ClassField.prototype.field;

/** @type {!some.thing.Missing|string} */
missing_types.unionType;

/** @constructor @template T */
missing_types.Templatized = function() {}
/** @type {!missing_types.Templatized<!some.thing.Missing>} */
missing_types.templatized;

/** @typedef {{x: some.thing.Missing, y: string}} */
missing_types.TypedefField = function() {}

/** @typedef {some.thing.Missing} */
missing_types.TypedefAlias = function() {}

/**
 * @param {!some.thing.Missing} a
 * @return {!some.thing.Missing}
 */
missing_types.fn = function(a) {}

missing_types.fnUsesMissingNs = function() {
  missing_types.missingNamespace.foo();
  missingTopLevelNamespace.bar();
};