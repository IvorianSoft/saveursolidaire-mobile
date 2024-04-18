import React from 'react';
import { Dimensions } from 'react-native';
import { Circle, Rect } from "react-native-svg";
import {FacebookLoader} from "react-native-easy-content-loader";
export const deviceWidth = Dimensions.get('window').width;

const LoaderComponent = props => (
    <FacebookLoader
        active
        listSize={10}
        loading={props.loading}

        {...props}
    >
        <Rect x="70" y="15" rx="4" ry="4" width="117" height="6.4" />
        <Rect x="10" y="35" rx="3" ry="3" width="85" height="6.4" />
        <Rect x="0" y="80" rx="3" ry="3" width="250" height="6.4" />
        <Rect x="0" y="100" rx="3" ry="3" width="250" height="6.4" />
        <Rect x="0" y="120" rx="3" ry="3" width="250" height="6.4" />
        <Circle cx="30" cy="30" r="30" />
    </FacebookLoader>
)


export default LoaderComponent;