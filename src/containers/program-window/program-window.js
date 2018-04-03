// @flow
import React from 'react';
import styled from 'styled-components';
import WindowBar from './components/window-bar';

const Window = styled.div`
  font-family: 'Lucida Sans Regular';
  position: fixed;
  z-index: 1;
  border: 2px solid rgb(36, 93, 219);
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  background-color: white;
  height: ${props => (props.isFullScreen ? 'auto' : '400px')}
  width: ${props => (props.isFullScreen ? 'auto' : '400px')}
  top: 0
  right: ${props => (props.isFullScreen ? '0' : '')}
  left: ${props => (props.isFullScreen ? '0' : '')}
  bottom: ${props => (props.isFullScreen ? '0' : '')}
`;

class ProgramWindow extends React.Component<*> {
  render() {
    return (
      <Window isFullScreen={false}>
        <WindowBar />
      </Window>
    );
  }
}

export default ProgramWindow;
