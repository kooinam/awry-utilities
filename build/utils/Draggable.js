'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// new Draggable({
//   component: this,
//   tableParamsKey: 'tableParams',
//   actionerKey: 'sortActioner',
//   urlGetter: (item) => {
//     return `/taxonomies/${item.id}.json`;
//   },
//   paramsGetter: (item, dragedItem) => {
//     return {
//       taxonomy: {
//         position: dragedItem.position,
//       },
//     };
//   },
//   keyGetter: (item) => {
//     return {
//       id: item.id,
//       name: item.name,
//     };
//   },
// })

var Draggable = function (_Object) {
  _inherits(Draggable, _Object);

  function Draggable(attributes) {
    _classCallCheck(this, Draggable);

    var newAttributes = Object.assign({
      component: null,
      tableParamsKey: null,
      sortActioner: null,
      urlGetter: null,
      dragIndex: null
    }, attributes);

    var _this = _possibleConstructorReturn(this, (Draggable.__proto__ || Object.getPrototypeOf(Draggable)).call(this, newAttributes));

    _this.rotateUuid = function () {
      _this.uuid = (0, _v2.default)();
    };

    _this.getClosestSelector = function (el, selector, rootNode) {
      rootNode = rootNode || document.body;
      var matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
      while (el) {
        var flagRoot = el === rootNode;
        if (flagRoot || matchesSelector.call(el, selector)) {
          if (flagRoot) {
            el = null;
          }
          break;
        }
        el = el.parentElement;
      }
      return el;
    };

    _this.onMouseDown = function (e) {
      var target = _this.getTrNode(e.target);
      if (target) {
        target.setAttribute('draggable', true);
        target.ondragstart = _this.onDragStart;
        target.ondragend = _this.onDragEnd;
      }
    };

    _this.onDragStart = function (e) {
      var target = _this.getTrNode(e.target);
      if (target) {
        e.dataTransfer.setData('Text', '');
        e.dataTransfer.effectAllowed = 'move';
        target.parentElement.ondragenter = _this.onDragEnter;
        target.parentElement.ondragover = function (ev) {
          ev.preventDefault();
          return true;
        };
        var dragIndex = target.rowIndex - 1;
        _this.dragIndex = dragIndex;
      }
    };

    _this.changeRowIndex = function () {
      var dragIndex = _this.dragIndex;
      var dragedIndex = _this.dragedIndex;
      if (dragIndex >= 0 && dragIndex !== dragedIndex) {
        var component = _this.component;
        var tableParams = component.state[_this.tableParamsKey];
        tableParams.isLoading = true;
        component.setState({
          tableParams: tableParams
        }, function () {
          var item = tableParams.items[dragIndex];
          var dragedItem = tableParams.items[dragedIndex];
          var actioner = component.state[_this.actionerKey];

          actioner.do(_this.urlGetter(item), _this.paramsGetter(item, dragedItem), _this.keyGetter(item));
        });
      }
    };

    _this.onDragEnd = function (e) {
      var target = _this.getTrNode(e.target);
      if (target) {
        target.setAttribute('draggable', false);
        target.ondragstart = null;
        target.ondragend = null;
        target.parentElement.ondragenter = null;
        target.parentElement.ondragover = null;
        _this.changeRowIndex();
      }
    };

    _this.onDragEnter = function (e) {
      var target = _this.getTrNode(e.target);

      _this.dragedIndex = target ? target.rowIndex - 1 : -1;
    };

    _this.getTrNode = function (target) {
      return _this.getClosestSelector(target, 'tr', _this.component.dragContainer.tableNode);
    };

    _this.rotateUuid();
    return _this;
  }

  return Draggable;
}(Object);

exports.default = Draggable;