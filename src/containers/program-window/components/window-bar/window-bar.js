// @flow
import React from 'react';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';

const Bar = styled.div`
  height: 25px;
  cursor: default;
  background-color: rgb(36, 93, 219);
`;

interface WindowBarProps {
  minimizeAction: Function;
  maximizeAction: Function;
  closeAction: Function;
  isDraggable: boolean;
}

const windowBar = (props: WindowBarProps) => (
  <Bar>
    <FontAwesome
      className="pull-right close-icon bar-icon"
      name="close-thin"
      onClick={props.closeAction}
    />

    <FontAwesome
      className="pull-right maximize-icon bar-icon"
      name="window-maximize"
      onClick={props.maximizeAction}
    />

    <FontAwesome
      className="pull-right minimize-icon bar-icon"
      name="window-minimize"
      onClick={props.minimizeAction}
    />
  </Bar>
);

windowBar.propTypes = {
  minimizeAction: PropTypes.func,
  maximizeAction: PropTypes.func,
  closeAction: PropTypes.func,
  isDraggable: PropTypes.bool.isRequired,
};

export default windowBar;
