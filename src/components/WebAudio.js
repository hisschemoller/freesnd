import { Component } from 'react';
import { connect } from 'react-redux';
import { clearEventQueue, START_PREVIEW, STOP_PREVIEW } from '../actions/audioActions';

class WebAudio extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            previewBufferSource: null
        };
    }
    
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
                this.stopPreview();
                break;
            default:
                console.log('WebAudio unable to process event of type ', event.type);
        }
    }
    
    startPreview = (src) => {
        const ctx = this.ctx,
            self = this;
        
        this.stopPreview();
        
        fetch(src)
            .then(function(response) {
                response.arrayBuffer().then(function(buffer) {
                    ctx.decodeAudioData(buffer).then(function(decodedBuffer) {
                        const source = ctx.createBufferSource();
                        source.buffer = decodedBuffer;
                        source.onended = () => {
                            self.stopPreview();
                        };
                        source.connect(ctx.destination);
                        source.start();
                        const newState = Object.assign({}, self.state);
                        newState.previewBufferSource = source;
                        self.setState(newState);
                    })
                });
            })
            .catch(function(error) {
                console.error(error);
            });
    }
    
    stopPreview = () => {
        if (this.state.previewBufferSource) {
            this.state.previewBufferSource.stop();
            const newState = Object.assign({}, this.state);
            newState.preview = null;
            this.setState(newState);
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
