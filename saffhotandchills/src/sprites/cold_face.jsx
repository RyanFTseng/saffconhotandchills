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
import Cold_Face_Image from '../assets/cold_face.jpg'

export function Cold_Face() {
    // The Pixi.js `Sprite`
    const spriteRef = useRef(null)

    const [texture, setTexture] = useState(Texture.EMPTY)
    const [isHovered, setIsHover] = useState(false)
    const [isActive, setIsActive] = useState(false)

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

    return (
        <pixiSprite
            ref={spriteRef}
            anchor={0.5}
            eventMode={'static'}
            onClick={(event) => setIsActive(!isActive)}
            onPointerOver={(event) => setIsHover(true)}
            onPointerOut={(event) => setIsHover(false)}
            scale={isActive ? 1 : 1.5}
            texture={texture}
            x={100}
            y={100} />
    );
}

export default Cold_Face