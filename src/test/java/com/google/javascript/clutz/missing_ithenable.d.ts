declare namespace ಠ_ಠ.clutz.goog {
  /**
   * Provides a more strict interface for Thenables in terms of
   * http://promisesaplus.com for interop with {@see goog.Promise}.
   */
  interface Thenable < TYPE > extends IThenable {
    /**
     * Adds callbacks that will operate on the result of the Thenable, returning a
     * new child Promise.
     *
     * If the Thenable is fulfilled, the {@code onFulfilled} callback will be
     * invoked with the fulfillment value as argument, and the child Promise will
     * be fulfilled with the return value of the callback. If the callback throws
     * an exception, the child Promise will be rejected with the thrown value
     * instead.
     *
     * If the Thenable is rejected, the {@code onRejected} callback will be invoked
     * with the rejection reason as argument, and the child Promise will be rejected
     * with the return value of the callback or thrown value.
     * @param opt_onFulfilled A function that will be invoked with the fulfillment value if the Promise is fulfilled.
     * @param opt_onRejected A function that will be invoked with the rejection reason if the Promise is rejected.
     * @param opt_context An optional context object that will be the execution context for the callbacks. By default, functions are executed with the default this.
     */
    then < RESULT > (opt_onFulfilled ? : ( (a : TYPE ) => Thenable < RESULT > | RESULT ) | null , opt_onRejected ? : ( (a : any ) => any ) | null) : Thenable < RESULT > ;
  }
}
declare namespace ಠ_ಠ.clutz.goog.Thenable {
  var IMPLEMENTED_BY_PROP : string ;
  function addImplementation (ctor : { new ( ...a : any [] ) : ಠ_ಠ.clutz.goog.Thenable < any > } ) : void ;
  function isImplementedBy (object : any ) : boolean ;
}
declare module 'goog:goog.Thenable' {
  import alias = ಠ_ಠ.clutz.goog.Thenable;
  export default alias;
}
