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
    const drawCallback = useCallback(graphics => {
        graphics.clear()
        graphics.setFillStyle({ color: 'red' })
        graphics.rect(0, 0, 100, 100)
        graphics.fill()
    }, [])

    return (
        <Application>
            <pixiContainer x={100} y={100}>
                <pixiGraphics draw={drawCallback} />
                <Cold_Face />
            </pixiContainer>
        </Application>
    )
}

export default Chills
