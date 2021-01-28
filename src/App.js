import './App.css';
import { Switch,Route } from "react-router";
import  AstroidDetail from "./components/astroidDetail";
import AstroidFinder from "./components/astroidFinder";
import Typography from "@material-ui/core/Typography";

function App() {
  return (
    <div className="App">
          <Typography variant="h4" style={{textAlign : 'left'}}>Astroid Finder</Typography>
      <Switch>
          <Route path="/" exact>
                <AstroidFinder />
           </Route>  
          <Route path="/astroidDetail">
                <AstroidDetail/>
           </Route>  
      </Switch>
    </div>
  );
}

export default App;
