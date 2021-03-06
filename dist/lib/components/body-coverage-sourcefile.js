'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = HTMLReportBodySourceFile;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _footer = require('./footer');

var _footer2 = _interopRequireDefault(_footer);

var _coverageFileTableHead = require('./coverage-file-table-head');

var _coverageFileTableHead2 = _interopRequireDefault(_coverageFileTableHead);

var _coverageFileTableRow = require('./coverage-file-table-row');

var _coverageFileTableRow2 = _interopRequireDefault(_coverageFileTableRow);

var _coverageMeterBar = require('./coverage-meter-bar');

var _coverageMeterBar2 = _interopRequireDefault(_coverageMeterBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-enable */

/* eslint-disable import/no-unresolved */
function FlowCoverageLocsForm(props) {
  var uncovered_locs = props.uncovered_locs; // eslint-disable-line camelcase

  return _react2.default.createElement(
    'div',
    { className: 'ui form' },
    _react2.default.createElement(
      'div',
      { className: 'fields' },
      _react2.default.createElement(
        'div',
        { key: 'uncovered-locs-dropdown', className: 'sixteen wide inline field' },
        _react2.default.createElement(
          'select',
          { className: 'ui search dropdown uncovered-locations' },
          [_react2.default.createElement(
            'option',
            { key: 'placeholder', value: '' },
            'Uncovered Locations'
          )].concat(uncovered_locs.map(function (loc, i) {
            // eslint-disable-line camelcase
            var text = 'Start: ' + [loc.start.line, loc.start.column].join(',') + ' - ' + 'End: ' + [loc.end.line, loc.end.column].join(',');
            var value = loc.start.line;

            /* eslint-disable react/no-array-index-key */
            return _react2.default.createElement(
              'option',
              { key: i, value: value },
              text
            );
            /* eslint-enable react/no-array-index-key */
          }))
        )
      ),
      _react2.default.createElement(
        'div',
        { key: 'syntax-highlighting-dropdown', className: 'four wide inline field' },
        _react2.default.createElement(
          'select',
          { className: 'ui search dropdown syntax-highlighting' },
          _react2.default.createElement(
            'option',
            { key: 'es', value: 'es' },
            'ES6/ES7'
          ),
          _react2.default.createElement(
            'option',
            { key: 'js', value: 'js' },
            'JavaScript'
          ),
          _react2.default.createElement(
            'option',
            { key: 'no', value: 'no' },
            'None'
          )
        )
      )
    )
  );
}function HTMLReportBodySourceFile(props) {
  var fileName = props.fileName,
      fileContent = props.fileContent;

  if (!fileName) {
    throw new Error('Missing fileName in props');
  }

  var coverageData = props.coverageData,
      coverageSummaryData = props.coverageSummaryData;

  if (!coverageData || !coverageSummaryData) {
    throw new Error('Missing coverage data props');
  }
  var percent = coverageData.percent;


  var threshold = coverageSummaryData.threshold;

  if (!threshold) {
    throw new Error('Missing threshold in coverageSummaryData');
  }

  var _coverageData$express = coverageData.expressions,
      covered_count = _coverageData$express.covered_count,
      uncovered_count = _coverageData$express.uncovered_count,
      uncovered_locs = _coverageData$express.uncovered_locs;
  var summaryRelLink = props.summaryRelLink;


  var meterBar = void 0;

  if (props.htmlTemplateOptions && props.htmlTemplateOptions.showMeterBar) {
    meterBar = _react2.default.createElement(_coverageMeterBar2.default, { percent: percent, threshold: threshold });
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
          'div',
          { className: 'twelve wide column' },
          _react2.default.createElement(
            'h2',
            { className: 'ui header' },
            _react2.default.createElement(
              'a',
              { href: summaryRelLink, id: 'link-to-summary' },
              'Flow Coverage Report'
            )
          )
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'row' },
        _react2.default.createElement(
          'table',
          { className: 'ui small celled unstackable table' },
          _react2.default.createElement(_coverageFileTableHead2.default, null),
          _react2.default.createElement(
            'tbody',
            null,
            _react2.default.createElement(_coverageFileTableRow2.default, {
              disableLink: true,
              filename: fileName,
              annotation: coverageData.annotation,
              flowCoverageParsingError: coverageData.flowCoverageParsingError,
              flowCoverageError: coverageData.flowCoverageError,
              flowCoverageException: coverageData.flowCoverageException,
              flowCoverageStderr: coverageData.flowCoverageStderr,
              isError: coverageData.isError,
              isFlow: coverageData.isFlow,
              percent: percent,
              threshold: threshold,
              /* eslint-disable camelcase */
              covered_count: covered_count,
              uncovered_count: uncovered_count
              /* eslint-enable camelcase */
            })
          )
        )
      ),
      meterBar,
      _react2.default.createElement(
        'div',
        { className: 'row ui one column centered grid' },
        _react2.default.createElement(
          'div',
          { className: 'column', style: { textAlign: 'left' } },
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(FlowCoverageLocsForm, {
              uncovered_locs: uncovered_locs // eslint-disable-line camelcase

            })
          ),
          _react2.default.createElement('textarea', { readOnly: true, id: 'file-content', value: String(fileContent) })
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'row centered' },
        _react2.default.createElement(_footer2.default, props)
      )
    ),
    _react2.default.createElement(
      'pre',
      { id: 'file-coverage-data', style: { display: 'none' } },
      JSON.stringify(coverageData)
    )
  );
}
//# sourceMappingURL=body-coverage-sourcefile.js.map