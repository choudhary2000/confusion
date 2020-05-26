import React , { Component} from 'react';
import {Card,CardImg,CardBody,CardTitle,CardText, Breadcrumb, BreadcrumbItem , Button, Modal, ModalHeader, ModalBody, Row, Label, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import {LocalForm, Control, Errors} from 'react-redux-form';

const required = (val) => (val) && (val.length);
const minLength = (len) => (val) => !(val) || (val.length >= len)
const maxLength = (len) => (val) => !(val) || (val.length <= len)
class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal(){
    this.setState({isModalOpen: !this.state.isModalOpen});
  };

  handleSubmit(values){
    this.props.addComment(this.props.dishId, values.rating, values.yourname, values.comment);
  }



  render(){
        return(
          <React.Fragment>

          <Button outline type="submit"onClick={this.toggleModal}><i className="fa fa-pencil fa-lg"></i> Submit Comment</Button>
          <Modal isOpen={this.state.isModalOpen}>
            <ModalHeader  toggle={this.toggleModal}>Submit Comment</ModalHeader>
            <ModalBody>
              <LocalForm onSubmit={(values)=>this.handleSubmit(values)}>
                <Row className="form-group">
                  <Col>
                    <Label htmlFor="rating">Rating</Label>
                    <Control.select model=".rating" id="rating" name="rating" className="form-control">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </Control.select>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Col>
                    <Label htmlFor="yourname" >Your Name</Label>
                    <Control.text model=".yourname" id="yourname" name="yourname" placeholder="Your Name" className="form-control" validators={{required, maxLength: maxLength(15), minLength: minLength(2)}}/>
                    <Errors className="text-danger" model=".yourname" show="touched" messages={{required: "Required field", minLength: "Must be greater than 2 characters", maxLength: "Must be 15 characters or less"}}/>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Col>
                    <Label htmlFor="comment">Comment</Label>
                    <Control.textarea model=".comment" id="comment" name="name" rows={5} className="form-control"/>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Button type="submit" color="primary">Submit</Button>
                  </Col>
                </Row>
              </LocalForm>
            </ModalBody>
          </Modal>
        </React.Fragment>);
      };
}




function Dish({dish}){
    return(
      <div className="col-12 col-md-5 m-1">
      <Card>
        <CardImg width="100%" src={dish.image} alt={dish.name} />
        <CardBody>
        <CardTitle >{dish.name}</CardTitle>
        <CardText >{dish.description}</CardText>
        </CardBody>
      </Card>
    </div>
    );
  };
function   Comment({comments , addComment , dishId}){
      return(
        <div className="col-12 col-md-5 m-1">
          <ul className="list-unstyled">
            {comments.map((x) => {
              return(<li key={x.id} className="mt-2"> {x.comment}<br /> -- {x.author}, {new Intl.DateTimeFormat('en-US',{year:'numeric',month:'short',day:'2-digit'}).format(new Date(x.date))}</li>
            );})}
          </ul>
          <CommentForm dishId={dishId} addComment={addComment} />
        </div>);
    };

function DishDetail(props){
  if(props.isLoading){
    return(<div className="container">
      <div className="row offset-6">
        <Loading />
      </div>
    </div>);
  }
  else if(props.errmess){
    return(<div className="container">
      <div className="row col-auto">
          <h3>{props.errmess}</h3>
      </div>
    </div>);
  }
  else if(props.dish != null){
    return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
          <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
          <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>

        </Breadcrumb>
      </div>
      <div className="row">
        <Dish dish={props.dish} />
        <Comment comments={props.comments} addComment={props.addComment} dishId={props.dish.id}/>
      </div>
    </div>
  );
};
}

export default DishDetail;
