import React from 'react'

import State from 'sajari-react/pipeline/state'

const _state = State.default();


class Tabs extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {selected: this.props.defaultTab};
    this.onValuesChange = this.onValuesChange.bind(this);
  }

  _state() {
    return State.ns(this.props.namespace);
  }

  componentDidMount() {
    this._state().registerChangeListener(this.onValuesChange);
  }

  componentWillUnmount() {
    this._state().unregisterChangeListener(this.onValuesChange);
  }

  onValuesChange() {
    let values = this._state().getValues();
    if (values["filter"] === "") {
      this.setState({ selected: this.props.defaultTab });
    }
  }
  
  onClickTab(title, filter) {
    this.setState({
      selected: title,
    })

    this._state().setValues({
      filter: filter,
    }, true);
  }

  render() {
    return (
      <div className='sj-tabs-container'>
        <div className='sj-tabs'>
          {this.props.tabs.map((t) => (
            <div
              key={t.title}
              className={`sj-tab${t.title === this.state.selected ? ' sj-tab-active' : ''}`}
              onClick={() => {this.onClickTab(t.title, t.filter)
              }}>
              {t.title}
            </div>
          ))}
        </div>
      </div>
    )
  }
}

Tabs.defaultProps = {
  namespace: 'default',
}

export default Tabs