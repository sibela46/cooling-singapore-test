import React from 'react';
import { Scene } from '@esri/react-arcgis';
import './App.css';
import Buildings from './Buildings';
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.github.com/',
    timeout: 5000,
});

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            pos: { 
                lng: 103.84985,
                lat: 1.27941
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
        this.handleLatChange = this.handleLatChange.bind(this);
        this.handleLngChange = this.handleLngChange.bind(this);
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
        if (e.target.id == "offset-x") {
            offset.x = +e.target.value;
        } else if (e.target.id == "offset-y") {
            offset.y = +e.target.value;
        } else if (e.target.id == "offset-z") {
            offset.z = +e.target.value;
        }
        this.setState({offset});
    }
    handleScaleChange(e) {
        this.setState({ scale: +e.target.value})
    }
    handleLatChange(e) {
        var pos = {...this.state.pos};
        pos.lat = +e.target.value;
        this.setState({pos});
    }
    handleLngChange(e) {
        var pos = {...this.state.pos};
        pos.lng = +e.target.value;
        this.setState({pos});
    }
    render() {
        return (
        <div className="App">
            <button onClick={this.getFile}>Click</button>
            <div className="input-manipulations">
            <h2>Model Position</h2>
                <p>Rotate</p>
                <input type="number" value={this.state.deg} onChange={this.handleDegChange}/>
                <p>Translate</p>
                <input id="offset-x" type="number" value={this.state.offset.x} onChange={this.handleOffsetChange}/>
                <input id="offset-y" type="number" value={this.state.offset.y} onChange={this.handleOffsetChange}/>
                <input id="offset-z" type="number" value={this.state.offset.z} onChange={this.handleOffsetChange}/>
                <p>Scale</p>
                <input type="number" min="1" value={this.state.scale} onChange={this.handleScaleChange}/>
            <h2>Map Position</h2>
                <p>Rotate</p>
                <input type="number" value={this.state.deg} onChange={this.handleDegChange}/>
                <p>Translate</p>
                <input id="offset-x" type="number" value={this.state.pos.lat} onChange={this.handleLatChange}/>
                <input id="offset-y" type="number" value={this.state.pos.lng} onChange={this.handleLngChange}/>
            </div>
            <Scene 
                mapProperties={{ basemap: "dark-gray", ground: 'world-elevation' }}
                viewProperties={{ 
                    camera: {
                        position: {
                            x: this.state.pos.lng,
                            y: this.state.pos.lat,
                            z: 3500 // in meters
                        }
                    }
                }}>
            <Buildings pos={this.state.pos} offset={this.state.offset} deg={this.state.deg} scale={this.state.scale}></Buildings>
            </Scene>
        </div>
        );
    }
}

export default App;
