import {
    Application,
    extend,
} from '@pixi/react'
import {
    Container,
    Graphics,
    Sprite,
} from 'pixi.js'
import { useCallback } from 'react'
import { Cold_Face } from '../sprites/cold_face'

extend({
    Container,
    Graphics,
    Sprite,
})

const Chills = () => {

    return (
        <Application width={window.innerWidth} height={window.innerHeight}>
            <pixiContainer x={100} y={100}>
                <Cold_Face />
            </pixiContainer>
        </Application>
    )
}

export default Chills
