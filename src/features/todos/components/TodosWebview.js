import { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import injectSheet from 'react-jss';
import Webview from 'react-electron-web-view';
import classnames from 'classnames';

import { TODOS_PARTITION_ID } from '../../../config';

const styles = theme => ({
  root: {
    background: theme.colorBackground,
    position: 'relative',
    borderLeft: [1, 'solid', theme.todos.todosLayer.borderLeftColor],
    zIndex: 300,

    transform: ({ isVisible, width, isTodosServiceActive }) =>
      `translateX(${isVisible || isTodosServiceActive ? 0 : width}px)`,

    '& webview': {
      height: '100%',
    },
  },
  resizeHandler: {
    position: 'absolute',
    left: 0,
    marginLeft: -5,
    width: 10,
    zIndex: 400,
    cursor: 'col-resize',
  },
  dragIndicator: {
    position: 'absolute',
    left: 0,
    width: 5,
    zIndex: 400,
    background: theme.todos.dragIndicator.background,
  },
  isTodosServiceActive: {
    width: 'calc(100% - 368px)',
    position: 'absolute',
    right: 0,
    zIndex: 0,
    borderLeftWidth: 0,
  },
  hidden: {
    borderLeftWidth: 0,
  },
});

class TodosWebview extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    isTodosServiceActive: PropTypes.bool.isRequired,
    isVisible: PropTypes.bool.isRequired,
    handleClientMessage: PropTypes.func.isRequired,
    setTodosWebview: PropTypes.func.isRequired,
    resize: PropTypes.func.isRequired,
    width: PropTypes.number.isRequired,
    minWidth: PropTypes.number.isRequired,
    userAgent: PropTypes.string.isRequired,
    todoUrl: PropTypes.string.isRequired,
    isTodoUrlValid: PropTypes.bool.isRequired,
  };

  state = {
    isDragging: false,
    width: 300,
  };

  componentDidMount() {
    this.setState({
      width: this.props.width,
    });

    this.node.addEventListener('mousemove', this.resizePanel.bind(this));
    this.node.addEventListener('mouseup', this.stopResize.bind(this));
    this.node.addEventListener('mouseleave', this.stopResize.bind(this));
  }

  startResize = event => {
    this.setState({
      isDragging: true,
      initialPos: event.clientX,
      delta: 0,
    });
  };

  resizePanel(e) {
    const { minWidth } = this.props;

    const { isDragging, initialPos } = this.state;

    if (isDragging && Math.abs(e.clientX - window.innerWidth) > minWidth) {
      const delta = e.clientX - initialPos;

      this.setState({
        delta,
      });
    }
  }

  stopResize() {
    const { resize, minWidth } = this.props;

    const { isDragging, delta, width } = this.state;

    if (isDragging) {
      let newWidth = width + (delta < 0 ? Math.abs(delta) : -Math.abs(delta));

      if (newWidth < minWidth) {
        newWidth = minWidth;
      }

      this.setState({
        isDragging: false,
        delta: 0,
        width: newWidth,
      });

      resize(newWidth);
    }
  }

  startListeningToIpcMessages() {
    const { handleClientMessage } = this.props;
    if (!this.webview) return;
    this.webview.addEventListener('ipc-message', e => {
      handleClientMessage({ channel: e.channel, message: e.args[0] });
    });
  }

  render() {
    const {
      classes,
      isTodosServiceActive,
      isVisible,
      userAgent,
      todoUrl,
      isTodoUrlValid,
    } = this.props;

    const { width, delta, isDragging } = this.state;

    let displayedWidth = isVisible ? width : 0;
    if (isTodosServiceActive) {
      displayedWidth = null;
    }

    return (
      <div
        className={classnames({
          [classes.root]: true,
          [classes.isTodosServiceActive]: isTodosServiceActive,
          'todos__todos-panel--expanded': isTodosServiceActive,
          [classes.hidden]: !isVisible,
        })}
        style={{ width: displayedWidth }}
        onMouseUp={() => this.stopResize()}
        ref={node => {
          this.node = node;
        }}
        id="todos-panel"
      >
        <div
          className={classes.resizeHandler}
          style={{
            left: delta,
            ...(isDragging ? { width: 600, marginLeft: -200 } : {}),
          }} // This hack is required as resizing with webviews beneath behaves quite bad
          onMouseDown={e => this.startResize(e)}
        />
        {isDragging && (
          <div
            className={classes.dragIndicator}
            style={{ left: delta }} // This hack is required as resizing with webviews beneath behaves quite bad
          />
        )}
        {isTodoUrlValid && (
          <Webview
            className={classes.webview}
            onDidAttach={() => {
              const { setTodosWebview } = this.props;
              setTodosWebview(this.webview);
              this.startListeningToIpcMessages();
            }}
            partition={TODOS_PARTITION_ID}
            preload="./features/todos/preload.js"
            ref={webview => {
              this.webview = webview ? webview.view : null;
            }}
            useragent={userAgent}
            src={todoUrl}
          />
        )}
      </div>
    );
  }
}

export default injectSheet(styles, { injectTheme: true })(
  observer(TodosWebview),
);
