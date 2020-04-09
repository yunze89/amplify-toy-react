import React from 'react';
import logo from './logo.svg';
import './App.css';
import * as queries from './graphql/queries';
import * as mutations from './graphql/mutations';
import * as subscriptions from './graphql/subscriptions';

import Login from './components/login'
import {API, graphqlOperation} from 'aws-amplify';

const App = () => {

    const examplePost = {
        title: 'test post1',
        description: 'test description1',
        createdAt: new Date().toISOString(),
    };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/*login component*/}
        <Login></Login>
          <div>
              {/*로그인 되어 있지 않으면, "no current user"로 실행되지 않음*/}
              <button onClick={()=>API.graphql(graphqlOperation(mutations.createPost, {input:examplePost, }))}>create test post</button>
              <button onClick={async()=>{
                  const list = await API.graphql(graphqlOperation(queries.listPosts));
                  console.log('queried list - ',list);
              }}>get post list</button>
          </div>
      </header>
    </div>
  );
}

export default App;
