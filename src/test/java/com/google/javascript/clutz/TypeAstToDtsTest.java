package com.google.javascript.clutz;

import static com.google.common.truth.Truth.assertThat;

import com.google.common.truth.StringSubject;
import com.google.javascript.jscomp.parsing.JsDocInfoParser;
import com.google.javascript.rhino.Node;
import org.junit.Test;

public class TypeAstToDtsTest {
  @Test
  public void testBultins() throws Exception {
    assertType("?").isEqualTo("any");
    assertType("*").isEqualTo("{}");
    assertType("void").isEqualTo("void");
  }

  @Test
  public void testTypeName() throws Exception {
    assertType("boolean").isEqualTo("boolean");
    assertType("foo.Bar").isEqualTo("foo.Bar|null");
    assertType("!foo.Bar").isEqualTo("foo.Bar");
    assertType("Array<string>").isEqualTo("string[]");
    assertType("foo.Bar<Baz, foo.Bam<string, number>>")
        .isEqualTo("foo.Bar<Baz|null, foo.Bam<string, number>>");
  }

  @Test
  public void testNullable() throws Exception {
    assertType("?boolean").isEqualTo("boolean|null");
    assertType("!(?boolean)").isEqualTo("boolean");
    assertType("!(boolean|undefined)").isEqualTo("boolean");
    assertType("!(number|null|string)").isEqualTo("number|string");
  }

  @Test
  public void testFunctions() throws Exception {
    assertType("function()").isEqualTo("() => void");
    assertType("function(!boolean=, ?boolean=)")
        .isEqualTo("(p1?: boolean, p2?: boolean|null) => void");
    // new, this
  }

  @Test
  public void testRecordType() {
    assertType("{foo: string, bar: {baz: number}}").isEqualTo("{foo: string, bar: {baz: number}}");
  }
  
  @Test
  public void testUnion() throws Exception {
    assertType("number|string").isEqualTo("number|string");
  }

  private StringSubject assertType(String typeString) {
    Node parsed = JsDocInfoParser.parseTypeString(typeString);
    assertThat(parsed).named("parseJsDoc(%s)", typeString).isNotNull();
    return assertThat(TypeAstToDts.convertNode(parsed, false));
  }
}
