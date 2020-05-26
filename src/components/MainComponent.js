import React, {Component} from 'react';
import { Route, Switch , Redirect, withRouter } from 'react-router-dom';
import { actions } from 'react-redux-form';
import Header from './HeaderComponent';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactusCompoment';
import DishDetail from './DishdetailComponent';
import About from './AboutComponent';
import Footer from './FooterComponent';
import { connect } from 'react-redux';
import { addComment, fetchDishes } from '../redux/ActionCreators';

const mapStatetoProps = (state) => {
  return {dishes: state.dishes,
  comments: state.comments,
  promotions: state.promotions,
  leaders: state.leaders
  };
};

const mapDispachtoProps = (dispatch) => ({
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: () => { dispatch(fetchDishes())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))}
});

class Main extends Component{

  componentDidMount(){
    this.props.fetchDishes();
  }

  render(){

    const DishWithId = ({match}) => {
      return(
        <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.id,10))[0]}
          isLoading={this.props.dishes.isLoading}
          errmess={this.props.dishes.errmess}
         comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.id,10))}
         addComment = {this.props.addComment}/>
      );
    };

    const HomePage = () => {
    return(<Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
      isLoading={this.props.dishes.isLoading}
      errmess={this.props.dishes.errmess}
     promotion={this.props.promotions.filter((prom) => prom.featured)[0]}
     leader={this.props.leaders.filter((leader) => leader.featured)[0]}
  />
  );
  }

  const  AboutPage = () => {
    return(
      <About leaders={this.props.leaders} />
    );
  }

    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route path="/aboutus" component={AboutPage}/>
          <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes}/>} />
          <Route path="/menu/:id" component={DishWithId} />
          <Route exact path="/contactus" component={()=> <Contact resetFeedbackForm={this.props.resetFeedbackForm}/>} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  };
};

export default withRouter(connect(mapStatetoProps , mapDispachtoProps)(Main));
