import { Children, Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import classnames from 'classnames';

import { oneOrManyChildElements } from '../../../prop-types';

class Tab extends Component {
  constructor(props) {
    super(props);
    this.state = { active: this.props.active };
  }

  static propTypes = {
    children: oneOrManyChildElements.isRequired,
    active: PropTypes.number,
  };

  static defaultProps = {
    active: 0,
  };

  switchTab(index) {
    this.setState({ active: index });
  }

  render() {
    const { children: childElements } = this.props;
    const children = childElements.filter(c => !!c);

    if (children.length === 1) {
      return <div>{children}</div>;
    }

    return (
      <div className="content-tabs">
        <div className="content-tabs__tabs">
          {Children.map(children, (child, i) => (
            <button
              key="{i}"
              className={classnames({
                'content-tabs__item': true,
                'is-active': this.state.active === i,
              })}
              onClick={() => this.switchTab(i)}
              type="button"
            >
              {child.props.title}
            </button>
          ))}
        </div>
        <div className="content-tabs__content">
          {Children.map(children, (child, i) => (
            <div
              key="{i}"
              className={classnames({
                'content-tabs__item': true,
                'is-active': this.state.active === i,
              })}
              type="button"
            >
              {child}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default observer(Tab);
