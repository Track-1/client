import React from 'react'
import usePlayer from "./usePlayer";

export default function useBrowserBack() {
    const { pausesPlayerAudio, closePlayer } = usePlayer();

    function pauseAudioWhenClickBack(){
        window.onpageshow = function(event) {
            if ( event.persisted || (window.performance && window.performance.navigation.type === 2)) {
                // Back Forward Cache로 브라우저가 로딩될 경우 혹은 브라우저 뒤로가기 했을 경우
                pausesPlayerAudio();
                closePlayer();
            }
        }
    } 

    return {pauseAudioWhenClickBack}
}
