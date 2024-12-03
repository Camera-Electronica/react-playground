import {useRef, useEffect} from 'react';

const useCanvas = (move, draw) => {
    const canvasRef = useRef();
    
    useEffect(() => {
        let tick = 0;
        let animationId;
    
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
    
        const renderFrame = () => {
            clear(context, canvas.width, canvas.height);
            tick++;
            move(tick);
            draw(context);
            animationId = requestAnimationFrame(renderFrame);
        };
        renderFrame();
    
        return () => cancelAnimationFrame(animationId);
    }, [move, draw]);
    
    return canvasRef;
}

const bgColor = "rgb(0 0 0 / 15%)";
function clear(context, width, height) {
    context.fillStyle = bgColor;
    context.fillRect(0, 0, width, height);
}

export default useCanvas;

