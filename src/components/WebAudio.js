import { Component } from 'react';
import { connect } from 'react-redux';
import { clearEventQueue, PLAY_PREVIEW } from '../actions/audioActions';

class WebAudio extends Component {
    
    componentWillMount() {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioContext();
    }
    
    componentWillUnmount() {
        this.ctx.close();
    }
    
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.events.length > 0;
    }
    
    componentWillUpdate(nextProps, nextState) {
        nextProps.events.forEach(this.processEvent.bind(this));
        nextProps.dispatch(clearEventQueue());
    }
    
    processEvent(event) {
        const ctx = this.ctx;
        switch(event.type) {
            case PLAY_PREVIEW:
                fetch(event.src)
                    .then(function(response) {
                        response.arrayBuffer().then(function(buffer) {
                            ctx.decodeAudioData(buffer).then(function(decodedBuffer) {
                                const source = ctx.createBufferSource();
                                source.buffer = decodedBuffer;
                                source.connect(ctx.destination);
                                source.start();
                            })
                        });
                    })
                    .catch(function(error) {
                        console.error(error);
                    });
                break;
            default:
                console.log('WebAudio unable to process event of type ', event.type);
        }
    }
  
    render() {
        return null;
    }
}

function mapStateToProps(state) {
    return {
        events: state.audioState.events
    };
}

export default connect(mapStateToProps)(WebAudio);
