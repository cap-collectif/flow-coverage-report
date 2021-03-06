'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = FlowCoverageFileTableRow;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function LinkToSourceFileReport(props) {
  var filename = props.targetFilename;
  var href = 'sourcefiles/' + filename + '.html';
  return _react2.default.createElement(
    'a',
    { href: href },
    filename
  );
}function FlowCoverageFileTableRow(props) {
  /* eslint-disable camelcase */
  var filename = props.filename,
      annotation = props.annotation,
      covered_count = props.covered_count,
      uncovered_count = props.uncovered_count,
      percent = props.percent,
      isError = props.isError,
      isFlow = props.isFlow,
      disableLink = props.disableLink,
      threshold = props.threshold;


  var aboveThreshold = percent >= threshold;
  var className = !isError && isFlow && aboveThreshold ? 'positive' : 'negative';

  var errorPopup = void 0;

  if (isError) {
    className = 'error';
    var errorType = void 0;
    var errorContent = void 0;

    if (props.flowCoverageError) {
      errorType = 'flow coverage';
      errorContent = _react2.default.createElement(
        'pre',
        null,
        props.flowCoverageError
      );
    }

    if (props.flowCoverageParsingError) {
      errorType = 'JSON Parsing';
      errorContent = _react2.default.createElement(
        'pre',
        null,
        props.flowCoverageParsingError
      );
    }

    if (props.flowCoverageException) {
      errorType = 'Flow command unexpected error';
      errorContent = _react2.default.createElement(
        'pre',
        null,
        props.flowCoverageException
      );
    }

    if (props.flowCoverageStderr) {
      errorType = 'Flow command stderr';
      errorContent = _react2.default.createElement(
        'pre',
        null,
        props.flowCoverageStderr
      );
    }

    errorPopup = _react2.default.createElement(
      'div',
      { className: 'ui popup' },
      _react2.default.createElement(
        'div',
        { className: 'header' },
        'Flow Error: ',
        errorType
      ),
      _react2.default.createElement(
        'div',
        null,
        errorContent
      )
    );
  }

  return _react2.default.createElement(
    'tr',
    { key: filename, className: className },
    _react2.default.createElement(
      'td',
      { key: 'filename', className: disableLink ? '' : 'selectable' },
      disableLink ? filename : _react2.default.createElement(LinkToSourceFileReport, { targetFilename: filename })
    ),
    _react2.default.createElement(
      'td',
      { key: 'annotation' },
      ' @',
      annotation,
      ' '
    ),
    _react2.default.createElement(
      'td',
      { key: 'percent', className: isError ? 'error' : '' },
      isError ? _react2.default.createElement(
        'span',
        null,
        _react2.default.createElement('i', { className: 'attention icon', 'data-position': 'bottom right' }),
        'Error',
        errorPopup
      ) : _react2.default.createElement(
        'span',
        null,
        percent,
        ' %'
      )
    ),
    _react2.default.createElement(
      'td',
      { key: 'total' },
      ' ',
      covered_count + uncovered_count,
      ' '
    ),
    _react2.default.createElement(
      'td',
      { key: 'covered' },
      ' ',
      covered_count,
      ' '
    ),
    _react2.default.createElement(
      'td',
      { key: 'uncovered' },
      ' ',
      uncovered_count,
      ' '
    )
  );
  /* eslint-enable camelcase */
}
//# sourceMappingURL=coverage-file-table-row.js.map