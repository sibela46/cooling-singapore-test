import { useState } from "react";

const Inputs = (props) => {
    const [pos, setPos] = useState(props.pos);

    const handlePosChange = (e) => {
        var newPos = { ...pos };
        if (e.target.id === "offset-x") {
            newPos.x = +e.target.value;
        } else if (e.target.id === "offset-y") {
            newPos.y = +e.target.value;
        } else if (e.target.id === "offset-z") {
            newPos.z = +e.target.value;
        }
        setPos(newPos);
    }
    const handleGoToPos = () => {
        const cam = props.view.camera.clone();
        cam.position = pos;
        props.view.goTo(cam);
    }
    const rotateCamera = (direction) => {
        var heading = props.view.camera.heading;
        console.log(direction);

        if (direction > 0) {
            heading = Math.floor((heading + 1e-3) / 10) * 10 + 10;
        } else {
            heading = Math.ceil((heading - 1e-3) / 10) * 10 - 10;
        }

        props.view.goTo({
            heading: heading
        }).catch(function(error){
        if (error.name != "AbortError"){
            console.error(error);
        }
        });
    }
    return (
        <div className="input-manipulations" id="inputs">
            <h2>Model Position</h2>
                <p>Rotate
                <input type="number" step="10" value={props.deg} onChange={props.handleDegChange}/>
                </p>
                <p>Translate
                <input id="offset-x" type="number" step="10" value={props.offset.x} onChange={props.handleOffsetChange}/>
                <input id="offset-y" type="number" step="10" value={props.offset.y} onChange={props.handleOffsetChange}/>
                <input id="offset-z" type="number" step="10" value={props.offset.z} onChange={props.handleOffsetChange}/>
                </p>
                <p>Scale
                <input type="number" min="1" value={props.scale} onChange={props.handleScaleChange}/>
                </p>
            <h2>Map Position</h2>
                <p>Go To
                <input id="offset-x" type="number" value={pos.x} onChange={handlePosChange}/>
                <input id="offset-y" type="number" value={pos.y} onChange={handlePosChange}/>
                <input id="offset-z" type="number" value={pos.z} onChange={handlePosChange}/>
                <button onClick={handleGoToPos}>Go</button>
                </p>
            <h2>Camera</h2>
                <button onClick={() => rotateCamera(1)}>Rotate left</button>
                <button onClick={() => rotateCamera(-1)}>Rotate right</button>
        </div>
    );
}

export default Inputs;