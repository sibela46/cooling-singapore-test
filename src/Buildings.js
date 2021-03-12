import { useEffect, useState } from 'react';
import { loadModules } from 'esri-loader';
import axios from 'axios';
import { render } from '@testing-library/react';

const instance = axios.create({
    baseURL: 'https://api.github.com/',
    headers: {
        'Content-Type': 'application/vnd.github.VERSION+json'
    },
    timeout: 5000,
});
const Buildings = (props) => {
    const [graphic, setGraphic] = useState([]);
    useEffect(() => {
        loadModules([ "esri/Graphic", "esri/geometry/Mesh", "esri/layers/GraphicsLayer", "esri/geometry/Point", "esri/symbols/PointSymbol3D", "esri/symbols/ObjectSymbol3DLayer"]).then(([Graphic, Mesh, GraphicsLayer, Point, PointSymbol3D, ObjectSymbol3DLayer]) => {
            const location = new Point({
                longitude: props.pos.lng,
                latitude: props.pos.lat
            });

            Mesh.createFromGLTF(location, "https://developers.arcgis.com/javascript/latest/sample-code/import-gltf/live/tent.glb")
            .then((geometry) => {
                geometry.scale(props.scale, {origin: location});
                geometry.rotate(0, 0, props.deg);
                geometry.offset(props.offset.x, props.offset.y, props.offset.z);

                const graphic = new Graphic({
                geometry,
                symbol: {
                    type: "mesh-3d", // autocasts as new MeshSymbol3D()
                    symbolLayers: [{
                    type: "fill", // autocasts as new FillSymbol3DLayer()
                    material: {
                        color: [255, 255, 255, 1],
                        colorMixMode: "tint"
                    }
                    }]
                }
                });
                props.view.graphics.add(graphic);
                setGraphic(graphic);
            })
            .catch(console.error);
        }).catch((err) => console.error(err));
        return function cleanup() {
            props.view.graphics.remove(graphic);
        };
    }, [props.deg, props.scale, props.offset]);

    return null;
}

export default Buildings;