import React, {
  PropTypes,
} from 'react';
import {
  Text,
  Image,
  View
} from 'react-native';

const propTypes = {
  selected: PropTypes.bool,
  title: PropTypes.string,
};

const TabIcon = (props) => (
  <View style={{flex: 1, paddingTop: 7}}>
    {props.image ? <Image height={37} source={props.image}/> : null}
    {props.title ? <Text
        style={{color: props.selected ? 'red' : 'black'}}
      >
        {props.title}
      </Text> : null
    }
  </View>
);

TabIcon.propTypes = propTypes;

export default TabIcon;
