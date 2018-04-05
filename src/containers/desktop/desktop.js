import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import asProgram, { ProgramProps } from '../program';

const DesktopDiv = styled.div`
    height: calc(100% - 50px);
    top: 0;
    left: 0;
    right: 0;
    bottom: 50px;
    position: fixed;
`;

const OpenWindows = styled.div`
    height: 100%;
`;

const DesktopIcons = styled.div`
    height: 100%;
`;

export class Desktop extends Component<ProgramProps> {
    static Props = ProgramProps;
    componentDidMount() {
        this.props.openProgram(1, '', { allowMultipleInstances: false });
    }
    render() {
        return <div>Im the Desktop</div>;
    }
}

export default asProgram({ allowMultipleInstances: false })(Desktop);