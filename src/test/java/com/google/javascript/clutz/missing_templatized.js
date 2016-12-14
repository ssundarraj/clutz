goog.provide('missing_templatized');

goog.require('some.thing.Missing');

/** @constructor @template T */
missing_templatized.Templatized = function() {}
/** @type {!missing_templatized.Templatized<!some.thing.Missing>} */
missing_templatized.templatized;
