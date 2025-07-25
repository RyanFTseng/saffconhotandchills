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
import Arrow_Key from '../sprites/arrow_key'
import KeyHandler from '../components/KeyHandler'

extend({
    Container,
    Graphics,
    Sprite,
})

const Chills = () => {

    return (
        <Application width={window.innerWidth} height={window.innerHeight}>
            <pixiContainer x={100} y={100}>
                <KeyHandler></KeyHandler>
            </pixiContainer>
        </Application>
    )
}

export default Chills
