import React from 'react';
import { useSelector } from 'react-redux';
import Picker from 'emoji-picker-react';

function EmojiPicker({ handleEmoji }) {
    const { value } = useSelector(x => x.theme)

    return (

        <div className={value == "dark" ? "emoji_piker_kk" : null}>
            <Picker disableSearchBar onEmojiClick={handleEmoji} />
        </div>
    );
};
export default EmojiPicker