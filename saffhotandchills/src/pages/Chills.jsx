import {
    Application,
    extend,
} from '@pixi/react'
import {
    Container,
    Graphics,
    Sprite,
} from 'pixi.js'
import KeyHandler from '../components/KeyHandler'

extend({
    Container,
    Graphics,
    Sprite,
})

const Chills = () => {

    return (
        <Application width={window.innerWidth} height={window.innerHeight}>
            <pixiContainer x={0} y={0}>
                <KeyHandler></KeyHandler>
            </pixiContainer>
        </Application>
    )
}

export default Chills
