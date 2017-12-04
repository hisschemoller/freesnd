import { Component } from 'react';
import { connect } from 'react-redux';
import { clearEventQueue, START_PREVIEW, STOP_PREVIEW } from '../actions/audioActions';

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
        switch(event.type) {
            case START_PREVIEW:
                this.startPreview(event.src);
                break;
            case STOP_PREVIEW:
                this.stopPreview(event.src);
                break;
            default:
                console.log('WebAudio unable to process event of type ', event.type);
        }
    }
    
    startPreview = (src) => {
        const ctx = this.ctx,
            self = this;
        
        fetch(src)
            .then(function(response) {
                response.arrayBuffer().then(function(buffer) {
                    ctx.decodeAudioData(buffer).then(function(decodedBuffer) {
                        const source = ctx.createBufferSource();
                        source.buffer = decodedBuffer;
                        source.onended = () => {
                            self.stopPreview(src);
                        };
                        source.connect(ctx.destination);
                        source.start();
                        
                    })
                });
            })
            .catch(function(error) {
                console.error(error);
            });
    }
    
    stopPreview = (src) => {
        console.log(src);
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
