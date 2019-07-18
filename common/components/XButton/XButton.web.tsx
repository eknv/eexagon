import React, {Component} from 'react';
import {Button} from 'antd';
import {Extract, IExtract} from 'X/utils-c';
import {compose} from 'recompose';
import {IProps, IState} from './';


class XButton extends Component<IProps & IExtract, IState> {

  constructor(props: IProps & IExtract) {
    super(props);
  }

  componentDidMount() {
  }

  render() {

    const {$attributes, $attributeValue, style, onPress, content, isLoading, disabled, ...props} = this.props;

    return (
      <div>
        <Button
          onClick={onPress}
          style={style}
          type={$attributeValue("theme")}
          size={$attributeValue("size")}
          {...$attributes(props, ["theme", "size"])}
          loading={isLoading}
          disabled={disabled}
        >
          {content}
        </Button>
      </div>
    );
  }
}

export default compose<IProps & IExtract, IProps>(Extract)(XButton);
