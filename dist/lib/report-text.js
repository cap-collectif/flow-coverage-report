'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _terminalTable = require('terminal-table');

var _terminalTable2 = _interopRequireDefault(_terminalTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function renderTextReport(coverageData, opts) {
  var print = opts.log || console.log.bind(console);

  var filesTable = new _terminalTable2.default({
    leftPadding: 1,
    rightPadding: 1,
    borderStyle: 2
  });
  filesTable.push(['filename', 'annotation', 'percent', 'total', 'covered', 'uncovered']);

  var row = 0;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Object.keys(coverageData.files).sort()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var filename = _step.value;

      row += 1;
      var data = coverageData.files[filename];

      var annotation = data.annotation || 'no flow';
      var covered = data.expressions.covered_count;
      var uncovered = data.expressions.uncovered_count;
      var percent = data.percent;


      filesTable.push([filename, annotation, data.isError ? '\u26A0 Error' : percent + ' %', covered + uncovered, covered, uncovered]);

      var rowColor = void 0;
      if (data.isFlow && percent >= (opts.threshold || 80)) {
        rowColor = 'green';
      } else {
        rowColor = 'red';
      }

      if (data.isError) {
        rowColor = 'red';
      }

      filesTable.attrRange({ row: [row] }, {
        color: rowColor
      });
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  filesTable.attrRange({ column: [1, 5] }, {
    align: 'right'
  });

  var summaryTablePre = new _terminalTable2.default({
    leftPadding: 1,
    rightPadding: 1,
    borderStyle: 2
  });

  summaryTablePre.push(['included glob patterns:', coverageData.globIncludePatterns.join(', ')]);
  summaryTablePre.push(['excluded glob patterns:', (coverageData.globExcludePatterns || []).join(', ')]);
  summaryTablePre.push(['threshold:', coverageData.threshold]);
  summaryTablePre.push(['concurrent files:', coverageData.concurrentFiles]);

  summaryTablePre.push(['generated at:', coverageData.generatedAt]);
  summaryTablePre.push(['flow version:', coverageData.flowStatus.flowVersion]);
  summaryTablePre.push(['flow check passed:', (coverageData.flowStatus.passed ? 'yes' : 'no') + ' (' + (coverageData.flowStatus.errors.length >= 50 ? ' >= 50' : coverageData.flowStatus.errors.length) + ' errors)']);
  summaryTablePre.attrRange({ row: [6] }, {
    color: coverageData.flowStatus.passed ? 'green' : 'red'
  });

  summaryTablePre.attrRange({ column: [0, 1] }, {
    align: 'right'
  });

  var summaryTable = new _terminalTable2.default({
    leftPadding: 1,
    rightPadding: 1,
    borderStyle: 2
  });

  summaryTable.push(['project', 'percent', 'total', 'covered', 'uncovered']);
  var summaryTotal = coverageData.covered_count + coverageData.uncovered_count;
  var summaryPercent = coverageData.percent;

  var summaryColor = void 0;
  if (summaryPercent >= (opts.threshold || 80)) {
    summaryColor = 'green';
  } else {
    summaryColor = 'red';
  }

  summaryTable.push([_path2.default.basename(opts.projectDir), summaryPercent + ' %', summaryTotal, coverageData.covered_count, coverageData.uncovered_count]);

  summaryTable.attrRange({ row: [1] }, { color: summaryColor });

  summaryTable.attrRange({ column: [1, 5] }, {
    align: 'right'
  });

  var waitForDrain = new Promise(function (resolve) {
    process.stdout.once('drain', resolve);

    var flushed = process.stdout.write('');

    if (flushed || opts.log) {
      resolve();
    }
  });

  print(String(filesTable));
  print(String(summaryTablePre));
  print(String(summaryTable));

  return waitForDrain;
}

function generateFlowCoverageReportText(coverageData, opts) {
  return renderTextReport(coverageData, opts);
}

exports.default = {
  render: renderTextReport,
  generate: generateFlowCoverageReportText
};
//# sourceMappingURL=report-text.js.map