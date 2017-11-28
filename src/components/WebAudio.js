import { Component } from 'react';

class WebAudio extends Component {
    
    componentWillMount() {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audioContext = new AudioContext();
    }
    
    componentWillUnmount() {
        this.audioContext.close();
    }
    
    render() {
        return null;
    }
}

export default WebAudio;