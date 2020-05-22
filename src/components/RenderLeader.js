import React from 'react';
import { Media }  from 'reactstrap';

function RenderLeader(props){
  return(
    <Media tag="li" className="mb-5">
      <Media left bottom>
        <Media object src={props.item.image} alt={props.item.name} className="mr-5 my_image"/>
      </Media>
      <Media body>
        <Media heading>
          {props.item.name}
        </Media>
        <h6>{props.item.designation}</h6>
        <Media body>
          {props.item.description}
        </Media>
      </Media>
    </Media>
  );
}
export default RenderLeader;
