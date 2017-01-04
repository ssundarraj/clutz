package com.google.javascript.clutz;

import static com.google.common.base.Preconditions.checkArgument;

import com.google.javascript.rhino.JSTypeExpression;
import com.google.javascript.rhino.Node;
import com.google.javascript.rhino.Token;
import java.util.Iterator;
import java.util.stream.Collector;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

class TypeAstToDts {

  private static final Collector<CharSequence, ?, String> PIPE_JOINER = Collectors.joining("|");
  private static final Collector<CharSequence, ?, String> COMMA_JOINER = Collectors.joining(", ");

  static String convert(JSTypeExpression expr) {
    Node root = expr.getRoot();
    return convertNode(root, false);
  }

  static String convertNode(Node n, boolean stripNullUndefined) {
    switch (n.getToken()) {
      case STAR:
        return "{}";
      case EMPTY: // for function types that don't declare a return type
        return "{}";
      case VOID:
        return "void";
      case BANG:
        return convertNode(n.getFirstChild(), true);
      case STRING:
      case NAME:
        String typeName = n.getString();
        switch (typeName) {
          case "boolean":
          case "number":
          case "string":
          case "null":
          case "undefined":
          case "void":
            return typeName;
          case "Array":
            if (n.getChildCount() == 1 && n.getFirstChild().getChildCount() == 1) {
              return convertNode(n.getFirstChild().getFirstChild(), stripNullUndefined) + "[]";
            }
            // FALLTHROUGH
          default:
            if (!n.hasChildren()) {
              return stripNullUndefined ? typeName : typeName + "|null";
            }
            if (!n.getFirstChild().isNormalBlock()) {
              throw unexpectedTypeAst(
                  n, "Unexpected child of string type node: " + n.getFirstChild().getToken());
            }
            Node block = n.getFirstChild();
            return typeName + "<" + convertChildren(block, COMMA_JOINER, false) + ">";
        }
      case QMARK:
        if (!n.hasChildren()) {
          return "any";
        }
        String inner = convertNode(n.getFirstChild(), stripNullUndefined);
        if (stripNullUndefined) {
          return inner;
        }
        return inner + "|null";
      case LC:
        String fields =
            children(n.getFirstChild())
                .map(
                    (Node field) -> {
                      boolean isFieldTypeDeclared = field.getToken() == Token.COLON;
                      Node fieldNameNode = isFieldTypeDeclared ? field.getFirstChild() : field;
                      String fieldName = fieldNameNode.getString();
                      String fieldType =
                          isFieldTypeDeclared
                              ? convertNode(field.getLastChild(), stripNullUndefined)
                              : "any";
                      return fieldName + ": " + fieldType;
                    })
                .collect(COMMA_JOINER);
        return "{" + fields + "}";
      case PIPE:
        switch (n.getChildCount()) {
          case 0:
            throw unexpectedTypeAst(n, "union type with zero children");
          case 1:
            return convertNode(n.getFirstChild(), stripNullUndefined);
          default:
            Stream<String> children = children(n).map(c -> convertNode(c, stripNullUndefined));
            if (stripNullUndefined) {
              children = children.filter(c -> !("undefined".equals(c) || "null".equals(c)));
            }
            return children.collect(PIPE_JOINER);
        }
      case FUNCTION:
        String retType;
        String params;
        // TODO(martinprobst): '...' varargs, '?' optional args.
        switch (n.getChildCount()) {
          case 1:
            params = "";
            retType = convertNode(n.getFirstChild(), stripNullUndefined);
            break;
          case 2:
            checkArgument(n.getFirstChild().isParamList(), "must be param list in function type");
            params = convertParams(n.getFirstChild());
            retType = convertNode(n.getLastChild(), stripNullUndefined);
            break;
          case 3:
            params = convertParams(n.getSecondChild());
            retType = convertNode(n.getLastChild(), stripNullUndefined);
            if (n.getFirstChild().isNew()) {
              // TODO(martinprobst): create a call signature if return type != newable type.
              return "{new("
                  + params
                  + "): "
                  + convertNode(n.getFirstChild(), stripNullUndefined)
                  + "}";
            } else if (n.getFirstChild().isThis()) {
              params =
                  "this: " + convertNode(n.getFirstChild(), stripNullUndefined) + ", " + params;
            } else {
              throw unexpectedTypeAst(
                  n.getFirstChild(), "must be new or this, got " + n.getFirstChild().getToken());
            }
            break;
          default:
            throw unexpectedTypeAst(
                n, "expected 1-3 function type children, got " + n.getChildCount());
        }
        if ("{}".equals(retType) || "undefined".equals(retType)) {
          retType = "void";
        }
        return "(" + params + ") => " + retType;
      case EQUALS:
        String optionalParam = convertNode(n.getFirstChild(), stripNullUndefined);
        if (stripNullUndefined) {
          return optionalParam;
        }
        return optionalParam + "|undefined";
      default:
        throw unexpectedTypeAst(n, "unexpected type node " + n.getToken());
    }
  }

  private static String convertParams(Node n) {
    checkArgument(n.isParamList(), "expected param list");
    int argc = 0;
    StringBuilder params = new StringBuilder();
    Iterator<Node> it = n.children().iterator();
    while (it.hasNext()) {
      Node child = it.next();
      argc++;
      String name = "p" + argc;
      if (child.getToken() == Token.ELLIPSIS) {
        String type = child.hasChildren() ? convertNode(child.getFirstChild(), false) : "{}";
        params.append("..." + name + ": " + type + "[]");
      } else {
        if (child.getToken() == Token.EQUALS) {
          name = name + "?";
        }
        String type = convertNode(child.getFirstChild(), false);
        params.append(name + ": " + type);
      }
      if (it.hasNext()) {
        params.append(", ");
      }
    }
    return params.toString();
  }

  private static String convertChildren(
      Node n, Collector<CharSequence, ?, String> joiner, boolean stripNullUndefined) {
    return children(n).map((Node child) -> convertNode(child, stripNullUndefined)).collect(joiner);
  }

  private static IllegalArgumentException unexpectedTypeAst(Node n, String msg) {
    String location = n.getSourceFileName() + ":" + n.getLineno() + ":" + n.getCharno();
    return new IllegalArgumentException(location + ": " + msg);
  }

  private static Stream<Node> children(Node n) {
    return StreamSupport.stream(n.children().spliterator(), false);
  }
}
