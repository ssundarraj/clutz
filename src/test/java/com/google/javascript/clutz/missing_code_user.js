goog.provide('missing_code_user');

goog.require('some.thing.Missing');

missing_code_user.fnUsesMissingNs = function() {
  missing_code_user.missingNamespace.foo();
  missingTopLevelNamespace.bar();
};
