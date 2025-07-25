import {
    Assets,
    Texture,
} from 'pixi.js';
import {
    useEffect,
    useRef,
    useState,
} from 'react';

import Arrow_Key_Image from '../assets/arrow.png'

export function Arrow_Key({ keysPressed}) {
    // The Pixi.js `Sprite`
    const spriteRef = useRef(null)

    const [texture, setTexture] = useState(Texture.EMPTY)
    const [isActive, setIsActive] = useState(false)
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    })
    const centerPosition = {
        x: windowSize.width * 0.70,   // 90% from left (near right edge)
        y: windowSize.height * 0.75  // 85% from top (near bottom)
    }
    const [spacing, setSpacing] = useState(60)
    const scale = 0.2
    const margin = 10

    // Preload the sprite if it hasn't been loaded yet
    useEffect(() => {
        if (texture === Texture.EMPTY) {
            Assets
                .load(Arrow_Key_Image)
                .then((result) => {
                    setTexture(result)
                    setSpacing(result.width*scale+margin)
                    console.log(result.width)
                });
        }
    }, [texture]);

    
    const keyPositions = [
        { x: centerPosition.x, y: centerPosition.y - spacing, rotation: 0, key: 'ArrowUp' },                // Up
        { x: centerPosition.x - spacing, y: centerPosition.y, rotation: -Math.PI / 2, key: 'ArrowLeft' },   // Left  
        { x: centerPosition.x, y: centerPosition.y, rotation: Math.PI, key: 'ArrowDown' },                  // Down
        { x: centerPosition.x + spacing, y: centerPosition.y, rotation: Math.PI / 2, key: 'ArrowRight' }    // Right
    ];

    return (
        <>
            {keyPositions.map((pos, index) => {
                const isPressed = keysPressed[pos.key]
                return (
                    <pixiSprite
                        key={index}
                        anchor={0.5}
                        eventMode={'static'}
                        scale={isActive ? 1 : scale}
                        texture={texture}
                        x={pos.x}
                        y={pos.y}
                        rotation={pos.rotation}
                        tint={isPressed ? 0xff0000 : 0xffffff} // Red when pressed, normal when not
                    />
                )
            })}
        </>
    );
}

export default Arrow_Key