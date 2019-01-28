import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';

class App extends Component {
  render() {
    return <Box>
      <Title margin="small" pad="small" colorIndex="grey-1-a">Example Embedded Page</Title>
      <Box colorIndex="grey-1-a" margin="small" pad="small">
        This is an example page that will be embedded into slick using an iframe.
        It contains no functional components.
      </Box>
    </Box>;
  }
}

const element = document.getElementById('content');
ReactDOM.render(<App />, element);

document.body.classList.remove('loading');
