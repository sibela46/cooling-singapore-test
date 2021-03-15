import React from 'react';
import { Scene } from '@esri/react-arcgis';
import './App.css';
import Buildings from './Buildings';
import Inputs from './Inputs';
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.github.com/',
    timeout: 5000,
});

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            cameraPos: { 
                x: 103.84985,
                y: 1.27941,
                z: 3500
            },
            offset: {
                x: 0,
                y: 0,
                z: 0
            },
            scale: 500,
            deg: 90
        }
        this.getFile = this.getFile.bind(this);
        this.handleOffsetChange = this.handleOffsetChange.bind(this);
        this.handleScaleChange = this.handleScaleChange.bind(this);
        this.handleDegChange = this.handleDegChange.bind(this);
    }
    getFile() {
        instance.get("https://api.github.com/repos/cooling-singapore/frontend-developer-test/git/blobs/85eec4c83a3aa2a70dcb2bd568261e059f4ec1c0")
        .then(res => {
            console.log((res.data));
        })
        .catch(err => console.log(err))
    }
    handleDegChange(e) {
        this.setState({ deg: +e.target.value })
    }
    handleOffsetChange(e) {
        var offset = {...this.state.offset};
        if (e.target.id === "offset-x") {
            offset.x = +e.target.value;
        } else if (e.target.id === "offset-y") {
            offset.y = +e.target.value;
        } else if (e.target.id === "offset-z") {
            offset.z = +e.target.value;
        }
        this.setState({offset});
    }
    handleScaleChange(e) {
        this.setState({ scale: +e.target.value})
    }
    render() {
        return (
        <div className="App">
            <Scene 
                mapProperties={{ basemap: "dark-gray", ground: 'world-elevation' }}
                viewProperties={{ 
                    camera: {
                        position: this.state.cameraPos
                    }
                }}>
            <Buildings pos={this.state.cameraPos} offset={this.state.offset} deg={this.state.deg} scale={this.state.scale}></Buildings>
            <Inputs offset={this.state.offset} pos={this.state.cameraPos}
                    scale={this.state.scale} deg={this.state.deg}
                    handleOffsetChange={this.handleOffsetChange}
                    handleDegChange={this.handleDegChange}
                    handleScaleChange={this.handleScaleChange}>
            </Inputs>
            </Scene>
        </div>
        );
    }
}

export default App;
