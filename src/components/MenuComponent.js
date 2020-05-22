import React from 'react';
import {Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import { Link } from 'react-router-dom';

    function RenderMenuItem({dish}){
      return (
        <Card>
          <Link to={`/menu/${dish.id}`}>
          <CardImg width='100%' src={dish.image} alt={dish.name} />
           <CardImgOverlay>
            <CardTitle>{dish.name}</CardTitle>
          </CardImgOverlay>
          </Link>
        </Card>
      );
    }


    const Menu  = (props) => {
      const menu = props.dishes.map( (dish) => {return (
        <div  key={dish.id} className="col-12 col-md-5 m-1" >
           <RenderMenuItem dish={dish} />
        </div>);
      });

        return (
          <div className="container">
            <div className="row">
              <Breadcrumb>
                <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                <BreadcrumbItem activr>Menu</BreadcrumbItem>
              </Breadcrumb>
            </div>
            <div className="row">
              <h3 className="col-12 text-center">Menu</h3>
              <hr width="50%" />
            </div>
            <div className="row">
              {menu}
            </div>
          </div>
        );
    };

export default Menu;