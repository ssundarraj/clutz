goog.provide('missing_typedef_field');

goog.require('some.thing.Missing');

/** @typedef {{x: some.thing.Missing, y: string}} */
missing_typedef_field.TypedefField = function() {}
