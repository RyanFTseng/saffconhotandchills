import {
    Assets,
    Texture,
} from 'pixi.js';
import {
    useEffect,
    useRef,
    useState,
} from 'react';
import { useTick } from '@pixi/react';
import Cold_Face_Image from '../assets/cold_face.png'

export function Cold_Face({ keysPressed }) {
    // The Pixi.js `Sprite`
    const spriteRef = useRef(null)
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    })
    const [texture, setTexture] = useState(Texture.EMPTY)
    const [isActive, setIsActive] = useState(false)
    const [position, setPosition] = useState({ x: 100, y: 100 })

    // Preload the sprite if it hasn't been loaded yet
    useEffect(() => {
        if (texture === Texture.EMPTY) {
            Assets
                .load(Cold_Face_Image)
                .then((result) => {
                    setTexture(result)
                });
        }
    }, [texture]);

    // Smooth movement using useTick
    useTick(() => {
        const moveSpeed = 10; // Adjust this value to change movement speed

        setPosition(prevPosition => {
            let newX = prevPosition.x;
            let newY = prevPosition.y;

            if (keysPressed['ArrowUp']) {
                newY -= moveSpeed;
            }
            if (keysPressed['ArrowDown']) {
                newY += moveSpeed;
            }
            if (keysPressed['ArrowLeft']) {
                newX -= moveSpeed;
            }
            if (keysPressed['ArrowRight']) {
                newX += moveSpeed;
            }

            // Boundary checks 
            const canvasWidth = windowSize.width; //canvas width
            const canvasHeight = windowSize.height; //canvas height
            const spriteWidth = spriteRef.current?.width;
            const spriteHeight = spriteRef.current?.height;

            // Clamp position to stay within bounds
            newX = Math.max(0, Math.min(canvasWidth - spriteWidth, newX));
            newY = Math.max(0, Math.min(canvasHeight - spriteHeight, newY));

            // Only update if position actually changed
            if (newX !== prevPosition.x || newY !== prevPosition.y) {
                return { x: newX, y: newY };
            }
            return prevPosition;
        });
    });
    

    return (
        <pixiSprite
            ref={spriteRef}
            anchor={0.5}
            eventMode={'static'}
            scale={isActive ? 1 : 0.3}
            texture={texture}
            x={position.x}
            y={position.y} />
    );
}

export default Cold_Face