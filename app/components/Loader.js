import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, View } from 'react-native';
import ContentLoader from "react-native-easy-content-loader";

export const deviceWidth = Dimensions.get('window').width;

const LoaderComponent = props => {
    const fadeAnim = useRef(new Animated.Value(0)).current;  // Initial value for opacity: 0

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true
                }),
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true
                })
            ]),
        ).start();
    }, [fadeAnim]);

    return (
        <Animated.View style={{ ...styles.loader, opacity: fadeAnim }}>
            <ContentLoader
                active={props.loading}
                animationDuration={500}
                listSize={5}
                pRows={5}
                pWidth={["100%", 200, "25%", 45]}
                {...props}
            />
        </Animated.View>
    );
}

const styles = {
    loader: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    }
}


export default LoaderComponent;
