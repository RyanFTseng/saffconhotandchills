import {
    Assets,
    Texture,
} from 'pixi.js';
import {
    useEffect,
    useRef,
    useState,
} from 'react';
import Item_Image from '../assets/item.png'

export function Item({ keysPressed }) {
    // The Pixi.js `Sprite`
    const spriteRef = useRef(null)
    const [texture, setTexture] = useState(Texture.EMPTY)
    const [isActive, setIsActive] = useState(false)
    const [position, setPosition] = useState({ x: 500, y: 500 })

    // Preload the sprite if it hasn't been loaded yet
    useEffect(() => {
        if (texture === Texture.EMPTY) {
            Assets
                .load(Item_Image)
                .then((result) => {
                    setTexture(result)
                });
        }
    }, [texture]);


    
    return (
        <pixiSprite
            ref={spriteRef}
            anchor={0.5}
            scale={isActive ? 1 : 0.2}
            eventMode={'static'}
            texture={texture}
            x={position.x}
            y={position.y} />
    );
}

export default Item