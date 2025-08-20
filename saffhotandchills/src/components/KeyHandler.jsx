import {
    useEffect,
    useState,
} from 'react';


import Arrow_Key from '../sprites/arrow_key'
import Cold_Face from '../sprites/cold_face';
import Item from '../sprites/item';

// Keyboard controls
function KeyHandler() {
    const [keysPressed, setKeysPressed] = useState({})
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


    
    
    return (
        <>
            <Arrow_Key keysPressed={keysPressed} />
            <Item />
            <Cold_Face keysPressed={keysPressed} />
        </>
    )
}


export default KeyHandler