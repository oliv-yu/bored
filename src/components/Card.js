import React, { Component } from "react";
import PropTypes from "prop-types";

class Card extends Component {
  static propTypes = {
    buttonText: PropTypes.string,
    onClick: PropTypes.func,
    size: PropTypes.string
  };

  render() {
    const { buttonText, children, onClick, size, title } = this.props;

    return (
      <div className={`App-card App-card-${size ? size : "sm"} card`}>
        <div className="card-body">
          {title && <p className="App-card-title card-title">{title}</p>}

          {children}

          {buttonText && onClick && (
            <button onClick={onClick} className="btn btn-primary">
              {buttonText}
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default Card;
