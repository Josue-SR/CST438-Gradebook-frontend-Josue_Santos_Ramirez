import {BrowserRouter, Switch, Route } from 'react-router-dom';
import ListAssignment from './ListAssignment';
import GradeAssignment from './GradeAssignment';
import EditAssignment from './EditAssignment';
import AddAssignment from './AddAssignment';

function Home() {
  return (
    <div className="Home">
      <h2>Gradebook</h2>
      <BrowserRouter>
          <div>
            <Switch>
              <Route exact path="/" component={ListAssignment} />
              <Route path="/gradeAssignment" component={GradeAssignment} />
              <Route path="/editAssignment" component={EditAssignment} />
              <Route path="/addAssignment" component={AddAssignment} />
              <Route render={ () => <h1>Page not found</h1>} />
            </Switch>
          </div>
        </BrowserRouter>
    </div>
  );
}

export default Home;
