const webpackConfig = require('./webpack.config.js');

module.exports = function (grunt) {
    grunt.initConfig({
        clean: ['dist/'],
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec', 
                },
                src: ['test/**/*.js']
            }
        },
        eslint: {
            nodeFiles: {
                files: {
                    src: ['src/**/*.js']
                },
                options: {
                    overrideConfigFile: '.eslintrc.js'
                }
            },
        },
        webpack: {
            options: {
                stats: !process.env.NODE_ENV || process.env.NODE_ENV === 'development',
            },
            prod: webpackConfig,
            dev: Object.assign({ watch: true }, webpackConfig),
        },
    });

    grunt.loadNpmTasks('grunt-webpack');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.registerTask('lint', ['eslint']);
    grunt.registerTask('test', ['mochaTest']);
    grunt.registerTask('build', ['lint', 'test', 'clean', 'webpack:prod']);
};