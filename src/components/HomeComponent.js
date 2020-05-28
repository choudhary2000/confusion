import React from 'react';
import { Loading } from './LoadingComponent';
import { Card, CardBody, CardImg, CardText, CardSubtitle, CardTitle } from 'reactstrap';
import { baseUrl } from '../shared/baseUrl';

function RenderCard({item , isLoading, errmess}){
  if(isLoading){
    return(
      <Loading />
    );
  }
  else if(errmess){
    return(<h4>{errmess}</h4>);
  }
  else{
  return(
    <Card>
      <CardImg src={baseUrl + item.image} alt={item.name}/>
      <CardBody>
        <CardTitle>{item.name}</CardTitle>
        {item.designation ?<CardSubtitle> {item.designation}</CardSubtitle> : null}
        <CardText>{item.description}</CardText>
      </CardBody>
    </Card>
  );
}}

function Home(props){
  return(
    <div className="container">
      <div className="row align-items-start">
          <div className="col-12 col-md m-1">
            <RenderCard item={props.dish} isLoading={props.dishesLoading} errmess={props.dishesErrmess}/>
          </div>
          <div className="col-12 col-md m-1">
            <RenderCard item={props.promotion} isLoading={props.promotionsLoading} errmess={props.promotionsErrmess}/>
          </div>
          <div className="col-12 col-md m-1">
              <RenderCard item={props.leaders} isLoading={props.leadersLoading} errmess={props.leadersErrmess} />
          </div>
      </div>
    </div>
  );
}
export default Home;
