/*
 * Copyright (c) 2012 Atishay Jain. All rights reserved.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 *
 */

/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define, brackets, $, window, JSHINT */

define(function (require, exports, module) {
    'use strict';
    var EditorManager = brackets.getModule("editor/EditorManager");

    function handleKeyEvents(jqEvent, editor, event) {
        var instance = editor._codeMirror;
        var selection = instance.getSelection();
        if (selection.length === 0) { return; }
        if (event.type === "keypress") {
            var keyStr = String.fromCharCode(event.which || event.keyCode);
            if (/[\[\{\"\(\'< \/]/.test(keyStr)) {
                switch (keyStr) {
                case "[":
                    selection = "[" + selection + "]";
                    break;
                case "(":
                    selection = "(" + selection + ")";
                    break;
                case "{":
                    selection = "{" + selection + "}";
                    break;
                case "'":
                    selection = "'" + selection + "'";
                    break;
                case "<":
                    selection = "<" + selection + ">";
                    break;
                case '"':
                    selection = '"' + selection + '"';
                    break;
                case "/":
                    selection = "/*" + selection + "*/";
                    break;
                case " ":
                    selection = " " + selection + " ";
                    break;
                }
                instance.replaceSelection(selection);
                event.preventDefault();
            }
        }
    }

    function onActiveEditorChange(event, current, previous) {
        console.log("Wrap:: Attaching Event handler");
        if (previous) {
            $(previous).off("keyEvent", handleKeyEvents);
        }
        if (current) {
            $(current).on("keyEvent", handleKeyEvents);
        }
    }

    $(EditorManager).on("activeEditorChange", onActiveEditorChange);

    onActiveEditorChange(null, EditorManager.getActiveEditor(), null);

});