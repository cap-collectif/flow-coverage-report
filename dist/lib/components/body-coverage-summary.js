'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = HTMLReportBodySummary;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _footer = require('./footer');

var _footer2 = _interopRequireDefault(_footer);

var _coverageSummaryTable = require('./coverage-summary-table');

var _coverageSummaryTable2 = _interopRequireDefault(_coverageSummaryTable);

var _coverageFileTableHead = require('./coverage-file-table-head');

var _coverageFileTableHead2 = _interopRequireDefault(_coverageFileTableHead);

var _coverageFileTableRow = require('./coverage-file-table-row');

var _coverageFileTableRow2 = _interopRequireDefault(_coverageFileTableRow);

var _coverageMeterBar = require('./coverage-meter-bar');

var _coverageMeterBar2 = _interopRequireDefault(_coverageMeterBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-enable */

function HTMLReportBodySummary(props) {
  var summary = props.coverageSummaryData;
  if (!summary) {
    throw new Error('Missing coverageSummaryData from props');
  }
  var filenames = Object.keys(summary.files).sort();
  var percent = summary.percent;

  var filesSummaryTableProps = {
    id: 'files',
    className: 'ui small celled table sortable'
  };
  var filesSummaryTable = _react2.default.createElement(
    'table',
    filesSummaryTableProps,
    _react2.default.createElement(_coverageFileTableHead2.default, null),
    _react2.default.createElement(
      'tbody',
      null,
      filenames.map(function (filename) {
        var fileSummary = summary.files[filename];
        var key = filename;
        var fileRowProps = {
          filename: filename,
          isError: fileSummary.isError,
          isFlow: fileSummary.isFlow,
          flowCoverageParsingError: fileSummary.flowCoverageParsingError,
          flowCoverageError: fileSummary.flowCoverageError,
          flowCoverageException: fileSummary.flowCoverageException,
          flowCoverageStderr: fileSummary.flowCoverageStderr,
          disableLink: false,
          threshold: summary.threshold,
          annotation: fileSummary.annotation,
          percent: fileSummary.percent,
          /* eslint-disable camelcase */
          covered_count: fileSummary.expressions.covered_count,
          uncovered_count: fileSummary.expressions.uncovered_count
          /* eslint-enable camelcase */
        };
        return _react2.default.createElement(_coverageFileTableRow2.default, (0, _extends3.default)({ key: key }, fileRowProps));
      })
    )
  );

  var meterBar = void 0;

  if (props.htmlTemplateOptions && props.htmlTemplateOptions.showMeterBar) {
    meterBar = _react2.default.createElement(_coverageMeterBar2.default, { percent: percent, threshold: summary.threshold });
  }

  return _react2.default.createElement(
    'body',
    null,
    _react2.default.createElement(
      'div',
      { className: 'ui grid container' },
      _react2.default.createElement(
        'div',
        { className: 'row' },
        _react2.default.createElement(
          'h2',
          null,
          'Flow Coverage Report'
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'row' },
        _react2.default.createElement(
          'h4',
          { className: 'ui header' },
          'Summary'
        ),
        _react2.default.createElement(_coverageSummaryTable2.default, {
          assets: props.assets,
          coverageGeneratedAt: props.coverageGeneratedAt,
          htmlTemplateOptions: props.htmlTemplateOptions,
          coverageSummaryData: props.coverageSummaryData
        })
      ),
      meterBar,
      _react2.default.createElement(
        'div',
        { className: 'row' },
        _react2.default.createElement(
          'h4',
          { className: 'ui header' },
          'Files'
        ),
        filesSummaryTable
      ),
      _react2.default.createElement(
        'div',
        { className: 'row centered' },
        _react2.default.createElement(_footer2.default, props)
      )
    )
  );
}

/* eslint-disable import/no-unresolved */
//# sourceMappingURL=body-coverage-summary.js.map