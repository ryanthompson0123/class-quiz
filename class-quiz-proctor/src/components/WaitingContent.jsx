import React, { Component, PropTypes } from 'react';
import { Row, Col } from 'react-flexbox-grid/lib/index';

class WaitingContent extends Component {
   
    render() {
        let { title, xs } = this.props;
        
        return (
            <Col xs={xs}>
                <Row>
                    <Col xs={4}>
                        <div 
                            className='mui--text-display2'
                            style={{marginLeft: '40px', marginTop: '100px'}}>
                            {title}
                        </div>
                    </Col>
                </Row>
                <Row center='xs'>
                    <Col xs={10}>
                        <div
                            className='mui--text-headline'
                            style={{marginTop: '20px'}}>
                            Waiting for players...
                        </div>
                    </Col>
                </Row>
            </Col>
        );
    }
}

WaitingContent.propTypes = {
    xs: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired
};

export default WaitingContent;