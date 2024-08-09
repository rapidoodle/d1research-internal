import React from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

const TooltipComponent = ({title, content, placement = 'right'}) => {
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
        <p className='mt-2'>{title}</p>
        <div className='text-left' dangerouslySetInnerHTML={{__html: content}}></div>
    </Tooltip>
  );

  return (
    <OverlayTrigger
      className='not-printable'
      placement={placement}
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
    >
      <FontAwesomeIcon icon={faInfoCircle} className='not-printable' />
    </OverlayTrigger>
  );
};

export default TooltipComponent;
