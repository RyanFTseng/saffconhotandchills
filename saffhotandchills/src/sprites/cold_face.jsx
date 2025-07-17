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

export function Cold_Face() {
    // The Pixi.js `Sprite`
    const spriteRef = useRef(null)

    const [texture, setTexture] = useState(Texture.EMPTY)
    const [isHovered, setIsHover] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const [position, setPosition] = useState({ x: 100, y: 100 })
    const [keysPressed, setKeysPressed] = useState({})

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

    // Keyboard event handlers
    useEffect(() => {
        const handleKeyDown = (event) => {
            // Prevent default behavior for arrow keys to stop page scrolling
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
                event.preventDefault();

                setKeysPressed(prev => ({
                    ...prev,
                    [event.key]: true
                }));
            }
        };

        const handleKeyUp = (event) => {
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
                setKeysPressed(prev => ({
                    ...prev,
                    [event.key]: false
                }));
            }
        };

        // Add event listeners
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        // Cleanup event listeners on component unmount
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

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
            const canvasWidth = window.innerWidth; //canvas width
            const canvasHeight = window.innerHeight; //canvas height
            const spriteWidth = spriteRef.current?.width;
            const spriteHeight = spriteRef.current?.height; 

            // Clamp position to stay within bounds
            newX = Math.max(0, Math.min(canvasWidth - spriteHalfWidth, newX));
            newY = Math.max(0, Math.min(canvasHeight - spriteHalfHeight, newY));

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
            onClick={(event) => setIsActive(!isActive)}
            onPointerOver={(event) => setIsHover(true)}
            onPointerOut={(event) => setIsHover(false)}
            scale={isActive ? 1 : 0.3}
            texture={texture}
            x={position.x}
            y={position.y} />
    );
}

export default Cold_Face