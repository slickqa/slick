import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import Markdown from "grommet/components/Markdown";
import Anchor from 'grommet/components/Anchor';
import FilterControl from 'grommet-addons/components/FilterControl';
import FormField from 'grommet/components/FormField';
import CheckBox from 'grommet/components/CheckBox';
import DateTime from 'grommet/components/DateTime';
import NumberInput from 'grommet/components/NumberInput';
import SearchInput from 'grommet/components/SearchInput';
import TextInput from 'grommet/components/TextInput';
import RadioButton from 'grommet/components/RadioButton';
import Tip from 'grommet/components/Tip';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showTip: false
    };
    this.changeTipState = this.changeTipState.bind(this);
  }

  changeTipState() {
    this.setState(function(oldstate) {
      return {showTip: !oldstate.showTip};
    })
  }

  render() {
    let tip = null;
    if(this.state.showTip) {
      tip = <Tip target="has-a-tip" onClose={this.changeTipState}>This is the tip</Tip>;
    }
    return <Box>
      <Title margin="small" pad="small" colorIndex="grey-1-a">Example Embedded Page</Title>
      <Box pad="small" colorIndex="grey-1-a">
        <Markdown content="Markdown text can also be rendered, including [a link to google](https://www.google.com)" />
        <Anchor label="An Anchor" />
        <FilterControl unfilteredTotal={100}
                       filteredTotal={50} />
        <span id="has-a-tip" onMouseEnter={this.changeTipState} onMouseLeave={this.changeTipState}>This text has a tip</span>
        {tip}
        <FormField label="Checkboxes">
          <CheckBox label='Simple Checkbox' onChange={()=>{}}/>
          <CheckBox label='Checkbox as a Toggle' toggle={true} checked={true} onChange={()=>{}}/>
        </FormField>
        <Box>
        <FormField label="Input Fields">
          <DateTime name="datetime" onChange={() => {}} />
          <NumberInput name="number" value={10} onChange={() => {}} />
          <SearchInput placeHolder="Search"/>
          <TextInput placeHolder="Text Input"/>
        </FormField>
        </Box>
          <Box>
        <FormField label="Radio Buttons">
          <RadioButton id="r-1" label="First" checked={true} onChange={()=>{}}/>
          <RadioButton id="r-2" label="Second" checked={false} onChange={()=>{}}/>
        </FormField>
          </Box>
      </Box>
    </Box>;
  }
}

const element = document.getElementById('content');
ReactDOM.render(<App />, element);

document.body.classList.remove('loading');
