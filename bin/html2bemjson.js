#!/usr/bin/env node

var fs = require('fs');

var pkg = JSON.parse(fs.readFileSync(__dirname + '/../package.json'));
var lib = require('../');

require('coa').Cmd()
    .name(process.argv[1])
    .title('html to bemjson converter')
    .helpful()

    .opt()
        .name('version')
        .title('Version')
        .short('v')
        .long('version')
        .flag()
        .act(function(opts) {
            return pkg.version;
        })
        .end()

    .opt()
        .name('preserveComments')
        .title('Preserve comments')
        .long('with-comments')
        .def(false)
        .end()

    .opt()
        .name('preserveWrongClasses')
        .title('Preserve unparsable classes')
        .long('with-wrong-classes')
        .def(false)
        .end()

    .opt()
        .name('preserveTags')
        .title('Preserve tags')
        .long('with-tags')
        .def(false)
        .end()

    .arg()
        .req()
        .name('input')
        .title('input file')
        .end()

    .act(function (opts, args) {
        var inputHtml = fs.readFileSync(args.input, {encoding: 'utf-8'});
        return lib.stringify(inputHtml);
    })

    .run(process.argv.slice(2));
