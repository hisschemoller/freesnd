import { Component } from 'react';
import { connect } from 'react-redux';
import { clearEventQueue, START_PREVIEW, STOP_PREVIEW } from '../actions/audioActions';
import { selectPreviewURL } from '../selectors';

class WebAudio extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isStarted: false,
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
                this.startPreview(event.startNormalized);
                break;
            case STOP_PREVIEW:
                this.stopPreview();
                break;
            default:
                console.log('WebAudio unable to process event of type ', event.type);
        }
    }
    
    startPreview = (startNormalized) => {
        const ctx = this.ctx,
            self = this;
        
        this.stopPreview();
        
        this.setState(Object.assign({}, this.state, {
            isStarted: true
        }));
        
        if (this.props.previewURL) {
            fetch(this.props.previewURL)
                .then(function(response) {
                    response.arrayBuffer().then(function(buffer) {
                        ctx.decodeAudioData(buffer).then(function(decodedBuffer) {
                            if (self.state.isStarted) {
                                // create and play the buffer
                                const source = ctx.createBufferSource();
                                source.buffer = decodedBuffer;
                                source.onended = () => {
                                    self.stopPreview();
                                };
                                source.connect(ctx.destination);
                                source.start(startNormalized * decodedBuffer.duration);
                                
                                // store bufferSource in local state
                                self.setState(Object.assign({}, self.state, {
                                    previewBufferSource: source
                                }));
                                
                                // 
                            }
                        })
                    });
                })
                .catch(function(error) {
                    console.error(error);
                });
        }
    }
    
    stopPreview = () => {
        if (this.state.previewBufferSource) {
            this.state.previewBufferSource.stop();
        }
        this.setState(Object.assign({}, this.state, {
            isStarted: false,
            previewBufferSource: null
        }));
    }
  
    render() {
        return null;
    }
}

function mapStateToProps(state) {
    return {
        events: state.audioState.events,
        previewURL: selectPreviewURL(state)
    };
}

export default connect(mapStateToProps)(WebAudio);
