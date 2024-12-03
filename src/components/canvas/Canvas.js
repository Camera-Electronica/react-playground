import useCanvas from "./useCanvas";

const Canvas = (props) => {
    const { move, draw, ...attributes } = props;

    const canvasRef = useCanvas(move, draw);

    return <canvas ref={canvasRef} {...attributes} />
}

export default Canvas;