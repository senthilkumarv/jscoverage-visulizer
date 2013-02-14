JSCoverage Viewer
=================

This helps to view the coverage report from a coverage json.

Usage
-----
$ mocha-phantomjs -R json-cov tests.html > report.json
$ node coverage-viewer.js report.json [threshold]

Return -2 when coverage threshold is not met. Default threshold is 0%.
