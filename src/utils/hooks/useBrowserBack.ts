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

    window.onpopstate = function(event) {  //뒤로가기 이벤트를 캐치합니다.

        window.history.back();   // pushState로 인하여 페이지가 하나 더 생성되기 떄문에 한번에 뒤로가기 위해서 뒤로가기를 한번 더 해줍니다.
      
      //  console.log('뒤로가기 체크'); 
        pausesPlayerAudio();
        closePlayer();
       };
      

    return {pauseAudioWhenClickBack}
}
