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
import Arrow_Key_Image from '../assets/arrow.png'

export function Arrow_Key() {
    // The Pixi.js `Sprite`
    const spriteRef = useRef(null)

    const [texture, setTexture] = useState(Texture.EMPTY)
    const [isHovered, setIsHover] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const [position, setPosition] = useState({ x: 1200, y: 800 })
    const [keysPressed, setKeysPressed] = useState({})
    const centerPosition = { x: 1200, y: 650 }
    const [spacing, setSpacing] = useState(60)
    const scale = 0.2

    // Preload the sprite if it hasn't been loaded yet
    useEffect(() => {
        if (texture === Texture.EMPTY) {
            Assets
                .load(Arrow_Key_Image)
                .then((result) => {
                    setTexture(result)
                    setSpacing(result.width*scale)
                    console.log(result.width)
                });
        }
    }, [texture]);

    
    const keyPositions = [
        { x: centerPosition.x, y: centerPosition.y - spacing, rotation: 0 },        // Up
        { x: centerPosition.x - spacing, y: centerPosition.y, rotation: -Math.PI / 2 }, // Left  
        { x: centerPosition.x, y: centerPosition.y, rotation: Math.PI },     // Down
        { x: centerPosition.x + spacing, y: centerPosition.y, rotation: Math.PI / 2 }   // Right
    ];
    

    return (
        <>
            {keyPositions.map((pos, index) => (
                <pixiSprite
                    key={index}
                    anchor={0.5}
                    eventMode={'static'}
                    scale={isActive ? 1 : scale}
                    texture={texture}
                    x={pos.x}
                    y={pos.y}
                    rotation={pos.rotation}
                />
            ))}
        </>
    );
}

export default Arrow_Key