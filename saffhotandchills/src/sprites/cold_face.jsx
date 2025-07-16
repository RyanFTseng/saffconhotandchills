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

    // Keyboard event handler
    useEffect(() => {
        const handleKeyDown = (event) => {
            const moveSpeed = 10; // Adjust this value to change movement speed

            setPosition(prevPosition => {
                let newX = prevPosition.x;
                let newY = prevPosition.y;

                switch (event.key) {
                    case 'ArrowUp':
                        newY -= moveSpeed;
                        break;
                    case 'ArrowDown':
                        newY += moveSpeed;
                        break;
                    case 'ArrowLeft':
                        newX -= moveSpeed;
                        break;
                    case 'ArrowRight':
                        newX += moveSpeed;
                        break;
                    default:
                        return prevPosition; // No change if other keys are pressed
                }

                return { x: newX, y: newY };
            });
        };

        // Add event listener
        window.addEventListener('keydown', handleKeyDown);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

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